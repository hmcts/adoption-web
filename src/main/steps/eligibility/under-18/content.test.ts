import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: 'Eligibility to apply to adopt',
  title: 'Will the child be under 18 years old on the date you submit your application?',
  under18No:
    'You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.',
  moreInfo: 'More about adoption',
  errors: {
    under18Eligible: {
      required: 'Select if the child will be under 18 years old on the date you submit your application.',
    },
  },
};

const cyContent = {
  section: 'Gofynion cymhwysedd i wneud cais i fabwysiadu',
  title: 'A fydd y plentyn dan 18 oed ar y dyddiad byddwch yn cyflwyno’ch cais?',
  under18No: 'Gallwch ond mabwysiadu plentyn os ydynt dan 18 oed ar y dyddiad mae eich cais yn cael ei gyflwyno.',
  moreInfo: 'Mwy o wybodaeth am fabwysiadu',
  errors: {
    under18Eligible: {
      required: 'Nodwch a fydd y plentyn o dan 18 oed ar y dyddiad y byddwch yn cyflwyno eich cais.',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('eligibility > under-18 > content', () => {
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

  test('should contain under18Eligible field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.under18Eligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    expect((field.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">You can only apply to adopt a child if they are under 18 years old on the date your application is submitted.</p> <p class="govuk-label"><a href="https://www.gov.uk/child-adoption">More about adoption</a></p>'
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
