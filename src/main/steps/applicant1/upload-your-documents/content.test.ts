import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  title: "Upload the child's documents",
  youNeed:
    "You need to upload a digital photo or scan the child's full birth certificate (this is the one which includes details of their birth parents)",
  youNeed2: 'If relevant you may also need to upload:',
  certificate: 'death certificates of birth parents',
  certificateForeign: 'any previous adoption certificates',
  warningPhoto:
    'Make sure the photo or scan shows the whole document. Check you can read all the text before uploading it. If court staff cannot read the details then it may be rejected.',
  infoTakePhoto: 'You can take a picture with your phone and upload it',
  infoBullet1: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
  infoBullet2: 'Take a picture of the whole document. You should be able to see its edges.',
  infoBullet3: 'Check you can read all the writing, including the handwriting.',
  infoBullet4: 'Email or send the photo or scan to the device you are using now.',
  infoBullet5: 'Upload it using the link below.',
  minRequirements:
    'You should upload at least one clear image which shows the whole document. If you think it will help court staff read the details you can upload more images. If your document has more than one page then you should upload at least one image of each page.',
  uploadFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  chooseFilePhoto: 'Choose a file or take a photo',
  orStr: 'or',
  dragDropHere: 'Drag and drop files here',
  fileFormats: 'The file must be in PDF or MS Word Document format.',
  fileSize: 'Maximum file size 2MB.',
  cannotUploadDocuments: 'I cannot upload some or all of my documents',
  cannotUploadWhich: 'Which document can you not upload?',
  checkAllThatApply: 'Select all that apply',
  cannotUploadYouCanPost:
    '<p class="govuk-body govuk-!-margin-top-5">You can post or email your documents to the court. If you post them you must send the original documents or certified copies. You’ll receive details of how to send them after you have submitted this application.</p><p class="govuk-body">Continue with your application.</p>',
  birthOrAdoptionCertificate: 'Birth or adoption certificate',
  deathCertificate: 'Death certiticate',

  errors: {
    applicant1UploadedFiles: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.',
      errorUploading:
        'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
      fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 2MB and try uploading it again.',
      fileWrongFormat:
        'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
      maxTenFileUpload: 'You can upload maximum 10 files.',
    },
    applicant1CannotUpload: {
      required: 'Select which file you could not upload before continuing.',
    },
  },
};

const cyContent = {
  title: 'Llwytho dogfennau’r plentyn',
  youNeed:
    'Mae arnoch angen llwytho llun digidol neu sganio tystysgrif geni llawn y plentyn (dyma’r un sy’n cynnwys manylion eu rhieni biolegol)',
  youNeed2: 'Os yw’n berthnasol, efallai byddwch angen llwytho’r pethau canlynol hefyd:',
  certificate: 'Tystysgrifau marwolaeth y rhieni biolegol',
  certificateForeign: 'Unrhyw dystysgrifau mabwysiadu blaenorol',
  warningPhoto:
    'Gwnewch yn siŵr bod y llun neu’r sgan yn dangos y ddogfen gyfan. Gwiriwch eich bod yn gallu darllen y testun i gyd cyn llwytho’r ffeil. Os na fydd staff y llys yn gallu darllen y manylion, gall y llun gael ei wrthod.',
  infoTakePhoto: 'Gallwch dynnu llun gyda’ch ffôn a’i lwytho.',
  infoBullet1:
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
  infoBullet2: "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
  infoBullet3: 'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
  infoBullet4: 'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
  infoBullet5: 'Defnyddiwch y ddolen isod i’w lwytho.',
  minRequirements:
    'Dylech lwytho o leiaf un delwedd glir sy’n dangos y ddogfen gyfan. Os ydych yn meddwl y bydd yn helpu staff y llys ddarllen y manylion, gallwch lwytho sawl delwedd. Os oes gan eich dogfen mwy nac un tudalen, yna dylech lwytho o leiaf un delwedd o bob tudalen.',
  uploadFiles: 'Ffeiliau sydd wedi cael eu llwytho',
  noFilesUploaded: 'Nid oes ffeiliau wedi cael eu llwytho',
  chooseFilePhoto: 'Dewiswch ffeil neu tynnwch lun',
  orStr: 'neu',
  dragDropHere: 'Llusgwch a gollyngwch ffeiliau yma',
  fileFormats: "Rhaid i'r ffeil fod ar ffurf PDF neu MS Word Document.",
  fileSize: 'Caniateir ichi lwytho ffeil sydd hyd at 2MB o ran maint.',
  cannotUploadDocuments: 'Ni allaf lwytho rhai o fy nogfennau / fy holl ddogfennau.',
  cannotUploadWhich: 'Pa ddogfen na allwch ei llwytho?',
  checkAllThatApply: "Dewiswch bob un sy'n berthnasol",
  cannotUploadYouCanPost:
    '<p class="govuk-body govuk-!-margin-top-5">Gallwch bostio neu e-bostio eich dogfennau i’r llys. Os ydych yn eu postio, rhaid ichi anfon y dogfennau gwreiddiol neu gopïau wedi’u hardystio. Byddwch yn cael manylion am sut i’w hanfon ar ôl ichi gyflwyno’r cais hwn. </p><p class="govuk-body">Parhau â’ch cais.</p>',
  birthOrAdoptionCertificate: 'Tystysgrif geni neu fabwysiadu',
  deathCertificate: 'Tystysgrif marwolaeth',

  errors: {
    applicant1UploadedFiles: {
      notUploaded:
        'Nid ydych wedi darparu unrhyw wybodaeth nac wedi uwchlwytho unrhyw ddogfennau. Mae angen i chi ddarparu’r wybodaeth neu’r dogfennau y mae’r llys wedi gofyn amdanynt. Neu os ydych am bostio unrhyw ddogfennau i mewn, dewiswch yr opsiwn hwnnw.',
      errorUploading:
        'Ni chafodd eich ffeil ei llwytho oherwydd bod y gwasanaeth yn profi problemau technegol. Ceisiwch lwytho eich ffeil eto.',
      fileSizeTooBig:
        'Mae’r ffeil yr ydych wedi ei llwytho yn rhy fawr. Ceisiwch leihau maint y ffeil i lai na 2MB a llwytho’r ffeil eto.',
      fileWrongFormat:
        'Ni allwch lwytho ffeil yn y fformat hwnnw. Cadwch y ffeil ar ffurf fformat a dderbynnir a cheisiwch ei llwytho eto.',
      maxTenFileUpload: 'Gallwch uwchlwytho uchafswm o 10 ffeil.',
    },
    applicant1CannotUpload: {
      required: 'Dewiswch pa ffeil nad oeddech yn gallu llwytho cyn parhau.',
    },
  },
};

