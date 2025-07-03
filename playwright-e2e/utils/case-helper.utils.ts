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

  private async fetchEventToken(triggerUrl: string): Promise<string> {
    console.log(triggerUrl);
    const context = await this.createApiContext();
    const response = await context.get(triggerUrl);

    if (!response.ok()) {
      throw new Error(`Failed to fetch event token: ${response.status()}`);
    }

    const json = await response.json();
    return json.token;
  }

  async createCase(caseData: Record<string, any>) {
    const eventId = 'citizen-create-application';
    const context = await this.createApiContext();
    console.log(urlConfig.ccd_data_api_url + `/case-types/${this.caseType}/event-triggers/${eventId}`);
    const token = await this.fetchEventToken(urlConfig.ccd_data_api_url + `/case-types/${this.caseType}/event-triggers/'citizen-create-application'`);

    const response = await context.post(`/case-types/${this.caseType}/cases`, {
      headers: this.getHeaders(),
      data: {
        data: caseData,
        event: { id: eventId },
        event_token: token,
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
