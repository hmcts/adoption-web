import { Case, CaseWithId } from '../../app/case/case';
import { AppRequest } from '../../app/controller/AppRequest';

export const getDraftCaseFromStore = async (req: AppRequest, caseRef: string): Promise<CaseWithId> => {
  const dataFromRedis = await req.app.locals.draftStoreClient.get(caseRef);
  let returnData;
  if (dataFromRedis) {
    try {
      console.log('retrived data', dataFromRedis);

      returnData = JSON.parse(dataFromRedis) as CaseWithId;
    } catch (err: unknown) {
      console.log(err);

      return returnData;
    }
  }
  return returnData;
};

export const saveDraftCase = async (req: AppRequest, caseRef: string, formData: Partial<Case>): Promise<CaseWithId> => {
  let dataToStore = formData;
  const draftCaseFromRedis = await getDraftCaseFromStore(req, caseRef);
  if (draftCaseFromRedis) {
    dataToStore = { ...draftCaseFromRedis, ...dataToStore };
  } else {
    dataToStore = { ...dataToStore };
  }
  const draftStoreClient = req.app.locals.draftStoreClient;
  draftStoreClient.set(caseRef, JSON.stringify(dataToStore));

  return req.session.userCase;
};

export const removeCaseFromRedis = async (req: AppRequest, caseRef: string): Promise<void> => {
  const draftStoreClient = req.app.locals.draftStoreClient;
  draftStoreClient.del(caseRef);
};
