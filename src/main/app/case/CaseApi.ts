/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import moment from 'moment';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import {
  Adoption,
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  CITIZEN_CREATE,
  CaseData,
  ListValue,
  Payment,
  State,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  public async getOrCreateCase(serviceType: Adoption, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = (await this.getCaseDetails()).userCase;
    return userCase || this.createCase(serviceType, userDetails);
  }

  public async checkOldPCQIDExists(cases: CcdV1Response[]): Promise<string | undefined> {
    if (cases) {
      const caseWithPCQID = cases.find(caseElement => caseElement.case_data.pcqId !== null);
      return caseWithPCQID?.case_data.pcqId;
    }
    return undefined;
  }

  public async getCaseDetails(): Promise<{ userCase: CaseWithId | false; cases: CcdV1Response[] }> {
    const cases = await this.getCases();
    return { userCase: await this.getCase(cases), cases };
  }

  async getCase(cases: CcdV1Response[]): Promise<CaseWithId | false> {
    //TODO comment out if statement to create multiple cases for the same user
    if (cases.length === 0) {
      return false;
    }

    if (
      cases.filter(caseElement => caseElement.state === State.Submitted || caseElement.state === State.LaSubmitted)
        .length === cases.length
    ) {
      if (
        cases.filter(
          caseElement =>
            moment(new Date(caseElement.case_data.dateSubmitted)).format('YYYY-MM-DD') ===
            moment(new Date()).format('YYYY-MM-DD')
        ).length !== 0
      ) {
        const {
          id,
          state,
          case_data: caseData,
        } = cases
          .filter(
            caseElement =>
              moment(new Date(caseElement.case_data.dateSubmitted)).format('YYYY-MM-DD') ===
              moment(new Date()).format('YYYY-MM-DD')
          )
          .sort((a, b) => {
            return a.case_data.dateSubmitted >= b.case_data.dateSubmitted ? -1 : 1;
          })[0];

        return { ...fromApiFormat(caseData), id: id.toString(), state };
      } else {
        return null as any;
      }
    }

    //TODO: remove this
    if (
      cases.filter(caseElement => caseElement.state === State.Submitted || caseElement.state === State.LaSubmitted)
        .length !==
      cases.length - 1
    ) {
      throw new Error("Not all OR few cases assigned to the user aren't in right state.");
    }

    //TODO alter this logic to return the oldest case that is not in Submitted or LaSubmitted state
    // log.error where there is more than one case in the list
    const {
      id,
      state,
      case_data: caseData,
    } = cases.filter(
      caseElement => caseElement.state !== State.Submitted && caseElement.state !== State.LaSubmitted
    )[0];
    return { ...fromApiFormat(caseData), id: id.toString(), state };
  }

  public async getCases(): Promise<CcdV1Response[]> {
    try {
      const query = {
        query: { match_all: {} },
        sort: [{ id: { order: 'asc' } }],
      };
      const response = await this.axios.post<ES<CcdV1Response>>(
        `/searchCases?ctid=${CASE_TYPE}`,
        JSON.stringify(query)
      );
      return response.data.cases;
      // const response = await this.axios.get<CcdV1Response[]>(
      //   `/citizens/${this.userDetails.id}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases`
      // );
      // return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    try {
      const response = await this.axios.get<CcdV2Response>(`/cases/${caseId}`);

      response.data.data.status = response.data.state;
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async createCase(serviceType: Adoption, userDetails: UserDetails): Promise<CaseWithId> {
    const tokenResponse: AxiosResponse<CcdTokenResponse> = await this.axios.get(
      `/case-types/${CASE_TYPE}/event-triggers/${CITIZEN_CREATE}`
    );
    const token = tokenResponse.data.token;
    const event = { id: CITIZEN_CREATE };
    const data = {
      //adoption: serviceType,
      applicant1FirstName: userDetails.givenName,
      applicant1LastName: userDetails.familyName,
      applicant1Email: userDetails.email,
    };

    try {
      const response = await this.axios.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
        data,
        event,
        event_token: token,
      });
      response.data.data.status = response.data.state;
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be created.');
    }
  }

  public async getCaseUserRoles(caseId: string, userId: string): Promise<CaseAssignedUserRoles> {
    try {
      const response = await this.axios.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case roles could not be fetched.');
    }
  }

  private async sendEvent(caseId: string, data: Partial<CaseData>, eventName: string): Promise<CaseWithId> {
    try {
      const tokenResponse = await this.axios.get<CcdTokenResponse>(`/cases/${caseId}/event-triggers/${eventName}`);
      const token = tokenResponse.data.token;
      const event = { id: eventName };

      const response: AxiosResponse<CcdV2Response> = await this.axios.post(`/cases/${caseId}/events`, {
        event,
        data,
        event_token: token,
      });
      response.data.data.status = response.data.state;
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const data = toApiFormat(userData);
    return this.sendEvent(caseId, data, eventName);
  }

  public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
    return this.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
  }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config?.method} ${error.config?.url}`);
    } else {
      this.logger.error('API Error', error.message);
    }
  }
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.case.url'),
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    logger
  );
};

interface ES<T> {
  cases: T[];
  total: number;
}

export interface CcdV1Response {
  id: string;
  state: State;
  case_data: CaseData;
}

interface CcdV2Response {
  id: string;
  state: State;
  data: CaseData;
}

interface CcdTokenResponse {
  token: string;
}
/* eslint-enable @typescript-eslint/ban-types */
