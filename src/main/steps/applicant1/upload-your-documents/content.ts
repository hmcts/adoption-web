import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { DocumentType, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../app/form/validation';

const en = () => {
  const union = '';
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
    acceptedFileFormats: 'Accepted file formats:',
    fileFormats: 'JPEG, TIFF, PNG, PDF',
    maximumFileSize: 'Maximum file size:',
    fileSize: '10 MB',

    //s
    certificateForeignTranslation: 'a certified translation of your foreign certificate',
    proofOfNameChange: 'proof that you changed your name, for example a deed poll or ‘statutory declaration’',
    //
    cannotUploadDocuments: 'I cannot upload some or all of my documents',
    cannotUploadWhich: 'Which document can you not upload?',
    checkAllThatApply: 'Select all that apply',
    cannotUploadYouCanPost: `<p class="govuk-body govuk-!-margin-top-5">You can post or email your documents to the court. If you post them you must send the original documents or certified copies. You’ll receive details of how to send them after you have submitted this application.</p>
      <p class="govuk-body">Continue with your application.</p>`,
    cannotUploadCertificateSingular: `I cannot upload my original ${union} certificate`,
    cannotUploadForeignCertificateSingular: `I cannot upload my original foreign ${union} certificate`,
    cannotUploadCertificate: `My original ${union} certificate`,
    cannotUploadForeignCertificate: `My original foreign ${union} certificate`,
    cannotUploadForeignCertificateTranslation: `A certified translation of my foreign ${union} certificate`,
    cannotUploadNameChangeProof: 'Proof that I changed my name',
    errors: {
      applicant1UploadedFiles: {
        notUploaded:
          'You have not uploaded anything. Either upload your document or select that you cannot upload your documents.',
        errorUploading:
          'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
        fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 10MB and try uploading it again.',
        fileWrongFormat:
          'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
      },
      applicant1CannotUpload: {
        required: 'Select which file you could not upload before continuing.',
      },
    },
  };
};

