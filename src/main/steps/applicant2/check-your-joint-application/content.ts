import config from 'config';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForSoleAndJoint } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../steps/applicant1/connection-summary/content';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';
import { CommonContent } from '../../common/common.content';
import * as urls from '../../urls';

export const moreDetailsComponent: (text: string, title?: string) => string = (text: string, title?: string) => {
  return `
  <details class="govuk-details summary" data-module="govuk-details">
    <summary class="govuk-details__summary">
      <span class="govuk-details__summary-text">
        ${title || 'Find out more '}
      </span>
    </summary>
    <div class="govuk-details__text">
      ${text}
    </div>
  </details>`;
};

const labels = ({ isDivorce, partner, required, userCase }: CommonContent) => {
  const moreDetailsContent = {
    helpWithFees: `This ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } costs ${config.get(
      'fees.applicationFee'
    )}. You will not be asked to pay the fee. Your ${partner} will be asked to pay. ${
      userCase?.applicant1HelpPayingNeeded === YesOrNo.YES
        ? 'They have said that they need help paying the fee. They can only use help with the fees if you apply too. That is why you were asked whether you needed help paying the fee.'
        : ''
    }`,
    otherCourtCases:
      'The court only needs to know about court proceedings relating to your marriage, property or children. It does not need to know about other court proceedings.',
  };

  return {
    title: `Check your ${partner}'s answers`,
    line1: `This is the information your ${partner} provided for your joint application. Check it to make sure it’s correct.`,
    detailsCorrect: `Is the information your ${partner} provided correct?`,
    detailsCorrectHint: `If you select no then your ${partner} will be notified and asked to change it.`,
    explainWhyIncorrect: `Explain what is incorrect or needs changing. Your answer will be sent to your ${partner}.`,
    continue: 'Continue',
    stepAnswersWithHTML: {
      [urls.HELP_WITH_YOUR_FEE_URL]: {
        applicant1HelpPayingNeeded: moreDetailsComponent(
          moreDetailsContent.helpWithFees,
          'Find out more about help with fees'
        ),
      },
      [urls.JURISDICTION_INTERSTITIAL_URL]: {
        connections:
          (userCase?.connections && userCase.connections?.length > 1
            ? connectionBulletPointsTextForSoleAndJoint(userCase.connections, partner)
            : '') +
          moreDetailsComponent(
            jurisdictionMoreDetailsContent(userCase?.connections).connectedToEnglandWales,
            jurisdictionMoreDetailsContent(userCase?.connections).readMore
          ),
      },
      [urls.OTHER_COURT_CASES]: {
        applicant1LegalProceedings: moreDetailsComponent(
          moreDetailsContent.otherCourtCases,
          'Find out more about other court proceedings'
        ),
      },
    },
    errors: {
      applicant2Confirmation: {
        required,
      },
      applicant2Explanation: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2Confirmation: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.detailsCorrect,
      hint: l => l.detailsCorrectHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            applicant2Explanation: {
              type: 'textarea',
              label: l => l.explainWhyIncorrect,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(content),
    form,
  };
};
