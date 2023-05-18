import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { SiblingPOType, SiblingRelationships } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Sibling details',
  title: 'Orders already in place for siblings and half-siblings',
  sibling: 'Sibling',
  siblingRelation: {
    [SiblingRelationships.SISTER]: 'Sister',
    [SiblingRelationships.STEP_SISTER]: 'Step-sister',
    [SiblingRelationships.HALF_SISTER]: 'Half-sister',
    [SiblingRelationships.BROTHER]: 'Brother',
    [SiblingRelationships.STEP_BROTHER]: 'Step-brother',
    [SiblingRelationships.HALF_BROTHER]: 'Half-brother',
  },
  placementOrder: 'Placement order',
  siblingPOType: {
    [SiblingPOType.ADOPTION_ORDER]: 'Adoption order',
    [SiblingPOType.CARE_ORDER]: 'Care order',
    [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Child arrangements order',
    [SiblingPOType.PLACEMENT_ORDER]: 'Placement order',
    [SiblingPOType.SUPERVIS_ORDER]: 'Supervision order',
    [SiblingPOType.OTHER]: 'Other',
  },
  incomplete: 'incomplete',
  change: 'Change',
  remove: 'Remove',
  label: 'Do you want to add another order for the same or another sibling?',
  errors: {
    addAnotherSiblingPlacementOrder: {
      required: 'Select whether you want to add another order for the same or another sibling',
    },
  },
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  title: 'Gorchmynion eisoes mewn lle ar gyfer brodyr/chwiorydd a hanner brodyr/hanner chwiorydd',
  sibling: 'Brawd/chwaer',
  siblingRelation: {
    [SiblingRelationships.SISTER]: 'Chwaer',
    [SiblingRelationships.STEP_SISTER]: 'Llyschwaer',
    [SiblingRelationships.HALF_SISTER]: 'Hanner chwaer',
    [SiblingRelationships.BROTHER]: 'Brawd',
    [SiblingRelationships.STEP_BROTHER]: 'Llysfrawd',
    [SiblingRelationships.HALF_BROTHER]: 'Hanner brawd',
  },
  placementOrder: 'Gorchymyn Lleoli',
  siblingPOType: {
    [SiblingPOType.ADOPTION_ORDER]: 'Gorchymyn Mabwysiadu',
    [SiblingPOType.CARE_ORDER]: 'Gorchymyn Gofal',
    [SiblingPOType.CHILD_ARRANGEMENT_ORDER]: 'Gorchymyn trefniadau plant',
    [SiblingPOType.PLACEMENT_ORDER]: 'Gorchymyn Lleoli',
    [SiblingPOType.SUPERVIS_ORDER]: 'Gorchymyn Goruchwylio',
    [SiblingPOType.OTHER]: 'Arall',
  },
  incomplete: 'anghyflawn',
  change: 'Newid',
  remove: 'Dileu',
  label: 'A ydych eisiau ychwanegu gorchymyn arall ar gyfer yr un brawd/chwaer neu frawd/chwaer arall?',
  errors: {
    addAnotherSiblingPlacementOrder: {
      required:
        'Nodwch a oes arnoch eisiau ychwanegu gorchymyn arall ar gyfer yr un brawd/chwaer neu frawd/chwaer arall',
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
          siblingId: 'MOCK_SIBLING_ID',
          siblingRelation: SiblingRelationships.SISTER,
          siblingPoNumber: 'MOCK_NUMBER',
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
