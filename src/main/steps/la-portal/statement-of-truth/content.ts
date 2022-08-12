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
  title: 'Statement of truth (in welsh)',
  statement:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in its truth. (in welsh)',
  reviewBeforeSubmit:
    "Once you submit your response to this application, you cannot make any further changes. You can select 'Save as draft' to review all the information you have given before you submit. (in welsh)",
  laIBelieveApplicationIsTrue:
    'I believe that the facts stated in this form and any additional documents are true. (in welsh)',
  laNameSot: 'Name of the local authority you represent (in welsh)',
  laStatementOfTruth:
    'I confirm that this statement of truth is signed on behalf of, and with the agreement of, the head of the legal department of the above mentioned local authority. (in welsh)',
  laSotFullName: 'Your full name (in welsh)',
  laSotJobtitle: 'Your job title (in welsh)',
  confirm: 'Confirm (in welsh)',
  errors: {
    laStatementOfTruth: {
      required: 'Confirm your statement of truth (in welsh)',
    },
    laNameSot: {
      required: 'Enter a local authority (in welsh)',
    },
    laSotFullName: {
      required: 'Enter a full name (in welsh)',
    },
    laSotJobtitle: {
      required: 'Enter a job title (in welsh)',
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
