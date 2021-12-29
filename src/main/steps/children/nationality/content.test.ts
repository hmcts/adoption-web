/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, notSure } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';
const enContent = {
  section: "The child's details",
  title: 'What is their nationality?',
  label: 'Select all options that are relevant to you.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  childrenNationality: 'Country name',
  add: 'Add',
  another: 'Add another country',
  or: 'or',
  notSure: 'Not Sure',
  errors: {
    childrenNationality: {
      required: "Select a nationality or 'Not sure'",
    },
    addAnotherNationality: {
      required: 'This is not a valid entry',
    },
  },
};
const cyContent = {
  section: "The child's details (in Welsh)",
  title: 'What is their nationality? (in Welsh)',
  label: 'Select all options that are relevant to you. (in Welsh)',
  british: 'British (in Welsh)',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish (in Welsh)',
  irish: 'Irish (in Welsh)',
  differentCountry: 'Citizen of a different country (in Welsh)',
  childrenNationality: 'Country name (in Welsh)',
  add: 'Add (in Welsh)',
  another: 'Add another country (in Welsh)',
  or: 'or (in Welsh)',
  notSure: 'Not Sure (in Welsh)',
  errors: {
    childrenNationality: {
      required: "Select a nationality or 'Not sure' (in Welsh)",
    },
    addAnotherNationality: {
      required: 'This is not a valid entry (in Welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const { section, title, label, british, britishSubtext, irish, differentCountry, countryName, add, another, errors } =
    content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.label).toEqual(label);
  expect(generatedContent.british).toEqual(british);
  expect(generatedContent.britishSubtext).toEqual(britishSubtext);
  expect(generatedContent.irish).toEqual(irish);
  expect(generatedContent.differentCountry).toEqual(differentCountry);
  expect(generatedContent.countryName).toEqual(countryName);
  expect(generatedContent.differentCountry).toEqual(differentCountry);
  expect(generatedContent.add).toEqual(add);
  expect(generatedContent.another).toEqual(another);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = (countries: string[]) =>
  ({ language: EN, userCase: { childrenAdditionalNationalities: countries } } as CommonContent);

describe('nationality content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  it('should display a checkbox with nationality options', () => {
    const generatedContent = generateContent(commonContent([]));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const { type, label, labelSize, values, validator } = fields.childrenNationality as FormOptions;
    expect(type).toBe('checkboxes');
    expect((label as Function)(generatedContent)).toBe(enContent.label);
    expect(labelSize).toBe('s');
    expect(values).toHaveLength(5);
    expect((values[0].label as Function)(generatedContent)).toBe(enContent.british);
    expect(values[0].value).toBe('British');
    expect((values[0].hint as Function)(generatedContent)).toBe(enContent.britishSubtext);
    expect((values[1].label as Function)(generatedContent)).toBe(enContent.irish);
    expect(values[1].value).toBe('Irish');
    expect((values[2].label as Function)(generatedContent)).toBe(enContent.differentCountry);
    expect(values[2].value).toBe('Other');
    expect((values[3].divider as Function)(generatedContent)).toBe(enContent.or);
    expect((values[4].label as Function)(generatedContent)).toBe(enContent.notSure);
    expect(values[4].value).toBe('Not sure');

    (validator as Function)(['British']);
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith(['British']);
    expect(notSure).toHaveBeenCalledWith(['British']);
  });

  it("should display correct content under 'Citizen of a different country' when country array is empty", () => {
    const emptyArray = [];
    const generatedContent = generateContent(commonContent(emptyArray));
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const nationality = fields.childrenNationality as FormOptions;
    const otherCountrySubFields = nationality.values[2].subFields;
    const childrenAdditionalNationalities = otherCountrySubFields?.childrenAdditionalNationalities as FormOptions;
    const addAnotherNationality = otherCountrySubFields?.addAnotherNationality;
    const addButton = otherCountrySubFields?.addButton as FormInput;

    expect(childrenAdditionalNationalities).toBeUndefined();

    expect(addAnotherNationality?.type).toBe('input');
    expect((addAnotherNationality?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.childrenNationality
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
    const nationality = fields.childrenNationality as FormOptions;
    const otherCountrySubFields = nationality.values[2].subFields;
    const childrenAdditionalNationalities = otherCountrySubFields?.childrenAdditionalNationalities as FormOptions;
    const rows = childrenAdditionalNationalities?.rows?.rows;
    const addAnotherNationalityDetails = otherCountrySubFields?.addAnotherNationalityDetails as FormInput;
    const addAnotherNationality = addAnotherNationalityDetails?.subFields?.addAnotherNationality;
    const addButton = addAnotherNationalityDetails?.subFields?.addButton as FormInput;

    expect(childrenAdditionalNationalities?.type).toBe('summarylist');
    expect(rows).toHaveLength(2);
    expect(rows?.[0].key.text).toStrictEqual(populatedArray[0]);
    expect(rows?.[1].key.text).toStrictEqual(populatedArray[1]);
    expect(rows?.[0].actions.items[0].href).toStrictEqual(`/children/nationality?remove=${populatedArray[0]}`);
    expect(rows?.[0].actions.items[0].text).toStrictEqual('Remove');
    expect(rows?.[0].actions.items[0].visuallyHiddenText).toStrictEqual(populatedArray[0]);

    expect(addAnotherNationalityDetails.type).toBe('details');
    expect((addAnotherNationalityDetails.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.another
    );

    expect(addAnotherNationality?.type).toBe('input');
    expect((addAnotherNationality?.label as Function)(generateContent(commonContent([])))).toBe(
      enContent.childrenNationality
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
    const generatedContent = generateContent({ ...commonContent([]), userCase: undefined });
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
