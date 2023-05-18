import { Checkbox } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  title: 'Statement of truth',
  statement:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth.',
  reviewBeforeSubmit:
    "Once you submit your response to this application, you cannot make any further changes. You can select 'Save as draft' to review all the information you have given before you submit.",
  laIBelieveApplicationIsTrue: 'I believe that the facts stated in this form and any additional documents are true.',
  laNameSot: 'Name of the local authority you represent',
  laStatementOfTruth:
    'I confirm that this statement of truth is signed on behalf of, and with the agreement of, the head of the legal department of the above mentioned local authority.',
  laSotFullName: 'Your full name',
  laSotJobtitle: 'Your job title',
  confirm: 'Confirm',
  errors: {
    laStatementOfTruth: {
      required: 'Confirm your statement of truth',
    },
    laNameSot: {
      required: 'Enter a local authority',
    },
    laSotFullName: {
      required: 'Enter a full name',
    },
    laSotJobtitle: {
      required: 'Enter a job title',
    },
  },
});

const cy: typeof en = () => ({
  title: 'Datganiad Gwirionedd',
  statement:
    "Deallaf y gellir dwyn achos dirmyg llys yn erbyn unrhyw un sy’n gwneud datganiad anwir, neu sy’n achosi i ddatganiad anwir gael ei wneud mewn dogfen a ddilysir gan ddatganiad gwirionedd heb gredu'n onest ei fod yn wir.",
  reviewBeforeSubmit:
    'Unwaith y byddwch yn cyflwyno’ch ymateb i’r cais hwn, ni allwch wneud unrhyw newidiadau pellach. Gallwch ddewis ‘Cadw fel drafft’ i adolygu’r holl wybodaeth rydych wedi’i rhoi cyn ichi ei gyflwyno.',
  laIBelieveApplicationIsTrue:
    'Rwy’n credu bod y ffeithiau a nodir yn y ffurflen hon, ac ar unrhyw ddogfennau ychwanegol, yn wir.',
  laNameSot: "Enw'r awdurdod lleol yr ydych yn ei gynrychioli",
  laStatementOfTruth:
    "Rwy’n cadarnhau bod y datganiad hwn o wirionedd wedi’i lofnodi ar ran, a gyda chytundeb, yr adran gyfreithiol o'r awdurdod lleol y soniwyd amdani uchod.",
  laSotFullName: 'Eich enw llawn',
  laSotJobtitle: 'Teitl eich swydd',
  confirm: 'Cadarnhau',
  errors: {
    laStatementOfTruth: {
      required: 'Cadarnhewch eich datganiad gwirionedd',
    },
    laNameSot: {
      required: 'Nodwch awdurdod lleol',
    },
    laSotFullName: {
      required: 'Nodwch enw llawn',
    },
    laSotJobtitle: {
      required: 'Rhowch deitl swydd',
    },
  },
});

export const form: FormContent = {
  fields: {
    laSotFullName: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.laSotFullName,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    laSotJobtitle: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.laSotJobtitle,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    laNameSot: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.laNameSot,
      labelSize: null,
      validator: isFieldFilledIn,
    },
    laStatementOfTruth: {
      type: 'checkboxes',
      section: l => l.section,
      labelHidden: true,
      values: [
        {
          name: 'laStatementOfTruth',
          label: l => l.laStatementOfTruth,
          value: Checkbox.Checked,
        },
      ],
      validator: isFieldFilledIn,
    },
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
