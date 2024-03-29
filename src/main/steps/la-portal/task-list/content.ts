import { SectionStatus, YesNoNotsure } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import * as URL from '../../urls';

import {
  //getApplicationStatus,
  getBirthFatherDetailsStatus,
  getBirthMotherDetailsStatus,
  getChildrenBirthCertificateStatus,
  getChildrenPlacementOrderStatus,
  getOtherParentStatus,
  getSiblingStatus,
  getUploadDocumentStatus,
} from './utils';

const generateTaskList = (sectionTitles, taskListItems, userCase) => [
  {
    heading: sectionTitles.childDetails,
    items: [
      {
        id: 'birth-certificate-details',
        text: taskListItems.birthCertificate,
        status: getChildrenBirthCertificateStatus(userCase),
        href: URL.LA_PORTAL_CHILD_SEX_AT_BIRTH,
      },
      {
        id: 'birth-mother-details',
        text: taskListItems.birthMother,
        status: getBirthMotherDetailsStatus(userCase),
        href: URL.LA_PORTAL_BIRTH_MOTHER_FULL_NAME,
      },
      {
        id: 'birth-father-details',
        text: taskListItems.birthFather,
        status: getBirthFatherDetailsStatus(userCase),
        href: URL.LA_PORTAL_BIRTH_FATHER_NAME_ON_CERTIFICATE,
      },
      {
        id: 'other-parent-details',
        text: taskListItems.otherParent,
        status: getOtherParentStatus(userCase),
        href: URL.LA_PORTAL_OTHER_PARENT_EXISTS,
      },
      {
        id: 'placement-and-court-order-details',
        text: taskListItems.placementAndCourtOrders,
        status: getChildrenPlacementOrderStatus(userCase),
        href:
          getChildrenPlacementOrderStatus(userCase) === SectionStatus.NOT_STARTED
            ? URL.LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER
            : URL.LA_PORTAL_CHILD_PLACEMENT_ORDER_SUMMARY,
      },
      {
        id: 'sibling-court-order-details',
        text: taskListItems.siblingCourtOrders,
        status: getSiblingStatus(userCase),
        href:
          userCase.hasSiblings === YesNoNotsure.YES && userCase.siblings?.length
            ? URL.LA_PORTAL_SIBLING_ORDER_SUMMARY
            : URL.LA_PORTAL_SIBLING_EXISTS,
      },
      {
        id: 'upload-documents',
        text: taskListItems.uploadDocuments,
        status: getUploadDocumentStatus(userCase),
        href: URL.LA_PORTAL_UPLOAD_YOUR_DOCUMENTS,
      },
      // {
      //   id: 'check-your-answers',
      //   text: taskListItems.checkYourAnswers,
      //   status: getApplicationStatus(userCase),
      //   href:
      //     getApplicationStatus(userCase) === SectionStatus.CAN_NOT_START_YET
      //       ? URL.LA_PORTAL_TASK_LIST
      //       : URL.LA_PORTAL_CHECK_ANSWERS_URL,
      // },
    ],
  },
];

const en = () => ({
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.NOT_STARTED]: 'Not Started',
    [SectionStatus.CAN_NOT_START_YET]: 'Cannot start yet',
  },
  sectionTitles: {
    applicationDetails: 'Add application details',
  },
  taskListItems: {
    birthCertificate: 'Birth certificate details',
    birthMother: 'Birth mother details',
    birthFather: 'Birth father details',
    otherParent: 'Other person with parental responsibility',
    placementAndCourtOrders: 'Placement and court orders',
    siblingCourtOrders: 'Sibling court order details',
    uploadDocuments: 'Upload documents',
  },
  reviewAndSubmit: 'Review and submit',
});

const cy: typeof en = () => ({
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.NOT_STARTED]: 'Heb Ddechrau',
    [SectionStatus.CAN_NOT_START_YET]: 'Methu dechrau eto',
  },
  sectionTitles: {
    applicationDetails: 'Ychwanegu manylion y cais',
  },
  taskListItems: {
    birthCertificate: 'Manylion y dystysgrif geni',
    birthMother: 'Manylion y fam enedigol',
    birthFather: 'Manylion y tad genedigol',
    otherParent: 'Unigolyn arall sydd â chyfrifoldeb rhiant',
    placementAndCourtOrders: 'Gorchmynion llys a lleoli',
    siblingCourtOrders: 'Manylion gorchymyn llys brodyr/chwiorydd',
    uploadDocuments: 'Llwytho dogfennau',
  },
  reviewAndSubmit: 'Adolygu a chyflwyno',
});

const languages = {
  en,
  cy,
};

const isLaDetailsNotComplete = (userCase): boolean => {
  const statusArr = [
    getChildrenPlacementOrderStatus(userCase),
    getOtherParentStatus(userCase),
    getBirthFatherDetailsStatus(userCase),
    getBirthMotherDetailsStatus(userCase),
    getChildrenBirthCertificateStatus(userCase),
    getSiblingStatus(userCase),
    getUploadDocumentStatus(userCase),
  ];

  return !!statusArr.find(item => item !== SectionStatus.COMPLETED);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const userCase = content.userCase;
  const suffix = content.language === 'en' ? "'s details" : "'s manylion";
  return {
    ...translations,
    title: 'la-task-list',
    heading: userCase!.childrenFirstName + ' ' + userCase!.childrenLastName + suffix,
    sections: generateTaskList(translations.sectionTitles, translations.taskListItems, userCase),
    isIncomplete: isLaDetailsNotComplete(userCase),
  };
};
