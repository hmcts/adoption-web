import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { SiblingRelationships } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  title: 'What is their relationship to the child being adopted?',
  sister: 'Sister',
  halfSister: 'Half-sister',
  stepSister: 'Step-sister',
  brother: 'Brother',
  halfBrother: 'Half-brother',
  stepBrother: 'Step-brother',
  errors: {
    selectedSiblingRelation: {
      required: 'Select the sibling’s relationship to the child being adopted',
    },
  },
};
const cyContent = {
  section: 'Manylion y brawd/chwaer',
  title: 'Beth yw eu perthynas i’r plentyn sy’n cael ei fabwysiadu?',
  sister: 'Chwaer',
  halfSister: 'Hanner chwaer',
  stepSister: 'Llyschwaer',
  brother: 'Brawd',
  halfBrother: 'Hanner brawd',
  stepBrother: 'Llysfrawd',
  errors: {
    selectedSiblingRelation: {
      required: 'Nodwch berthynas y brawd/chwaer â’r plentyn sy’n cael ei fabwysiadu',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > relation > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
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

  test('should contain siblingRelation field', () => {
    generatedContent = generateContent({
      ...commonContent,
      userCase: {
        siblings: [{ siblingId: 'MOCK_SIBLING_ID', siblingRelation: SiblingRelationships.BROTHER }],
        selectedSiblingId: 'MOCK_SIBLING_ID',
      },
    });
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
    const relationField = fields.selectedSiblingRelation as FormOptions;
    expect(relationField.type).toBe('radios');
    expect(relationField.classes).toBe('govuk-radios');
    expect((relationField.label as Function)(generatedContent)).toBe(enContent.title);
    expect((relationField.values[0].label as Function)(generatedContent)).toBe(enContent.sister);
    expect(relationField.values[0].value).toBe(SiblingRelationships.SISTER);
    expect((relationField.values[1].label as Function)(generatedContent)).toBe(enContent.halfSister);
    expect(relationField.values[1].value).toBe(SiblingRelationships.HALF_SISTER);
    expect((relationField.values[2].label as Function)(generatedContent)).toBe(enContent.stepSister);
    expect(relationField.values[2].value).toBe(SiblingRelationships.STEP_SISTER);
    expect((relationField.values[3].label as Function)(generatedContent)).toBe(enContent.brother);
    expect(relationField.values[3].value).toBe(SiblingRelationships.BROTHER);
    expect((relationField.values[4].label as Function)(generatedContent)).toBe(enContent.halfBrother);
    expect(relationField.values[4].value).toBe(SiblingRelationships.HALF_BROTHER);
    expect((relationField.values[5].label as Function)(generatedContent)).toBe(enContent.stepBrother);
    expect(relationField.values[5].value).toBe(SiblingRelationships.STEP_BROTHER);
    expect(relationField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
