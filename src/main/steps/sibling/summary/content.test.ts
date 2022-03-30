import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  title: 'Orders already in place for siblings and half-siblings',
  sibling: 'Sibling',
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
  section: 'Manylion y brawd/chwaer',
  title: 'Gorchmynion eisoes mewn lle ar gyfer brodyr/chwiorydd a hanner brodyr/hanner chwiorydd',
  sibling: 'Brawd/chwaer',
  placementOrder: 'Gorchymyn Lleoli',
  change: 'Newid',
  remove: 'Dileu',
  changeName: 'Newid enw',
  label: 'A ydych eisiau ychwanegu gorchymyn arall ar gyfer brawd/chwaer neu hanner frawd/hanner chwaer?',
  hint: 'Er enghraifft, gorchymyn gofal neu neuchymyn goruchwylio. Gall eich gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadau ddarparu’r wybodaeth hon ichi.',
  errors: {
    addAnotherSiblingPlacementOrder: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-summary > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      addAnotherSiblingPlacementOrder: 'Yes',
      siblings: [
        {
          siblingFirstName: 'MOCK_SIBLING_FIRST_NAME',
          siblingLastNames: 'MOCK_SIBLING_LAST_NAME',
          siblingPlacementOrders: [
            {
              placementOrderId: 'MOCK_ID',
              placementOrderNumber: 'MOCK_NUMBER',
            },
          ],
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
