import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure, YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "Birth mother's details",
  title: "Is the child's birth mother still alive?",
  moreDetails:
    "Provide more details. For example, 'the birth mother is uncontactable'. Your adoption agency or social worker can help you to complete this section.",
  hint: 'If this person has died, you will need to provide the death certificate.',
  errors: {
    birthMotherStillAlive: {
      required: 'Select whether the birth mother is alive',
    },
    birthMotherNotAliveReason: {
      required: 'Enter more detail',
    },
  },
};

const cyContent = {
  section: 'Manylion y fam enedigol',
  title: 'A yw mam enedigol y plentyn dal yn fyw?',
  moreDetails:
    'Darparwch fwy o fanylion. Er enghraifft, ‘nid oes modd cysylltu â’r fam enedigol’. Gall eich asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol eich helpu i lenwi’r rhan hon. ',
  hint: "Os yw’r unigolyn hwn wedi marw, bydd angen i chi ddarparu'r dystysgrif marwolaeth.",
  yes: 'Ydy',
  no: 'Nac ydy',
  notSure: 'Ddim yn siŵr',
  errors: {
    birthMotherStillAlive: {
      required: 'Nodwch a yw’r fam fiolegol yn fyw.',
    },
    birthMotherNotAliveReason: {
      required: 'Rhowch fwy o fanylion',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('birth-mother > still-alive > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { birthMotherAddressKnown: YesOrNo.YES },
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain birthMotherStillAlive field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.birthMotherStillAlive as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    const hint1 = field.values[1].subFields!.hint1;
    expect(hint1.type).toBe('label');
    expect((hint1.label as Function)(generatedContent)).toBe(enContent.hint);

    expect((field.values[2].label as Function)(commonContent)).toBe(commonContent.notSure);
    expect(field.values[2].value).toBe(YesNoNotsure.NOT_SURE);

    const birthMotherNotAliveReason = field.values[2].subFields!.birthMotherNotAliveReason;
    expect(birthMotherNotAliveReason.type).toBe('text');
    expect((birthMotherNotAliveReason.label as Function)(generatedContent)).toBe(enContent.moreDetails);
    expect(birthMotherNotAliveReason.labelSize).toBe(null);
    expect(birthMotherNotAliveReason.validator).toBe(isFieldFilledIn);

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
