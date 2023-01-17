/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
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
};

const cyContent = {
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
};

const commonContent = { language: EN } as CommonContent;

describe('review-pay-submit > statement-of-truth > content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an laStatementOfTruth checkboxes field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const { type, labelHidden, values } = fields.laStatementOfTruth as FormOptions;
    const laStatementOfTruth = fields.laStatementOfTruth;

    expect(laStatementOfTruth.type).toBe('checkboxes');
    expect(type).toBe('checkboxes');
    expect(labelHidden).toBe(true);
    expect(values).toHaveLength(1);
    expect((values[0].label as Function)(generatedContent)).toBe(enContent.laStatementOfTruth);
    expect(values[0].value).toBe('checked');

    (laStatementOfTruth.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should have an laSotFullName text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laSotFullName = fields.laSotFullName;

    expect(laSotFullName.type).toBe('text');
    expect((laSotFullName.label as Function)(generateContent(commonContent))).toBe(enContent.laSotFullName);

    (laSotFullName.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should have an laSotJobtitle text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laSotJobtitle = fields.laSotJobtitle;

    expect(laSotJobtitle.type).toBe('text');
    expect((laSotJobtitle.label as Function)(generateContent(commonContent))).toBe(enContent.laSotJobtitle);

    (laSotJobtitle.validator as Function)('MockName');
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName');
  });

  it('should have an laNameSot text input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laNameSot = fields.laSotJobtitle;

    expect(laNameSot.type).toBe('text');
    expect((laNameSot.label as Function)(generateContent(commonContent))).toBe(enContent.laSotJobtitle);

    (laNameSot.validator as Function)('MockName');
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
