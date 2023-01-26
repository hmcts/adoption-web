import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  title:
    'Is the UK, Channel Islands or Isle of Man the main country of residence (domicile) for you and the other applicant if relevant?',
  domicileNo: 'You cannot apply to adopt a child unless you have a permanent home here.',
  moreInfo: 'More about adoption',
  errors: {
    domicileEligible: {
      required:
        'Select if the UK, Channel Islands or Isle of Man is the main country of residence for you, and the other applicant.',
    },
  },
};

const cyContent = {
  section: 'Gofynion cymhwysedd i wneud cais i fabwysiadu',
  title:
    'Ai’r DU, Ynysoedd y Sianel, neu Ynys Manaw yw’r brif wlad preswylio (domisil) i chi a’r ceisydd arall os yw’n berthnasol?',
  domicileNo: 'Ni allwch wneud cais i fabwysiadu plentyn oni bai bod gennych gartref parhaol yma.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  errors: {
    domicileEligible: {
      required:
        "Nodwch os mai'r DU, Ynysoedd y Sianel neu Ynys Manaw yw'r brif wlad yr ydych chi a'r ymgeisydd arall yn byw ynddi.",
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > domicile > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
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

  test('should contain domicileEligible field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.domicileEligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    expect((field.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You cannot apply to adopt a child unless you have a permanent home here.</p> <p class="govuk-label"><a href="https://www.gov.uk/child-adoption" class="govuk-link">More about adoption</a></p>'
    );
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
