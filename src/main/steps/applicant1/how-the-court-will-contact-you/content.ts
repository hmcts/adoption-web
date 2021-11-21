import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'How the court will contact you',
  line1: `The court needs to send you information, updates and documents relating to ${
    isDivorce ? 'your divorce' : 'ending your civil partnership'
  }.`,
  byEmail: 'By email',
  byEmailLine1: `You have to agree to receive emails to use the online ${
    isDivorce ? 'divorce service' : 'service to end your civil partnership'
  }. Your email address will not be shared with your ${partner}.`,
  byEmailLine2: 'Emails will be sent to:',
  applicantAgreeToReceiveEmails: `I agree that the ${
    isDivorce ? 'divorce service' : 'ending a civil partnership service'
  } can send me notifications and serve (deliver) court documents to me by email.`,
  byPhone: 'By phone',
  byPhoneLine1: `Enter your phone number so court staff can contact you quickly, if they need to. Your phone number will not be shared with your ${partner}.`,
  applicantPhoneNumber: 'Enter your phone number (optional)',
  errors: {
    applicant1AgreeToReceiveEmails: {
      required: 'You have to agree to receive email notifications in order to use this online service.',
    },
    applicant1PhoneNumber: {
      invalid: 'The phone number you have entered is invalid. Enter a valid phone number to continue.',
    },
  },
});

const cy: typeof en = ({ isDivorce, partner }: CommonContent) => ({
  title: 'Sut bydd y llys yn cysylltu â chi',
  line1: `Mae'r llys angen anfon gwybodaeth, diweddariadau a dogfennau atoch yng nghyswllt ${
    isDivorce ? 'eich ysgariad' : 'diweddu eich partneriaeth sifil'
  }.`,
  byEmail: 'Trwy e-bost',
  byEmailLine1: `Rydych wedi cytuno i dderbyn negeseuon e-bost i ddefnyddio'r ${
    isDivorce ? 'gwasanaeth ysgaru ar-lein' : 'gwasanaeth ar-lein i ddiweddu eich partneriaeth sifil'
  }. Ni fydd eich cyfeiriad e-bost yn cael ei rannu gyda'ch ${partner}.`,
  byEmailLine2: 'Anfonir negeseuon e-bost i:',
  applicantAgreeToReceiveEmails: `Rwy'n cytuno y gall y ${
    isDivorce ? 'gwasanaeth ysgaru' : 'gwasanaeth diweddu partneriaeth sifil'
  } anfon hysbysiadau ataf a chyflwyno (danfon) dogfennau llys ataf drwy e-bost.`,
  byPhone: 'Dros y ffôn',
  byPhoneLine1: `Nodwch eich rhif ffôn fel y gall staff y llys gysylltu â chi yn gyflym, os oes angen. Ni fydd eich rhif ffôn yn cael ei rannu gyda'ch ${partner}.`,
  applicantPhoneNumber: 'Nodwch eich rhif ffôn (dewisol)',
  errors: {
    applicant1AgreeToReceiveEmails: {
      required: "Rhaid ichi gytuno i dderbyn hysbysiadau trwy e-bost i ddefnyddio'r gwasanaeth ar-lein hwn.",
    },
    applicant1PhoneNumber: {
      invalid: "Mae'r rhif ffôn rydych wedi'i nodi yn annilys. Nodwch rif ffôn dilys i symud ymlaen.",
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1AgreeToReceiveEmails: {
      type: 'checkboxes',
      label: l => l.byEmail,
      labelSize: 'm',
      hint: l =>
        `<p class="govuk-body">${l.byEmailLine1}</p>
        <p class="govuk-body">${l.byEmailLine2} <strong>${l.userEmail}</strong></p>`,
      validator: isFieldFilledIn,
      values: [
        {
          name: 'applicant1AgreeToReceiveEmails',
          label: l => l.applicantAgreeToReceiveEmails,
          value: Checkbox.Checked,
        },
      ],
    },
    applicant1PhoneNumber: {
      type: 'tel',
      label: l => l.byPhone,
      hint: l =>
        `<p class="govuk-body">${l.byPhoneLine1}</p>
        <label class="govuk-label govuk-!-font-weight-bold" for="applicant1PhoneNumber">${l.applicantPhoneNumber}</label>`,
      classes: 'govuk-input govuk-input--width-20',
      validator: isPhoneNoValid,
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
    form,
  };
};
