import { CITAdultSocialWorkerDetailsPage } from '../page-objects/citizen/adoption-agency-and-social-worker/citAdultSocialWorkerDetailsPage.page.ts';
import { CITChildSocialWorkerDetailsPage } from '../page-objects/citizen/adoption-agency-and-social-worker/citChildSocialWorkerDetailsPage.page.ts';
import { CITOtherAdoptionAgencyPage } from '../page-objects/citizen/adoption-agency-and-social-worker/citOtherAdoptionAgencyPage.page.ts';
import { CITApplyingWithPage } from '../page-objects/citizen/applying/citApplyingWithPage.page.ts';
import { CITChildDoBPage } from '../page-objects/citizen/child-details/citChildDoBPage.page.ts';
import { CITChildFullNameAfterAdoptionPage } from '../page-objects/citizen/child-details/citChildFullNameAfterAdoptionPage.page.ts';
import { CITChildFullNamePage } from '../page-objects/citizen/child-details/citChildFullNamePage.page.ts';
import { CITDateChildMovedInPage } from '../page-objects/citizen/date-child-moved-in/citDateChildMovedInPage.page.ts';
import { StartPage } from '../page-objects/citizen/eligibility/start.page.ts';
import { CITSubmittedPage } from '../page-objects/citizen/payments/citSubmittedPage.page.ts';
import { CITSaveAsDraftPage } from '../page-objects/citizen/save-as-draft/citSaveAsDraftPage.page.ts';
import { CITTaskListPage } from '../page-objects/citizen/task-list/citTaskListPage.page.ts';
import { LAChildNationalityPage } from '../page-objects/local-authority/birth-certificate/laChildNationalityPage.page.ts';
import { LAChildSexAtBirthPage } from '../page-objects/local-authority/birth-certificate/laChildSexAtBirthPage.page.ts';
import { LABirthFatherLastDateConfirmedAddressPage } from '../page-objects/local-authority/birth-father/laBirthFatherLastDateConfirmedAddressPage.page.ts';
import { LABirthFatherLastKnownAddressBranchPage } from '../page-objects/local-authority/birth-father/laBirthFatherLastKnownAddressBranchPage.page.ts';
import { LABirthFatherNamePage } from '../page-objects/local-authority/birth-father/laBirthFatherNamePage.page.ts';
import { LABirthFatherNationalityPage } from '../page-objects/local-authority/birth-father/laBirthFatherNationalityPage.page.ts';
import { LABirthFatherOccupationPage } from '../page-objects/local-authority/birth-father/laBirthFatherOccupationPage.page.ts';
import { LABirthFatherOnCertficatePage } from '../page-objects/local-authority/birth-father/laBirthFatherOnCertificatePage.page.ts';
import { LABirthFatherParentalResponsibilityGrantedPage } from '../page-objects/local-authority/birth-father/laBirthFatherParentalResponsibilityGrantedPage.page.ts';
import { LABirthFatherParentalResponsibilityPage } from '../page-objects/local-authority/birth-father/laBirthFatherParentalResponsibilityPage.page.ts';
import { LABirthFatherServeDocumentsPage } from '../page-objects/local-authority/birth-father/laBirthFatherServeDocumentsPage.page.ts';
import { LABirthFatherStillAliveStatusPage } from '../page-objects/local-authority/birth-father/laBirthFatherStillAliveStatusPage.page.ts';
import { LABirthFatherLastKnownAddressPage } from '../page-objects/local-authority/birth-father/lsBirthFatherLastKnownAddressPage.page.ts';
import { LABirthMotherAliveStatusPage } from '../page-objects/local-authority/birth-mother/laBirthMotherAliveStatusPage.page.ts';
import { LABirthMotherLastDateConfirmedAddressPage } from '../page-objects/local-authority/birth-mother/laBirthMotherLastDateConfirmedAddressPage.page.ts';
import { LABirthMotherLastKnownAddressBranchPage } from '../page-objects/local-authority/birth-mother/laBirthMotherLastKnownAddressBranchPage.page.ts';
import { LABirthMotherLastKnownAddressPage } from '../page-objects/local-authority/birth-mother/laBirthMotherLastKnownAddressPage.page.ts';
import { LABirthMotherNamePage } from '../page-objects/local-authority/birth-mother/laBirthMotherNamePage.page.ts';
import { LABirthMotherNationalityPage } from '../page-objects/local-authority/birth-mother/laBirthMotherNationalityPage.page.ts';
import { LABirthMotherOccupationPage } from '../page-objects/local-authority/birth-mother/laBirthMotherOccupationPage.page.ts';
import { LABirthMotherServeDocumentsPage } from '../page-objects/local-authority/birth-mother/laBirthMotherServeDocumentsPage.page.ts';
import { LAUploadDocumentsPage } from '../page-objects/local-authority/document-upload/laUploadDocuments.page.ts';
import { LACheckYourAnswerPage } from '../page-objects/local-authority/laCheckYourAnswer.page.ts';
import { LAChildDetailsPage } from '../page-objects/local-authority/laChildDetailsPage.page.ts';
import { LAConfirmationPage } from '../page-objects/local-authority/laConfirmationPage.page.ts';
import { LAGettingStartedPage } from '../page-objects/local-authority/laGettingStartedPage.page.ts';
import { LASignInPage } from '../page-objects/local-authority/laSignInPage.page.ts';
import { LAStatementOfTruthPage } from '../page-objects/local-authority/laStatementOfTruth.page.ts';
import { LAOtherPersonResponsibilityPage } from '../page-objects/local-authority/other-person/laOtherPersonResponsibilityPage.page.ts';
import { LAPlacementDateOfOrderPage } from '../page-objects/local-authority/placement/laPlacementDateOfOrderPage.page.ts';
import { LAPlacementOrderNumberPage } from '../page-objects/local-authority/placement/laPlacementOrderNumberPage.page.ts';
import { LAPlacementOrdersSummaryPage } from '../page-objects/local-authority/placement/laPlacementOrdersSummaryPage.page.ts';
import { LAChildHasOtherSiblingsPage } from '../page-objects/local-authority/siblings/laSiblingCourtDetailsSection.page.ts';
import SignIn from '../pages/signInPage.page.ts';

