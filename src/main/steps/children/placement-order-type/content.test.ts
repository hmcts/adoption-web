import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { PlacementOrderTypeEnum } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  label: 'What type of order is it?',
  adoptionOrder: 'Previous adoption order',
  careOrder: 'Care order',
  contactOrder: 'Child arrangements order',
  contactOrderHint: 'Child arrangements includes residency, contact, specific issue and prohibited steps.',
  placementOrder: 'Previous placement order',
  supervisionOrder: 'Supervision order',
  other: 'Other',
  otherOrder: 'Add a different type of order',
  errors: {
    selectedPlacementOrderType: {
      required: 'Enter an order type',
    },
    selectedOtherPlacementOrderType: {
      required: 'Enter an order type',
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  label: 'Pa fath o orchymyn ydyw?',
  adoptionOrder: 'Gorchymyn mabwysiadu blaenorol',
  careOrder: 'Gorchymyn Gofal',
  contactOrder: 'Gorchymyn trefniadau plant',
  contactOrderHint: 'Mae trefniadau plant yn cynnwys cyfnod preswyl, cyswllt, mater penodol a chamau gwaharddedig.',
  placementOrder: 'Gorchymyn lleoli blaenorol',
  supervisionOrder: 'Gorchymyn Goruchwylio',
  other: 'Arall',
  otherOrder: 'Ychwanegu math gwahanol o orchymyn',
  errors: {
    selectedPlacementOrderType: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
    selectedOtherPlacementOrderType: {
      required: 'Nac ydwdwch yr hyn sydd wedi’i ysgrifennu ar y dystysgrif geni.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-type > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      placementOrders: [
        { placementOrderId: 'MOCK_PLACEMENT_ORDER_ID', placementOrderType: PlacementOrderTypeEnum.AdoptionOrder },
      ],
      selectedPlacementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain placementOrderType field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.selectedPlacementOrderType as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(generatedContent)).toBe(enContent.careOrder);
    expect(field.values[0].value).toBe(PlacementOrderTypeEnum.CareOrder);
    expect((field.values[1].label as Function)(generatedContent)).toBe(enContent.contactOrder);
    expect(field.values[1].value).toBe(PlacementOrderTypeEnum.ContactOrder);
    expect((field.values[2].label as Function)(generatedContent)).toBe(enContent.adoptionOrder);
    expect(field.values[2].value).toBe(PlacementOrderTypeEnum.AdoptionOrder);
    expect((field.values[3].label as Function)(generatedContent)).toBe(enContent.placementOrder);
    expect(field.values[3].value).toBe(PlacementOrderTypeEnum.PlacementOrder);
    expect((field.values[4].label as Function)(generatedContent)).toBe(enContent.supervisionOrder);
    expect(field.values[4].value).toBe(PlacementOrderTypeEnum.SupervisionOrder);
    const placementOrderOtherTypeField = field.values[5].subFields!.selectedOtherPlacementOrderType;
    expect(placementOrderOtherTypeField.type).toBe('text');
    expect((placementOrderOtherTypeField.label as Function)(generatedContent)).toBe(enContent.otherOrder);
    expect(placementOrderOtherTypeField.labelSize).toBe(null);
    expect(placementOrderOtherTypeField.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent({ ...commonContent, userCase: undefined });
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
