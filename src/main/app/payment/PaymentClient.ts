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
    logger.info(`PaymentClient: caseId=${caseId} total=${total}`);

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
      logger.info(`PaymentClient: Generated govpay link for caseId=${caseId}`);

      if (!response.data || !response.data._links?.next_url.href) {
        logger.error(`PaymentClient: No data or no next_url in response for caseId=${caseId}`);
        throw response;
      }

      return response.data;
    } catch (e) {
      logger.error(e);
      const errMsg = `PaymentClient: Error creating payment for caseId=${caseId}`;
      logger.error(errMsg, e.data);
      throw new Error(errMsg);
    }
  }

  public async get(paymentReference: string, caseId: string): Promise<Payment | undefined> {
    try {
      const response = await this.client.get<Payment>(`/card-payments/${paymentReference}`, {
        signal: AbortSignal.timeout(2000), // 2 second timeout
      });
      logger.info(`PaymentClient.get: response = ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (e) {
      if (e.name === "TimeoutError") {
        logger.error(`PaymentClient.get: Timeout: It took >2 seconds to fetch the payment (reference ${paymentReference}) for caseId=${caseId}`);
      }

      const errMsg = `PaymentClient.get: Error fetching payment (reference ${paymentReference}) for caseId=${caseId}`;
      logger.error(errMsg, e.data);
    }
  }

  /**
   * Attempts to fetch a payment until the payment status is no longer 'Initiated' or undefined.
   * @param maxRetries (default 2)
   */
  public async getCompletedPayment(
    paymentReference: string,
    caseId: string,
    maxRetries = 2
  ): Promise<Payment | undefined> {
    let paymentStateInitiatedOrUnknown = true;
    let retry = 0;
    let delay = 1000; // Start with a 1 second delay

    while (paymentStateInitiatedOrUnknown) {
      const payment = await this.get(paymentReference, caseId);

      if (payment) {
        paymentStateInitiatedOrUnknown = payment.status === 'Initiated' || payment.status === undefined;
        if (!paymentStateInitiatedOrUnknown) {
          return payment;
        }
      }

      if (retry >= maxRetries) {
        break;
      }

      logger.info(
        `PaymentClient: Payment status = ${payment?.status} for caseId=${caseId}, paymentReference=${paymentReference}. Retrying in ${delay}ms...`
      );
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
      retry++;
    }

    logger.error(
      `PaymentClient.getCompletedPayment unable to fetch payment final status after ${maxRetries} retries. caseId=${caseId}, paymentReference=${paymentReference}`
    );
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
