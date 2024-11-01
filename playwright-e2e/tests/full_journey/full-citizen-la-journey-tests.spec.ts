import AxeBuilder from '@axe-core/playwright';
import { faker } from '@faker-js/faker';
import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';

import { runAccessibilityScan } from '../../helpers/accessibilityHelper';
import * as e2eJourneyHelper from '../../helpers/e2eJourneyHelper';
import { setupUser, teardownUser } from '../../hooks/createDeleteUser.hook';
import { PageFactory } from '../../page-objects/pageFactory';
import App from '../../pages/app.page';

dotenv.config();

const test = base.extend<{ makeAxeBuilder: () => AxeBuilder }>({
  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }));
  },
});

test.describe('e2e citzen submit citizen and la journeys', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async () => {
    const userInfo = await setupUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
      userId = userInfo.id;
    }
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  const e2eTestTags = { tag: ['@e2e', '@citizen', '@accessibility'] };

  test(
    'submitting application where spouse is not a partner local authority journey',
    e2eTestTags,
    async ({ page, makeAxeBuilder }, testInfo) => {
      const app = new App(page);
      const appOneFirstName = faker.person.firstName();
      const appOneLastName = faker.person.lastName();
      const appTwoFirstName = faker.person.firstName();
      const appTwoLastName = faker.person.lastName();
      const appOneFullname = appOneFirstName + ' ' + appOneLastName;
      const appTwoFullname = appTwoFirstName + ' ' + appTwoFirstName;
      const childFirstName = faker.person.firstName();
      const childLastName = faker.person.lastName();
      const childFullname = childFirstName + ' ' + childLastName;
      const stringNumberOfApplicationLocator = 'notSpouseOrCivilPartner';

      // Sign in
      await e2eJourneyHelper.citizenAdoptionSignInWithNoPartner(
        app,
        userEmail,
        userPassword,
        stringNumberOfApplicationLocator
      );

      // Date child move in with you
      await e2eJourneyHelper.citizenAdoptionDateChildMovedIn(app);

      //  Child's details before adoption
      await e2eJourneyHelper.citzenAdoptionChildDetailsBeforeAdoption(app, appOneFirstName, appOneLastName);

      // Child's details after adoption
      await e2eJourneyHelper.citizenAdoptionChildDetailsAfterAdoption(app, childFirstName, childLastName);

      // Social Worker Details
      await e2eJourneyHelper.citizenAdoptionSocialWorkDetails(app);

      // The family court details
      await e2eJourneyHelper.citizenAdoptionFamilyCourtDetails(app);

      // First applicant Your personal details
      await e2eJourneyHelper.citizenAdoptionApplicantPersonalDetails(app);

      // First applicant Your contact details
      await e2eJourneyHelper.citizenAdoptionApplicantContactDetails(app);

      //Second applicant personal details
      await e2eJourneyHelper.citizenAdoptionSecondApplicantPersonalDetails(app, appTwoFirstName, appTwoLastName);

      // Second applicant contact details
      await e2eJourneyHelper.citizenAdoptionSecondApplicantContactDetails(app);

      // submit
      await e2eJourneyHelper.citizenAdoptionSubmitApplication(
        app,
        appOneFullname,
        appTwoFullname,
        stringNumberOfApplicationLocator
      );

      // acquire reference number
      const element = await app.page
        .locator('.govuk-panel.govuk-panel--confirmation .govuk-panel__body strong')
        .first();
      let referenceNum: string = await element.textContent();
      referenceNum = referenceNum.replace(/-/g, '');

      // Start LA Journey
      // const laSignInPage = new LASignInPage(page);
      // await laSignInPage.startLAJourney(referenceNum, childFullname);

      const pageFactory = new PageFactory(page);
      await pageFactory.getLASignInPage().startLAJourney(referenceNum, childFullname);
      await pageFactory.getLAGettingStartedPage().laGettingStarted();
      await pageFactory.getLAChildDetailsPage().clickBirthCertificateDetailsSection();
      const laChildSexAtBirthPage = pageFactory.getLAChildSexAtBirthPage();
      await laChildSexAtBirthPage.checkMaleRadioButton();
      await laChildSexAtBirthPage.clickSaveAndContinue();
      const laChildNationalityPage = pageFactory.getLAChildNationalityPage();
      await laChildNationalityPage.checkBritishCheckbox();
      await laChildNationalityPage.clickSaveAndContinue();
      await pageFactory.getLAChildDetailsPage().clickBirthMotherDetailsLink();
      const laBirthMotherNamePage = pageFactory.getLABirthMotherNamePage();
      await laBirthMotherNamePage.fillBirthMotherNames('Jayne', 'Eyre');
      await laBirthMotherNamePage.clickSaveAndContinue();
      const laBirthMotherAliveStatusPage = pageFactory.getLABirthMotherAliveStatusPage();
      await laBirthMotherAliveStatusPage.checkBirthMotherAliveYesRadioButton();
      await laBirthMotherAliveStatusPage.clickSaveAndContinueButton();
      const laBirthMotherNationalityPage = pageFactory.getLABirthMotherNationalityPage();
      await laBirthMotherNationalityPage.checkMotherNationalityBirishCheckbox();
      await laBirthMotherNationalityPage.clickSaveAndContinueButton();
      const laBirthMotherOccupationPage = pageFactory.getLABirthMotherOccupationPage();
      await laBirthMotherOccupationPage.fillBirthMotherOccupationLabel('Teacher');
      await laBirthMotherOccupationPage.clickSaveAndContinue();
      const laBirthMotherLastKnownAddressBranchPage = pageFactory.getLABirthMotherLastKnownAddressBranch();
      await laBirthMotherLastKnownAddressBranchPage.checkBirthMotherLastKnownAddressYesRadioButton();
      await laBirthMotherLastKnownAddressBranchPage.clickSaveAndContinue();
      const laBirthMotherLastKnownAddressPage = pageFactory.getLABirthMotherLastKnownAddress();
      await laBirthMotherLastKnownAddressPage.fillPostCodeLabel('SW1A 0AA');
      await laBirthMotherLastKnownAddressPage.clickFindAddressButton();
      await laBirthMotherLastKnownAddressPage.selectAddressOption('0');
      await laBirthMotherLastKnownAddressPage.clickSaveAndContinueButton();
      const laBirthMotherLastDateConfirmedAddressPage = pageFactory.getLABirthMotherLastDateConfirmedAddressPage();
      await laBirthMotherLastDateConfirmedAddressPage.fillDayLabel('01');
      await laBirthMotherLastDateConfirmedAddressPage.fillMonthLabel('01');
      await laBirthMotherLastDateConfirmedAddressPage.fillYearLabel('2020');
      await laBirthMotherLastDateConfirmedAddressPage.clickSaveAndContinueButton();
      const laBirthMotherDocumentsPage = pageFactory.getLABirthMotherDocumentsPage();
      await laBirthMotherDocumentsPage.checkYesRadioButton();
      await laBirthMotherDocumentsPage.clickSaveAndContinueButton();
      // Back to the main navigation page
      await pageFactory.getLAChildDetailsPage().clickBirthFatherDetailsLink();
      const laBirthFatherOnCertficatePage = pageFactory.getLABirthFatherOnCertficatePage();
      await laBirthFatherOnCertficatePage.checkYesRadioButton();
      await laBirthFatherOnCertficatePage.clickSaveAndContinueButton();
      // Father name page
      const laBirthFatherNamePage = pageFactory.getLABirthFatherNamePage();
      await laBirthFatherNamePage.fillFirstNameLabel('tester');
      await laBirthFatherNamePage.fillLastNameLabel('tests');
      await laBirthFatherNamePage.clickSaveAndContinue();
      // Father alive page
      const laBirthFatherStillAliveStatusPage = pageFactory.getLABirthFatherStillAliveStatusPage();
      await laBirthFatherStillAliveStatusPage.checkYesRadioButton();
      await laBirthFatherStillAliveStatusPage.clickSaveAndContinue();
      // Father parental responsibility
      const laBirthFatherParentalResponsibilityPage = pageFactory.getLABirthFatherParentalResponsibilityPage();
      await laBirthFatherParentalResponsibilityPage.checkYesRadioButton();
      await laBirthFatherParentalResponsibilityPage.clickSaveAndContinue();
      // Father parental responsibility granted
      const laBirthFatherParentalResponsibilityGrantedPage =
        pageFactory.getLABirthFatherParentalResponsibilityGrantedPage();
      await laBirthFatherParentalResponsibilityGrantedPage.checkBirthCertificateCheckbox();
      await laBirthFatherParentalResponsibilityGrantedPage.clickSaveAndContinue();
      // Father nationality page
      const laBirthFatherNationalityPage = pageFactory.getLABirthFatherNationalityPage();
      await laBirthFatherNationalityPage.checkBritishCheckbox();
      await laBirthFatherNationalityPage.clickSaveAndContinueButton();
      // Father occupation page
      const laBirthFatherOccupationPage = pageFactory.getLABirthFatherOccupationPage();
      await laBirthFatherOccupationPage.fillBirthFatherOccupationLabel('Teacher');
      await laBirthFatherOccupationPage.clickSaveAndContinueButton();
      // Father last known address branch page
      const laBirthFatherLastKnownAddressBranchPage = pageFactory.getLABirthFatherLastKnownAddressBranchPage();
      await laBirthFatherLastKnownAddressBranchPage.checkYesRadioButton();
      await laBirthFatherLastKnownAddressBranchPage.clickSaveAndContinue();
      // Father last known address page
      const laBirthFatherLastKnownAddressPage = pageFactory.getLABirthFatherKnownAddressPage();
      await laBirthFatherLastKnownAddressPage.fillPostCodeLabel('SW1A 0AA');
      await laBirthFatherLastKnownAddressPage.clickFindAddressButton();
      await laBirthFatherLastKnownAddressPage.selectAddressOption('0');
      await laBirthFatherLastKnownAddressPage.clickSaveAndContinueButton();
      // Father last date address confirmed page
      const laBirthFatherLastDateConfirmedAddressPage = pageFactory.getLABirthFatherLastDateConfirmedAddressPage();
      await laBirthFatherLastDateConfirmedAddressPage.fillDayLabel('01');
      await laBirthFatherLastDateConfirmedAddressPage.fillMonthLabel('01');
      await laBirthFatherLastDateConfirmedAddressPage.fillYearLabel('1990');
      await laBirthFatherLastDateConfirmedAddressPage.clickSaveAndContinueButton();
      // Father documents page page
      const laBirthFatherDocumentsPage = pageFactory.getLABirthFatherDocumentsPage();
      await laBirthFatherDocumentsPage.checkYesRadioButton();
      await laBirthFatherDocumentsPage.clickSaveAndContinueButton();
      // Back to main navigation page
      await pageFactory.getLAChildDetailsPage().clickOtherPersonLink();
      // Other person parental responsibility page
      const laOtherPersonResponsibilityPage = pageFactory.getLAOtherPersonResponsibilityPage();
      await laOtherPersonResponsibilityPage.checkNoRadioButton();
      await laOtherPersonResponsibilityPage.clickAndSaveContinue();
      // Back to main navigation page
      await pageFactory.getLAChildDetailsPage().clickPlacementAndOrderLink();
      // courts order number page
      const laPlacementOrderNumberPage = pageFactory.getLAPlacementOrderNumberPage();
      await laPlacementOrderNumberPage.fillOrderNumberLabel('abc');
      await laPlacementOrderNumberPage.clickSaveAndContinueButton();
      // courts date page
      const laPlacementDateOfOrderPage = pageFactory.getLAPlacementDateOfOrderPage();
      await laPlacementDateOfOrderPage.fillDayLabel('01');
      await laPlacementDateOfOrderPage.fillMonthLabel('01');
      await laPlacementDateOfOrderPage.fillYearLabel('2020');
      await laPlacementDateOfOrderPage.clickSaveAndContinueButton();
      // court orders already in place
      const laPlacementOrdersInPlacePage = pageFactory.getLAPlacementOrdersInPlacePage();
      await laPlacementOrdersInPlacePage.checkNoRadioButton();
      await laPlacementOrdersInPlacePage.clickSaveAndContinueButton();
      // Back to main navigation page
      await pageFactory.getLAChildDetailsPage().clickSiblingCourtOrderDetailsLink();
      // siblings order page
      const laChildHasOtherSiblingsPage = pageFactory.getLAChildHasOtherSiblingsPage();
      await laChildHasOtherSiblingsPage.checkNoRadioButton();
      await laChildHasOtherSiblingsPage.clickSaveAndContinueButton();
      // Back to main navigation page
      await pageFactory.getLAChildDetailsPage().clickUploadDocumentLink();
      // upload documents page
      const laUploadDocumentsPage = pageFactory.getLAUploadDocumentsPage();
      await laUploadDocumentsPage.checkCannotUploadDocumentsCheckbox();
      await laUploadDocumentsPage.clickSaveAndContinueButton();
      // Back to main navigation page
      await pageFactory.getLAChildDetailsPage().clickReviewAndSubmitButton();
      // Check you answers page
      await pageFactory.getLACheckYourAnswerPage().clickContinueButton();
      // statement of truth page
      const laStatementOfTruthPage = pageFactory.getLAStatementOfTruthPage();
      await laStatementOfTruthPage.fillFullNameLabel('John Smith');
      await laStatementOfTruthPage.fillJobTItleLabel('solicitor');
      await laStatementOfTruthPage.fillLocalAuthorityRepresentationLabel('KCC');
      await laStatementOfTruthPage.checkTruthStatementCheckbox();
      await laStatementOfTruthPage.clickConfirmButton();

      await runAccessibilityScan(makeAxeBuilder, testInfo);
    }
  );
});
