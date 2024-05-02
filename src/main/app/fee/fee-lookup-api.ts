import { LoggerInstance } from 'winston';

import { Fee } from '../../app/case/definition';

export const getFee = async (logger: LoggerInstance): Promise<Fee | undefined> => {
  try {

    return {
      FeeAmount: '1234',
      FeeCode: 'MOCK_CODE',
      FeeDescription: 'MOCK_DESCRIPTION',
      FeeVersion: 'MOCK_VERSION',
    };
  } catch (err) {
    logger.error('Fee lookup error occurred', err);
    return;
  }
};
