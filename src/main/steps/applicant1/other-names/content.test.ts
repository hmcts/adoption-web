/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';
const enContent = {
  section: 'Primary applicant',
  label: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  yes: 'Yes',
  no: 'No',
  applicant1AdditionalName: 'Add your previous full name',
  add: 'Add',
  another: 'Add another name',
  remove: 'Remove',
  errors: {
    applicant1HasOtherNames: {
      required: 'Enter a name or choose no',
    },
    applicant1AdditionalName: {
      required: 'Enter a name or choose no',
    },
    addAnotherName: {
      required: 'Enter a name or choose no',
    },
  },
};
const cyContent = {
  section: 'Primary applicant (in Welsh)',
  title: 'Have you ever legally been known by any other names? (in Welsh)',
  example: 'For example, your name before marriage. (in Welsh)',
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  applicant1AdditionalName: 'Add your previous full name (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another name (in Welsh)',
  remove: 'Remove (in Welsh)',
  errors: {
    applicant1HasOtherNames: {
      required: 'Enter a name or choose no (in Welsh)',
    },
    applicant1AdditionalName: {
      required: 'Enter a name or choose no (in Welsh)',
    },
    addAnotherName: {
      required: 'Enter a name or choose no (in Welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const { section, label, example, yes, no, applicant1AdditionalName, add, another, remove, errors } = content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.label).toEqual(label);
  expect(generatedContent.example).toEqual(example);
  expect(generatedContent.yes).toEqual(yes);
  expect(generatedContent.no).toEqual(no);
  expect(generatedContent.applicant1AdditionalName).toEqual(applicant1AdditionalName);
  expect(generatedContent.add).toEqual(add);
  expect(generatedContent.another).toEqual(another);
  expect(generatedContent.remove).toEqual(remove);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = (names: string[]) =>
  ({ language: EN, userCase: { applicant1AdditionalNames: names } } as CommonContent);

describe('other names content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  it('should have a yes-no radio button', () => {
    const generatedContent = generateContent(commonContent([]));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const { type, classes, label, hint, section, values, validator } = fields.applicant1HasOtherNames as FormOptions;

    expect(type).toBe('radios');
    expect(classes).toBe('govuk-radios');
    expect((label as Function)(generateContent(commonContent([])))).toBe(enContent.label);
    expect((hint as Function)(generateContent(commonContent([])))).toBe(enContent.example);
    expect((section as Function)(generateContent(commonContent([])))).toBe(enContent.section);
    expect(values).toHaveLength(2);
    expect((values[0].label as Function)(generateContent(commonContent([])))).toBe(enContent.yes);
    expect(values[0].value).toBe(YesOrNo.YES);
    expect((values[1].label as Function)(generateContent(commonContent([])))).toBe(enContent.no);
    expect(values[1].value).toBe(YesOrNo.NO);
    expect(validator).toBe(isFieldFilledIn);
  });

  it("should display correct content under the 'yes' radio when names array is empty", () => {
    const emptyArray = [];
    const generatedContent = generateContent(commonContent(emptyArray));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1HasOtherNames = fields.applicant1HasOtherNames as FormOptions;
    const yesRadioSubFields = applicant1HasOtherNames.values[0].subFields;
    const applicant1AdditionalNames = yesRadioSubFields?.applicant1AdditionalNames as FormOptions;
    const applicant1AdditionalName = yesRadioSubFields?.applicant1AdditionalName;
    const addButton = yesRadioSubFields?.addButton as FormInput;

    expect(applicant1AdditionalNames).toBeUndefined();

    expect(applicant1AdditionalName?.type).toBe('input');
    expect((applicant1AdditionalName?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.applicant1AdditionalName
    );
    expect(applicant1AdditionalName?.labelSize).toBe(null);
    expect(applicant1AdditionalName?.validator).toBe(isFieldFilledIn);

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generateContent(commonContent([])))).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it("should display correct content under the 'yes' radio when names array is populated", () => {
    const populatedArray = ['name1', 'name2'];
    const generatedContent = generateContent(commonContent(populatedArray));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1HasOtherNames = fields.applicant1HasOtherNames as FormOptions;
    const yesRadioSubFields = applicant1HasOtherNames.values[0].subFields;
    const applicant1AdditionalNames = yesRadioSubFields?.applicant1AdditionalNames as FormOptions;
    const rows = applicant1AdditionalNames?.rows?.rows;
    const addAnotherName = yesRadioSubFields?.addAnotherName as FormInput;
    const applicant1AdditionalName = addAnotherName?.subFields?.applicant1AdditionalName;
    const addButton = addAnotherName?.subFields?.addButton as FormInput;

    expect(applicant1AdditionalNames?.type).toBe('summarylist');
    expect(rows).toHaveLength(2);
    expect(rows?.[0].key.text).toStrictEqual(populatedArray[0]);
    expect(rows?.[1].key.text).toStrictEqual(populatedArray[1]);
    expect(rows?.[0].actions.items[0].href).toStrictEqual(`/applicant1/other-names?remove=${populatedArray[0]}`);
    expect(rows?.[0].actions.items[0].text).toStrictEqual('Remove');
    expect(rows?.[0].actions.items[0].visuallyHiddenText).toStrictEqual(populatedArray[0]);

    expect(addAnotherName.type).toBe('details');
    expect((addAnotherName.label as Function)(generateContent(commonContent([])))).toBe(enContent.another);
    (addAnotherName.validator as Function)();
    expect(doesArrayHaveValues).toHaveBeenCalled();

    expect(applicant1AdditionalName?.type).toBe('input');
    expect((applicant1AdditionalName?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.applicant1AdditionalName
    );
    expect(applicant1AdditionalName?.labelSize).toBe(null);

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generateContent(commonContent([])))).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent({ ...commonContent([]), userCase: undefined });
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent([]));
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
