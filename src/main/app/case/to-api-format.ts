import { Case, CaseDate, Checkbox, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData, YesOrNo } from './definition';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

const checkboxConverter = (value: string | undefined) => {
  if (value === null) {
    return null;
  }

  return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
};

const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,
  dateChildMovedIn: data => ({
    dateChildMovedIn: toApiDate(data.dateChildMovedIn),
  }),
  applicant1DateOfBirth: data => ({
    applicant1DateOfBirth: toApiDate(data.applicant1DateOfBirth),
  }),
  birthMotherLastAddressDate: data => ({
    birthMotherLastAddressDate: toApiDate(data.birthMotherLastAddressDate),
  }),
  birthFatherLastAddressDate: data => ({
    birthFatherLastAddressDate: toApiDate(data.birthFatherLastAddressDate),
  }),
  otherParentLastAddressDate: data => ({
    otherParentLastAddressDate: toApiDate(data.otherParentLastAddressDate),
  }),
  applicant2DateOfBirth: data => ({
    applicant2DateOfBirth: toApiDate(data.applicant2DateOfBirth),
  }),
  childrenDateOfBirth: data => ({
    childrenDateOfBirth: toApiDate(data.childrenDateOfBirth),
  }),
  applicant1AdditionalNames: data => ({
    applicant1AdditionalNames:
      data.applicant1HasOtherNames === YesOrNo.YES
        ? (data.applicant1AdditionalNames || []).map(item => ({
            id: item.id!,
            value: { firstNames: `${item.firstNames}`, lastNames: `${item.lastNames}` },
          }))
        : [],
  }),
  applicant2AdditionalNames: data => ({
    applicant2AdditionalNames:
      data.applicant2HasOtherNames === YesOrNo.YES
        ? (data.applicant2AdditionalNames || []).map(item => ({
            id: item.id!,
            value: { firstNames: `${item.firstNames}`, lastNames: `${item.lastNames}` },
          }))
        : [],
  }),
  birthMotherAdditionalNationalities: data => ({
    birthMotherOtherNationalities: (data.birthMotherAdditionalNationalities || []).map(item => ({
      id: item.id!,
      value: { country: `${item.country}` },
    })),
  }),
  birthFatherAdditionalNationalities: data => ({
    birthFatherOtherNationalities: (data.birthFatherAdditionalNationalities || []).map(item => ({
      id: item.id!,
      value: { country: `${item.country}` },
    })),
  }),
  childrenAdditionalNationalities: data => ({
    childrenAdditionalNationalities: (data.childrenAdditionalNationalities || []).map(item => ({
      id: item.id!,
      value: { country: `${item.country}` },
    })),
  }),
  placementOrders: data => ({
    placementOrders: (data.placementOrders || []).map(item => ({
      id: item.placementOrderId,
      value: {
        ...item,
        placementOrderDate: toApiDate(item.placementOrderDate as CaseDate),
      },
    })),
  }),
  siblings: data => ({
    siblings: (data.siblings || []).map(item => ({
      id: item.siblingId,
      value: {
        ...item,
      },
    })),
  }),
  applicant1IBelieveApplicationIsTrue: data => ({
    applicant1StatementOfTruth: checkboxConverter(data.applicant1IBelieveApplicationIsTrue),
  }),
  applicant2IBelieveApplicationIsTrue: data => ({
    applicant2StatementOfTruth: checkboxConverter(data.applicant2IBelieveApplicationIsTrue),
  }),
  applicant1UploadedFiles: () => ({}),
  laUploadedFiles: () => ({}),
  applicant2UploadedFiles: () => ({}),
  applicant1CannotUploadDocuments: data => ({
    applicant1CannotUploadSupportingDocument: data.applicant1CannotUploadDocuments
      ? formatApplicant1CannotUploadDocuments(data)
      : [],
  }),
  laCannotUploadDocuments: data => ({
    laCannotUploadSupportingDocument: data.laCannotUploadDocuments ? formatLaCannotUploadDocuments(data) : [],
  }),
  applicant1CannotUpload: data => {
    return {
      applicant1CannotUpload: checkboxConverter(data.applicant1CannotUpload),
    };
  },
  laCannotUpload: data => {
    return {
      laCannotUpload: checkboxConverter(data.laCannotUpload),
    };
  },
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatApplicant1CannotUploadDocuments = (data: Partial<Case>): any[] => {
  return !Array.isArray(data.applicant1CannotUploadDocuments)
    ? [data.applicant1CannotUploadDocuments]
    : data.applicant1CannotUploadDocuments;
};

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatLaCannotUploadDocuments = (data: Partial<Case>): any[] => {
  return !Array.isArray(data.laCannotUploadDocuments) ? [data.laCannotUploadDocuments] : data.laCannotUploadDocuments;
};

export const toApiDate = (date: CaseDate | undefined): string => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
