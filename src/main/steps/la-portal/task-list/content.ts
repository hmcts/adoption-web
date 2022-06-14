import { SectionStatus } from '../../../app/case/definition'; //YesNoNotsure
import { TranslationFn } from '../../../app/controller/GetController';
import * as URL from '../../urls';

import {
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
    title: sectionTitles.childDetails,
    items: [
      {
        id: 'birth-certificate-details',
        text: taskListItems.birthCertificate,
        status: getChildrenBirthCertificateStatus(userCase),
        href: '', //URL.LA_PORTAL_CHILDREN_FULL_NAME,
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
        href: '', //URL.LA_PORTAL_OTHER_PARENT_EXISTS,
      },
      {
        id: 'placement-and-court-order-details',
        text: taskListItems.placementAndCourtOrders,
        status: getChildrenPlacementOrderStatus(userCase),
        href: '', //
        // getChildrenPlacementOrderStatus(userCase) === SectionStatus.NOT_STARTED
        //   ? URL.LA_PORTAL_CHILD_PLACEMENT_ORDER_NUMBER
        //   : URL.LA_PORTAL_CHILD_PLACEMENT_ORDER_SUMMARY,
      },
      {
        id: 'sibling-court-order-details',
        text: taskListItems.siblingCourtOrders,
        status: getSiblingStatus(userCase),
        href: '', //
        // userCase.hasSiblings === YesNoNotsure.YES && userCase.siblings?.length
        //   ? URL.LA_PORTAL_SIBLING_ORDER_SUMMARY
        //   : URL.LA_PORTAL_SIBLING_EXISTS,
      },
      {
        id: 'upload-documents',
        text: taskListItems.uploadDocuments,
        status: getUploadDocumentStatus(userCase),
        href: '', //getUploadDocumentStatus(userCase) === SectionStatus.CAN_NOT_START_YET ? '' : URL.UPLOAD_YOUR_DOCUMENTS,
      },
    ],
  },
];

const en = () => ({
  title: 'Apply to adopt a child placed in your care',
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
});

const cy: typeof en = () => ({
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
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
    birthMother: 'Manylion y fam fiolegol',
    birthFather: 'Manylion y tad biolegol',
    otherParent: 'Unigolyn arall sydd â chyfrifoldeb rhiant',
    placementAndCourtOrders: 'Gorchmynion llys a lleoli',
    siblingCourtOrders: 'Manylion gorchymyn llys brodyr/chwiorydd',
    uploadDocuments: 'Llwytho dogfennau',
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
  };
};
