import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import {
  CASE_TYPE,
  CITIZEN_ADD_PAYMENT,
  CITIZEN_CREATE,
  CaseData,
  Adoption,
  JURISDICTION,
  ListValue,
  Payment,
  State,
  // UserRole,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly userDetails: UserDetails,
    private readonly logger: LoggerInstance
  ) {}

  public async getOrCreateCase(serviceType: Adoption, userDetails: UserDetails): Promise<CaseWithId> {
    const userCase = await this.getCase(serviceType);
    console.log("caseapi.ts 35 serviceType: " +serviceType+" "+ JSON.stringify(userCase,null,2)); 
    return userCase || this.createCase(serviceType, userDetails);
  }

  private async getCase(serviceType: Adoption): Promise<CaseWithId | false> {
    const cases = await this.getCases();

    const serviceCases = cases;//cases.filter(c => c.case_data.divorceOrDissolution === serviceType);
    console.log(" caseapi.ts 42 "+serviceType+" "+serviceCases.length);

    if(serviceCases.length==0){
      return false;
    }
    else if(serviceCases.length>0){
        const { id, state, case_data: caseData } = serviceCases[0];
        return { ...fromApiFormat(caseData), id: id.toString(), state };
    }else{
      throw new Error('Too many cases assigned to user.');
    }    
    // switch (serviceCases.length) {
    //   case 0: {
    //     return false;
    //   }
    //   case 1:
    //   case 2: {
    //     const { id, state, case_data: caseData } = serviceCases[0];
    //     return { ...fromApiFormat(caseData), id: id.toString(), state };
    //   }
    //   default: {
    //     throw new Error('Too many cases assigned to user.');
    //   }
    // }
  }

  private async getCases(): Promise<CcdV1Response[]> {
    try {
      const response = await this.axios.get<CcdV1Response[]>(
        `/citizens/${this.userDetails.id}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases`
      );
      console.log("caseapi.ts 63 "+`/citizens/${this.userDetails.id}/jurisdictions/${JURISDICTION}/case-types/${CASE_TYPE}/cases`);
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
    try {
      const response = await this.axios.get<CcdV2Response>(`/cases/${caseId}`);

      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be retrieved.');
    }
  }

  private async createCase(serviceType: Adoption, userDetails: UserDetails): Promise<CaseWithId> {
    console.log("caseapi.ts 92 Creating new case");
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

    console.log("case0 95: "+userDetails.givenName+" "+ userDetails.familyName+" "+userDetails.email+ " id"+userDetails.id);
    try {
      const response = await this.axios.post<CcdV2Response>(`/case-types/${CASE_TYPE}/cases`, {
        data,
        event,
        event_token: token,
      });
      console.log("caseapi.ts 105 " + JSON.stringify(response.data,null,2)); 
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
      console.log("caseapi.ts 139 eventName: "+eventName);
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    return this.sendEvent(caseId, toApiFormat(userData), eventName);
  }

  public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
    return this.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
  }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url}`);
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
    userDetails,
    logger
  );
};

interface CcdV1Response {
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
