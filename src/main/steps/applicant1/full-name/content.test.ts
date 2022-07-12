import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { form as fullNameForm } from '../../common/components/full-name';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'First applicant',
  title: "What's your full name?",
  line1:
    'Your full name should match exactly what is on your passport or other form of authorised ID such as a driving licence. If the names do not match, this could delay your application.',
  errors: {
    applicant1FirstNames: {
      required: 'Enter your first names',
    },
    applicant1LastNames: {
      required: 'Enter your last names',
    },
  },
};
const cyContent = {
  section: 'Ceisydd cyntaf',
  title: 'Beth yw eich enw llawn?',
  line1:
    'Dylai eich enw llawn fod union yr un fath ag y mae ar eich pasbort neu fath arall o ddogfen adnabod awdurdodedig, er enghraifft trwydded yrru. Os nad ydynt yr un fath, gall arwain at oedi wrth ddelio â’ch cais.',
  errors: {
    applicant1FirstNames: {
      required: 'Nodwch eich enw(au) cyntaf',
    },
    applicant1LastNames: {
      required: 'Nodwch eich cyfenw(au)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant1 > full-name > content', () => {
  const fullNameFormFields = fullNameForm.fields as FormFields;
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain firstNames field', () => {
    const firstNamesField = fields.applicant1FirstNames as FormOptions;
    expect(firstNamesField).toEqual(fullNameFormFields.firstNames);
  });

  test('should contain lastNames field', () => {
    const lastNamesField = fields.applicant1LastNames as FormOptions;
    expect(lastNamesField).toEqual(fullNameFormFields.lastNames);
  });

  it('should have full name label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Applicant');
  });

  it('should have an full name label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Ceisydd');
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
