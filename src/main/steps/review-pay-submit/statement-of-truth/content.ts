import { Checkbox } from '../../../app/case/case';
import { ApplyingWith } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
// import { getCaseApi } from '../../../app/case/CaseApi';

const en = content => ({
  section: 'Review your application',
  title: 'Statement of truth',
  statement:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in the truth.',
  reviewBeforeSubmit:
    "Once you submit your application, you cannot make any further changes. You can select 'Save as draft' to review your application before you submit.",
  applicant1IBelieveApplicationIsTrue:
    'I, the first applicant, believe that the facts stated in this form and any additional documents are true.',
  applicant2IBelieveApplicationIsTrue: 'I am authorised by the second applicant to sign this statement.',
  applicant1SotFullName: 'Enter your full name',
  applicant2SotFullName: "Enter the second applicant's full name (if applicable)",
  confirm: content.userCase.canPaymentIgnored ? 'Confirm and submit' : 'Confirm and pay',
  errors: {
    applicant1IBelieveApplicationIsTrue: {
      required: 'Confirm your statement of truth',
    },
    applicant2IBelieveApplicationIsTrue: {
      required: 'Confirm your statement of truth',
    },
    applicant1SotFullName: {
      required: 'Enter your full name',
    },
    applicant2SotFullName: {
      required: "Enter the second applicant's full name",
    },
  },
});

const cy: typeof en = content => ({
  section: 'Adolygu eich cais',
  title: 'Datganiad Gwirionedd',
  statement:
    'Deallaf y gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu’n onest ei fod yn wir.',
  reviewBeforeSubmit:
    'Unwaith y byddwch yn cyflwyno’ch cais, ni allwch wneud unrhyw newidiadau pellach. Gallwch ddewis ‘Cadw fel drafft’ i adolygu eich cais cyn ichi ei gyflwyno.',
  applicant1IBelieveApplicationIsTrue:
    'Rwyf i, y ceisydd cyntaf, yn credu bod y ffeithiau a nodir yn y ffurflen hon ac unrhyw ddogfennau ychwanegol yn wir.',
  applicant2IBelieveApplicationIsTrue: 'Fe’m hawdurdodir gan yr ail geisydd i lofnodi’r datganiad hwn.',
  applicant1SotFullName: 'Nac ydwdwch eich enw llawn',
  applicant2SotFullName: 'Nac ydwdwch enw llawn yr ail geisydd (os yw’n berthnasol)',
  confirm: content.userCase.canPaymentIgnored ? 'Cadarnhau a chyflwyno' : 'Cadarnhau a thalu',
  errors: {
    applicant1IBelieveApplicationIsTrue: {
      required: 'Cadarnhewch eich datganiad gwirionedd',
    },
    applicant2IBelieveApplicationIsTrue: {
      required: 'Cadarnhewch eich datganiad gwirionedd',
    },
    applicant1SotFullName: {
      required: 'Nac ydwdwch enw llawn',
    },
    applicant2SotFullName: {
      required: 'Nac ydwdwch enw llawn',
    },
  },
});

export const form: FormContent = {
  fields: userCase => {
    return {
      ...(userCase.applyingWith === ApplyingWith.ALONE
        ? {
            applicant1IBelieveApplicationIsTrue: {
              type: 'checkboxes',
              labelHidden: true,
              section: l => l.section,
              values: [
                {
                  name: 'applicant1IBelieveApplicationIsTrue',
                  label: l => l.applicant1IBelieveApplicationIsTrue,
                  value: Checkbox.Checked,
                },
              ],
              validator: isFieldFilledIn,
            },
            applicant1SotFullName: {
              type: 'text',
              classes: 'govuk-label govuk-!-width-two-thirds',
              label: l => l.applicant1SotFullName,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          }
        : {
            applicant1IBelieveApplicationIsTrue: {
              type: 'checkboxes',
              section: l => l.section,
              labelHidden: true,
              values: [
                {
                  name: 'applicant1IBelieveApplicationIsTrue',
                  label: l => l.applicant1IBelieveApplicationIsTrue,
                  value: Checkbox.Checked,
                },
              ],
              validator: isFieldFilledIn,
            },
            applicant2IBelieveApplicationIsTrue: {
              type: 'checkboxes',
              section: l => l.section,
              labelHidden: true,
              values: [
                {
                  name: 'applicant2IBelieveApplicationIsTrue',
                  label: l => l.applicant2IBelieveApplicationIsTrue,
                  value: Checkbox.Checked,
                },
              ],
              validator: isFieldFilledIn,
            },
            applicant1SotFullName: {
              type: 'text',
              classes: 'govuk-label govuk-!-width-two-thirds',
              label: l => l.applicant1SotFullName,
              labelSize: null,
              validator: isFieldFilledIn,
            },
            applicant2SotFullName: {
              type: 'text',
              classes: 'govuk-label govuk-!-width-two-thirds',
              label: l => l.applicant2SotFullName,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          }),
    };
  },
  submit: {
    text: l => l.confirm,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
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
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
