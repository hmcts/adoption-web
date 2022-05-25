import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  section: 'Second applicant',
  title: "What's your full name?",
  line1:
    'Your full name should match exactly what is on your passport or other form of authorised ID such as a driving licence. If the names do not match, this could delay your application',
  firstNames: 'First names',
  firstHint: '(Include any given or middle names)',
  lastNames: 'Last names',
  lastHint: '(Include surname or family names)',
  errors: {
    applicant2FirstNames: {
      required: 'Enter your first names',
    },
    applicant2LastNames: {
      required: 'Enter your last names',
    },
  },
};
const cyContent = {
  section: 'Ail geisydd',
  title: 'Beth yw eich enw llawn?',
  line1:
    'Dylai eich enw llawn fod union yr un fath ag y mae ar eich pasbort neu fath arall o ddogfen adnabod awdurdodedig, er enghraifft trwydded yrru. Os nad ydynt yr un fath, gall arwain at oedi wrth ddelio â’ch cais.',
  firstNames: 'Enwau cyntaf',
  firstHint: '(Cofiwch gynnwys unrhyw enwau bedydd neu enwau canol)',
  lastNames: 'Cyfenwau',
  lastHint: '(Cofiwch gynnwys cyfenw neu enwau teuluol)',
  errors: {
    applicant2FirstNames: {
      required: 'Nac ydwdwch eich enw(au) cyntaf',
    },
    applicant2LastNames: {
      required: 'Nac ydwdwch eich cyfenw(au)',
    },
  },
};

const commonContent = { language: EN } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant2 > full-name > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should contain applicant2FirstNames text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const firstNames = fields.applicant2FirstNames;

    expect(firstNames.type).toBe('text');
    expect((firstNames.label as Function)(generateContent(commonContent))).toBe(enContent.firstNames);
    expect((firstNames.hint as Function)(generateContent(commonContent))).toBe(enContent.firstHint);
    expect(firstNames.labelSize).toBe('normal');

    (firstNames.validator as Function)('MockFirstName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockFirstName');
  });

  it('should contain applicant2LastNames text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const lastNames = fields.applicant2LastNames;

    expect(lastNames.type).toBe('text');
    expect((lastNames.label as Function)(generateContent(commonContent))).toBe(enContent.lastNames);
    expect((lastNames.hint as Function)(generateContent(commonContent))).toBe(enContent.lastHint);
    expect(lastNames.labelSize).toBe('normal');

    (lastNames.validator as Function)('MockFirstName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockFirstName');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
