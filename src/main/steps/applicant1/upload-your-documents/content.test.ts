// /* eslint-disable @typescript-eslint/ban-types */
// /* eslint-disable jest/expect-expect */
// import { assert } from 'console';

import { FormContent, FormFields } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
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
  fileFormats: 'The file must be in jpg, bmp, tiff, png or pdf format.',
  fileSize: 'Maximum file size 10MB.',
  cannotUploadDocuments: 'I cannot upload some or all of my documents',
  cannotUploadWhich: 'Which document can you not upload?',
  checkAllThatApply: 'Select all that apply',
  cannotUploadYouCanPost: `<p class="govuk-body govuk-!-margin-top-5">You can post or email your documents to the court. If you post them you must send the original documents or certified copies. You’ll receive details of how to send them after you have submitted this application.</p>
  <p class="govuk-body">Continue with your application.</p>`,
  birthOrAdoptionCertificate: 'Birth or adoption certificate',
  deathCertificate: 'Death certiticate',

  errors: {
    applicant1UploadedFiles: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.',
      errorUploading:
        'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
      fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 10MB and try uploading it again.',
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
  title: "Upload the child's documents (in welsh)",
  youNeed:
    "You need to upload a digital photo or scan the child's full birth certificate (this is the one which includes details of their birth parents) (in welsh)",
  youNeed2: 'If relevant you may also need to upload: (in welsh)',
  certificate: 'death certificates of birth parents (in welsh)',
  certificateForeign: 'any previous adoption certificates (in welsh)',
  warningPhoto:
    'Make sure the photo or scan shows the whole document. Check you can read all the text before uploading it. If court staff cannot read the details then it may be rejected. (in welsh)',
  infoTakePhoto: 'You can take a picture with your phone and upload it (in welsh)',
  infoBullet1: 'Place your document on a flat service in a well-lit room. Use a flash if you need to. (in welsh)',
  infoBullet2: 'Take a picture of the whole document. You should be able to see its edges. (in welsh)',
  infoBullet3: 'Check you can read all the writing, including the handwriting. (in welsh)',
  infoBullet4: 'Email or send the photo or scan to the device you are using now. (in welsh)',
  infoBullet5: 'Upload it using the link below. (in welsh)',
  minRequirements:
    'You should upload at least one clear image which shows the whole document. If you think it will help court staff read the details you can upload more images. If your document has more than one page then you should upload at least one image of each page. (in welsh)',
  uploadFiles: 'Uploaded files (in welsh)',
  noFilesUploaded: 'No files uploaded (in welsh)',
  chooseFilePhoto: 'Choose a file or take a photo (in welsh)',
  orStr: 'or (in welsh)',
  dragDropHere: 'Drag and drop files here (in welsh)',
  fileFormats: 'The file must be in jpg, bmp, tiff, png or pdf format. (in welsh)',
  fileSize: 'Maximum file size 10MB. (in welsh)',
  cannotUploadDocuments: 'I cannot upload some or all of my documents (in welsh)',
  cannotUploadWhich: 'Which document can you not upload? (in welsh)',
  checkAllThatApply: 'Select all that apply (in welsh)',
  cannotUploadYouCanPost: `<p class="govuk-body govuk-!-margin-top-5">You can post or email your documents to the court. If you post them you must send the original documents or certified copies. You’ll receive details of how to send them after you have submitted this application.</p>
<p class="govuk-body">Continue with your application.</p> (in welsh)`,
  birthOrAdoptionCertificate: 'Birth or adoption certificate (in welsh)',
  deathCertificate: 'Death certiticate (in welsh)',

  errors: {
    applicant1UploadedFiles: {
      notUploaded:
        'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option. (in welsh)',
      errorUploading:
        'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again. (in welsh)',
      fileSizeTooBig:
        'The file you have uploaded is too large. Reduce it to under 10MB and try uploading it again. (in welsh)',
      fileWrongFormat:
        'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again. (in welsh)',
      maxTenFileUpload: 'You can upload maximum 10 files. (in welsh)',
    },
    applicant1CannotUpload: {
      required: 'Select which file you could not upload before continuing. (in welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const {
    title,
    youNeed,
    youNeed2,
    certificate,
    certificateForeign,
    warningPhoto,
    infoTakePhoto,
    infoBullet1,
    infoBullet2,
    infoBullet3,
    infoBullet4,
    infoBullet5,
    minRequirements,
    uploadFiles,
    noFilesUploaded,
    chooseFilePhoto,
    orStr,
    dragDropHere,
    fileFormats,
    fileSize,
    cannotUploadDocuments,
    cannotUploadWhich,
    checkAllThatApply,
    //cannotUploadYouCanPost,
    birthOrAdoptionCertificate,
    deathCertificate,
    errors,
  } = content;

  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.youNeed).toEqual(youNeed);
  expect(generatedContent.youNeed2).toEqual(youNeed2);
  expect(generatedContent.certificate).toEqual(certificate);
  expect(generatedContent.certificateForeign).toEqual(certificateForeign);
  expect(generatedContent.warningPhoto).toEqual(warningPhoto);
  expect(generatedContent.infoTakePhoto).toEqual(infoTakePhoto);
  expect(generatedContent.infoBullet1).toEqual(infoBullet1);
  expect(generatedContent.infoBullet2).toEqual(infoBullet2);
  expect(generatedContent.infoBullet3).toEqual(infoBullet3);
  expect(generatedContent.infoBullet4).toEqual(infoBullet4);
  expect(generatedContent.infoBullet5).toEqual(infoBullet5);
  expect(generatedContent.minRequirements).toEqual(minRequirements);
  expect(generatedContent.uploadFiles).toEqual(uploadFiles);
  expect(generatedContent.noFilesUploaded).toEqual(noFilesUploaded);
  expect(generatedContent.chooseFilePhoto).toEqual(chooseFilePhoto);
  expect(generatedContent.orStr).toEqual(orStr);
  expect(generatedContent.dragDropHere).toEqual(dragDropHere);
  expect(generatedContent.fileFormats).toEqual(fileFormats);
  expect(generatedContent.fileSize).toEqual(fileSize);
  expect(generatedContent.cannotUploadDocuments).toEqual(cannotUploadDocuments);
  expect(generatedContent.cannotUploadWhich).toEqual(cannotUploadWhich);
  expect(generatedContent.checkAllThatApply).toEqual(checkAllThatApply);
  //expect(generatedContent.cannotUploadYouCanPost).toEqual(cannotUploadYouCanPost);
  expect(generatedContent.birthOrAdoptionCertificate).toEqual(birthOrAdoptionCertificate);
  expect(generatedContent.deathCertificate).toEqual(deathCertificate);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = { language: EN } as CommonContent;
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('Upload content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });
  /////
  it('should have an applicant1UploadedFiles hidden input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicant1UploadedFiles = fields.applicant1UploadedFiles;

    expect(applicant1UploadedFiles.type).toBe('hidden');
    expect((applicant1UploadedFiles.label as Function)(generateContent(commonContent))).toBe(enContent.uploadFiles);

    // (applicant1UploadedFiles.validator as Function)('MockAgencyName');
    // expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyName');
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

    // (adopAgencyOrLaPhoneNumber.validator as Function)('MockAgencyPhoneNumber');
    // expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyPhoneNumber');
  });
  /////
  // it('should have an applicant1CannotUploadDocuments checkboxes input field', () => {
  //   const generatedContent = generateContent(commonContent);
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const applicant1CannotUploadDocuments = fields.applicant1CannotUploadDocuments;

  //   expect(applicant1CannotUploadDocuments.type).toBe('checkboxes');
  //   expect((applicant1CannotUploadDocuments.label as Function)(generateContent(commonContent))).toBe(
  //     enContent.cannotUploadWhich
  //   );

  //   (applicant1CannotUploadDocuments.validator as Function)('MockAgencyContactName');
  //   expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactName');
  // });

  // it('should have an adopAgencyOrLaContactEmail text input field', () => {
  //   const generatedContent = generateContent(commonContent);
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const adopAgencyOrLaContactEmail = fields.adopAgencyOrLaContactEmail;

  //   expect(adopAgencyOrLaContactEmail.type).toBe('text');
  //   expect((adopAgencyOrLaContactEmail.label as Function)(generateContent(commonContent))).toBe(
  //     enContent.cannotUploadDocuments
  //   );

  //   (adopAgencyOrLaContactEmail.validator as Function)('MockAgencyContactEmail');
  //   expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactEmail');
  // });

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
