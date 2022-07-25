import { CaseWithId } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('draftStoreService');

export const getDraftCaseFromStore = async (req: AppRequest, caseRef: string): Promise<CaseWithId> => {
  const dataFromRedis = await req.app.locals.draftStoreClient.get(caseRef);
  let returnData;
  if (dataFromRedis) {
    try {
      returnData = JSON.parse(dataFromRedis) as CaseWithId;
    } catch (err: unknown) {
      logger.error(`${(err as Error).stack || err}`);
    }
  }
  return returnData;
};

export const saveDraftCase = async (req: AppRequest, caseRef: string): Promise<CaseWithId> => {
  const dataToStore = req.session.userCase;

  const draftStoreClient = req.app.locals.draftStoreClient;

  draftStoreClient.set(caseRef, JSON.stringify(dataToStore));
  return dataToStore;
};
