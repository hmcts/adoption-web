import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { SiblingRelationships, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  label: `Are you sure you want to remove this MOCK_TYPE for child's ${SiblingRelationships.SISTER}?`,
  errors: {
    confirm: {
      required: 'Please select an answer',
    },
  },
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  label: `Are you sure you want to remove this MOCK_TYPE for child's ${SiblingRelationships.SISTER}? (in welsh)`,
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
          siblingRelation: SiblingRelationships.SISTER,
          siblingPoType: 'MOCK_TYPE',
          siblingPoNumber: 'MOCK_NUMBER',
        },
      ],
      selectedSiblingId: 'MOCK_SIBLING_ID',
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
      siblingId: '',
      siblingRelation: undefined,
      siblingPoType: undefined,
      expected: { label: "Are you sure you want to remove this  for child's ?", siblingPoType: undefined },
    },
    {
      siblingId: 'MOCK_SIBLING_ID',
      siblingRelation: SiblingRelationships.SISTER,
      siblingPoType: 'MOCK_TYPE',
      expected: {
        label: `Are you sure you want to remove this MOCK_TYPE for child's ${SiblingRelationships.SISTER}?`,
        siblingPoType: 'MOCK_TYPE',
      },
    },
  ])('should create correct label %#', ({ siblingId, siblingRelation, siblingPoType, expected }) => {
    commonContent.userCase!.siblings![0]!.siblingId = siblingId;
    commonContent.userCase!.siblings![0]!.siblingRelation = siblingRelation;
    commonContent.userCase!.siblings![0]!.siblingPoType = siblingPoType;
    generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toBe(expected.label);
  });

  test('should contain confirm radio field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.confirm as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
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
