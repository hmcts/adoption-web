/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
const mockForm = {
  form: {
    fields: { applicant1Nationality: { MOCK_KEY: 'MOCK_VALUE' } },
    submit: { MOCK_SUBMIT_BUTTON: 'MOCK_SUBMIT_BUTTON' },
    saveAsDraft: { MOCK_SAVE_AS_DRAFT_BUTTON: 'MOCK_SAVE_AS_DRAFT_BUTTON' },
  },
};
const mockNationalityFields = jest.fn().mockReturnValue(mockForm.form.fields);
jest.mock('../../common/components/nationality', () => {
  return { nationalityFields: mockNationalityFields, generateContent: jest.fn().mockReturnValue(mockForm) };
});

import { FieldPrefix } from '../../../app/case/case';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { nationalityFields } from '../../common/components/nationality';

import { generateContent } from './content';

const enContent = {
  section: 'Primary applicant',
};

const cyContent = {
  section: 'Primary applicant (in Welsh)',
};

describe('nationality content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.url).toEqual('/applicant1/nationality');
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.url).toEqual('/applicant1/nationality');
  });

  test('should contain applicant1Nationality field', () => {
    const nationalityFormFields = nationalityFields({}, FieldPrefix.APPLICANT1) as FormFields;
    const fields = generatedContent.form.fields as FormFields;
    expect(fields.applicant1Nationality).toEqual(nationalityFormFields.applicant1Nationality);
  });

  it('should contain submit button', () => {
    const form = generatedContent.form as FormContent;
    console.log(generatedContent);
    expect(form.submit).toEqual(mockForm.form.submit);
  });

  it('should contain saveAsDraft button', () => {
    const form = generatedContent.form as FormContent;
    expect(form.saveAsDraft).toEqual(mockForm.form.saveAsDraft);
  });
});
