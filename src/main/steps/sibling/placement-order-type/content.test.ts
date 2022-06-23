import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { SiblingPOType } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: 'What type of order is it?',
  adoptionOrder: 'Adoption order',
  careOrder: 'Care order',
  contactOrder: 'Contact order',
  freeingOrder: 'Freeing order',
  placementOrder: 'Placement order',
  superVisOrder: 'Supervision order',
  other: 'Other',
  placementOtherType: 'Add a different type of order',
  errors: {
    siblingPoType: {
      required: 'Please select an answer',
    },
    placementOtherType: {
      required: 'Enter an order type',
    },
  },
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  label: 'Pa fath o neuchymyn ydyw?',
  adoptionOrder: 'Adoption order (in welsh)',
  careOrder: 'Care order (in welsh)',
  contactOrder: 'Contact order (in welsh)',
  freeingOrder: 'Freeing order (in welsh)',
  placementOrder: 'Placement order (in welsh)',
  superVisOrder: 'Supervision order (in welsh)',
  other: 'Other (in welsh)',
  placementOtherType: 'Add a different type of order (in welsh)',
  errors: {
    siblingPoType: {
      required: 'Please select an answer (in welsh)',
    },
    placementOtherType: {
      required: 'Enter an order type',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-type > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingPoType: SiblingPOType.ADOPTION_ORDER,
        },
      ],
      selectedSiblingId: 'MOCK_SIBLING_ID',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, generateContent);
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, generateContent);
  });

  test('should contain siblingPoType field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const field = fields.siblingPoType as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.values[0].label as Function)(generatedContent)).toBe(enContent.adoptionOrder);
    expect(field.values[0].value).toBe(SiblingPOType.ADOPTION_ORDER);
    expect((field.values[1].label as Function)(generatedContent)).toBe(enContent.careOrder);
    expect(field.values[1].value).toBe(SiblingPOType.CARE_ORDER);
    expect((field.values[2].label as Function)(generatedContent)).toBe(enContent.contactOrder);
    expect(field.values[2].value).toBe(SiblingPOType.CONTACT_ORDER);
    expect((field.values[3].label as Function)(generatedContent)).toBe(enContent.freeingOrder);
    expect(field.values[3].value).toBe(SiblingPOType.FREEING_ORDER);
    expect((field.values[4].label as Function)(generatedContent)).toBe(enContent.placementOrder);
    expect(field.values[4].value).toBe(SiblingPOType.PLACEMENT_ORDER);
    expect((field.values[5].label as Function)(generatedContent)).toBe(enContent.superVisOrder);
    expect(field.values[5].value).toBe(SiblingPOType.SUPERVIS_ORDER);
    expect((field.values[6].label as Function)(generatedContent)).toBe(enContent.other);
    expect(field.values[6].value).toBe(SiblingPOType.OTHER);
    expect(field.attributes).toEqual({ spellcheck: false });
    expect(field.validator).toBe(isFieldFilledIn);

    const placementOrderOtherType = field.values[6].subFields!.placementOtherType;
    expect(placementOrderOtherType.type).toBe('text');
    expect((placementOrderOtherType.label as Function)(generatedContent)).toBe(enContent.placementOtherType);
    expect(placementOrderOtherType.labelSize).toBe(null);
    expect(placementOrderOtherType.validator).toBe(isFieldFilledIn);
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
