import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, Checkbox, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, YesOrNo } from './definition';
import {
  fromApiApplicant1 as uploadedFilesFromApiApplicant1,
  fromApiApplicant2 as uploadedFilesFromApiApplicant2,
  fromApiLa as uploadedFilesFromApiLa,
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
  applicant1AdditionalNames: data => ({
    applicant1AdditionalNames: data.applicant1AdditionalNames?.map(item => ({ id: item.id, ...item.value })),
  }),
  applicant2AdditionalNames: data => ({
    applicant2AdditionalNames: data.applicant2AdditionalNames?.map(item => ({ id: item.id, ...item.value })),
  }),
  birthMotherOtherNationalities: data => ({
    birthMotherAdditionalNationalities: data.birthMotherOtherNationalities?.map(item => ({
      id: item.id,
      country: item.value.country,
    })),
  }),
  birthFatherOtherNationalities: data => ({
    birthFatherAdditionalNationalities: data.birthFatherOtherNationalities?.map(item => ({
      id: item.id,
      country: item.value.country,
    })),
  }),
  childrenAdditionalNationalities: data => ({
    childrenAdditionalNationalities: data.childrenAdditionalNationalities?.map(item => ({
      id: item.id,
      country: item.value.country,
    })),
  }),
  placementOrders: data => ({
    placementOrders: data.placementOrders?.map(item => ({
      ...item.value,
      placementOrderDate: fromApiDate(item.value.placementOrderDate),
    })),
  }),
  siblings: data => ({
    siblings: data.siblings?.map(sibling => ({
      ...sibling.value,
    })),
  }),
  dateChildMovedIn: data => ({
    dateChildMovedIn: fromApiDate(data.dateChildMovedIn),
  }),
  applicant1DateOfBirth: data => ({
    applicant1DateOfBirth: fromApiDate(data.applicant1DateOfBirth),
  }),
  birthMotherLastAddressDate: data => ({
    birthMotherLastAddressDate: fromApiDate(data.birthMotherLastAddressDate),
  }),
  birthFatherLastAddressDate: data => ({
    birthFatherLastAddressDate: fromApiDate(data.birthFatherLastAddressDate),
  }),
  otherParentLastAddressDate: data => ({
    otherParentLastAddressDate: fromApiDate(data.otherParentLastAddressDate),
  }),
  applicant2DateOfBirth: data => ({
    applicant2DateOfBirth: fromApiDate(data.applicant2DateOfBirth),
  }),
  childrenDateOfBirth: data => ({
    childrenDateOfBirth: fromApiDate(data.childrenDateOfBirth),
  }),
  applicant1StatementOfTruth: data => ({
    applicant1IBelieveApplicationIsTrue: checkboxConverter(data.applicant1StatementOfTruth),
  }),
  applicant2StatementOfTruth: data => ({
    applicant2IBelieveApplicationIsTrue: checkboxConverter(data.applicant2StatementOfTruth),
  }),
  applicant1DocumentsUploaded: uploadedFilesFromApiApplicant1,
  laDocumentsUploaded: uploadedFilesFromApiLa,
  applicant2DocumentsUploaded: uploadedFilesFromApiApplicant2,
  applicant1CannotUploadSupportingDocument: uploadedFilesFromApiApplicant1,
  laCannotUploadSupportingDocument: uploadedFilesFromApiLa,
  applicant2CannotUploadSupportingDocument: uploadedFilesFromApiApplicant2,
  dateSubmitted: data => ({
    dateSubmitted: new Date(data.dateSubmitted as string),
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
