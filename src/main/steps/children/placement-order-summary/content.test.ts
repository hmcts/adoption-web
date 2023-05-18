import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  title: 'Orders already in place',
  placementOrder: 'Placement order',
  incomplete: 'incomplete',
  change: 'Change',
  remove: 'Remove',
  label: 'Does the child have any other previous or existing orders?',
  errors: {
    addAnotherPlacementOrder: {
      required: 'Select whether the child has any other previous or existing orders',
    },
  },
  placementOrderListItems: [
    {
      key: { text: 'MOCK_NUMBER Placement order', classes: 'font-normal' },
      value: { classes: 'summary-list-value', html: '' },
      actions: {
        classes: 'summary-list-actions',
        items: [
          {
            href: '/la-portal/child/placement-order-check-your-answers?change=MOCK_ID',
            text: 'Change',
            visuallyHiddenText: 'MOCK_NUMBER Placement order',
          },
        ],
      },
    },
  ],
};

const cyContent = {
  section: 'Manylion y plentyn',
  title: 'Gorchmynion sydd eisoes mewn lle',
  placementOrder: 'Gorchymyn Lleoli',
  incomplete: 'anghyflawn',
  change: 'Newid',
  remove: 'Dileu',
  label: 'A oes gan y plentyn unrhyw orchmynion blaenorol neu bresennol eraill?',
  errors: {
    addAnotherPlacementOrder: {
      required: 'Nodwch a oes gan y plentyn unrhyw orchmynion blaenorol neu bresennol eraill',
    },
  },
  placementOrderListItems: [
    {
      key: { text: 'MOCK_NUMBER Gorchymyn Lleoli', classes: 'font-normal' },
      value: { classes: 'summary-list-value', html: '' },
      actions: {
        classes: 'summary-list-actions',
        items: [
          {
            href: '/la-portal/child/placement-order-check-your-answers?change=MOCK_ID',
            text: 'Newid',
            visuallyHiddenText: 'MOCK_NUMBER Gorchymyn Lleoli',
          },
        ],
      },
    },
  ],
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-summary > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      addAnotherPlacementOrder: 'Yes',
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
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain addAnotherPlacementOrder field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const addAnotherPlacementOrderField = fields.addAnotherPlacementOrder as FormOptions;
    expect(addAnotherPlacementOrderField.type).toBe('radios');
    expect(addAnotherPlacementOrderField.classes).toBe('govuk-radios govuk-radios--inline');
    expect((addAnotherPlacementOrderField.label as Function)(generatedContent)).toBe(enContent.label);
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
