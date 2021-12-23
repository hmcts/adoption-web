import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

export type Fee = {
  code: string;
  description: string;
  version: string;
  fee_amount: string;
};

export const getFee = async (logger: LoggerInstance): Promise<Fee> => {
  try {
    const response: AxiosResponse<Fee> = await axios.get(config.get('services.feeLookup.url'), {
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
      return <Fee>{};
    }

    return response.data;
  } catch (err) {
    logger.error('Fee lookup error occurred', err);
    return <Fee>{};
  }
};
