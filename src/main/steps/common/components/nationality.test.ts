/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FieldPrefix } from '../../../app/case/case';
import { AdditionalNationality } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../common.content';

import { generateContent } from './nationality';

jest.mock('../../../app/form/validation');

const EN = 'en';
const fieldPrefix = FieldPrefix.BIRTH_MOTHER;
const enContent = {
  title: 'What is their nationality?',
  hint: 'Select all options that are relevant.',
  british: 'British',
  britishSubtext: 'including English, Scottish, Welsh and Northern Irish',
  irish: 'Irish',
  differentCountry: 'Citizen of a different country',
  countryName: 'Country name',
  add: 'Add',
  another: 'Add another country',
  or: 'or',
  notSure: 'Not sure',
  errors: {
    [`${fieldPrefix}Nationality`]: {
      required: 'Select if you are British, Irish or a citizen of a different country',
      notSureViolation: "Select a nationality or 'Not sure'",
    },
    addAnotherNationality: {
      required: 'Enter a country name',
    },
  },
};

const cyContent = {
  title: 'Beth yw eu cenedligrwydd?',
  hint: 'Dewiswch bob opsiwn sy’n berthnasol i chi.',
  british: 'Prydeinig',
  britishSubtext: 'gan gynnwys Saesneg, Albanaidd, Cymraeg a Gwyddelig Gogledd Iwerddon',
  irish: 'Gwyddelig',
  differentCountry: 'Dinesydd gwlad wahanol',
  countryName: 'Enw’r wlad',
  add: 'Ychwanegu',
  another: 'Ychwanegu gwlad arall',
  or: 'neu',
  notSure: 'Ddim yn siŵr',
  errors: {
    [`${fieldPrefix}Nationality`]: {
      required: 'Dewiswch a ydych yn Brydeinig, Gwyddelig neu’n ddinesydd gwlad wahanol',
      notSureViolation: 'Dewiswch genedligrwydd neu ‘Ddim yn siŵr’',
    },
    addAnotherNationality: {
      required: 'Nid yw hyn yn gofnod dilys',
    },
  },
};

const commonContent = (countries: AdditionalNationality[]) =>
  ({ language: EN, userCase: { birthMotherAdditionalNationalities: countries } } as CommonContent);

describe('nationality content', () => {
  it('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent([]), FieldPrefix.BIRTH_MOTHER));
  });

  it('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () =>
      generateContent({ ...commonContent([]), language: 'cy' }, FieldPrefix.BIRTH_MOTHER)
    );
  });

  it('should display a checkbox with nationality options', () => {
    const generatedContent = generateContent(commonContent([]), fieldPrefix);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;

    const { type, label, labelSize, hint, values, validator } = fields.birthMotherNationality as FormOptions;

    expect(type).toBe('checkboxes');
    expect((label as Function)(generatedContent)).toBe(enContent.title);
    expect(labelSize).toBe('l');
    expect((hint as Function)(generatedContent)).toBe(enContent.hint);
    expect(values).toHaveLength(5);
    expect((values[0].label as Function)(generatedContent)).toBe(enContent.british);
    expect(values[0].value).toBe('British');
    expect((values[0].hint as Function)(generatedContent)).toBe(enContent.britishSubtext);
    expect((values[1].label as Function)(generatedContent)).toBe(enContent.irish);
    expect(values[1].value).toBe('Irish');
    expect((values[2].label as Function)(generatedContent)).toBe(enContent.differentCountry);
    expect(values[2].value).toBe('Other');

    validator!(['British'], {});
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith(['British']);
  });

  describe('when fieldPrefix is other than BIRTH_MOTHER or BIRTH_FATHER', () => {
    it('should display a checkbox with nationality options', () => {
      const generatedContent = generateContent(commonContent([]), FieldPrefix.CHILDREN);
      const form = generatedContent.form as FormContent;
      const fields = form.fields as FormFields;

      const { type, label, labelSize, hint, values, validator } = fields.childrenNationality as FormOptions;

      expect(type).toBe('checkboxes');
      expect((label as Function)(generatedContent)).toBe(enContent.title);
      expect(labelSize).toBe('l');
      expect((hint as Function)(generatedContent)).toBe(enContent.hint);
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

      validator!(['British'], {});
      expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith(['British']);
    });
  });

  it("should display correct content under 'Citizen of a different country' when country array is empty", () => {
    const emptyArray = [];
    const generatedContent = generateContent(commonContent(emptyArray), fieldPrefix);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const nationality = fields.birthMotherNationality as FormOptions;
    const otherCountrySubFields = nationality.values[2].subFields;
    const birthMotherAdditionalNationalities = otherCountrySubFields?.birthMotherAdditionalNationalities as FormOptions;
    const addAnotherNationality = otherCountrySubFields?.addAnotherNationality;
    const addButton = otherCountrySubFields?.addButton as FormInput;

    expect(birthMotherAdditionalNationalities).toBeUndefined();

    expect(addAnotherNationality?.type).toBe('text');
    expect((addAnotherNationality?.label as Function)(generatedContent)).toBe(enContent.countryName);
    expect(addAnotherNationality?.labelSize).toBe(null);
    expect(addAnotherNationality?.validator).toBe(isFieldFilledIn);

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generatedContent)).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it("should display correct content under 'Citizen of a different country' when country array is populated", () => {
    const populatedArray = [
      { id: 'mock_id1', country: 'country1' },
      { id: 'mock_id2', country: 'country2' },
    ];
    const generatedContent = generateContent(commonContent(populatedArray), fieldPrefix);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const nationality = fields.birthMotherNationality as FormOptions;
    const otherCountrySubFields = nationality.values[2].subFields;
    const birthMotherAdditionalNationalities = otherCountrySubFields?.birthMotherAdditionalNationalities as FormOptions;
    const rows = birthMotherAdditionalNationalities?.rows?.rows;
    const addAnotherNationalityDetails = otherCountrySubFields?.addAnotherNationalityDetails as FormInput;
    const addAnotherNationality = addAnotherNationalityDetails?.subFields?.addAnotherNationality;
    const addButton = addAnotherNationalityDetails?.subFields?.addButton as FormInput;

    expect(birthMotherAdditionalNationalities?.type).toBe('summarylist');
    expect(rows).toHaveLength(2);
    expect(rows?.[0].key.text).toStrictEqual(populatedArray[0].country);
    expect(rows?.[1].key.text).toStrictEqual(populatedArray[1].country);
    expect(rows?.[0].actions.items[0].href).toStrictEqual(
      `/la-portal/birth-mother/nationality?remove=${populatedArray[0].id}`
    );
    expect(rows?.[0].actions.items[0].text).toStrictEqual('Remove');
    expect(rows?.[0].actions.items[0].visuallyHiddenText).toStrictEqual(populatedArray[0].country);

    expect(addAnotherNationalityDetails.type).toBe('details');
    expect((addAnotherNationalityDetails.label as Function)(generatedContent)).toBe(enContent.another);

    expect(addAnotherNationality?.type).toBe('text');
    expect((addAnotherNationality?.label as Function)(generatedContent)).toBe(enContent.countryName);
    expect(addAnotherNationality?.labelSize).toBe(null);

    expect(addButton?.type).toBe('button');
    expect((addButton?.label as Function)(generatedContent)).toBe(enContent.add);
    expect(addButton?.classes).toBe('govuk-button--secondary');
    expect(addButton?.value).toBe('addButton');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent([]), fieldPrefix);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent({ ...commonContent([]), userCase: {} }, fieldPrefix);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
