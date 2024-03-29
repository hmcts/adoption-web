import { Logger } from '@hmcts/nodejs-logging';
import Axios, { AxiosInstance } from 'axios';
import config from 'config';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CASE_TYPE } from '../case/definition';
import type { AppSession } from '../controller/AppRequest';

const logger = Logger.getLogger('payment');

export class PaymentClient {
  client: AxiosInstance;

  constructor(private readonly session: AppSession, readonly returnUrl: string) {
    this.client = Axios.create({
      baseURL: config.get('services.payments.url'),
      headers: {
        Authorization: 'Bearer ' + session.user.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
        'return-url': returnUrl,
      },
    });
  }

  public async create(): Promise<Payment> {
    const userCase = this.session.userCase;
    const caseId = userCase.id.toString();

    const total = userCase.applicationFeeOrderSummary.Fees.reduce((sum, item) => sum + +item.value.FeeAmount, 0);
    logger.info(`caseId=${caseId} total=${total}`);

    const body = {
      case_type: CASE_TYPE,
      amount: total,
      ccd_case_number: caseId,
      description: this.session.lang === 'cy' ? 'Gwneud cais i fabwysiadu' : 'Apply for adoption',
      currency: 'GBP',
      fees: userCase.applicationFeeOrderSummary.Fees.map(fee => ({
        calculated_amount: `${fee.value.FeeAmount}`,
        code: fee.value.FeeCode,
        version: fee.value.FeeVersion,
      })),
      language: this.session.lang === 'en' ? '' : this.session.lang?.toUpperCase(),
    };

    try {
      const response = await this.client.post<Payment>('/card-payments', body);
      logger.info(`Generated govpay link for caseId=${caseId}`);

      if (!response.data || !response.data._links?.next_url.href) {
        throw response;
      }

      return response.data;
    } catch (e) {
      logger.error(e);
      const errMsg = 'Error creating payment';
      logger.error(errMsg, e.data);
      throw new Error(errMsg);
    }
  }

  public async get(paymentReference: string): Promise<Payment | undefined> {
    try {
      const response = await this.client.get<Payment>(`/card-payments/${paymentReference}`);
      logger.info(JSON.stringify(response.data));
      return response.data;
    } catch (e) {
      const errMsg = 'Error fetching payment';
      logger.error(errMsg, e.data);
    }
  }
}

export interface Payment {
  _links: LinksDto;
  account_number: string;
  amount: number;
  case_reference: string;
  ccd_case_number: string;
  channel: string;
  currency: string;
  customer_reference: string;
  date_created: string;
  date_updated: string;
  description: string;
  external_provider: string;
  external_reference: string;
  fees: FeeDto[];
  giro_slip_no: string;
  id: string;
  method: string;
  organisation_name: string;
  payment_group_reference: string;
  payment_reference: string;
  reference: string;
  reported_date_offline: string;
  service_name: string;
  site_id: string;
  status: HmctsPayStatus;
  status_histories: StatusHistoryDto[];
}

interface LinksDto {
  next_url: LinkDto;
  self: LinkDto;
  cancel: LinkDto;
}

interface LinkDto {
  href: string;
  method: RequestMethod;
}

enum RequestMethod {
  GET = 'GET',
  HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  TRACE = 'TRACE',
}

export interface FeeDto {
  calculated_amount: number;
  ccd_case_number: string;
  code: string;
  description: string;
  id: number;
  jurisdiction1: string;
  jurisdiction2: string;
  memo_line: string;
  natural_account_code: string;
  net_amount: number;
  reference: string;
  version: string;
  volume: number;
}

export interface StatusHistoryDto {
  amount: number;
  description: string;
  reference: string;
  currency: string;
  ccd_case_number: string;
  channel: string;
  method: string;
  external_provider: string;
  status: HmctsPayStatus;
  external_reference: string;
  site_id: string;
  service_name: string;
  payment_group_reference: string;
  fees: FeeDto[];
  _links: {
    self: LinkDto;
  };
}

export type HmctsPayStatus = 'Initiated' | 'Success' | 'Failed';
