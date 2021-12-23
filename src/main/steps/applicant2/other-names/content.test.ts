/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { cy as cyFunction, en as enFunction, generateContent } from './content';

jest.mock('../../../app/form/validation');
const CY = 'cy';
const EN = 'en';
const cyContent = cyFunction();
const enContent = enFunction();

const commonContent = (names: string[]) =>
  ({ language: EN, userCase: { applicant2AdditionalNames: names } } as CommonContent);

const langAssertions = (language, content, generateFn) => {
  const generatedContent = generateFn({ language } as CommonContent);

  Object.entries(content).forEach(([key, value]) => {
    expect(generatedContent[key]).toEqual(value);
  });
};

describe('applicant2 > other-names content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent, generateContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent, generateContent);
  });

  it('should have a yes-no radio button', () => {
    const generatedContent = generateContent(commonContent([]));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const { type, classes, label, hint, labelSize, section, values, validator } =
      fields.applicant2HasOtherNames as FormOptions;

    expect(type).toBe('radios');
    expect(classes).toBe('govuk-radios');
    expect((label as Function)(generateContent(commonContent([])))).toBe(enContent.label);
    expect((hint as Function)(generateContent(commonContent([])))).toBe(enContent.example);
    expect(labelSize).toBe('s');
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
    const applicant2HasOtherNames = fields.applicant2HasOtherNames as FormOptions;
    const yesRadioSubFields = applicant2HasOtherNames.values[0].subFields;
    const applicant2AdditionalNames = yesRadioSubFields?.applicant2AdditionalNames as FormOptions;
    const applicant2AdditionalName = yesRadioSubFields?.applicant2AdditionalName;
    const addButton = yesRadioSubFields?.addButton as FormInput;

    expect(applicant2AdditionalNames.type).toBe('summarylist');
    expect(applicant2AdditionalNames.rows?.rows).toStrictEqual(emptyArray);

    expect(applicant2AdditionalName?.type).toBe('input');
    expect((applicant2AdditionalName?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.applicant2AdditionalName
    );
    expect(applicant2AdditionalName?.labelSize).toBe('s');
    expect(applicant2AdditionalName?.validator).toBe(isFieldFilledIn);

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
    const applicant2HasOtherNames = fields.applicant2HasOtherNames as FormOptions;
    const yesRadioSubFields = applicant2HasOtherNames.values[0].subFields;
    const applicant2AdditionalNames = yesRadioSubFields?.applicant2AdditionalNames as FormOptions;
    const rows = applicant2AdditionalNames?.rows?.rows;
    const addAnotherName = yesRadioSubFields?.addAnotherName as FormInput;
    const applicant2AdditionalName = addAnotherName?.subFields?.applicant2AdditionalName;
    const addButton = addAnotherName?.subFields?.addButton as FormInput;

    expect(applicant2AdditionalNames?.type).toBe('summarylist');
    expect(rows).toHaveLength(2);
    expect(rows?.[0].key.text).toStrictEqual(populatedArray[0]);
    expect(rows?.[1].key.text).toStrictEqual(populatedArray[1]);
    expect(rows?.[0].actions.items[0].href).toStrictEqual(`/applicant2/other-names?remove=${populatedArray[0]}`);
    expect(rows?.[0].actions.items[0].text).toStrictEqual('Remove');
    expect(rows?.[0].actions.items[0].visuallyHiddenText).toStrictEqual(populatedArray[0]);

    expect(addAnotherName.type).toBe('details');
    expect((addAnotherName.label as Function)(generateContent(commonContent([])))).toBe(enContent.another);
    (addAnotherName.validator as Function)();
    expect(doesArrayHaveValues).toHaveBeenCalled();

    expect(applicant2AdditionalName?.type).toBe('input');
    expect((applicant2AdditionalName?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.applicant2AdditionalName
    );
    expect(applicant2AdditionalName?.labelSize).toBe('s');

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generateContent(commonContent([])))).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent([]));
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent([]));
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