const commonContent = { language: EN } as CommonContent;
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('Upload content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an applicant1UploadedFiles hidden input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1UploadedFiles = fields.applicant1UploadedFiles;

    expect(applicant1UploadedFiles.type).toBe('hidden');
    expect((applicant1UploadedFiles.label as Function)(generateContent(commonContent))).toBe(enContent.uploadFiles);
  });

  it('should have an applicant1CannotUpload checkbox field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1CannotUpload = fields.applicant1CannotUpload;

    expect(applicant1CannotUpload.type).toBe('checkboxes');
    expect((applicant1CannotUpload.label as Function)(generateContent(commonContent))).toBe(
      enContent.cannotUploadDocuments
    );
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});

describe('applicant1CannotUpload', () => {
  test.each([
    { value: [], formData: {}, expected: undefined },
    {
      value: ['checked'],
      formData: { applicant1CannotUploadDocuments: 'birthOrAdoptionCertificate' },
      expected: undefined,
    },
  ])('checks applicant1CannotUpload', ({ value, formData, expected }) => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1CannotUpload = fields.applicant1CannotUpload as FormOptions;

    expect((applicant1CannotUpload.label as Function)(generateContent(commonContent))).toBe(
      enContent.cannotUploadDocuments
    );
    expect(applicant1CannotUpload.type).toBe('checkboxes');
    expect(applicant1CannotUpload.labelHidden).toBe(true);
    expect(applicant1CannotUpload.values).toHaveLength(1);
    expect(applicant1CannotUpload.values[0].name).toBe('applicant1CannotUpload');
    expect(applicant1CannotUpload.values[0].value).toBe('checked');
    expect((applicant1CannotUpload.values[0].label as Function)(generateContent(commonContent))).toBe(
      enContent.cannotUploadDocuments
    );

    const applicant1CannotUploadDocuments = applicant1CannotUpload.values[0].subFields!
      .applicant1CannotUploadDocuments as FormOptions;
    expect(applicant1CannotUploadDocuments.type).toBe('checkboxes');
    expect(applicant1CannotUploadDocuments.values).toHaveLength(2);
    expect(applicant1CannotUploadDocuments.values[0].name).toBe('applicant1CannotUploadDocuments');
    expect(applicant1CannotUploadDocuments.values[0].value).toBe('birthOrAdoptionCertificate');
    expect(applicant1CannotUploadDocuments.values[1].name).toBe('applicant1CannotUploadDocuments');
    expect(applicant1CannotUploadDocuments.values[1].value).toBe('deathCertificate');
    expect((applicant1CannotUpload.validator as Function)(value, formData)).toBe(expected);
  });
});

describe('applicant1UploadedFiles', () => {
  test.each([
    { value: [], formData: {}, expected: 'notUploaded' },
    {
      value: ['checked'],
      formData: {
        applicant1CannotUpload: 'checked',
        applicant1CannotUploadDocuments: [{ id: '123', name: 'abc.pdf' }],
      },
      expected: undefined,
    },
    {
      value: ['checked'],
      formData: [
        { id: '1', name: '1' },
        { id: '2', name: '1' },
        { id: '3', name: '1' },
        { id: '4', name: '1' },
        { id: '5', name: '1' },
        { id: '6', name: '1' },
        { id: '7', name: '1' },
        { id: '8', name: '1' },
        { id: '9', name: '1' },
        { id: '10', name: '1' },
        { id: '11', name: '1' },
      ],
      expected: undefined,
    },
  ])('checks applicant1UploadedFiles', ({ value, formData, expected }) => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1UploadedFiles = fields.applicant1UploadedFiles;
    expect((applicant1UploadedFiles.validator as Function)(value, formData)).toBe(expected);
  });
});

describe('applicant1UploadedFiles parser', () => {
  test.each([
    { data: {}, expected: [] },
    { data: [{ id: '123', name: 'abc.pdf' }], expected: [] },
  ])('checks applicant1UploadedFiles', ({ data, expected }) => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1UploadedFiles = fields.applicant1UploadedFiles;

    expect((applicant1UploadedFiles.parser as Function)(data)).toEqual(expected);
  });
});
