import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { PlacementOrder, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: 'Are you sure you want to remove this order?',
  hint: 'MOCK_FIRST_NAME MOCK_LAST_NAMES',
  errors: {
    confirm: {
      required: 'Please select an answer',
    },
  },
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  label: 'Ydych chi’n siŵr eich bod eisiau dileu’r?',
  hint: 'MOCK_FIRST_NAME MOCK_LAST_NAMES',
  errors: {
    confirm: {
      required: 'Dewiswch ateb os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > remove-placement-order > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingFirstName: 'MOCK_FIRST_NAME',
          siblingLastNames: 'MOCK_LAST_NAMES',
          siblingPlacementOrders: [
            {
              placementOrderId: 'MOCK_PO_ID',
              placementOrderType: 'MOCK_TYPE',
              placementOrderNumber: 'MOCK_NUMBER',
            },
          ],
        },
      ],
      selectedSiblingId: 'MOCK_SIBLING_ID',
      selectedSiblingPoId: 'MOCK_PO_ID',
    },
  } as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generatedContent);
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test.each([
    {
      firstName: undefined,
      lastName: undefined,
      placementOrderType: undefined,
      expected: { label: 'Are you sure you want to remove this order?', placementOrderType: undefined },
    },
    {
      firstName: 'MOCK_FIRST_NAME',
      lastName: 'MOCK_LAST_NAME',
      placementOrderType: 'MOCK_TYPE',
      expected: {
        label: 'Are you sure you want to remove this order?',
        placementOrderType: 'MOCK_TYPE',
      },
    },
  ])('should create correct label when %o', ({ firstName, lastName, placementOrderType, expected }) => {
    commonContent.userCase!.siblings![0]!.siblingFirstName = firstName;
    commonContent.userCase!.siblings![0]!.siblingLastNames = lastName;
    (commonContent.userCase!.siblings![0]!.siblingPlacementOrders![0] as PlacementOrder).placementOrderType =
      placementOrderType;
    generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toBe(expected.label);
  });

  test('should contain confirm radio field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.confirm as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe('Are you sure you want to remove this order?');
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesOrNo.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesOrNo.NO);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });

  test('should contain saveAsDraft button', () => {
    expect(((generatedContent.form as FormContent).saveAsDraft?.text as Function)(commonContent)).toBe(
      commonContent.saveAsDraft
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
