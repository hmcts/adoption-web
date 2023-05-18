import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  title: 'Upload documents',
  youNeed: 'You should upload Annex A and any other supporting documents with this application, such as:',
  warningPhoto:
    'Make sure the photo or scan shows the whole document. Check you can read all the text before uploading it. If court staff cannot read it then it may be rejected.',
  infoTakePhoto: 'You can take a picture with your phone and upload it',
  infoBullet1: 'full birth certificate of the child',
  infoBullet2: 'death certificates of birth parents, if appropriate',
  infoBullet3: "any previous adoption certificates or court orders for the child/child's siblings",
  infoBullet4: 'any additional evidence you feel is relevant such as maintenance agreements',
  note1: 'This will help speed up the court process for applicants.',
  note2:
    'This application and supporting documents should be submitted to the court within 10 working days from when the application was received by you. If you are unable to upload Annex A within this timeframe, you should email it directly to the court asap.',
  note3: 'You can upload a file, digital photo or scan the documents, if relevant.',
  note4: 'The file names should correspond with what the file is for example, Williams_AnnexA_report.pdf.',
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
  fileSize: 'Maximum file size 20MB.',
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
      fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 20MB and try uploading it again.',
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
  title: 'Llwytho dogfennau',
  youNeed: 'Dylech lwytho Atodiad A ac unrhyw ddogfennau ategol eraill gyda’r cais hwn, er enghraifft:',
  warningPhoto:
    'Gwnewch yn siŵr bod y llun neu’r sgan yn dangos y ddogfen gyfan. Gwiriwch eich bod yn gallu darllen y testun i gyd cyn llwytho’r ffeil. Os na fydd staff y llys yn gallu ei ddarllen, gall gael ei wrthod.',
  infoTakePhoto: 'Gallwch dynnu llun gyda’ch ffôn a’i lwytho.',
  infoBullet1: 'tystysgrif geni lawn y plentyn',
  infoBullet2: 'tystysgrifau marwolaeth y rhieni biolegol, os yw’n briodol',
  infoBullet3:
    'unrhyw dystysgrifau mabwysiadu neu orchmynion llys blaenorol ar gyfer y plentyn neu frodyr a chwiorydd y plentyn',
  infoBullet4: 'unrhyw dystiolaeth ychwanegol rydych chi’n teimlo sy’n berthnasol megis cytundebau cynhaliaeth',
  note1: 'Bydd hyn yn helpu i gyflymu proses y llys ar gyfer ceiswyr.',
  note2:
    'Dylid cyflwyno’r cais hwn a’r dogfennau ategol i’r llys o fewn 10 diwrnod gwaith ichi gael y cais hwn. O na allwch lwytho Atodiad A o fewn yr amserlen hon, dylech ei anfon ar e-bost yn uniongyrchol i’r llys cyn gynted â phosibl.',
  note3: 'Gallwch lwytho ffeil, llun digidol neu sganio’r dogfennau, os yw hynny’n berthnasol.',
  note4: 'Dylai enw ffeil gyfateb i beth yw’r ffeil, er enghraifft, Williams_AtodiadA_adroddiad.pdf.',

  infoBulletSummary1:
    'Rhowch eich dogfen ar rywbeth gwastad mewn ystafell sydd â digon o olau. Defnyddiwch fflach y camera os bydd angen.',
  infoBulletSummary2: "Tynnwch lun o’r ddogfen gyfan. Dylech allu gweld corneli'r ddogfen.",
  infoBulletSummary3: 'Gwiriwch eich bod yn gallu gweld yr ysgrifen i gyd, gan gynnwys y llawysgrifen.',
  infoBulletSummary4: 'Anfonwch y llun trwy e-bost neu sganiwch y ddogfen i’r ddyfais rydych yn ei defnyddio nawr.',
  infoBulletSummary5: 'Defnyddiwch y ddolen isod i’w lwytho.',
  minRequirements: 'Gallwch uwchlwytho uchafswm o 10 dogfen ar y dudalen hon. Rhaid ardystio pob tystysgrif.',
  uploadFiles: 'Ffeiliau sydd wedi cael eu llwytho',
  noFilesUploaded: 'Nid oes ffeiliau wedi cael eu llwytho',
  chooseFilePhoto: 'Dewiswch ffeil neu tynnwch lun',
  orStr: 'neu',
  dragDropHere: 'Llusgwch a gollyngwch ffeiliau yma',
  fileFormats: 'Rhaid i’r ffeil fod ar ffurf jpg, png, pdf, doc/docx neu fformat tif.',
  fileSize: 'Caniateir ichi lwytho ffeil sydd hyd at 20MB o ran maint.',
  cannotUploadDocuments: 'Ni allaf lwytho rhai o fy nogfennau / fy holl ddogfennau.',
  cannotUploadYouCanPost:
    '<p class="govuk-body govuk-!-margin-top-5">Er mwyn osgoi oedi dylech bostio neu e-bostio eich dogfennau i\'r llys. Os ydych yn eu postio, rhaid ichi anfon y dogfennau gwreiddiol neu gopïau wedi’u hardystio.<br><br>Parhau â’ch cais.</p>',
  birthOrAdoptionCertificate: 'Tystysgrif geni neu fabwysiadu',

  errors: {
    laUploadedFiles: {
      notUploaded:
        'Nid ydych wedi darparu unrhyw wybodaeth neu lwytho unrhyw ddogfennau. Mae angen i chi ddarparu’r wybodaeth neu’r dogfennau y mae’r llys wedi gofyn amdani/amdanynt. Neu os ydych yn mynd i bostio unrhyw ddogfennau, dewiswch yr opsiwn hwnnw.',
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
