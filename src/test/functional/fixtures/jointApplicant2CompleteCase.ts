import { Checkbox, LanguagePreference } from '../../../main/app/case/case';
import { ChangedNameHow, DocumentType, YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

export const jointApplicant2CompleteCase: Partial<BrowserCase> = {
  applicant2AgreeToReceiveEmails: Checkbox.Checked,
  applicant2NameChangedSinceRelationshipFormed: YesOrNo.YES,
  applicant2ScreenHasUnionBroken: YesOrNo.YES,
  applicant2HelpPayingNeeded: YesOrNo.NO,
  applicant2FirstNames: 'Test your name',
  applicant2LastNames: 'Test your last name',
  applicant2LegalProceedings: YesOrNo.NO,
  applicant2ApplyForFinancialOrder: YesOrNo.NO,
  applicant2LastNameChangedWhenRelationshipFormed: YesOrNo.NO,
  applicant2PhoneNumber: '',
  applicant2EnglishOrWelsh: LanguagePreference.English,
  applicant2MiddleNames: '',
  applicant2Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
  applicant2Address2: '',
  applicant2Address3: '',
  applicant2AddressCountry: 'UK',
  applicant2AddressCounty: 'CITY OF WESTMINSTER',
  applicant2AddressPostcode: 'SW1H 9AJ',
  applicant2AddressPrivate: YesOrNo.NO,
  applicant2AddressTown: 'LONDON',
  applicant2NameChangedHow: [ChangedNameHow.MARRIAGE_CERTIFICATE],
  applicant2CannotUpload: Checkbox.Checked,
  applicant2CannotUploadDocuments: [DocumentType.MARRIAGE_CERTIFICATE],
  applicant2UploadedFiles: [],
  applicant2ChangedNameHowAnotherWay: '',
};
