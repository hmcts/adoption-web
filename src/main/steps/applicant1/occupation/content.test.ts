import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'First applicant',
  title: "What's your occupation?",
  hint: 'Enter your full occupation. For example, ‘Secondary school teacher’ rather than just ‘Teacher’. If you’re self employed, say so. For example, ‘Self employed carpenter’.',
  warningText: {
    text: 'This information will appear on the adoption certificate.',
    iconFallbackText: 'Warning',
  },
  details: {
    summaryText: "I'm not working at the moment",
    html: `If you’re unemployed, say what your occupation was when you were working. For example, 'Unemployed administrative assistant'.
  <br>
  <br>
  If you’re retired, say that you’re retired and what your occupation was when you were working. For example, ‘Retired hairdresser’.
  <br>
  <br>
  If you’re a full time parent, enter ‘Full time parent’.`,
  },
  errors: {
    applicant1Occupation: {
      required: 'Enter your occupation',
    },
  },
};
const cyContent = {
  section: 'Ceisydd cyntaf',
  title: 'Beth yw eich galwedigaeth?',
  hint: 'Nodwch eich galwedigaeth yn llawn. Er enghraifft, ‘Athro Ysgol Uwchradd’ yn hytrach na ‘Athro’ yn unig. Os ydych yn hunangyflogedig, dywedwch hynny. Er enghraifft, ‘Saer hunangyflogedig.’',
  warningText: {
    text: 'Bydd yr wybodaeth hon yn ymddangos ar y dystysgrif mabwysiadu.',
    iconFallbackText: 'Rhybudd',
  },
  details: {
    summaryText: 'Nid wyf yn gweithio ar hyn o bryd',
    html: 'Os ydych yn ddi-waith, nodwch beth oedd eich galwedigaeth pan oeddech yn gweithio. Er enghraifft, ‘Cynorthwyydd Gweinyddol Di-waith’.<br><br>Os ydych wedi ymddeol, nodwch beth oedd eich galwedigaeth pan oeddech yn gweithio. Er enghraifft, ‘Triniwr Gwallt Wedi Ymddeol’.<br><br>Os ydych yn riant amser llawn, nodwch ‘Rhiant amser llawn’.',
  },
  errors: {
    applicant1Occupation: {
      required: 'Nodwch eich galwedigaeth',
    },
  },
};

const commonContent = { language: 'en' } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant1 > occupation > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an occupation text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1Occupation = fields.applicant1Occupation;

    expect(applicant1Occupation.type).toBe('text');
    expect((applicant1Occupation.label as Function)(generateContent(commonContent))).toBe(enContent.title);
    expect((applicant1Occupation.hint as Function)(generateContent(commonContent))).toBe(enContent.hint);
    expect(applicant1Occupation.labelSize).toBe('l');

    (applicant1Occupation.validator as Function)('MockOccupation');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockOccupation');
  });

  it('should have an occupation label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    const form1 = generatedContent1.form as FormContent;
    const fields1 = form1.fields as FormFields;
    const applicant1Occupation = fields1.applicant1Occupation;
    expect((applicant1Occupation.label as Function)(generateContent(commonContent1))).toBe(enContent.title);
  });

  it('should have an occupation label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    const form1 = generatedContent1.form as FormContent;
    const fields1 = form1.fields as FormFields;
    const applicant1Occupation = fields1.applicant1Occupation;
    expect((applicant1Occupation.label as Function)(generateContent(commonContent1))).toBe(cyContent.title);
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
