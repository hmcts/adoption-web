import languageAssertions from '../../../../test/unit/utils/languageAssertions';
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
    addAnotherPlacementOrder: {
      required: 'Please select an answer',
    },
  },
  placementOrderListItems: [
    {
      key: { text: 'Placement Order', classes: 'font-normal' },
      value: { classes: 'summary-list-value', html: '' },
      actions: {
        classes: 'summary-list-actions',
        items: [
          {
            href: '/children/placement-order-check-your-answers?change=MOCK_ID',
            text: 'Change',
            visuallyHiddenText: 'change',
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
  change: 'Newid',
  remove: 'Dileu',
  label: 'A ydych eisiau ychwanegu gorchymyn arall?',
  hint: 'Mae arnom angen manylion y gorchmynion sydd eisoes mewn lle. Gall eich gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadu eich helpu i ddarparu’r manylion hyn.',
  errors: {
    addAnotherPlacementOrder: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
  },
  placementOrderListItems: [
    {
      key: { text: 'Gorchymyn Lleoli', classes: 'font-normal' },
      value: { classes: 'summary-list-value', html: '' },
      actions: {
        classes: 'summary-list-actions',
        items: [
          {
            href: '/children/placement-order-check-your-answers?change=MOCK_ID',
            text: 'Newid',
            visuallyHiddenText: 'change',
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
