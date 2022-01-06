import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, Checkbox, LanguagePreference, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, ThePrayer, YesOrNo } from './definition';
import { fromApi as formatAddress } from './formatter/address';
import {
  fromApiApplicant1 as uploadedFilesFromApiApplicant1,
  fromApiApplicant2 as uploadedFilesFromApiApplicant2,
} from './formatter/uploaded-files';

dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),
  marriageIsSameSexCouple: data => ({
    sameSex: checkboxConverter(data.marriageIsSameSexCouple),
  }),
  applicant1DateOfBirth: data => ({
    applicant1DateOfBirth: fromApiDate(data.applicant1DateOfBirth),
  }),
  applicant2DateOfBirth: data => ({
    applicant2DateOfBirth: fromApiDate(data.applicant2DateOfBirth),
  }),
  childrenDateOfBirth: data => ({
    childrenDateOfBirth: fromApiDate(data.childrenDateOfBirth),
  }),
  placementOrderDate: data => ({
    placementOrderDate: fromApiDate(data.placementOrderDate),
  }),
  jurisdictionResidualEligible: data => ({
    jurisdictionResidualEligible: checkboxConverter(data.jurisdictionResidualEligible),
  }),
  applicant1LanguagePreferenceWelsh: data => ({
    applicant1EnglishOrWelsh:
      data.applicant1LanguagePreferenceWelsh === YesOrNo.YES ? LanguagePreference.Welsh : LanguagePreference.English,
  }),
  applicant2LanguagePreferenceWelsh: data => ({
    applicant2EnglishOrWelsh:
      data.applicant2LanguagePreferenceWelsh === YesOrNo.YES
        ? LanguagePreference.Welsh
        : data.applicant2LanguagePreferenceWelsh === null
        ? data.applicant2LanguagePreferenceWelsh
        : LanguagePreference.English,
  }),
  //applicant1HomeAddress: data => formatAddress(data, 'applicant1'),
  applicant1AgreedToReceiveEmails: data => ({
    applicant1AgreeToReceiveEmails: checkboxConverter(data.applicant1AgreedToReceiveEmails),
  }),
  applicant2AgreedToReceiveEmails: data => ({
    applicant2AgreeToReceiveEmails: checkboxConverter(data.applicant2AgreedToReceiveEmails),
  }),
  applicant1KnowsApplicant2EmailAddress: data => ({
    applicant1DoesNotKnowApplicant2EmailAddress:
      data.applicant1KnowsApplicant2EmailAddress === YesOrNo.YES ? Checkbox.Unchecked : Checkbox.Checked,
  }),
  applicant1KeepContactDetailsConfidential: data => ({
    applicant1AddressPrivate: data.applicant1KeepContactDetailsConfidential,
  }),
  applicant1WantsToHavePapersServedAnotherWay: data => ({
    iWantToHavePapersServedAnotherWay: checkboxConverter(data.applicant1WantsToHavePapersServedAnotherWay),
  }),
  applicant2KeepContactDetailsConfidential: data => ({
    applicant2AddressPrivate: data.applicant2KeepContactDetailsConfidential,
  }),
  applicant2HomeAddress: data => formatAddress(data, 'applicant2'),
  applicant1DocumentsUploaded: uploadedFilesFromApiApplicant1,
  applicant2DocumentsUploaded: uploadedFilesFromApiApplicant2,
  applicant1CannotUploadSupportingDocument: uploadedFilesFromApiApplicant1,
  applicant2CannotUploadSupportingDocument: uploadedFilesFromApiApplicant2,
  applicant1PrayerHasBeenGivenCheckbox: data => ({
    applicant1IConfirmPrayer: data.applicant1PrayerHasBeenGivenCheckbox?.includes(ThePrayer.I_CONFIRM)
      ? Checkbox.Checked
      : Checkbox.Unchecked,
  }),
  applicant2PrayerHasBeenGiven: data => ({
    applicant2IConfirmPrayer: checkboxConverter(data.applicant2PrayerHasBeenGiven),
  }),
  applicant1StatementOfTruth: data => ({
    applicant1IBelieveApplicationIsTrue: checkboxConverter(data.applicant1StatementOfTruth),
  }),
  applicant2StatementOfTruth: data => ({
    applicant2IBelieveApplicationIsTrue: checkboxConverter(data.applicant2StatementOfTruth),
  }),
  dateSubmitted: data => ({
    dateSubmitted: new Date(data.dateSubmitted as string),
  }),
  dueDate: data => ({
    dueDate: dayjs(data.dueDate).format('D MMMM YYYY'),
  }),
  confirmReadPetition: data => ({
    confirmReadPetition: checkboxConverter(data.confirmReadPetition),
  }),
};

const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
