import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Application details',
  label: 'Are you applying on your own, or with someone else?',
  one: "I'm applying on my own",
  oneHint: 'For example, as a single parent.',
  two: "I'm applying with my spouse or civil partner",
  twoHint: 'For example, as a married couple with joint parenting responsibilities.',
  three: "I'm applying with someone who is not my spouse or civil partner",
  threeHint: 'For example, with a long-term partner but not in a legally binding relationship.',
  moreDetails: 'Give a brief overview of what your relationship is with the other applicant.',
  errors: {
    applyingWith: {
      required: 'Select an option which best describes who is applying',
    },
    otherApplicantRelation: {
      required: 'Provide details of your relationship with the other applicant',
      invalid: 'Overview must be 500 characters or fewer',
    },
  },
};

const cyContent = {
  section: 'Manylion y cais',
  label: 'A ydych yn gwneud cais ar ben eich hun, neu gyda rhywun arall?',
  one: 'Rwy’n gwneud cais ar ben fy hun',
  oneHint: 'Er enghraifft, fel rhiant sengl.',
  two: 'Rwy’n gwneud cais gyda fy mhriod / fy mhartner sifil',
  twoHint: 'Er enghraifft, fel cwpl priod gyda chyfrifoldebau rhiant ar y cyd.',
  three: 'Rwy’n gwneud cais gyda rhywun nad ydynt yn briod neu’n bartner sifil i mi',
  threeHint: 'Er enghraifft, gyda phartner hir dymor ond nid ydym mewn perthynas sy’n rhwymol yn gyfreithiol.',
  moreDetails: 'Rhowch drosolwg bras o beth yw eich perthynas â’r ceisydd arall.',
  errors: {
    applyingWith: {
      required: 'Dewiswch opsiwn sy’n disgrifio neuau pwy sy’n gwneud cais',
    },
    otherApplicantRelation: {
      required: 'Darparwch fanylion am eich perthynas â’r ceisydd arall',
      invalid: 'Rhaid i’r trosolwg fod yn 500 nod neu lai',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant1 > applying-with > content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applyingWith field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingWithField = fields.applyingWith as FormOptions;
    expect(applyingWithField.type).toBe('radios');
    expect(applyingWithField.classes).toBe('govuk-radios');
    expect((applyingWithField.label as Function)(generatedContent)).toBe(enContent.label);
    expect((applyingWithField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((applyingWithField.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect((applyingWithField.values[1].label as Function)(generatedContent)).toBe(enContent.two);
    expect((applyingWithField.values[2].label as Function)(generatedContent)).toBe(enContent.three);
    expect(applyingWithField.validator).toBe(isFieldFilledIn);

    expect((applyingWithField.values[0].hint as Function)(generatedContent)).toBe(enContent.oneHint);
    expect((applyingWithField.values[1].hint as Function)(generatedContent)).toBe(enContent.twoHint);
    expect((applyingWithField.values[2].hint as Function)(generatedContent)).toBe(enContent.threeHint);

    const field2 = applyingWithField.values[2].subFields!.otherApplicantRelation;
    (field2.validator as Function)('MockTextArea');
    expect(isTextAreaValid).toHaveBeenCalledWith('MockTextArea');
    expect((field2.label as Function)(generatedContent)).toBe(enContent.moreDetails);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
