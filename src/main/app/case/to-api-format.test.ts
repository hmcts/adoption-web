import { Case } from './case';
import { YesOrNo } from './definition';
import { OrNull, toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  const results: OrNull<Partial<Case>> = {
    applicant1HelpPayingNeeded: YesOrNo.YES,
    applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant1HelpWithFeesRefNo: 'HWF-123-ABC',
    applicant1CannotUploadDocuments: [],
    applicant2CannotUploadDocuments: [],
  };

  test('Should convert results from nfdiv to api fe format', async () => {
    const apiFormat = toApiFormat(results as Partial<Case>);

    expect(apiFormat).toStrictEqual({
      applicant1HWFNeedHelp: YesOrNo.YES,
      applicant1HWFAppliedForFees: YesOrNo.YES,
      applicant1HWFReferenceNumber: 'HWF-123-ABC',
      applicant1CannotUploadSupportingDocument: [],
      applicant2CannotUploadSupportingDocument: [],
    });
  });

  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      applicant1HelpWithFeesRefNo: '123-ABC',
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1HWFReferenceNumber: '',
    });
  });

  test.each([
    {
      applicant1HelpPayingNeeded: YesOrNo.YES,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.YES,
      },
    },
    {
      applicant1HelpPayingNeeded: YesOrNo.NO,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.NO,
        applicant1HWFAppliedForFees: null,
        applicant1HWFReferenceNumber: null,
      },
    },
  ])('set unreachable answers to null if condition met', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });
});
