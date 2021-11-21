import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isInvalidHelpWithFeesRef } from '../../../app/form/validation';
import {
  form as applicant1Form,
  generateContent as applicant1GenerateContent,
} from '../../applicant1/have-you-applied-for-help-with-fees/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ isDivorce, partner, required }: CommonContent) => ({
  title: `Have you already applied for help with your ${isDivorce ? 'divorce' : ''} fee?`,
  line1: '',
  refReceivedWhenApplied: `You received this when you applied for help with your fees. Enter your number, not one provided to your ${partner}.`,
  errors: {
    applicant2AlreadyAppliedForHelpPaying: {
      required,
    },
    applicant2HelpWithFeesRefNo: {
      required:
        'You need to enter your Help With Fees reference number before continuing. You received this when you applied.',
      invalid: 'You have entered an invalid Help With Fees reference number. Check the number and enter it again.',
      invalidUsedExample:
        'You have entered the example Help With Fees number. Enter the number you were sent before continuing.',
    },
  },
});

export const form: FormContent = {
  ...applicant1Form,
  fields: {
    applicant2AlreadyAppliedForHelpPaying: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            applicant2HelpWithFeesRefNo: {
              type: 'text',
              attributes: {
                maxLength: 11,
              },
              classes: 'govuk-!-width-one-third',
              label: l => l.enterRefNo,
              hint: l => `
                <p class="govuk-label">${l.refReceivedWhenApplied}</p>
                ${l.refExample}`,
              validator: isInvalidHelpWithFeesRef,
            },
          },
        },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    },
  },
};

export const generateContent: TranslationFn = content => {
  return {
    ...applicant1GenerateContent(content),
    ...labels(content),
    form,
  };
};
