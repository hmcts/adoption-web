import { APIRequestContext, request } from '@playwright/test';
import { urlConfig } from './urls';
export class CaseHelperUtils {
  constructor(
    private caseType: string = 'A58',
    private accessToken: string = process.env.CREATE_CASE_TOKEN || '',
    private serviceToken: string = process.env.IDAM_S2S_TOKEN || '',
  ) {}

  private async createApiContext(): Promise<APIRequestContext> {
    return await request.newContext({});
  }

  private getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      ServiceAuthorization: this.serviceToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      experimental: 'true',
    };
  }
  /**
 * Function to retrieve the event for a given event ID.
 * @param {APIRequestContext} apiContext api context required to make the API requests
 * @param {string} bearerToken token required for Authorization of the API requests
 * @param {string} s2sToken token required for Service Authorization of the API requests
 * @param {string} userID user ID of the user that is requesting the event token
 * @param {string} caseEvent the ID of the case event
 * @param {string} caseID the ID of the case
 * @returns {Promise<string>} the event token for the given event
 */
  private async  getEventToken(
    apiContext: APIRequestContext,
    bearerToken: string,
    s2sToken: string,
    eventId: string,
  ): Promise<string> {
    let eventToken: string = "";
    const url: string = urlConfig.ccd_data_api_url + `/case-types/${this.caseType}/event-triggers/${eventId}`;
    const response = await apiContext.get(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
        ServiceAuthorization: `Bearer ${s2sToken}`,
      },
    });
    if (response.ok()) {
      const responseBody = await response.json();
      if (responseBody) {
        eventToken = responseBody.token;
      } else {
        throw new Error("Failed to get event token");
      }
    } else {
      throw new Error(
        `Failed to get event token for event: ${caseEvent}: Received the following response: ${response.status()} - ${response.statusText()}`,
      );
    }
    return eventToken;
  }

  async createCase(caseData: Record<string, any>) {
    const eventId = 'citizen-create-application' as string;
    const context = await this.createApiContext();
    console.log(urlConfig.ccd_data_api_url + `/case-types/${this.caseType}/event-triggers/${eventId}`);
    //const token = await this.fetchEventToken(urlConfig.ccd_data_api_url + `/case-types/${this.caseType}/event-triggers/${eventId}`);
    const eventToken: string = await this.getEventToken(
      context,
      process.env.CREATE_CASE_TOKEN as string,
      process.env.S2S_TOKEN as string,
      'citizen-create-application',
    );
    console.log(eventToken)
    const response = await context.post(`/case-types/${this.caseType}/cases`, {
      headers: this.getHeaders(),
      data: {
        data: caseData,
        event: { id: eventId },
        event_token: eventToken,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to create case: ${response.status()}`);
    }

    const json = await response.json();
    json.data.status = json.state;
    return json;
  }

  async triggerEvent(caseId: string, eventId: string, eventData: Record<string, any>) {
    const context = await this.createApiContext();
    const token = await this.fetchEventToken(`/cases/${caseId}/event-triggers/${eventId}`);

    const response = await context.post(`/cases/${caseId}/events`, {
      headers: this.getHeaders(),
      data: {
        event: { id: eventId },
        data: eventData,
        event_token: token,
      },
    });

    if (!response.ok()) {
      throw new Error(`Failed to trigger event "${eventId}": ${response.status()}`);
    }

    return response.json();
  }

  async triggerMultipleEvents(
    caseId: string,
    events: { eventName: string; eventData: Record<string, any> }[]
  ): Promise<any[]> {
    const results: any[] = [];
    for (const { eventName, eventData } of events) {
      const result = await this.triggerEvent(caseId, eventName, eventData);
      results.push(result);
    }
    return results;
  }
}
