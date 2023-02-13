import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form'; //FormFieldsFn
import { isFieldFilledIn, isTextAreaValid } from '../../../app/form/validation';

//eslint-disable-next-line @typescript-eslint/no-unused-vars
const en = content => ({
  title: 'Extra support during your case',
  hint: 'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the tribunal if your needs change.',
  details: {
    summaryText: 'What support is available?',
    html: `Reasonable adjustments can include:</p>
              <ul class="govuk-list govuk-list--bullet">
                <li>documents in alternative formats, colours and fonts </li>
                <li>help with communicating, sight, hearing, speaking and interpretation </li>
                <li>access and mobility support if a hearing takes place in person </li>
              </ul>`,
  },
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
  title: 'Cefnogaeth ychwanegol yn ystod eich achos',
  hint: "Gwyddom fod angen cymorth ar rai pobl i gael mynediad at wybodaeth a defnyddio ein gwasanaethau. Rydym yn aml yn galw hyn yn addasiad rhesymol. Mae angen i’r barnwr neu GLlTEM gytuno ar rai addasiadau rhesymol. Gallwch drafod gyda'r tribiwnlys os bydd eich anghenion yn newid.",
  details: {
    summaryText: 'Pa gefnogaeth sydd ar gael?',
    html: `Gall addasiadau rhesymol gynnwys:</p>
              <ul class="govuk-list govuk-list--bullet">
                <li>dogfennau mewn fformatau, lliwiau a ffontiau amgen </li>
                <li>cymorth gyda chyfathrebu, golwg, clyw, siarad a dehongli </li>
                <li>cymorth mynediad a symudedd os cynhelir gwrandawiad yn bersonol </li>
              </ul>`,
  },
  yes: 'Oes',
  textAreaHint: 'Gallwch ddisgrifio i ni beth sydd ei angen arnoch chi',
  adjustmentDetailTextLabel: 'Dywedwch wrthym pa gymorth sydd ei angen arnoch',
  no: 'Na - nid oes angen unrhyw gymorth ychwanegol arnaf ar hyn o bryd',
  errors: {
    applicant2HasReasonableAdjustment: {
      required: 'Dewiswch na os nad oes angen unrhyw gymorth ychwanegol arnoch',
    },
    applicant2ReasonableAdjustmentDetails: {
      required: 'Rhowch fanylion y cymorth sydd ei angen arnoch',
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
