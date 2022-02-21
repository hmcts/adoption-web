import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { DocumentType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { ValidationError, atLeastOneFieldIsChecked } from '../../../app/form/validation';

const en = () => {
  return {
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
        [ValidationError.NOT_UPLOADED]:
          'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.',
        errorUploading:
          'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
        fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 10MB and try uploading it again.',
        fileWrongFormat:
          'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
        [ValidationError.FILE_COUNT_LIMIT_EXCEEDED]: 'You can upload maximum 10 files.',
      },
      applicant1CannotUpload: {
        required: 'Select which file you could not upload before continuing.',
      },
    },
  };
};

const cy = () => {
  return {
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
        [ValidationError.NOT_UPLOADED]:
          'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option. (in welsh)',
        errorUploading:
          'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again. (in welsh)',
        fileSizeTooBig:
          'The file you have uploaded is too large. Reduce it to under 10MB and try uploading it again. (in welsh)',
        fileWrongFormat:
          'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again. (in welsh)',
        [ValidationError.FILE_COUNT_LIMIT_EXCEEDED]: 'You can upload maximum 10 files. (in welsh)',
      },
      applicant1CannotUpload: {
        required: 'Select which file you could not upload before continuing. (in welsh)',
      },
    },
  };
};

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { id: string; value: DocumentType }[] = [];

    checkboxes.push({
      id: 'birthOrAdoptionCertificate',
      value: DocumentType.BIRTH_OR_ADOPTION_CERTIFICATE,
    });

    checkboxes.push({
      id: 'deathCertificate',
      value: DocumentType.DEATH_CERTIFICATE,
    });

    return {
      applicant1UploadedFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(userCase.applicant1UploadedFiles)
            ? JSON.stringify(userCase.applicant1UploadedFiles)
            : userCase.applicant1UploadedFiles) || '[]',
        parser: data => JSON.parse((data as Record<string, string>).applicant1UploadedFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          const selectedCannotUploadDocuments =
            formData.applicant1CannotUpload && !!formData.applicant1CannotUploadDocuments?.length;
          if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
            return ValidationError.NOT_UPLOADED;
          }
          const fileArray = JSON.parse((formData as Record<string, string>).applicant1UploadedFiles || '[]');
          if (Object.keys(fileArray).length > 10) {
            return ValidationError.FILE_COUNT_LIMIT_EXCEEDED;
          }
        },
      },
      applicant1CannotUpload: {
        type: 'checkboxes',
        label: l => l.cannotUploadDocuments,
        labelHidden: true,
        validator: (value, formData) => {
          if ((value as string[])?.includes(Checkbox.Checked)) {
            return atLeastOneFieldIsChecked(formData?.applicant1CannotUploadDocuments);
          }
        },
        values: [
          {
            name: 'applicant1CannotUpload',
            label: l => l.cannotUploadDocuments,
            value: Checkbox.Checked,
            subFields: {
              applicant1CannotUploadDocuments: {
                type: 'checkboxes',
                label: l => l.cannotUploadWhich,
                hint: l => l.checkAllThatApply,
                values: checkboxes.map(checkbox => ({
                  name: 'applicant1CannotUploadDocuments',
                  label: l => l[checkbox.id],
                  value: checkbox.value,
                })),
                subtext: l => l.cannotUploadYouCanPost,
              },
            },
          },
        ],
      },
    };
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
