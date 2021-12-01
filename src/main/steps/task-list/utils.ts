import { CaseWithId } from '../../app/case/case';

export const isApplyingWithComplete = (userCase: CaseWithId): boolean => {
  return !!userCase.applyingWith;
};