export interface PageFixtures {
  startPage: StartPage;
  signIn: SignIn;
  citSaveAsDraftPage: CITSaveAsDraftPage;
  citApplyingWithPage: CITApplyingWithPage;
  citTaskListPage: CITTaskListPage;
  citDateChildMovedInPage: CITDateChildMovedInPage;
  citChildFullNamePage: CITChildFullNamePage;
  citChildFullNameAfterAdoptionPage: CITChildFullNameAfterAdoptionPage;
  citChildDoBPage: CITChildDoBPage;
  citChildSocialWorkerDetailsPage: CITChildSocialWorkerDetailsPage;
  citAdultSocialWorkerDetailsPage: CITAdultSocialWorkerDetailsPage;
  citOtherAdoptionAgencyPage: CITOtherAdoptionAgencyPage;
  citSubmittedPage: CITSubmittedPage;
  laSignInPage: LASignInPage;
  laGettingStartedPage: LAGettingStartedPage;
  laChildSexAtBirthPage: LAChildSexAtBirthPage;
  laChildDetailsPage: LAChildDetailsPage;
  laChildNationalityPage: LAChildNationalityPage;
  laBirthMotherNamePage: LABirthMotherNamePage;
  laBirthMotherAliveStatusPage: LABirthMotherAliveStatusPage;
  laBirthMotherNationalityPage: LABirthMotherNationalityPage;
  laBirthMotherOccupationPage: LABirthMotherOccupationPage;
  laBirthMotherLastKnownAddressBranchPage: LABirthMotherLastKnownAddressBranchPage;
  laBirthMotherLastKnownAddressPage: LABirthMotherLastKnownAddressPage;
  laBirthMotherLastDateConfirmedAddressPage: LABirthMotherLastDateConfirmedAddressPage;
  laBirthMotherServeDocumentsPage: LABirthMotherServeDocumentsPage;
  laBirthFatherOnCertificatePage: LABirthFatherOnCertficatePage;
  laBirthFatherNamePage: LABirthFatherNamePage;
  laBirthFatherStillAliveStatusPage: LABirthFatherStillAliveStatusPage;
  laBirthFatherParentalResponsibilityPage: LABirthFatherParentalResponsibilityPage;
  laBirthFatherParentalResponsibilityGrantedPage: LABirthFatherParentalResponsibilityGrantedPage;
  laBirthFatherNationalityPage: LABirthFatherNationalityPage;
  laBirthFatherOccupationPage: LABirthFatherOccupationPage;
  laBirthFatherLastKnownAddressBranchPage: LABirthFatherLastKnownAddressBranchPage;
  laBirthFatherLastKnownAddressPage: LABirthFatherLastKnownAddressPage;
  laBirthFatherLastDateConfirmedAddressPage: LABirthFatherLastDateConfirmedAddressPage;
  laBirthFatherServeDocumentsPage: LABirthFatherServeDocumentsPage;
  laOtherPersonResponsibilityPage: LAOtherPersonResponsibilityPage;
  laPlacementOrderNumberPage: LAPlacementOrderNumberPage;
  laPlacementDateOfOrderPage: LAPlacementDateOfOrderPage;
  laPlacementOrdersSummaryPage: LAPlacementOrdersSummaryPage;
  laChildHasOtherSiblingsPage: LAChildHasOtherSiblingsPage;
  laUploadDocumentsPage: LAUploadDocumentsPage;
  laCheckYourAnswerPage: LACheckYourAnswerPage;
  laStatementOfTruthPage: LAStatementOfTruthPage;
  laConfirmationPage: LAConfirmationPage;
}

