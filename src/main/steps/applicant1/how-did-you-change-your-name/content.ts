import { ChangedNameHow } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, ValidationCheck } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: 'How did you change your name?',
  line1: 'The court needs to know how you changed your name so it knows which document to check.',
  sendingOffMarriageCertificate: `By sending off my ${isDivorce ? 'marriage' : 'civil partnership'} certificate`,
  deedPoll: 'By deed poll or ‘statutory declaration’',
  deedPollMoreDetails:
    'The court needs to see the deed poll or ‘statutory declaration’ document. You can upload a photo or scan later in this application, or you can post it.',
  anotherWay: 'Another way',
  anotherWayMoreDetails:
    'Provide details of when and how you changed your name. You will be asked to upload a photo or scan of the documents that prove you changed your name later in this application, or you can post them in. If you do not have any documents, explain why here.',
  errors: {
    applicant1NameChangedHow: {
      required,
      applicant1ChangedNameHowAnotherWay:
        'You have said you changed your name another way but not provided details. Provide details of how you changed your name.',
    },
  },
});

const cy: typeof en = ({ isDivorce }) => ({
  title: 'Sut wnaethoch chi newid eich enw?',
  line1: "Mae'r llys angen gwybod sut y gwnaethoch newid eich enw fel ei fod yn gwybod pa ddogfen i'w gwirio.",
  sendingOffMarriageCertificate: `Drwy anfon fy nhystysgrif ${isDivorce ? 'priodas' : 'partneriaeth sifil'}`,
  deedPoll: "Drwy weithred newid enw neu 'ddatganiad statudol'",
  deedPollMoreDetails:
    "Mae'r llys angen gweld y weithred newid enw neu'r ddogfen 'datganiad statudol'. Gallwch uwchlwytho llun neu ei sganio yn nes ymlaen yn y cais hwn, neu gallwch ei phostio.",
  anotherWay: 'Ffordd arall',
  anotherWayMoreDetails:
    "Rhowch fanylion pryd a sut y gwnaethoch newid eich enw. Gofynnir i chi uwchlwytho llun neu sgan o'r dogfennau sy'n profi eich bod wedi newid eich enw yn ddiweddarach yn y cais hwn, neu gallwch eu hanfon drwy'r post. Os nad oes gennych unrhyw ddogfennau, eglurwch pam yma.",
  errors: {
    applicant1NameChangedHow: {
      required: 'Nid ydych wedi ateb y cwestiwn. Mae angen i chi ddewis ateb cyn parhau.',
      applicant1ChangedNameHowAnotherWay:
        'Rydych wedi dweud eich bod wedi newid eich enw mewn ffordd arall ond heb ddarparu manylion. Rhowch fanylion am sut y gwnaethoch newid eich enw.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NameChangedHow: {
      type: 'checkboxes',
      label: l => l.title,
      labelHidden: true,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'applicant1NameChangedHow',
          label: l => l.sendingOffMarriageCertificate,
          value: ChangedNameHow.MARRIAGE_CERTIFICATE,
        },
        {
          name: 'applicant1NameChangedHow',
          label: l => l.deedPoll,
          value: ChangedNameHow.DEED_POLL,
          conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
        },
        {
          name: 'applicant1NameChangedHow',
          label: l => l.anotherWay,
          value: ChangedNameHow.OTHER,
          subFields: {
            applicant1ChangedNameHowAnotherWay: {
              type: 'textarea',
              label: l => l.anotherWayMoreDetails,
              labelSize: null,
            },
          },
          validator: ((value, formData) => {
            if (
              (value as string[])?.includes(ChangedNameHow.OTHER) &&
              !formData.applicant1ChangedNameHowAnotherWay?.length
            ) {
              return 'applicant1ChangedNameHowAnotherWay';
            }
          }) as ValidationCheck,
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
    form,
  };
};
