import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  title: 'Orders already in place for siblings and half-siblings',
  placementOrder: 'Placement Order',
  change: 'Change',
  remove: 'Remove',
  changeName: 'Change name',
  label: 'Do you want to add another order for a sibling or half-sibling?',
  hint: 'For example, a care order or supervision order. Your adoption agency or social worker can provide this information for you.',
  errors: {
    addAnotherSiblingPlacementOrder: {
      required: 'Please select an answer',
    },
  },
};

const cyContent = {
  section: 'Sibling details (in Welsh)',
  title: 'Orders already in place for siblings and half-siblings (in welsh)',
  placementOrder: 'Placement Order (in welsh)',
  change: 'Change (in welsh)',
  remove: 'Remove (in welsh)',
  changeName: 'Change name (in welsh)',
  label: 'Do you want to add another order for a sibling or half-sibling? (in welsh)',
  hint: 'For example, a care order or supervision order. Your adoption agency or social worker can provide this information for you. (in welsh)',
  errors: {
    addAnotherSiblingPlacementOrder: {
      required: 'Please select an answer (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-summary content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      addAnotherSiblingPlacementOrder: 'Yes',
      placementOrders: [
        {
          placementOrderId: 'MOCK_ID',
          placementOrderNumber: 'MOCK_NUMBER',
          placementOrderCourt: 'MOCK_COURT',
          placementOrderDate: { day: '12', month: '10', year: '2021' },
        },
      ],
    },
  } as CommonContent;

  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.placementOrder).toEqual(enContent.placementOrder);
    expect(generatedContent.change).toEqual(enContent.change);
    expect(generatedContent.remove).toEqual(enContent.remove);
    expect(generatedContent.changeName).toEqual(enContent.changeName);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.errors).toEqual(enContent.errors);
    expect(generatedContent.placementOrderListItems).toEqual([
      {
        key: { text: 'Placement Order', classes: 'font-normal' },
        value: { html: '' },
        actions: {
          items: [
            {
              href: '#',
              text: 'Change',
              visuallyHiddenText: 'change',
            },
            {
              href: '#',
              text: 'Remove',
              visuallyHiddenText: 'remove',
            },
          ],
        },
      },
    ]);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.placementOrder).toEqual(cyContent.placementOrder);
    expect(generatedContent.change).toEqual(cyContent.change);
    expect(generatedContent.remove).toEqual(cyContent.remove);
    expect(generatedContent.changeName).toEqual(cyContent.changeName);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain addAnotherSiblingPlacementOrder field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addAnotherSiblingPlacementOrder = fields.addAnotherSiblingPlacementOrder as FormOptions;
    expect(addAnotherSiblingPlacementOrder.type).toBe('radios');
    expect(addAnotherSiblingPlacementOrder.classes).toBe('govuk-radios govuk-radios--inline');
    expect((addAnotherSiblingPlacementOrder.label as Function)(generatedContent)).toBe(enContent.label);
    expect(((addAnotherSiblingPlacementOrder as FormInput).hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((addAnotherSiblingPlacementOrder.section as Function)(generatedContent)).toBe(enContent.section);
    expect((addAnotherSiblingPlacementOrder.values[0].label as Function)({ yes: 'Yes' })).toBe('Yes');
    expect((addAnotherSiblingPlacementOrder.values[1].label as Function)({ no: 'No' })).toBe('No');
    expect(addAnotherSiblingPlacementOrder.validator).toBe(isFieldFilledIn);
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
