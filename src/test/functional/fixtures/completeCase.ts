import { Checkbox } from '../../../main/app/case/case';
import { DocumentType, YesOrNo } from '../../../main/app/case/definition';
import { BrowserCase } from '../../steps/common';

export const completeCase: Partial<BrowserCase> = {
  applicant1Address1: 'BUCKINGHAM PALACE',
  applicant1Address2: '',
  applicant1AddressCounty: 'CITY OF WESTMINSTER',
  applicant1AddressPostcode: 'SW1A 1AA',
  applicant1AddressTown: 'LONDON',
  applicant1FirstNames: 'Test your name',
  applicant1HelpPayingNeeded: YesOrNo.NO,
  applicant1LastNames: 'Test your last name',
  applicant1PhoneNumber: '',
  applicant2Address1: '102 MINISTRY OF JUSTICE, SEVENTH FLOOR, PETTY FRANCE',
  applicant2Address2: '',
  applicant2AddressCounty: 'CITY OF WESTMINSTER',
  applicant2AddressPostcode: 'SW1H 9AJ',
  applicant2AddressTown: 'LONDON',
  applicant2EmailAddress: 'simulate-delivered@notifications.service.gov.uk',
  applicant2FirstNames: 'Test their name',
  applicant2LastNames: 'Test their last name',
  applyForFinancialOrder: YesOrNo.NO,
  applicant1CannotUpload: Checkbox.Checked,
  applicant1CannotUploadDocuments: [DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE],
  applicant1UploadedFiles: [],
};
