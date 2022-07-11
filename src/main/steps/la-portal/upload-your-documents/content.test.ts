import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  title: 'Upload documents',
  youNeed: 'You need to upload a file, digital photo or scan the documents, if relevant such as:',
  warningPhoto:
    'Make sure the photo or scan shows the whole document. Check you can read all the text before uploading it. If court staff cannot read it then it may be rejected.',
  infoTakePhoto: 'You can take a picture with your phone and upload it',
  infoBullet1: 'full birth certificate of the child',
  infoBullet2: 'death certificates of birth parents if appropriate',
  infoBullet3: 'marriage or civil partnership certificates of applicants if appropriate',
  infoBullet4: 'Annex A (if available)',
  infoBullet5: "any previous adoption certificates or court orders for the child/child's siblings",
  infoBullet6: 'any additional evidence you feel is relevant such maintenance agreements or photo ID',
  note1: 'You can upload multiple documents on this page. All certificates must be certified.',
  note2: 'The file names should correspond with what the file is for example, child birth certificate.',
  infoBulletSummary1: 'Place your document on a flat service in a well-lit room. Use a flash if you need to.',
  infoBulletSummary2: 'Take a picture of the whole document. You should be able to see its edges.',
  infoBulletSummary3: 'Check you can read all the writing, including the handwriting.',
  infoBulletSummary4: 'Email or send the photo or scan to the device you are using now.',
  infoBulletSummary5: 'Upload it using the link below.',
  minRequirements: 'You can upload a maximum of 10 documents on this page. All certificates must be certified.',
  uploadFiles: 'Uploaded files',
  noFilesUploaded: 'No files uploaded',
  chooseFilePhoto: 'Choose a file or take a photo',
  orStr: 'or',
  dragDropHere: 'Drag and drop files here',
  fileFormats: 'The file must be in jpg, png, pdf, doc/docx or tif format.',
  fileSize: 'Maximum file size 25MB.',
  cannotUploadDocuments: 'I cannot upload some or all of my documents',
  cannotUploadYouCanPost:
    '<p class="govuk-body govuk-!-margin-top-5">To avoid delays you should post or email your documents to the court. If you post them you must send the original documents or certified copies.<br><br>Continue with your application.</p>',
  birthOrAdoptionCertificate: 'Birth or adoption certificate',

  errors: {
    laUploadedFiles: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.',
      errorUploading:
        'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
      fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 2MB and try uploading it again.',
      fileWrongFormat:
        'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
      maxTenFileUpload: 'You can upload maximum 10 files.',
    },
    laCannotUpload: {
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
    '<p class="govuk-body govuk-!-margin-top-5">Gallwch bostio neu e-bostio eich dogfennau i’r llys. Os ydych yn eu postio, rhaid ichi anfon y dogfennau gwreiddiol neu gopïau wedi’u hardystio. Byddwch yn cael manylion am sut i’w hanfon ar ôl ichi gyflwyno’r cais hwn. </p><p class="govuk-body">Parhau gyda’ch cais.</p>',
  birthOrAdoptionCertificate: 'Tystysgrif geni neu fabwysiadu',
  deathCertificate: 'Tystysgrif marwolaeth',

  errors: {
    laUploadedFiles: {
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
    laCannotUpload: {
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

  it('should have an laUploadedFiles hidden input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laUploadedFiles = fields.laUploadedFiles;

    expect(laUploadedFiles.type).toBe('hidden');
    expect((laUploadedFiles.label as Function)(generateContent(commonContent))).toBe(enContent.uploadFiles);
  });

  it('should have an laCannotUpload checkbox field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laCannotUpload = fields.laCannotUpload;

    expect(laCannotUpload.type).toBe('checkboxes');
    expect((laCannotUpload.label as Function)(generateContent(commonContent))).toBe(enContent.cannotUploadDocuments);
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

describe('laCannotUpload', () => {
  test.each([
    { value: [], formData: {}, expected: undefined },
    {
      value: ['checked'],
      formData: { laCannotUploadDocuments: 'birthOrAdoptionCertificate' },
      expected: undefined,
    },
  ])('checks laCannotUpload', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laCannotUpload = fields.laCannotUpload as FormOptions;

    expect((laCannotUpload.label as Function)(generateContent(commonContent))).toBe(enContent.cannotUploadDocuments);
    expect(laCannotUpload.type).toBe('checkboxes');
    expect(laCannotUpload.labelHidden).toBe(true);
    expect(laCannotUpload.values).toHaveLength(1);
    expect(laCannotUpload.values[0].name).toBe('laCannotUpload');
    expect(laCannotUpload.values[0].value).toBe('checked');
    expect((laCannotUpload.values[0].label as Function)(generateContent(commonContent))).toBe(
      enContent.cannotUploadDocuments
    );

    const laCannotUploadDocuments = laCannotUpload.values[0].subFields!.laCannotUploadDocuments as FormOptions;
    expect(laCannotUploadDocuments.type).toBe('checkboxes');
    expect(laCannotUploadDocuments.values).toHaveLength(0);
  });
});

describe('laUploadedFiles', () => {
  test.each([
    { value: [], formData: {}, expected: 'notUploaded' },
    {
      value: ['checked'],
      formData: {
        laCannotUpload: 'checked',
        laCannotUploadDocuments: [{ id: '123', name: 'abc.pdf' }],
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
  ])('checks laUploadedFiles', ({ value, formData, expected }) => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laUploadedFiles = fields.laUploadedFiles;
    expect((laUploadedFiles.validator as Function)(value, formData)).toBe(expected);
  });
});

describe('laUploadedFiles parser', () => {
  test.each([
    { data: {}, expected: [] },
    { data: [{ id: '123', name: 'abc.pdf' }], expected: [] },
  ])('checks laUploadedFiles', ({ data, expected }) => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const laUploadedFiles = fields.laUploadedFiles;

    expect((laUploadedFiles.parser as Function)(data)).toEqual(expected);
  });
});
