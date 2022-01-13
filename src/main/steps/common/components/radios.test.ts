/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../common.content';
import { languageAssertions } from '../test/languageAssertions';

import { Radios } from './radios';

jest.mock('../../../app/form/validation');

const fieldName = 'birthFatherStillAlive';
const EN = 'en';
const CY = 'cy';

const enContent = {
  section: 'Section',
  title: 'Title',
  yes: 'Yes',
  no: 'No',
  notSure: 'Not sure',
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const cyContent = {
  section: 'Section (in Welsh)',
  title: 'Title (in Welsh)',
  yes: 'Yes (in Welsh)',
  no: 'No (in Welsh)',
  notSure: 'Not sure (in Welsh)',
  continue: 'Save and continue (in Welsh)',
  saveAsDraft: 'Save as draft (in Welsh)',
};

const values = [
  { key: 'yes', value: 'Yes' },
  { key: 'no', value: 'No' },
  { key: 'notSure', value: 'NotSure', input: { fieldName: 'birthFatherUnsureAliveReason' } },
];

const { generateForm, generateContent } = new Radios(enContent, cyContent, fieldName, values);
const generatedContent = generateContent({ language: EN } as CommonContent);

describe('radios class', () => {
  it('should render English content correctly', () => {
    languageAssertions(EN, enContent, generateContent);
  });

  it('should render Welsh content correctly', () => {
    languageAssertions(CY, cyContent, generateContent);
  });

  it('should render the radios field with the correct data', () => {
    const { fields } = generateForm();
    const field = fields[fieldName];
    const fieldInputValue = 'test';
    const [yes, no, unsure] = field.values;

    expect(field.type).toBe('radios');
    expect((yes.label as Function)(generatedContent)).toBe('Yes');
    expect(yes.value).toBe('Yes');
    expect((no.label as Function)(generatedContent)).toBe('No');
    expect(no.value).toBe('No');
    expect((unsure.label as Function)(generatedContent)).toBe('Not sure');
    expect(unsure.value).toBe('NotSure');

    (field.validator as Function)(fieldInputValue);
    expect(isFieldFilledIn).toHaveBeenCalledWith(fieldInputValue);
  });

  it('should contain submit button', () => {
    const { submit } = generateForm();

    expect((submit.text as Function)(generatedContent)).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const { saveAsDraft } = generateForm();

    expect((saveAsDraft?.text as Function)(generatedContent)).toBe('Save as draft');
  });
});
