import config from 'config';

import { Case, CaseWithId } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';

export const getDraftCaseFromStore = async (req: AppRequest, caseRef: string): Promise<CaseWithId> => {
  const dataFromRedis = await req.app.locals.draftStoreClient.get(caseRef);
  let returnData;
  if (dataFromRedis) {
    try {
      returnData = JSON.parse(dataFromRedis) as CaseWithId;
    } catch (err: unknown) {
      return returnData;
    }
  }
  return returnData;
};

export const saveDraftCase = async (req: AppRequest, caseRef: string, formData: Partial<Case>): Promise<CaseWithId> => {
  const fieldsToBeExcluded = [
    'selectedOtherPlacementOrderType',
    'selectedPlacementOrderId',
    'selectedPlacementOrderType',
    'selectedSiblingId',
    'selectedSiblingOtherPlacementOrderType',
    'selectedSiblingPoType',
    'selectedSiblingRelation',
  ];
  const expireTimeInMs: number = config.get('services.draftStore.redis.ttl');
  fieldsToBeExcluded.forEach(item => {
    if (formData[item]) {
      delete formData[item];
    }
  });
  let ttl: number = expireTimeInMs;
  let dataToStore = formData;
  const draftCaseFromRedis = await getDraftCaseFromStore(req, caseRef);
  if (draftCaseFromRedis) {
    dataToStore = { ...draftCaseFromRedis, ...dataToStore };
  } else {
    ttl = ttl - req.app.locals.draftStoreClient.ttl(caseRef);
    dataToStore = { ...dataToStore };
  }
  const draftStoreClient = req.app.locals.draftStoreClient;
  draftStoreClient.set(caseRef, JSON.stringify(dataToStore), 'PX', ttl);

  return req.session.userCase;
};

export const removeCaseFromRedis = async (req: AppRequest, caseRef: string): Promise<void> => {
  const draftStoreClient = req.app.locals.draftStoreClient;
  draftStoreClient.del(caseRef);
};
