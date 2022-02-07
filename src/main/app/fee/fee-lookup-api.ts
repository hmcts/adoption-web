import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { Fee } from '../../app/case/definition';

export const getFee = async (logger: LoggerInstance): Promise<Fee | undefined> => {
  try {
    const response: AxiosResponse = await axios.get(config.get('services.feeLookup.url'), {
      headers: {
        accept: 'application/json',
      },
      params: {
        application_type: 'all',
        channel: 'default',
        event: 'issue',
        jurisdiction1: 'family',
        jurisdiction2: 'family court',
        keyword: 'ApplyAdoption',
        service: 'adoption',
      },
    });

    if (!response.data) {
      return;
    }

    return {
      FeeCode: `${response.data.code}`,
      FeeDescription: `${response.data.description}`,
      FeeVersion: `${response.data.version}`,
      FeeAmount: `${response.data.fee_amount}`,
    };
  } catch (err) {
    logger.error('Fee lookup error occurred', err);
    return;
  }
};
