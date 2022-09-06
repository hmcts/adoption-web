import { isObject } from 'lodash';

import { Checkbox } from '../../../app/case/case';
import { DocumentType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { ValidationError } from '../../../app/form/validation';

const en = () => {
  return {
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
    note1: 'The file names should correspond with what the file is for example, child birth certificate.',
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
        [ValidationError.NOT_UPLOADED]:
          'You have not provided any information or uploaded any documents. You need to provide the information or documents the court has requested. Or if you are going to post any documents in, select that option.',
        errorUploading:
          'Your file was not uploaded because the service is experiencing technical issues. Try uploading your file again.',
        fileSizeTooBig: 'The file you have uploaded is too large. Reduce it to under 25MB and try uploading it again.',
        fileWrongFormat:
          'You cannot upload that format of file. Save the file as one of the accepted formats and try uploading it again.',
        [ValidationError.FILE_COUNT_LIMIT_EXCEEDED]: 'You can upload maximum 10 files.',
      },
      laCannotUpload: {
        required: 'Select which file you could not upload before continuing.',
      },
    },
  };
};

const cy = () => {
  return {
    title: 'Llwytho dogfennau',
    youNeed: "Mae angen i chi uwchlwytho ffeil, llun digidol neu sganio'r dogfennau, os ydynt yn berthnasol megis:",
    warningPhoto:
      'Gwnewch yn siŵr bod y llun neu’r sgan yn dangos y ddogfen gyfan. Gwiriwch eich bod yn gallu darllen y testun i gyd cyn llwytho’r ffeil. Os na fydd staff y llys yn gallu ei ddarllen, gall gael ei wrthod.',
    infoTakePhoto: 'Gallwch dynnu llun gyda’ch ffôn a’i lwytho.',
    infoBullet1: 'tystysgrif geni lawn y plentyn',
    infoBullet2: 'Tystysgrifau marwolaeth y rhieni biolegol os yw’n briodol',
    infoBullet3: "tystysgrifau priodas neu bartneriaeth sifil yr ceiswyr os yw'n briodol",
    infoBullet4: 'Atodiad A (os yw ar gael)',
    infoBullet5:
      'unrhyw dystysgrifau mabwysiadu neu orchmynion llys blaenorol ar gyfer y plentyn neu frodyr a chwiorydd y plentyn',
    infoBullet6:
      'unrhyw dystiolaeth ychwanegol rydych chi’n teimlo sy’n berthnasol megis cytundebau cynnal neu ID gyda llun',
    note1: 'Dylai’r enwau’r ffeiliau gyfateb â beth yw’r ffeil, er enghraifft, tystysgrif geni’r plentyn.',
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
    fileSize: 'Caniateir ichi lwytho ffeil sydd hyd at 25MB o ran maint.',
    cannotUploadDocuments: 'Ni allaf lwytho rhai o fy nogfennau / fy holl ddogfennau.',
    cannotUploadYouCanPost:
      '<p class="govuk-body govuk-!-margin-top-5">To avoid delays you should post or email your documents to the court. If you post them you must send the original documents or certified copies.<br><br>Continue with your application.</p>',
    birthOrAdoptionCertificate: 'Tystysgrif geni neu fabwysiadu',

    errors: {
      laUploadedFiles: {
        [ValidationError.NOT_UPLOADED]:
          'Nid ydych wedi darparu unrhyw wybodaeth neu lwytho unrhyw ddogfennau. Mae angen i chi ddarparu’r wybodaeth neu’r dogfennau y mae’r llys wedi gofyn amdani/amdanynt. Neu os ydych yn mynd i bostio unrhyw ddogfennau, dewiswch yr opsiwn hwnnw.',
        errorUploading:
          'Ni chafodd eich ffeil ei llwytho oherwydd bod y gwasanaeth yn profi problemau technegol. Ceisiwch lwytho eich ffeil eto.',
        fileSizeTooBig:
          'Mae’r ffeil yr ydych wedi ei llwytho yn rhy fawr. Ceisiwch leihau maint y ffeil i lai na 2MB a llwytho’r ffeil eto.',
        fileWrongFormat:
          'Ni allwch lwytho ffeil yn y fformat hwnnw. Cadwch y ffeil ar ffurf fformat a dderbynnir a cheisiwch ei llwytho eto.',
        [ValidationError.FILE_COUNT_LIMIT_EXCEEDED]: 'Gallwch uwchlwytho uchafswm o 10 ffeil.',
      },
      laCannotUpload: {
        required: 'Dewiswch pa ffeil nad oeddech yn gallu llwytho cyn parhau.',
      },
    },
  };
};

export const form: FormContent = {
  fields: userCase => {
    const checkboxes: { id: string; value: DocumentType }[] = [];

    return {
      laUploadedFiles: {
        type: 'hidden',
        label: l => l.uploadFiles,
        labelHidden: true,
        value:
          (isObject(userCase.laUploadedFiles) ? JSON.stringify(userCase.laUploadedFiles) : userCase.laUploadedFiles) ||
          '[]',
        parser: data => JSON.parse((data as Record<string, string>).laUploadedFiles || '[]'),
        validator: (value, formData) => {
          const hasUploadedFiles = (value as string[])?.length && (value as string) !== '[]';
          const selectedCannotUploadDocuments = formData.laCannotUpload;
          if (!hasUploadedFiles && !selectedCannotUploadDocuments) {
            return ValidationError.NOT_UPLOADED;
          }
          const fileArray = JSON.parse((formData as Record<string, string>).laUploadedFiles || '[]');
          if (Object.keys(fileArray).length > 10) {
            return ValidationError.FILE_COUNT_LIMIT_EXCEEDED;
          }
        },
      },
      laCannotUpload: {
        type: 'checkboxes',
        label: l => l.cannotUploadDocuments,
        labelHidden: true,
        //validator: (value, formData) => isValidCannotUpload(value, formData),
        // validator: (value, formData) => {
        //   if ((value as string[])?.includes(Checkbox.Checked)) {
        //     return atLeastOneFieldIsChecked(formData?.laCannotUploadDocuments);
        //   }
        // },
        values: [
          {
            name: 'laCannotUpload',
            label: l => l.cannotUploadDocuments,
            value: Checkbox.Checked,
            subFields: {
              laCannotUploadDocuments: {
                type: 'checkboxes',
                label: l => l.cannotUploadWhich,
                hint: l => l.checkAllThatApply,
                values: checkboxes.map(checkbox => ({
                  name: 'laCannotUploadDocuments',
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
