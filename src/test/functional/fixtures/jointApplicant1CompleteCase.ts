import { Checkbox } from '../../../main/app/case/case';
import { ApplicationType, DocumentType, YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

export const jointApplicant1CompleteCase: Partial<BrowserCase> = {
  applicant1Address1: 'BUCKINGHAM PALACE',
  applicant1Address2: '',
  applicant1AddressCounty: 'CITY OF WESTMINSTER',
  applicant1AddressPostcode: 'SW1A 1AA',
  applicant1AddressTown: 'LONDON',
  applicant1FirstNames: 'Test your name',
  applicant1HelpPayingNeeded: YesOrNo.NO,
  applicant1LastNames: 'Test your last name',
  applicant1PhoneNumber: '',
  applicant2EmailAddress: 'simulate-delivered@notifications.service.gov.uk',
  applicationType: ApplicationType.JOINT_APPLICATION,
  applyForFinancialOrder: YesOrNo.NO,
  applicant1CannotUpload: Checkbox.Checked,
  applicant1CannotUploadDocuments: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
  applicant1UploadedFiles: [],
};
