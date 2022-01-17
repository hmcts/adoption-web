/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FieldPrefix } from '../../../app/case/case';
import { OtherName, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../common.content';

import { generateContent } from './other-names';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';
const enContent = {
  label: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  yes: 'Yes',
  no: 'No',
  applicant1OtherFirstNames: 'Add your previous first names',
  applicant1OtherLastNames: 'Add your previous last names',
  add: 'Add',
  another: 'Add another name',
  remove: 'Remove',
  errors: {
    applicant1HasOtherNames: {
      required: 'Please answer the question',
    },
    applicant1OtherFirstNames: {
      required: 'Enter your first names',
    },
    applicant1OtherLastNames: {
      required: 'Enter your last names',
    },
    addAnotherName: {
      required: 'Please answer the question',
    },
  },
};
const cyContent = {
  label: 'Have you ever legally been known by any other names? (in Welsh)',
  example: 'For example, your name before marriage. (in Welsh)',
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  applicant1OtherFirstNames: 'Add your previous first names (in Welsh)',
  applicant1OtherLastNames: 'Add your previous last names (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another name (in Welsh)',
  remove: 'Remove (in Welsh)',
  errors: {
    applicant1HasOtherNames: {
      required: 'Please answer the question (in Welsh)',
    },
    applicant1OtherFirstNames: {
      required: 'Enter your first names (in Welsh)',
    },
    applicant1OtherLastNames: {
      required: 'Enter your last names (in Welsh)',
    },
    addAnotherName: {
      required: 'Please answer the question (in Welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent, FieldPrefix.APPLICANT1);
  const { label, example, yes, no, applicant1OtherFirstNames, applicant1OtherLastNames, add, another, remove, errors } =
    content;

  expect(generatedContent.label).toEqual(label);
  expect(generatedContent.example).toEqual(example);
  expect(generatedContent.yes).toEqual(yes);
  expect(generatedContent.no).toEqual(no);
  expect(generatedContent.applicant1OtherFirstNames).toEqual(applicant1OtherFirstNames);
  expect(generatedContent.applicant1OtherLastNames).toEqual(applicant1OtherLastNames);
  expect(generatedContent.add).toEqual(add);
  expect(generatedContent.another).toEqual(another);
  expect(generatedContent.remove).toEqual(remove);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = (names: OtherName[]) =>
  ({ language: EN, userCase: { applicant1AdditionalNames: names } } as CommonContent);

describe('other names content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  it('should have a yes-no radio button', () => {
    const generatedContent = generateContent(commonContent([]), FieldPrefix.APPLICANT1);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const { type, classes, label, hint, section, values, validator } = fields.applicant1HasOtherNames as FormOptions;

    expect(type).toBe('radios');
    expect(classes).toBe('govuk-radios');
    expect((label as Function)(generatedContent)).toBe(enContent.label);
    expect((hint as Function)(generatedContent)).toBe(enContent.example);
    expect((section as Function)(generatedContent)).toBe(undefined);
    expect(values).toHaveLength(2);
    expect((values[0].label as Function)(generatedContent)).toBe(enContent.yes);
    expect(values[0].value).toBe(YesOrNo.YES);
    expect((values[1].label as Function)(generatedContent)).toBe(enContent.no);
    expect(values[1].value).toBe(YesOrNo.NO);
    expect(validator).toBe(isFieldFilledIn);
  });

  it("should display correct content under the 'yes' radio when names array is empty", () => {
    const emptyArray = [];
    const generatedContent = generateContent(commonContent(emptyArray), FieldPrefix.APPLICANT1);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1HasOtherNames = fields.applicant1HasOtherNames as FormOptions;
    const yesRadioSubFields = applicant1HasOtherNames.values[0].subFields;
    const applicant1AdditionalNames = yesRadioSubFields?.applicant1AdditionalNames as FormOptions;
    const applicant1OtherFirstNames = yesRadioSubFields?.applicant1OtherFirstNames;
    const applicant1OtherLastNames = yesRadioSubFields?.applicant1OtherLastNames;
    const addButton = yesRadioSubFields?.addButton as FormInput;

    expect(applicant1AdditionalNames).toBeUndefined();

    expect(applicant1OtherFirstNames?.type).toBe('input');
    expect(applicant1OtherFirstNames?.classes).toBe('govuk-!-width-two-thirds');
    expect((applicant1OtherFirstNames?.label as Function)(generatedContent)).toBe(enContent.applicant1OtherFirstNames);
    expect(applicant1OtherFirstNames?.labelSize).toBe(null);
    expect(applicant1OtherFirstNames?.validator).toBe(isFieldFilledIn);

    expect(applicant1OtherLastNames?.type).toBe('input');
    expect(applicant1OtherLastNames?.classes).toBe('govuk-!-width-two-thirds');
    expect((applicant1OtherLastNames?.label as Function)(generatedContent)).toBe(enContent.applicant1OtherLastNames);
    expect(applicant1OtherLastNames?.labelSize).toBe(null);
    expect(applicant1OtherLastNames?.validator).toBe(isFieldFilledIn);

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generatedContent)).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it("should display correct content under the 'yes' radio when names array is populated", () => {
    const populatedArray = [
      { id: 'MOCK_ID_1', firstNames: 'firstName1', lastNames: 'lastName1' },
      { id: 'MOCK_ID_2', firstNames: 'firstName2', lastNames: 'lastName2' },
    ];
    const generatedContent = generateContent(commonContent(populatedArray), FieldPrefix.APPLICANT1);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1HasOtherNames = fields.applicant1HasOtherNames as FormOptions;
    const yesRadioSubFields = applicant1HasOtherNames.values[0].subFields;
    const applicant1AdditionalNames = yesRadioSubFields?.applicant1AdditionalNames as FormOptions;
    const rows = applicant1AdditionalNames?.rows?.rows;
    const addAnotherName = yesRadioSubFields?.addAnotherName as FormInput;
    const applicant1OtherFirstNames = addAnotherName?.subFields?.applicant1OtherFirstNames;
    const applicant1OtherLastNames = addAnotherName?.subFields?.applicant1OtherLastNames;
    const addButton = addAnotherName?.subFields?.addButton as FormInput;

    expect(applicant1AdditionalNames?.type).toBe('summarylist');
    expect(rows).toHaveLength(2);
    expect(rows?.[0].key.text).toStrictEqual('firstName1 lastName1');
    expect(rows?.[0].actions.items[0].href).toStrictEqual('/applicant1/other-names?remove=MOCK_ID_1');
    expect(rows?.[0].actions.items[0].text).toStrictEqual('Remove');
    expect(rows?.[0].actions.items[0].visuallyHiddenText).toStrictEqual('firstName1 lastName1');
    expect(rows?.[1].key.text).toStrictEqual('firstName2 lastName2');

    expect(addAnotherName.type).toBe('details');
    expect((addAnotherName.label as Function)(generatedContent)).toBe(enContent.another);
    (addAnotherName.validator as Function)();
    expect(doesArrayHaveValues).toHaveBeenCalled();

    expect(applicant1OtherFirstNames?.type).toBe('input');
    expect(applicant1OtherFirstNames?.classes).toBe('govuk-!-width-two-thirds');
    expect((applicant1OtherFirstNames?.label as Function)(generatedContent)).toBe(enContent.applicant1OtherFirstNames);
    expect(applicant1OtherFirstNames?.labelSize).toBe(null);

    expect(applicant1OtherLastNames?.type).toBe('input');
    expect(applicant1OtherLastNames?.classes).toBe('govuk-!-width-two-thirds');
    expect((applicant1OtherLastNames?.label as Function)(generatedContent)).toBe(enContent.applicant1OtherLastNames);
    expect(applicant1OtherLastNames?.labelSize).toBe(null);

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generatedContent)).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent({ ...commonContent([]), userCase: {} }, FieldPrefix.APPLICANT1);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent([]), FieldPrefix.APPLICANT1);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
