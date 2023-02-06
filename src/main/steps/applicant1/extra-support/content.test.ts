import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
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
    applicant1HasReasonableAdjustment: {
      required: 'Choose whether you need an extra support',
    },
    applicant1ReasonableAdjustmentDetails: {
      required: 'Give details of the support you need',
    },
  },
};

const cyContent = {
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
    applicant1HasReasonableAdjustment: {
      required: 'Dewiswch a oes angen cymorth ychwanegol arnoch',
    },
    applicant1ReasonableAdjustmentDetails: {
      required: 'Rhowch fanylion y cymorth sydd ei angen arnoch',
    },
  },
};

const commonContent = { language: 'en' } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant1 > extra-support > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain applicant1HasReasonableAdjustment field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1HasReasonableAdjustmentField = fields.applicant1HasReasonableAdjustment as FormFields;
    //     const applicant1ReasonableAdjustmentDetailsField = fields.applicant1ReasonableAdjustmentDetails as FormFields;

    expect(applicant1HasReasonableAdjustmentField.type).toBe('radios');
    expect(applicant1HasReasonableAdjustmentField.classes).toBe('govuk-radios');

    expect(((fields.applicant1HasReasonableAdjustment as FormInput).label as Function)(generatedContent)).toBe(
      enContent.title
    );
    expect((applicant1HasReasonableAdjustmentField.values[0].label as Function)(generatedContent)).toBe(enContent.yes);
    expect((applicant1HasReasonableAdjustmentField.values[1].label as Function)(generatedContent)).toBe(enContent.no);
    expect(applicant1HasReasonableAdjustmentField.validator as Function).toBe(isFieldFilledIn);

    //     expect(applicant1ReasonableAdjustmentDetailsField.type).toBe('textarea');
    //     expect(applicant1ReasonableAdjustmentDetailsField.classes).toBe('govuk-textarea--rows-5');
    //     expect((applicant1ReasonableAdjustmentDetailsField.label as Function)(generatedContent)).toBe(enContent.adjustmentDetailTextLabel);
    //     expect(applicant1ReasonableAdjustmentDetailsField.validator as Function).toBe(isFieldFilledIn);
    //     expect(applicant1ReasonableAdjustmentDetailsField.validator as Function).toBe(isTextAreaValid);
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save as draft');
  });
});
