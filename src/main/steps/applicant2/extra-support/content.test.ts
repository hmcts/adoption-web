import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
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
};

const cyContent = {
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
};

const commonContent = { language: 'en' } as CommonContent;

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant2 > extra-support > content', () => {
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
    const applicant2HasReasonableAdjustmentField = fields.applicant2HasReasonableAdjustment as FormFields;
    //     const applicant1ReasonableAdjustmentDetailsField = fields.applicant1ReasonableAdjustmentDetails as FormFields;

    expect(applicant2HasReasonableAdjustmentField.type).toBe('radios');
    expect(applicant2HasReasonableAdjustmentField.classes).toBe('govuk-radios');

    expect(((fields.applicant2HasReasonableAdjustment as FormInput).label as Function)(generatedContent)).toBe(
      enContent.title
    );
    expect((applicant2HasReasonableAdjustmentField.values[0].label as Function)(generatedContent)).toBe(enContent.yes);
    expect((applicant2HasReasonableAdjustmentField.values[1].label as Function)(generatedContent)).toBe(enContent.no);
    expect(applicant2HasReasonableAdjustmentField.validator as Function).toBe(isFieldFilledIn);

    //     expect(applicant2ReasonableAdjustmentDetailsField.type).toBe('textarea');
    //     expect(applicant2ReasonableAdjustmentDetailsField.classes).toBe('govuk-textarea--rows-5');
    //     expect((applicant2ReasonableAdjustmentDetailsField.label as Function)(generatedContent)).toBe(enContent.adjustmentDetailTextLabel);
    //     expect(applicant2ReasonableAdjustmentDetailsField.validator as Function).toBe(isFieldFilledIn);
    //     expect(applicant2ReasonableAdjustmentDetailsField.validator as Function).toBe(isTextAreaValid);
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
