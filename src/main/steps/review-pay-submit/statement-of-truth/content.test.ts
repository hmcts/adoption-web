/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  section: 'Review your application',
  title: 'Statement of truth',
  statement:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in the truth.',
  reviewBeforeSubmit:
    "Once you submit your application, you cannot make any further changes. You can select 'Save as draft' to review your application before you submit.",
  applicant1IBelieveApplicationIsTrue:
    'I, the first applicant, believes that the facts stated in this form and any additional documents are true.',
  applicant2IBelieveApplicationIsTrue: 'I am authorised by the second applicant to sign this statement.',
  applicant1SotFullName: 'Enter your full name',
  applicant2SotFullName: "Enter the second applicant's full name (if applicable)",
  confirmAndPay: 'Confirm and pay',
  confirmAndSubmit: 'Confirm and submit',
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
};

const cyContent = {
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
  confirmAndPay: 'Cadarnhau a thalu',
  confirmAndSubmit: 'Cadarnhau a chyflwyno',
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
};

const commonContent = { language: EN } as CommonContent;

describe('review-pay-submit > statement-of-truth > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an applicant1IBelieveApplicationIsTrue checkboxes field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const { type, labelHidden, section, values } = fields.applicant1IBelieveApplicationIsTrue as FormOptions;
    const applicant1IBelieveApplicationIsTrue = fields.applicant1IBelieveApplicationIsTrue;

    expect(applicant1IBelieveApplicationIsTrue.type).toBe('checkboxes');
    expect(type).toBe('checkboxes');
    expect(labelHidden).toBe(true);
    expect((section as Function)(generatedContent)).toBe(enContent.section);
    expect(values).toHaveLength(1);
    expect((values[0].label as Function)(generatedContent)).toBe(enContent.applicant1IBelieveApplicationIsTrue);
    expect(values[0].value).toBe('checked');

    (applicant1IBelieveApplicationIsTrue.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should have an applicant2IBelieveApplicationIsTrue checkobxes field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const { type, labelHidden, section, values } = fields.applicant2IBelieveApplicationIsTrue as FormOptions;
    const applicant2IBelieveApplicationIsTrue = fields.applicant2IBelieveApplicationIsTrue;

    expect(applicant2IBelieveApplicationIsTrue.type).toBe('checkboxes');
    expect(type).toBe('checkboxes');
    expect(labelHidden).toBe(true);
    expect((section as Function)(generatedContent)).toBe(enContent.section);
    expect(values).toHaveLength(1);
    expect((values[0].label as Function)(generatedContent)).toBe(enContent.applicant2IBelieveApplicationIsTrue);
    expect(values[0].value).toBe('checked');

    (applicant2IBelieveApplicationIsTrue.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should have an applicant1SotFullName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1SotFullName = fields.applicant1SotFullName;

    expect(applicant1SotFullName.type).toBe('text');
    expect((applicant1SotFullName.label as Function)(generateContent(commonContent))).toBe(
      enContent.applicant1SotFullName
    );

    (applicant1SotFullName.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should have an applicant2SotFullName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant2SotFullName = fields.applicant2SotFullName;

    expect(applicant2SotFullName.type).toBe('text');
    expect((applicant2SotFullName.label as Function)(generateContent(commonContent))).toBe(
      enContent.applicant2SotFullName
    );

    (applicant2SotFullName.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe(undefined); //TODO
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
