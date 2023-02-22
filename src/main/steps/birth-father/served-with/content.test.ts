import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  section: 'Birth father details',
  title: 'Should the birth father be sent documents or court orders relating to this adoption?',
  hint: 'Provide more details why birth father not to be sent documents or court orders relating to this adoption',
  errors: {
    birthFatherServedWith: {
      required: 'Select if the birth father should be sent documents or court orders.',
    },
    birthFatherNotServedWithReason: {
      required: 'Provide a reason',
    },
  },
};

const cyContent = {
  section: 'Manylion y tad genedigol',
  title: 'A ddylid anfon dogfennau neu orchmynion llys yn ymwneud â’r cais i fabwysiadu hwn at y tad genedigol?',
  hint: 'Rhowch ragor o fanylion pam na ddylid anfon dogfennau neu orchmynion llys sy’n ymwneud â’r cais i fabwysiadu hwn at y tad genedigol.',
  errors: {
    birthFatherServedWith: {
      required: 'Dewiswch a ddylid anfon dogfennau neu orchmynion llys at y tad genedigol.',
    },
    birthFatherNotServedWithReason: {
      required: 'Darparwch reswm',
    },
  },
};

const commonContent = { language: EN } as CommonContent;
let content;
beforeEach(() => {
  content = generateContent(commonContent);
});

/* eslint-disable @typescript-eslint/ban-types */
describe('birth father > served-with > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an birthFatherServedWith text input field', () => {
    const fields = (content.form as FormContent).fields as FormFields;
    const field = fields.birthFatherServedWith as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(content)).toBe(enContent.title);
    expect((field.section as Function)(content)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesOrNo.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesOrNo.NO);
    expect(field.validator).toBe(isFieldFilledIn);

    const field2 = (fields.birthFatherServedWith as FormOptions).values[1].subFields!.birthFatherNotServedWithReason;
    //expect((field2?.label as Function)(generatedContent)).toBe(enContent.moreDetails);
    expect(field2.type).toBe('textarea');
    expect(field2?.labelSize).toBe(null);

    (field2.validator as Function)('MockTextArea');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockTextArea');
    expect(isTextAreaValid).toHaveBeenCalledWith('MockTextArea');

    expect((field2.attributes as HTMLTextAreaElement).rows).toBe(1);
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
