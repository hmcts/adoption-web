import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form'; //FormFieldsFn
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const en = content => ({
  title: 'Extra support during your case',
  hint: 'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  details: {
    summaryText: 'What support is available?',
    html: `Reasonable adjustments can include:</p>
              <ul class="govuk-list govuk-list--bullet">
                <li>documents in alternative formats, colours and fonts </li>
                <li>help with communicating, sight, hearing, speaking and interpretation </li>
                <li>access and mobility support if a hearing takes place in person </li>
              </ul>`,
  },
  question1:
    'Do you have a physical, mental or learning disability or long term health condition that means you need support during your case?',
  yes: 'Yes',
  textAreaHint: 'You can describe to us what you need',
  adjustmentDetailTextLabel: 'Tell us what support you need to request',
  no: 'No - I do not need any extra support at this time',
  errors: {
    applicant2HasReasonableAdjustment: {
      required: 'Select no if you do not need any extra support',
    },
    applicant2ReasonableAdjustmentDetails: {
      required: 'Give details of the support you need',
    },
  },
});

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const cy: typeof en = content => ({
  title: 'Cymorth ychwanegol yn ystod eich achos',
  hint: 'Gwyddwn fod rhai pobl angen cymorth i gael mynediad at wybodaeth ac i ddefnyddio ein gwasanaethau. Gelwir hyn yn aml yn addasiad rhesymol. Rhaid i rai addasiadau rhesymol gael eu cytuno arnynt gan farnwr neu GLlTEF. Gallwch drafod gyda’r llys os bydd eich anghenion yn newid.',
  details: {
    summaryText: 'Pa gymorth sydd ar gael?',
    html: `Gall addasiadau rhesymol gynnwys:</p>
                <ul class="govuk-list govuk-list--bullet">
                  <li>dogfennau mewn fformatau, lliwiau a ffontiau eraill </li>
                  <li>help i gyfathrebu, gweld, gwrando, siarad neu gymorth gan gyfieithydd/dehonglydd </li>
                  <li>cymorth gyda mynediad a symudedd, os bydd gwrandawiad yn cael ei gynnal wyneb yn wyneb </li>
                </ul>`,
  },
  question1:
    'A oes gennych anabledd corfforol, meddyliol neu addysgol neu gyflwr iechyd sy’n golygu bod angen cymorth arnoch yn ystod eich achos?',
  yes: 'Oes',
  textAreaHint: 'Gallwch ddisgrifio beth sydd ei angen arnoch',
  adjustmentDetailTextLabel: 'Dywedwch wrthym pa gymorth sydd angen i chi ofyn amdano',
  no: 'Nac oes, nid oes arnaf angen unrhyw gymorth ar hyn o bryd',
  errors: {
    applicant2HasReasonableAdjustment: {
      required: 'Dewiswch nac oes os nad ydych angen unrhyw gymorth ychwanegol',
    },
    applicant2ReasonableAdjustmentDetails: {
      required: 'Rhowch fanylion y gefnogaeth y mae arnoch ei hangen',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2HasReasonableAdjustment: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          label: l => l.yes,
          hint: l => l.textAreaHint,
          value: YesOrNo.YES,
          subFields: {
            applicant2ReasonableAdjustmentDetails: {
              type: 'textarea',
              label: l => l.adjustmentDetailTextLabel,
              attributes: {
                rows: 5,
              },
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
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
    form,
  };
};
