import { CaseWithId } from '../../app/case/case';
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

export const saveDraftCase = async (req: AppRequest, caseRef: string): Promise<CaseWithId> => {
  const dataToStore = req.session.userCase;
  const draftStoreClient = req.app.locals.draftStoreClient;
  draftStoreClient.set(caseRef, JSON.stringify(dataToStore));
  console.log(dataToStore);

  return dataToStore;
};
