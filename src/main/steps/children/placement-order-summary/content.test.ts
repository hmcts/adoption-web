import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  title: 'Orders already in place',
  placementOrder: 'Placement Order',
  change: 'Change',
  remove: 'Remove',
  label: 'Do you want to add another order?',
  hint: 'We need details of all orders already in place. Your social worker or adoption agency can help provide these details.',
  errors: {
    addAnotherOrder: {
      required: 'Please select an answer',
    },
  },
};

const cyContent = {
  section: "The child's details (in welsh)",
  title: 'Orders already in place (in welsh)',
  placementOrder: 'Placement Order (in welsh)',
  change: 'Change (in welsh)',
  remove: 'Remove (in welsh)',
  label: 'Do you want to add another order? (in welsh)',
  hint: 'We need details of all orders already in place. Your social worker or adoption agency can help provide these details. (in welsh)',
  errors: {
    addAnotherOrder: {
      required: 'Please select an answer (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-summary content', () => {
  const commonContent = { language: 'en', userCase: { addAnotherPlacementOrder: 'Yes' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.placementOrder).toEqual(enContent.placementOrder);
    expect(generatedContent.change).toEqual(enContent.change);
    expect(generatedContent.remove).toEqual(enContent.remove);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.placementOrder).toEqual(cyContent.placementOrder);
    expect(generatedContent.change).toEqual(cyContent.change);
    expect(generatedContent.remove).toEqual(cyContent.remove);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain addAnotherPlacementOrder field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addAnotherPlacementOrderField = fields.addAnotherPlacementOrder as FormOptions;
    expect(addAnotherPlacementOrderField.type).toBe('radios');
    expect(addAnotherPlacementOrderField.classes).toBe('govuk-radios govuk-radios--inline');
    expect((addAnotherPlacementOrderField.label as Function)(generatedContent)).toBe(enContent.label);
    expect(((addAnotherPlacementOrderField as FormInput).hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((addAnotherPlacementOrderField.section as Function)(generatedContent)).toBe(enContent.section);
    expect((addAnotherPlacementOrderField.values[0].label as Function)({ yes: 'Yes' })).toBe('Yes');
    expect((addAnotherPlacementOrderField.values[1].label as Function)({ no: 'No' })).toBe('No');
    expect(addAnotherPlacementOrderField.validator).toBe(isFieldFilledIn);
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
