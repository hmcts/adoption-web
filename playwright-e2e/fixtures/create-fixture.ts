import { test as base } from '@playwright/test';

import { LAChildNationalityPage } from '../page-objects/local-authority/birth-certificate/laChildNationalityPage.page';
import { LAChildSexAtBirthPage } from '../page-objects/local-authority/birth-certificate/laChildSexAtBirthPage.page';
import { LABirthFatherLastDateConfirmedAddressPage } from '../page-objects/local-authority/birth-father/laBirthFatherLastDateConfirmedAddressPage.page';
import { LABirthFatherLastKnownAddressBranchPage } from '../page-objects/local-authority/birth-father/laBirthFatherLastKnownAddressBranchPage.page';
import { LABirthFatherNamePage } from '../page-objects/local-authority/birth-father/laBirthFatherNamePage.page';
import { LABirthFatherNationalityPage } from '../page-objects/local-authority/birth-father/laBirthFatherNationalityPage.page';
import { LABirthFatherOccupationPage } from '../page-objects/local-authority/birth-father/laBirthFatherOccupationPage.page';
import { LABirthFatherOnCertficatePage } from '../page-objects/local-authority/birth-father/laBirthFatherOnCertificatePage.page';
import { LABirthFatherParentalResponsibilityGrantedPage } from '../page-objects/local-authority/birth-father/laBirthFatherParentalResponsibilityGrantedPage.page';
import { LABirthFatherParentalResponsibilityPage } from '../page-objects/local-authority/birth-father/laBirthFatherParentalResponsibilityPage.page';
import { LABirthFatherServeDocumentsPage } from '../page-objects/local-authority/birth-father/laBirthFatherServeDocumentsPage.page';
import { LABirthFatherStillAliveStatusPage } from '../page-objects/local-authority/birth-father/laBirthFatherStillAliveStatusPage.page';
import { LABirthFatherLastKnownAddressPage } from '../page-objects/local-authority/birth-father/lsBirthFatherLastKnownAddressPage.page';
import { LABirthMotherAliveStatusPage } from '../page-objects/local-authority/birth-mother/laBirthMotherAliveStatusPage.page';
import { LABirthMotherDocumentsPage } from '../page-objects/local-authority/birth-mother/laBirthMotherDocumentsPage.page';
import { LABirthMotherLastDateConfirmedAddressPage } from '../page-objects/local-authority/birth-mother/laBirthMotherLastDateConfirmedAddressPage.page';
import { LABirthMotherLastKnownAddressBranchPage } from '../page-objects/local-authority/birth-mother/laBirthMotherLastKnownAddressBranchPage.page';
import { LABirthMotherLastKnownAddressPage } from '../page-objects/local-authority/birth-mother/laBirthMotherLastKnownAddressPage.page';
import { LABirthMotherNamePage } from '../page-objects/local-authority/birth-mother/laBirthMotherNamePage.page';
import { LABirthMotherNationalityPage } from '../page-objects/local-authority/birth-mother/laBirthMotherNationalityPage.page';
import { LABirthMotherOccupationPage } from '../page-objects/local-authority/birth-mother/laBirthMotherOccupationPage.page';
import { LAUploadDocumentsPage } from '../page-objects/local-authority/document-upload/laUploadDocuments.page';
import { LACheckYourAnswerPage } from '../page-objects/local-authority/laCheckYourAnswer.page';
import { LAChildDetailsPage } from '../page-objects/local-authority/laChildDetailsPage.page';
import { LAGettingStartedPage } from '../page-objects/local-authority/laGettingStartedPage.page';
import { LASignInPage } from '../page-objects/local-authority/laSignInPage.page';
import { LAStatementOfTruthPage } from '../page-objects/local-authority/laStatementOfTruth.page';
import { LAOtherPersonResponsibilityPage } from '../page-objects/local-authority/other-person/laOtherPersonResponsibilityPage.page';
import { LAPlacementDateOfOrderPage } from '../page-objects/local-authority/placement/laPlacementDateOfOrderPage.page';
import { LAPlacementOrderNumberPage } from '../page-objects/local-authority/placement/laPlacementOrderNumberPage.page';
import { LAPlacementOrdersInPlacePage } from '../page-objects/local-authority/placement/laPlacementOrdersInPlacePage.page';
import { LAChildHasOtherSiblingsPage } from '../page-objects/local-authority/siblings/laSiblingCourtDetailsSection.page';
import SignIn from '../pages/signInPage.page';

type CreateFixtures = {
  signIn: SignIn;
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
  laBirthMotherDocumentsPage: LABirthMotherDocumentsPage;
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
  laPlacementOrdersInPlacePage: LAPlacementOrdersInPlacePage;
  laChildHasOtherSiblingsPage: LAChildHasOtherSiblingsPage;
  laUploadDocumentsPage: LAUploadDocumentsPage;
  laCheckYourAnswerPage: LACheckYourAnswerPage;
  laStatementOfTruthPage: LAStatementOfTruthPage;
};

export const test = base.extend<CreateFixtures>({
  signIn: async ({ page }, use) => {
    await use(new SignIn(page));
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
  laBirthMotherDocumentsPage: async ({ page }, use) => {
    await use(new LABirthMotherDocumentsPage(page));
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
  laPlacementOrdersInPlacePage: async ({ page }, use) => {
    await use(new LAPlacementOrdersInPlacePage(page));
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
});