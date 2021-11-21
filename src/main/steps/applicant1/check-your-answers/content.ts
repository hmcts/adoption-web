import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { getAnswerRows } from '../../../app/case/answers/getAnswerRows';
import { Checkbox } from '../../../app/case/case';
import { ApplicationType, ChangedNameHow, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForSoleAndJoint } from '../../../app/jurisdiction/bulletedPointsContent';
import { Sections } from '../../applicant1Sequence';
import { CommonContent } from '../../common/common.content';
import * as urls from '../../urls';

const en = ({ isDivorce, partner, userCase, isJointApplication }: CommonContent) => ({
  titleSoFar: 'Check your answers so far',
  titleSubmit: 'Check your answers',
  sectionTitles: {
    [Sections.AboutPartnership]: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
    [Sections.HelpWithFees]: 'Help with fees',
    [Sections.ConnectionsToEnglandWales]: 'Your connections to England and Wales',
    [Sections.AboutApplication]: `About your ${isDivorce ? 'divorce' : 'civil partnership'}`,
    [Sections.AboutPartners]: `About you and your ${partner}`,
    [Sections.ContactYou]: 'How the court will contact you',
    [Sections.ContactThem]: `How the court will contact your ${partner}`,
    [Sections.OtherCourtCases]: 'Other court cases',
    [Sections.DividingAssets]: 'Dividing your money and property',
    [Sections.Documents]: 'Your documents',
  },
  stepQuestions: {
    [urls.JURISDICTION_INTERSTITIAL_URL]: { connections: 'How you’re connected to England and Wales' },
    [urls.ENTER_YOUR_ADDRESS]: {
      applicant1AddressCountry: 'Your postal address',
    },
    [urls.ENTER_THEIR_ADDRESS]: {
      applicant2AddressCountry: `Your ${partner}’s postal address`,
    },
  },
  stepAnswers: {
    [urls.RELATIONSHIP_DATE_URL]: {
      relationshipDate: userCase?.relationshipDate ? getFormattedDate(userCase.relationshipDate) : false,
    },
    [urls.HELP_PAYING_HAVE_YOU_APPLIED]: {
      applicant1AlreadyAppliedForHelpPaying:
        userCase?.applicant1HelpPayingNeeded === YesOrNo.YES &&
        userCase.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Yes
          ${userCase.applicant1HelpWithFeesRefNo}`
          : false,
    },
    [urls.HOW_DID_YOU_CHANGE_YOUR_NAME]: {
      applicant1NameChangedHow: userCase?.applicant1NameChangedHow
        ?.join(' / ')
        .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
        .replace(ChangedNameHow.MARRIAGE_CERTIFICATE, 'Marriage certificate')
        .replace(ChangedNameHow.OTHER, 'Another way'),
    },
    [urls.JURISDICTION_INTERSTITIAL_URL]: {
      connections: userCase?.connections?.length === 1 ? stepContent => stepContent.line1 : '',
    },
    [urls.ENTER_YOUR_ADDRESS]: {
      applicant1Address1: false,
      applicant1Address2: false,
      applicant1Address3: false,
      applicant1AddressTown: false,
      applicant1AddressCounty: false,
      applicant1AddressPostcode: false,
      applicant1AddressCountry: [
        userCase?.applicant1Address1,
        userCase?.applicant1Address2,
        userCase?.applicant1Address3,
        userCase?.applicant1AddressTown,
        userCase?.applicant1AddressCounty,
        userCase?.applicant1AddressPostcode,
        userCase?.applicant1AddressCountry,
      ]
        .filter(Boolean)
        .join('\n'),
    },
    [urls.ENTER_THEIR_ADDRESS]: {
      applicant2Address1: false,
      applicant2Address2: false,
      applicant2Address3: false,
      applicant2AddressTown: false,
      applicant2AddressCounty: false,
      applicant2AddressPostcode: false,
      applicant2AddressCountry: [
        userCase?.applicant2Address1,
        userCase?.applicant2Address2,
        userCase?.applicant2Address3,
        userCase?.applicant2AddressTown,
        userCase?.applicant2AddressCounty,
        userCase?.applicant2AddressPostcode,
        userCase?.applicant2AddressCountry,
      ]
        .filter(Boolean)
        .join('\n'),
    },
    [urls.UPLOAD_YOUR_DOCUMENTS]: {
      applicant1UploadedFiles: (userCase?.applicant1DocumentsUploaded || []).length
        ? `${userCase?.applicant1DocumentsUploaded?.reduce(
            (acc, curr) => `${acc}${curr.value?.documentFileName}\n`,
            ''
          )}`
        : false,
    },
  },
  stepLinks: {
    [urls.JURISDICTION_INTERSTITIAL_URL]: urls.CHECK_JURISDICTION,
    [urls.APPLY_FINANCIAL_ORDER]: urls.APPLY_FINANCIAL_ORDER,
  },
  stepAnswersWithHTML: {
    [urls.JURISDICTION_INTERSTITIAL_URL]: {
      connections:
        userCase?.connections && userCase.connections?.length > 1
          ? connectionBulletPointsTextForSoleAndJoint(userCase.connections, partner)
          : '',
    },
  },
  continueApplication: 'Continue application',
  confirm: `Confirm before ${userCase?.applicant1HelpWithFeesRefNo ? 'submitting' : 'continuing'}`,
  jointApplicantReview: `Your answers will be sent to your ${partner} to review. Once they have reviewed and provided some of their own information then the application will be ready to submit.`,
  confirmPrayer: 'I confirm that I’m applying to the court to:',
  confirmPrayerHint: `<ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>${isDivorce ? 'dissolve my marriage (get a divorce)' : 'end my civil partnership'}
    ${
      userCase?.applyForFinancialOrder === YesOrNo.YES
        ? '<li>decide how our money and property will be split (known as a financial order)</li>'
        : ''
    }
  </ul>
  <p class="govuk-body govuk-!-margin-bottom-0">This confirms what you are asking the court to do. It’s known as ‘the prayer’.</p>`,
  confirmApplicationIsTrue: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.</p>',
  confirmApplicationIsTrueWarning:
    'Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in its truth.',
  continue: isJointApplication
    ? 'Send for review'
    : userCase?.applicant1HelpWithFeesRefNo
    ? 'Submit application'
    : 'Continue to payment',
  errors: isJointApplication
    ? undefined
    : {
        applicant1IConfirmPrayer: {
          required:
            'You have not confirmed what you are applying to the court to do. You need to confirm before continuing.',
        },
        applicant1IBelieveApplicationIsTrue: {
          required:
            'You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing.',
        },
      },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: userCase =>
    userCase.applicationType === ApplicationType.JOINT_APPLICATION
      ? <FormFields>{}
      : {
          applicant1IConfirmPrayer: {
            type: 'checkboxes',
            label: l => l.confirm,
            labelSize: 'm',
            values: [
              {
                name: 'applicant1IConfirmPrayer',
                label: l => l.confirmPrayer,
                hint: l => l.confirmPrayerHint,
                value: Checkbox.Checked,
                validator: isFieldFilledIn,
              },
            ],
          },
          applicant1IBelieveApplicationIsTrue: {
            type: 'checkboxes',
            labelHidden: true,
            values: [
              {
                name: 'applicant1IBelieveApplicationIsTrue',
                label: l => l.confirmApplicationIsTrue,
                hint: l => l.confirmApplicationIsTrueHint,
                value: Checkbox.Checked,
                validator: isFieldFilledIn,
              },
            ],
          },
        },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    sections: Sections,
    getAnswerRows,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
