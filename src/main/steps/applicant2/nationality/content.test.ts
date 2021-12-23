/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const CY = 'cy';
const EN = 'en';
const enContent = {
  section: 'Second applicant',
  title: 'What is your nationality?',
  label: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  applicant2Nationality: 'Country name',
  add: 'Add',
  another: 'Add another country',
  errors: {
    applicant2Nationality: {
      required: 'Select if you are British, Irish or a citizen of a different country',
    },
    addAnotherNationality: {
      required: 'This is not a valid entry',
    },
  },
};
const cyContent = {
  section: 'Second applicant (in Welsh)',
  title: 'What is your nationality? (in Welsh)',
  label: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish (in Welsh)',
  irish: 'Irish (in Welsh)',
  differentCountry: 'Citizen of a different country (in Welsh)',
  applicant2Nationality: 'Country name (in Welsh)',
  add: 'Add',
  another: 'Add another country (in Welsh)',
  errors: {
    applicant2Nationality: {
      required: 'Select if you are British, Irish or a citizen of a different country (in Welsh)',
    },
    addAnotherNationality: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
};

const langAssertions = (language, content, generateFn) => {
  const generatedContent = generateFn({ language } as CommonContent);

  Object.entries(content).forEach(([key, value]) => {
    expect(generatedContent[key]).toEqual(value);
  });
};

const commonContent = (countries: string[]) =>
  ({ language: EN, userCase: { applicant2AdditionalNationalities: countries } } as CommonContent);

describe('applicant2 > nationality content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent, generateContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent, generateContent);
  });

  it('should display a checkbox with nationality options', () => {
    const generatedContent = generateContent(commonContent([]));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const { type, label, labelSize, values, validator } = fields.applicant2Nationality as FormOptions;

    expect(type).toBe('checkboxes');
    expect((label as Function)(generateContent(commonContent([])))).toBe(enContent.label);
    expect(labelSize).toBe('s');
    expect(values).toHaveLength(3);
    expect((values[0].label as Function)(generateContent(commonContent([])))).toBe(enContent.british);
    expect(values[0].value).toBe('British');
    expect((values[0].hint as Function)(generateContent(commonContent([])))).toBe(enContent.britishSubtext);
    expect((values[1].label as Function)(generateContent(commonContent([])))).toBe(enContent.irish);
    expect(values[1].value).toBe('Irish');
    expect((values[2].label as Function)(generateContent(commonContent([])))).toBe(enContent.differentCountry);
    expect(values[2].value).toBe('Other');
    expect(validator).toBe(atLeastOneFieldIsChecked);
  });

  it("should display correct content under 'Citizen of a different country' when country array is empty", () => {
    const emptyArray = [];
    const generatedContent = generateContent(commonContent(emptyArray));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const nationality = fields.applicant2Nationality as FormOptions;
    const otherCountrySubFields = nationality.values[2].subFields;
    const applicant2AdditionalNationalities = otherCountrySubFields?.applicant2AdditionalNationalities as FormOptions;
    const addAnotherNationality = otherCountrySubFields?.addAnotherNationality;
    const addButton = otherCountrySubFields?.addButton as FormInput;

    expect(applicant2AdditionalNationalities.type).toBe('summarylist');
    expect(applicant2AdditionalNationalities.rows?.rows).toStrictEqual(emptyArray);

    expect(addAnotherNationality?.type).toBe('input');
    expect((addAnotherNationality?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.applicant2Nationality
    );
    expect(addAnotherNationality?.labelSize).toBe('s');
    expect(addAnotherNationality?.validator).toBe(isFieldFilledIn);

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generateContent(commonContent([])))).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it("should display correct content under 'Citizen of a different country' when country array is populated", () => {
    const populatedArray = ['country1', 'country2'];
    const generatedContent = generateContent(commonContent(populatedArray));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const nationality = fields.applicant2Nationality as FormOptions;
    const otherCountrySubFields = nationality.values[2].subFields;
    const applicant2AdditionalNationalities = otherCountrySubFields?.applicant2AdditionalNationalities as FormOptions;
    const rows = applicant2AdditionalNationalities?.rows?.rows;
    const addAnotherNationalityDetails = otherCountrySubFields?.addAnotherNationalityDetails as FormInput;
    const addAnotherNationality = addAnotherNationalityDetails?.subFields?.addAnotherNationality;
    const addButton = addAnotherNationalityDetails?.subFields?.addButton as FormInput;

    expect(applicant2AdditionalNationalities?.type).toBe('summarylist');
    expect(rows).toHaveLength(2);
    expect(rows?.[0].key.text).toStrictEqual(populatedArray[0]);
    expect(rows?.[1].key.text).toStrictEqual(populatedArray[1]);
    expect(rows?.[0].actions.items[0].href).toStrictEqual(`/applicant2/nationality?remove=${populatedArray[0]}`);
    expect(rows?.[0].actions.items[0].text).toStrictEqual('Remove');
    expect(rows?.[0].actions.items[0].visuallyHiddenText).toStrictEqual(populatedArray[0]);

    expect(addAnotherNationalityDetails.type).toBe('details');
    expect((addAnotherNationalityDetails.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.another
    );

    expect(addAnotherNationality?.type).toBe('input');
    expect((addAnotherNationality?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.applicant2Nationality
    );
    expect(addAnotherNationality?.labelSize).toBe('s');

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
