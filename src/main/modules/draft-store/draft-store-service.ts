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
  const expireTimeInSec: number = config.get('services.draftStore.redis.ttl');
  fieldsToBeExcluded.forEach(item => {
    if (formData[item]) {
      delete formData[item];
    }
  });
  let dataToStore = formData;
  const draftCaseFromRedis = await getDraftCaseFromStore(req, caseRef);
  let ttl = await req.app.locals.draftStoreClient.ttl(caseRef);
  if (draftCaseFromRedis) {
    dataToStore = { ...draftCaseFromRedis, ...dataToStore };
  } else if (ttl > 0) {
    dataToStore = { ...dataToStore };
  } else {
    ttl = expireTimeInSec;
    req.session.userCase = await req.locals.api.getCaseById(caseRef);
    dataToStore = { ...formData };
    req.session.userCase = { ...req.session.userCase, ...dataToStore };
  }
  const draftStoreClient = req.app.locals.draftStoreClient;
  draftStoreClient.set(caseRef, JSON.stringify(dataToStore), 'EX', ttl);

  return req.session.userCase;
};

export const removeCaseFromRedis = async (req: AppRequest, caseRef: string): Promise<void> => {
  const draftStoreClient = req.app.locals.draftStoreClient;
  draftStoreClient.del(caseRef);
};
