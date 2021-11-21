import { Checkbox, LanguagePreference } from '../../../main/app/case/case';
import { YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

export const respondentCompleteCase: Partial<BrowserCase> = {
  disputeApplication: YesOrNo.NO,
  jurisdictionAgree: YesOrNo.YES,
  applicant2LegalProceedings: YesOrNo.NO,
  applicant2AgreeToReceiveEmails: Checkbox.Checked,
  applicant2EnglishOrWelsh: LanguagePreference.English,
};
