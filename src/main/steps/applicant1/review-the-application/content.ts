import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForRespondent } from '../../../app/jurisdiction/bulletedPointsContent';
import { jurisdictionMoreDetailsContent } from '../../../steps/applicant1/connection-summary/content';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, userCase, partner, userEmail, isApplicant2 }: CommonContent) => ({
  title: `Review the ${isDivorce ? 'divorce application' : 'application to end your civil partnership'}`,
  line1: `Review this application ${
    isDivorce ? 'for divorce' : 'to end your civil partnership'
  } and confirm you have read it.`,
  subHeading1: `Sole ${isDivorce ? 'divorce application' : 'application to end a civil partnership'}`,
  line2: `${userCase?.applicant1FirstNames + ' ' + userCase?.applicant1LastNames} is applying to the court
    <ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>for ${isDivorce ? 'a final order of divorce from' : 'the dissolution of the civil partnership with'}
    ${userCase?.applicant2FirstNames + ' ' + userCase?.applicant2LastNames}</li>
    <li>to make a financial order</li></ul>`,
  line3: `<strong>Issued: </strong>${userCase?.issueDate}`,
  line4: `<strong>Case reference number: </strong>${userCase?.id?.replace(
    /(\\d{4})(\\d{4})(\\d{4})(\\d{4})/,
    '$1-$2-$3-$4'
  )}`,
  line5: '<strong>Applicant</strong>',
  line6: `${
    userCase?.applicant1FirstNames +
    ' ' +
    (userCase?.applicant1MiddleNames ? userCase.applicant1MiddleNames + ' ' : '') +
    userCase?.applicant1LastNames
  }`,
  line7: '<strong>Respondent</strong>',
  line8: `${
    userCase?.applicant2FirstNames +
    ' ' +
    (userCase?.applicant2MiddleNames ? userCase.applicant2MiddleNames + ' ' : '') +
    userCase?.applicant2LastNames
  }`,
  line9: `The applicant is the person who has applied ${
    isDivorce ? 'for the divorce' : 'to end their civil partnership'
  }.
    <br>The respondent is their ${partner}.`,
  subHeading2: `About the ${isDivorce ? 'marriage' : 'civil partnership'}`,
  line10: `These details are copied directly from the ${isDivorce ? 'marriage' : 'civil partnership'} certificate,
     or the translation of the certificate, if it’s not in English. The names on the certificate are the names the
      applicant and respondent used before the ${isDivorce ? 'marriage' : 'civil partnership'}.`,
  line11: `<strong>Who the ${isDivorce ? 'marriage' : 'civil partnership'} is between</strong>`,
  line12: `${userCase?.applicant1FullNameOnCertificate + ' and ' + userCase?.applicant2FullNameOnCertificate}
  (as shown on the ${isDivorce ? 'marriage' : 'civil partnership'} certificate)`,
  line13: `<strong> Where the ${isDivorce ? 'marriage' : 'civil partnership'} took place</strong>`,
  line14: `${userCase?.ceremonyPlace}`,
  line15: `<strong>Date of ${isDivorce ? 'marriage' : 'civil partnership'}</strong>`,
  line16: `${getFormattedDate(userCase?.relationshipDate)}`,
  subHeading3: 'Why the court can deal with the case (jurisdiction)',
  line17: 'The courts of England and Wales have the legal power (jurisdiction) to deal with this case because:',
  connectionBulletPoints: userCase ? connectionBulletPointsTextForRespondent(userCase.connections!) : [],
  jurisdictionsMoreDetails:
    `The courts of England or Wales must have the jurisdiction (the legal power) to be able to ${
      isDivorce ? 'grant a divorce' : 'end a civil partnership'
    }.
      The applicant confirmed that the legal statement(s) in the application apply to either or both the applicant and respondent.
      Each legal statement includes some or all of the following legal connections to England or Wales.` +
    '<br><br>' +
    jurisdictionMoreDetailsContent(userCase?.connections).connectedToEnglandWales,
  whatThisMeans: 'What this means',
  subHeading4: 'Other court cases',
  line18: `The court needs to know about any other court cases relating to the ${
    isDivorce ? 'marriage' : 'civil partnership'
  }, which might affect the legal power (jurisdiction) of the court.`,
  line19: `${
    userCase?.applicant1LegalProceedings === YesOrNo.YES
      ? `The applicant has given details of other court cases relating to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }:` +
        '<br>' +
        userCase.applicant1LegalProceedingsDetails
      : `The applicant has indicated that there are no other court cases which are related to the ${
          isDivorce ? 'marriage' : 'civil partnership'
        }`
  }.`,
  subHeading5: `Reason for  ${isDivorce ? 'the divorce' : 'ending the civil partnership'}`,
  line20: `The ${isDivorce ? 'marriage' : 'relationship'} has broken down irretrievably (it cannot be saved).`,
  subHeading6: 'Financial order application',
  financialOrderYes: 'The applicant intends to apply to the court for financial orders',
  financialOrderNo: 'The applicant is not intending to apply to the court for financial orders.',
  financialOrderMoreDetails: `${isApplicant2 ? `Your ${partner} was asked if they` : 'You were asked if you'}
   want the court to decide how your money, property, pensions and other assets will be split.
   These decisions are called ‘financial orders’. Financial orders can be made between you and your ${partner} and any children that you may have.
   <br><br>A financial order can be made if you agree about dividing money and property, and you want to make the decision legally binding.
   This is known as a ‘financial order by consent’. Or they can be made if you disagree about dividing money and property and want the court to decide.
   This is known as a ‘contested financial order’.
   <br><br>To formally start legal proceedings, ${partner} will need to complete another form and pay a fee.
   Applying for a ‘contested financial order’ costs £255. Applying for a ‘financial order by consent’ costs £50.
   You can get a solicitor to draft these and apply for you.
   <br><br>If you are not sure what to do then you should seek legal advice.`,
  subHeading7: "Applicant's correspondence address",
  applicantAddressCountry: `${
    userCase?.applicant1SolicitorAddress
      ? userCase.applicant1SolicitorAddress
      : [
          userCase?.applicant1Address1,
          userCase?.applicant1Address2,
          userCase?.applicant1Address3,
          userCase?.applicant1AddressTown,
          userCase?.applicant1AddressCounty,
          userCase?.applicant1AddressPostcode,
          userCase?.applicant1AddressCountry,
        ]
          .filter(Boolean)
          .join('<br>')
  }`,
  subHeading8: "Applicant's email address",
  line21: `${userEmail}`,
  subHeading9: "Respondent's correspondence address",
  respondentAddressCountry: `${
    userCase?.applicant2SolicitorAddress
      ? userCase.applicant2SolicitorAddress
      : [
          userCase?.applicant2Address1,
          userCase?.applicant2Address2,
          userCase?.applicant2Address3,
          userCase?.applicant2AddressTown,
          userCase?.applicant2AddressCounty,
          userCase?.applicant2AddressPostcode,
          userCase?.applicant2AddressCountry,
        ]
          .filter(Boolean)
          .join('<br>')
  }`,
  subHeading10: "Respondent's email address",
  line22: `${userCase?.applicant2EmailAddress}`,
  subHeading11: 'Statement of truth',
  line23: 'I believe that the facts stated in this application are true.',
  applicantName: `<em>${
    isApplicant2
      ? userCase?.applicant2FirstNames + ' ' + userCase?.applicant2LastNames
      : userCase?.applicant1FirstNames + ' ' + userCase?.applicant1LastNames
  }</em>`,
  subHeading12: 'Your acknowledgement',
  confirmReadPetition: `I have read the application ${isDivorce ? 'for divorce' : 'to end our civil partnership'}`,
  errors: {
    confirmReadPetition: {
      required:
        'You need to confirm that you have read the application before you continue. You can say whether you want to dispute it later.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    confirmReadPetition: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'confirmReadPetition',
          label: l => l.confirmReadPetition,
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
  const isApplicantAddressNotPrivate = content.userCase?.applicant1AddressPrivate !== YesOrNo.YES;
  const isRespondentAddressNotPrivate = content.userCase?.applicant2AddressPrivate !== YesOrNo.YES;
  const isFinancialOrderYes = content.userCase?.applyForFinancialOrder === YesOrNo.YES;
  return {
    ...translations,
    form,
    isApplicantAddressNotPrivate,
    isRespondentAddressNotPrivate,
    isFinancialOrderYes,
  };
};
