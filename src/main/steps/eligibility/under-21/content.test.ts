import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  title: 'Are you, and the other applicant if relevant, both aged 21 or over?',
  under21Yes: 'You must be 21 or over to adopt a child. This includes any other applicant.',
  moreInfo: 'More about adoption',
  errors: {
    under21Eligible: {
      required: 'Please answer the question',
    },
  },
};

const cyContent = {
  section: 'Gofynion cymhwysedd i wneud cais i fabwysiadu',
  title: 'Ydych chi, a’r ceisydd arall os yw’n berthnasol, yn 21 oed neu’n hŷn?',
  under21Yes: 'Rhaid i chi fod yn 21 oed o leiaf i fabwysiadu plentyn. Mae hyn yn cynnwys unrhyw geisydd arall.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  errors: {
    under21Eligible: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > under-21 > content', () => {
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

  test('should contain under21Eligible field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.under21Eligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    expect((field.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You must be 21 or over to adopt a child. This includes any other applicant.</p> <p class="govuk-label"><a href="https://www.gov.uk/child-adoption" class="govuk-link">More about adoption</a></p>'
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