export const pageFixtures = {
  startPage: async ({ page }, use) => {
    await use(new StartPage(page));
  },
  signIn: async ({ page }, use) => {
    await use(new SignIn(page));
  },
  citSaveAsDraftPage: async ({ page }, use) => {
    await use(new CITSaveAsDraftPage(page));
  },
  citApplyingWithPage: async ({ page }, use) => {
    await use(new CITApplyingWithPage(page));
  },
  citTaskListPage: async ({ page }, use) => {
    await use(new CITTaskListPage(page));
  },
  citDateChildMovedInPage: async ({ page }, use) => {
    await use(new CITDateChildMovedInPage(page));
  },
  citChildFullNamePage: async ({ page }, use) => {
    await use(new CITChildFullNamePage(page));
  },
  citChildFullNameAfterAdoptionPage: async ({ page }, use) => {
    await use(new CITChildFullNameAfterAdoptionPage(page));
  },
  citChildDoBPage: async ({ page }, use) => {
    await use(new CITChildDoBPage(page));
  },
  citChildSocialWorkerDetailsPage: async ({ page }, use) => {
    await use(new CITChildSocialWorkerDetailsPage(page));
  },
  citAdultSocialWorkerDetailsPage: async ({ page }, use) => {
    await use(new CITAdultSocialWorkerDetailsPage(page));
  },
  citOtherAdoptionAgencyPage: async ({ page }, use) => {
    await use(new CITOtherAdoptionAgencyPage(page));
  },
  citSubmittedPage: async ({ page }, use) => {
    await use(new CITSubmittedPage(page));
  },
  laSignInPage: async ({ page }, use) => {
    await use(new LASignInPage(page));
  },
  laGettingStartedPage: async ({ page }, use) => {
    await use(new LAGettingStartedPage(page));
  },
  laChildDetailsPage: async ({ page }, use) => {
    await use(new LAChildDetailsPage(page));
  },
  laChildSexAtBirthPage: async ({ page }, use) => {
    await use(new LAChildSexAtBirthPage(page));
  },
  laChildNationalityPage: async ({ page }, use) => {
    await use(new LAChildNationalityPage(page));
  },
  laBirthMotherNamePage: async ({ page }, use) => {
    await use(new LABirthMotherNamePage(page));
  },
  laBirthMotherAliveStatusPage: async ({ page }, use) => {
    await use(new LABirthMotherAliveStatusPage(page));
  },
  laBirthMotherNationalityPage: async ({ page }, use) => {
    await use(new LABirthMotherNationalityPage(page));
  },
  laBirthMotherOccupationPage: async ({ page }, use) => {
    await use(new LABirthMotherOccupationPage(page));
  },
  laBirthMotherLastKnownAddressBranchPage: async ({ page }, use) => {
    await use(new LABirthMotherLastKnownAddressBranchPage(page));
  },
  laBirthMotherLastKnownAddressPage: async ({ page }, use) => {
    await use(new LABirthMotherLastKnownAddressPage(page));
  },
  laBirthMotherLastDateConfirmedAddressPage: async ({ page }, use) => {
    await use(new LABirthMotherLastDateConfirmedAddressPage(page));
  },
  laBirthMotherServeDocumentsPage: async ({ page }, use) => {
    await use(new LABirthMotherServeDocumentsPage(page));
  },
  laBirthFatherOnCertificatePage: async ({ page }, use) => {
    await use(new LABirthFatherOnCertficatePage(page));
  },
  laBirthFatherNamePage: async ({ page }, use) => {
    await use(new LABirthFatherNamePage(page));
  },
  laBirthFatherStillAliveStatusPage: async ({ page }, use) => {
    await use(new LABirthFatherStillAliveStatusPage(page));
  },
  laBirthFatherParentalResponsibilityPage: async ({ page }, use) => {
    await use(new LABirthFatherParentalResponsibilityPage(page));
  },
  laBirthFatherParentalResponsibilityGrantedPage: async ({ page }, use) => {
    await use(new LABirthFatherParentalResponsibilityGrantedPage(page));
  },
  laBirthFatherNationalityPage: async ({ page }, use) => {
    await use(new LABirthFatherNationalityPage(page));
  },
  laBirthFatherOccupationPage: async ({ page }, use) => {
    await use(new LABirthFatherOccupationPage(page));
  },
  laBirthFatherLastKnownAddressBranchPage: async ({ page }, use) => {
    await use(new LABirthFatherLastKnownAddressBranchPage(page));
  },
  laBirthFatherLastKnownAddressPage: async ({ page }, use) => {
    await use(new LABirthFatherLastKnownAddressPage(page));
  },
  laBirthFatherLastDateConfirmedAddressPage: async ({ page }, use) => {
    await use(new LABirthFatherLastDateConfirmedAddressPage(page));
  },
  laBirthFatherServeDocumentsPage: async ({ page }, use) => {
    await use(new LABirthFatherServeDocumentsPage(page));
  },
  laOtherPersonResponsibilityPage: async ({ page }, use) => {
    await use(new LAOtherPersonResponsibilityPage(page));
  },
  laPlacementOrderNumberPage: async ({ page }, use) => {
    await use(new LAPlacementOrderNumberPage(page));
  },
  laPlacementDateOfOrderPage: async ({ page }, use) => {
    await use(new LAPlacementDateOfOrderPage(page));
  },
  laPlacementOrdersSummaryPage: async ({ page }, use) => {
    await use(new LAPlacementOrdersSummaryPage(page));
  },
  laChildHasOtherSiblingsPage: async ({ page }, use) => {
    await use(new LAChildHasOtherSiblingsPage(page));
  },
  laUploadDocumentsPage: async ({ page }, use) => {
    await use(new LAUploadDocumentsPage(page));
  },
  laCheckYourAnswerPage: async ({ page }, use) => {
    await use(new LACheckYourAnswerPage(page));
  },
  laStatementOfTruthPage: async ({ page }, use) => {
    await use(new LAStatementOfTruthPage(page));
  },
  // eslint-disable-next-line no-empty-pattern
  laConfirmationPage: async ({ page }, use) => {
    await use(new LAConfirmationPage(page));
  },
};
