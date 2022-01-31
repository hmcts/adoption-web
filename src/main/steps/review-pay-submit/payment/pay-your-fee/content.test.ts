import { Fee } from '../../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const enContent = {
  section: 'Review your application, pay and send',
  label: 'Paying your adoption court fees',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£183</span>.
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees.`,
  hintNoFee: `The adoption court fees total <span class="govuk-!-font-weight-bold">£0</span>.
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees.`,
  payingByCard: 'I am paying by card',
  continue: 'Continue',
  errors: {
    paymentType: { errorRetrievingFee: 'Error in retrieving fee', required: 'Select an option' },
    hwfRefNumber: {
      required: 'Enter your reference number',
    },
  },
};

const cyContent = {
  section: 'Review your application, pay and send (in welsh)',
  label: 'Paying your adoption court fees (in welsh)',
  hint: `The adoption court fees total <span class="govuk-!-font-weight-bold">£183</span> (in welsh).
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees. (in welsh)`,
  hintNoFee: `The adoption court fees total <span class="govuk-!-font-weight-bold">£0</span> (in welsh).
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your adoption application fees. (in welsh)`,
  payingByCard: 'I am paying by card (in welsh)',
  continue: 'Continue (in welsh)',
  errors: {
    paymentType: { errorRetrievingFee: 'Error in retrieving fee (in welsh)', required: 'Select an option (in welsh)' },
    hwfRefNumber: {
      required: 'Enter your reference number (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('review-pay-submit > payment > pay-your-fee > content', () => {
  let commonContent = generatePageContent({
    language: 'en',
    fee: { feeAmount: '183' } as unknown as Fee,
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.hint).toEqual(enContent.hint);
    expect(generatedContent.payingByCard).toEqual(enContent.payingByCard);
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.hint).toEqual(cyContent.hint);
    expect(generatedContent.payingByCard).toEqual(cyContent.payingByCard);
    expect(generatedContent.continue).toEqual(cyContent.continue);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain paymentType field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.paymentType as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.label);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect((field.values[0].label as Function)(generatedContent)).toBe(enContent.payingByCard);
    expect(field.values[0].value).toBe('payByCard');
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });

  describe('when there is no fee in session', () => {
    test('should display amount as 0 in hint', () => {
      commonContent = generatePageContent({
        language: 'en',
      }) as CommonContent;
      generatedContent = generateContent(commonContent);
      const fields = (generatedContent.form as FormContent).fields as FormFields;
      const field = fields.paymentType as FormOptions;
      expect((field.hint as Function)(generatedContent)).toBe(enContent.hintNoFee);
    });

    test('should display amount as 0 in hint welsh', () => {
      commonContent = generatePageContent({
        language: 'cy',
      }) as CommonContent;
      generatedContent = generateContent(commonContent);
      const fields = (generatedContent.form as FormContent).fields as FormFields;
      const field = fields.paymentType as FormOptions;
      expect((field.hint as Function)(generatedContent)).toBe(cyContent.hintNoFee);
    });
  });
});
/* eslint-enable @typescript-eslint/ban-types */
