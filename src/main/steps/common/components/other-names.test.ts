/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FieldPrefix } from '../../../app/case/case';
import { OtherName, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { doesArrayHaveValues, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../common.content';

import { generateContent } from './other-names';

jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  title: 'Have you ever legally been known by any other names?',
  example: 'For example, your name before marriage.',
  previousNameYes: "List each previous name separately and select 'Add'",
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
      addButtonNotClicked: "Select 'Add' to save your previous names",
    },
    applicant1OtherFirstNames: {
      required: 'Enter your previous first names',
    },
    applicant1OtherLastNames: {
      required: 'Enter your previous last names',
    },
    addAnotherName: {
      required: 'Please answer the question',
    },
  },
};
const cyContent = {
  title: 'A ydych erioed wedi’ch adnabod yn gyfreithiol dan unrhyw enwau eraill?',
  example: 'Er enghraifft, eich enw cyn ichi briodi.',
  previousNameYes: 'Rhestrwch bob enw blaenorol ar wahân a dewiswch ‘Ychwanegu’',
  yes: 'Ydw',
  no: 'Nac ydw',
  applicant1OtherFirstNames: 'Ychwanegwch eich enw(au) cyntaf blaenorol',
  applicant1OtherLastNames: 'Ychwanegwch eich cyfenw(au) blaenorol',
  add: 'Ychwanegu',
  another: 'Ychwanegu enw arall',
  remove: 'Dileu',
  errors: {
    applicant1HasOtherNames: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
      addButtonNotClicked: "Dewiswch 'Ychwanegu' i gadw eich enwau blaenorol",
    },
    applicant1OtherFirstNames: {
      required: 'Rhowch eich enwau cyntaf blaenorol',
    },
    applicant1OtherLastNames: {
      required: 'Rhowch eich enwau olaf blaenorol',
    },
    addAnotherName: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};

const commonContent = (names: OtherName[]) =>
  ({ language: EN, userCase: { applicant1AdditionalNames: names } } as CommonContent);

describe('other names content', () => {
  it('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent([]), FieldPrefix.APPLICANT1));
  });

  it('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () =>
      generateContent({ ...commonContent([]), language: 'cy' }, FieldPrefix.APPLICANT1)
    );
  });

  it('should have a yes-no radio button', () => {
    const generatedContent = generateContent(commonContent([]), FieldPrefix.APPLICANT1);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const { type, classes, label, hint, section, values, validator } = fields.applicant1HasOtherNames as FormOptions;

    expect(type).toBe('radios');
    expect(classes).toBe('govuk-radios');
    expect((label as Function)(generatedContent)).toBe(enContent.title);
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
    const previousNameYes = yesRadioSubFields?.previousNameYes as FormOptions;

    expect(applicant1AdditionalNames).toBeUndefined();

    expect(applicant1OtherFirstNames?.type).toBe('text');
    expect(applicant1OtherFirstNames?.classes).toBe('govuk-!-width-two-thirds');
    expect((applicant1OtherFirstNames?.label as Function)(generatedContent)).toBe(enContent.applicant1OtherFirstNames);
    expect(applicant1OtherFirstNames?.labelSize).toBe(null);
    expect(applicant1OtherFirstNames?.validator).toBe(isFieldFilledIn);
    expect(previousNameYes?.type).toBe('label');
    expect((previousNameYes?.label as Function)(generatedContent)).toBe(
      "List each previous name separately and select 'Add'"
    );

    expect(applicant1OtherLastNames?.type).toBe('text');
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
    const previousNameYes = addAnotherName?.subFields?.previousNameYes as FormOptions;

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

    expect(applicant1OtherFirstNames?.type).toBe('text');
    expect(applicant1OtherFirstNames?.classes).toBe('govuk-!-width-two-thirds');
    expect((applicant1OtherFirstNames?.label as Function)(generatedContent)).toBe(enContent.applicant1OtherFirstNames);
    expect(applicant1OtherFirstNames?.labelSize).toBe(null);

    expect(previousNameYes?.type).toBe('label');
    expect((previousNameYes?.label as Function)(generatedContent)).toBe(
      "List each previous name separately and select 'Add'"
    );

    expect(applicant1OtherLastNames?.type).toBe('text');
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