const cy = () => {
  const union = '';
  return {
    title: 'Uwchlwytho eich dogfennau',
    youNeed: "Mae arnoch angen uwchlwytho llun digidol neu sgan o'r dogfennau canlynol:",
    certificate: `eich tystysgrif ${union} wreiddiol`,
    certificateForeign: `eich tystysgrif ${union} dramor wreiddiol`,
    certificateForeignTranslation: `cyfieithiad wedi'i ardystio o'ch tystysgrif ${union} dramor`,
    proofOfNameChange: "prawf eich bod wedi newid eich enw, er enghraifft gweithred newid enw neu 'datganiad statudol'",
    warningPhoto:
      "Gwnewch yn siŵr bod y llun neu'r sgan yn dangos y ddogfen gyfan. Gwiriwch eich bod yn gallu darllen y testun i gyd cyn ei uwchlwytho. Os na all staff y llys ddarllen y manylion, efallai bydd yn cael ei wrthod.",
    infoTakePhoto: "Gallwch dynnu llun gyda'ch ffôn a'i uwchlwytho",
    infoBullet1:
      'Rhowch eich dogfen ar arwyneb fflat mewn ystafell gyda digon o olau. Defnyddiwch y fflach os oes angen.',
    infoBullet2: "Tynnwch lun o'r ddogfen gyfan. Dylech fod yn gallu gweld ymylon y ddogfen.",
    infoBullet3:
      'Gwiriwch eich bod yn gallu darllen yr holl ysgrifen, yn cynnwys y llawysgrifen. Bydd delweddau aneglur neu annarllenadwy yn cael eu gwrthod.',
    infoBullet4: "E-bostiwch neu anfonwch y llun neu'r sgan i'r ddyfais rydych yn ei defnyddio nawr.",
    infoBullet5: "Uwchlwythwch y llun/sgan trwy ddefnyddio'r ddolen isod.",
    minRequirements:
      "Dylech uwchlwytho o leiaf un ddelwedd glir sy'n dangos y ddogfen gyfan. Os ydych yn meddwl y bydd yn helpu staff y llys i ddarllen y manylion, gallwch anfon ragor o ddelweddau. Os yw eich dogfen yn cynnwys mwy nag un tudalen, yna dylech uwchlwytho o leiaf un ddelwedd o bob tudalen.",
    uploadFiles: "Ffeiliau wedi'u huwchlwytho",
    noFilesUploaded: "Dim ffeiliau wedi'u huwchlwytho",
    chooseFilePhoto: 'Dewiswch ffeil neu tynnwch lun',
    orStr: 'neu',
    dragDropHere: 'Llusgwch a gollyngwch ffeiliau yma',
    acceptedFileFormats: 'Fformatau ffeil a dderbynnir:',
    fileFormats: 'JPEG, TIFF, PNG, PDF',
    maximumFileSize: 'Uchafswm maint ffeil:',
    fileSize: '10 MB',
    cannotUploadDocuments: 'Ni allaf uwchlwytho rhai neu bob un o fy nogfennau',
    cannotUploadWhich: 'Pa ddogfen na allwch ei huwchlwytho?',
    checkAllThatApply: "Dewiswch bob un sy'n berthnasol",
    cannotUploadYouCanPost: `<p class="govuk-body govuk-!-margin-top-5">Gallwch bostio neu e-bostio eich dogfennau i'r llys. Os byddwch yn eu postio, rhaid ichi anfon y dogfennau gwreiddiol neu gopïau wedi'u hardystio. Byddwch yn cael manylion am sut i'w hanfon ar ôl ichi gyflwyno'r cais hwn.</p>
      <p class="govuk-body">Ewch ymlaen gyda'ch cais.</p>`,
    cannotUploadCertificateSingular: `Ni allaf uwchlwytho fy nhystysgrif ${union} wreiddiol`,
    cannotUploadForeignCertificateSingular: `Ni allaf uwchlwytho fy nhystysgrif ${union} dramor wreiddiol`,
    cannotUploadCertificate: `Fy nhystysgrif ${union} wreiddiol`,
    cannotUploadForeignCertificate: `Fy nhystysgrif ${union} dramor wreiddiol`,
    cannotUploadForeignCertificateTranslation: `Cyfieithiad wedi'i ardystio o fy nhystysgrif ${union} dramor`,
    cannotUploadNameChangeProof: 'Prawf fy mod i wedi newid fy enw',
    errors: {
      applicant1UploadedFiles: {
        notUploaded:
          'Nid ydych wedi uwchlwytho unrhyw beth. Uwchlwythwch eich dogfen neu nodwch na allwch uwchlwytho eich dogfennau.',
        errorUploading:
          'Ni chafodd eich ffeil ei huwchlwytho oherwydd bod y gwasanaeth yn profi problemau technegol. Ceisiwch uwchlwytho eich ffeil eto.',
        fileSizeTooBig:
          "Mae'r ffeil rydych wedi'i huwchlwytho yn rhy fawr. Gwnewch y ffeil yn llai na 10MB a cheisiwch ei huwchlwytho eto.",
        fileWrongFormat:
          "Ni allwch uwchlwytho ffeil yn y fformat hwnnw. Cadwch y ffeil gan ddefnyddio un o'r fformatau a dderbynnir a cheisiwch ei huwchlwytho eto.",
      },
      applicant1CannotUpload: {
        required: 'Dewiswch pa ffeil nad oeddech yn gallu ei huwchlwytho cyn parhau.',
      },
    },
  };
};

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { id: string; value: DocumentType }[] = [];

    if (YesOrNo.NO === YesOrNo.NO) {
      checkboxes.push({
        id: 'cannotUploadForeignCertificate',
        value: DocumentType.MARRIAGE_CERTIFICATE,
      });
    } else {
      checkboxes.push({
        id: 'cannotUploadCertificate',
        value: DocumentType.MARRIAGE_CERTIFICATE,
      });
    }

    if (YesOrNo.YES === YesOrNo.YES) {
      checkboxes.push({
        id: 'cannotUploadForeignCertificateTranslation',
        value: DocumentType.MARRIAGE_CERTIFICATE_TRANSLATION,
      });
    }

    if (YesOrNo.YES === YesOrNo.YES) {
      checkboxes.push({
        id: 'cannotUploadNameChangeProof',
        value: DocumentType.NAME_CHANGE_EVIDENCE,
      });
    }

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
          const selectedCannotUploadDocuments = !!formData.applicant1CannotUploadDocuments?.length;
          if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
            return 'notUploaded';
          }
        },
      },
      ...(checkboxes.length > 1
        ? {
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
                        conditionalText: l => l.cannotUploadYouCanPost,
                      })),
                    },
                  },
                },
              ],
            },
          }
        : {}),
      ...(checkboxes.length === 1
        ? {
            applicant1CannotUploadDocuments: {
              type: 'checkboxes',
              label: l => l.cannotUploadDocuments,
              labelHidden: true,
              values: checkboxes.map(checkbox => ({
                name: 'applicant1CannotUploadDocuments',
                label: l => l[`${checkbox.id}Singular`],
                value: checkbox.value,
                conditionalText: l => l.cannotUploadYouCanPost,
              })),
            },
          }
        : {}),
    };
  },
  submit: {
    text: l => l.continue,
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
