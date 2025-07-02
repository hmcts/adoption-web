import { APIRequestContext, request } from '@playwright/test';

export class CaseHelperUtils {
  private requestContext!: APIRequestContext;

  constructor(
    private caseType: string,
    private accessToken: string,
    private serviceToken: string
  ) {}

  private async ensureContext(): Promise<APIRequestContext> {
    if (!this.requestContext) {
      this.requestContext = await request.newContext();
    }
    return this.requestContext;
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
      ServiceAuthorization: this.serviceToken,
      experimental: 'true',
      'Content-Type': 'application/json',
      Accept: '*/*',
    };
  }

  private async fetchEventToken(url: string): Promise<string> {
    const context = await this.ensureContext();
    const response = await context.get(url, { headers: this.getHeaders() });
    if (!response.ok()) {
      throw new Error(`Failed to fetch event token: ${response.status()}`);
    }
    const json = await response.json();
    console.log(json.token)
    return json.token;
    
  }

  async createCase(eventId: string, caseData: Record<string, any>) {
    const context = await this.ensureContext();
    const token = await this.fetchEventToken(`/case-types/${this.caseType}/event-triggers/${eventId}`);

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
    return response.json();
  }

  async triggerEvent(caseId: string, eventId: string, eventData: Record<string, any>) {
    const context = await this.ensureContext();
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
    const responses = [];

    for (const { eventName, eventData } of events) {
      const eventResponse = await this.triggerEvent(caseId, eventName, eventData);
      responses.push(eventResponse);
    }

    return responses;
  }
}
