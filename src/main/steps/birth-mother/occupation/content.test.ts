import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  section: "Birth mother's details",
  title: "What is the occupation of the child's birth mother?",
  errors: {
    birthMotherOccupation: {
      required: 'Enter an occupation',
    },
  },
};

const cyContent = {
  section: 'Manylion y fam fiolegol',
  title: 'Beth yw galwedigaeth mam fiolegol y plentyn?',
  errors: {
    birthMotherOccupation: {
      required: 'Nac ydwdwch alwedigaeth',
    },
  },
};

const commonContent = { language: EN } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('birth mother > occupation > content', () => {
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
    const occupationField = fields.birthMotherOccupation;

    expect(occupationField.type).toBe('text');
    expect((occupationField.label as Function)(generateContent(commonContent))).toBe(enContent.title);
    expect(occupationField.labelSize).toBe('l');

    (occupationField.validator as Function)('MockOccupation');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockOccupation');
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
