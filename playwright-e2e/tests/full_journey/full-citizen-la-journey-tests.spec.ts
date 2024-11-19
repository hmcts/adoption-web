import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

import { test } from '../../fixtures/fixtures';
import { runAccessibilityScan } from '../../helpers/accessibilityHelper';
import * as e2eJourneyHelper from '../../helpers/e2eJourneyHelper';
import { setupUser, teardownUser } from '../../hooks/createDeleteUser.hook';
import App from '../../pages/app.page';

dotenv.config();

test.describe('e2e citzen submit citizen and la journeys', () => {
  let userEmail: string;
  let userPassword: string;
  let userId: string;

  test.beforeEach(async ({ signIn }) => {
    const userInfo = await setupUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
      userId = userInfo.id;
    }
    await signIn.navigateTo();
  });

  test.afterEach('Status check', async () => {
    await teardownUser(userId);
  });

  const e2eTestTags = { tag: ['@e2e', '@citizen', '@accessibility'] };

  test(
    'submitting application where spouse is not a partner local authority journey',
    e2eTestTags,
    async (
      {
        page,
        laSignInPage,
        laGettingStartedPage,
        laChildDetailsPage,
        laChildSexAtBirthPage,
        laChildNationalityPage,
        laBirthMotherNamePage,
        laBirthMotherAliveStatusPage,
        laBirthMotherNationalityPage,
        laBirthMotherOccupationPage,
        laBirthMotherLastKnownAddressBranchPage,
        laBirthMotherLastKnownAddressPage,
        laBirthMotherLastDateConfirmedAddressPage,
        laBirthMotherDocumentsPage,
        laBirthFatherOnCertificatePage,
        laBirthFatherNamePage,
        laBirthFatherStillAliveStatusPage,
        laBirthFatherParentalResponsibilityPage,
        laBirthFatherParentalResponsibilityGrantedPage,
        laBirthFatherNationalityPage,
        laBirthFatherOccupationPage,
        laBirthFatherLastKnownAddressBranchPage,
        laBirthFatherLastKnownAddressPage,
        laBirthFatherLastDateConfirmedAddressPage,
        laBirthFatherServeDocumentsPage,
        laOtherPersonResponsibilityPage,
        laPlacementOrderNumberPage,
        laPlacementDateOfOrderPage,
        laPlacementOrdersInPlacePage,
        laChildHasOtherSiblingsPage,
        laUploadDocumentsPage,
        laCheckYourAnswerPage,
        laStatementOfTruthPage,
        makeAxeBuilder,
      },
      testInfo
    ) => {
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
      let referenceNum: string | null = await element.textContent();
      if (referenceNum !== null) {
        referenceNum = referenceNum.replace(/-/g, '');
      } else {
        referenceNum = '';
      }

      await laSignInPage.navigateTo();
      await laSignInPage.startLAJourney(referenceNum, childFullname);
      await laGettingStartedPage.laGettingStarted();
      await laChildDetailsPage.clickBirthCertificateDetailsSection();

      // Child sex at birth page
      await laChildSexAtBirthPage.checkMaleRadioButton();
      await laChildSexAtBirthPage.clickSaveAndContinue();

      // Child nationality page
      await laChildNationalityPage.checkBritishCheckbox();
      await laChildNationalityPage.clickSaveAndContinue();

      // Back to main naviagation page
      laChildDetailsPage.clickBirthMotherDetailsLink();

      // Mother section
      // Mother name page
      await laBirthMotherNamePage.fillBirthMotherNames('Jayne', 'Eyre');
      await laBirthMotherNamePage.clickSaveAndContinue();

      // Mother alive page
      await laBirthMotherAliveStatusPage.checkBirthMotherAliveYesRadioButton();
      await laBirthMotherAliveStatusPage.clickSaveAndContinue();

      // Mother nationality page
      await laBirthMotherNationalityPage.checkMotherNationalityBritishCheckbox();
      await laBirthMotherNationalityPage.clickSaveAndContinue();

      // Mother occupation page
      await laBirthMotherOccupationPage.fillBirthMotherOccupationLabel('Teacher');
      await laBirthMotherOccupationPage.clickSaveAndContinue();

      // Mother address branch page
      await laBirthMotherLastKnownAddressBranchPage.checkYesRadioButton();
      await laBirthMotherLastKnownAddressBranchPage.clickSaveAndContinue();

      // Mother last known address page
      await laBirthMotherLastKnownAddressPage.fillPostCodeLabel('SW1A 0AA');
      await laBirthMotherLastKnownAddressPage.clickFindAddressButton();
      await laBirthMotherLastKnownAddressPage.selectAddressOption('0');
      await laBirthMotherLastKnownAddressPage.clickSaveAndContinue();

      // Mother last date confirmed address page
      await laBirthMotherLastDateConfirmedAddressPage.fillDayLabel('01');
      await laBirthMotherLastDateConfirmedAddressPage.fillMonthLabel('01');
      await laBirthMotherLastDateConfirmedAddressPage.fillYearLabel('2020');
      await laBirthMotherLastDateConfirmedAddressPage.clickSaveAndContinue();

      // Moother documents page
      await laBirthMotherDocumentsPage.checkYesRadioButton();
      await laBirthMotherDocumentsPage.clickSaveAndContinue();

      // Back to the main navigation page
      await laChildDetailsPage.clickBirthFatherDetailsLink();

      // Father on certificate
      await laBirthFatherOnCertificatePage.checkYesRadioButton();
      await laBirthFatherOnCertificatePage.clickSaveAndContinue();

      // Father name page
      await laBirthFatherNamePage.fillFirstNameLabel('tester');
      await laBirthFatherNamePage.fillLastNameLabel('tests');
      await laBirthFatherNamePage.clickSaveAndContinue();

      // Father alive page
      await laBirthFatherStillAliveStatusPage.checkYesRadioButton();
      await laBirthFatherStillAliveStatusPage.clickSaveAndContinue();

      // Father parental responsibility
      await laBirthFatherParentalResponsibilityPage.checkYesRadioButton();
      await laBirthFatherParentalResponsibilityPage.clickSaveAndContinue();

      // Father parental responsibility granted
      await laBirthFatherParentalResponsibilityGrantedPage.checkBirthCertificateCheckbox();
      await laBirthFatherParentalResponsibilityGrantedPage.clickSaveAndContinue();

      // Father nationality page
      await laBirthFatherNationalityPage.checkBritishCheckbox();
      await laBirthFatherNationalityPage.clickSaveAndContinue();

      // Father occupation page
      await laBirthFatherOccupationPage.fillBirthFatherOccupationLabel('Teacher');
      await laBirthFatherOccupationPage.clickSaveAndContinue();

      // Father last known address branch page
      await laBirthFatherLastKnownAddressBranchPage.checkYesRadioButton();
      await laBirthFatherLastKnownAddressBranchPage.clickSaveAndContinue();

      // Father last known address page
      await laBirthFatherLastKnownAddressPage.fillPostCodeLabel('SW1A 0AA');
      await laBirthFatherLastKnownAddressPage.clickFindAddressButton();
      await laBirthFatherLastKnownAddressPage.selectAddressOption('0');
      await laBirthFatherLastKnownAddressPage.clickSaveAndContinue();

      // Father last date address confirmed page
      await laBirthFatherLastDateConfirmedAddressPage.fillDayLabel('01');
      await laBirthFatherLastDateConfirmedAddressPage.fillMonthLabel('01');
      await laBirthFatherLastDateConfirmedAddressPage.fillYearLabel('1990');
      await laBirthFatherLastDateConfirmedAddressPage.clickSaveAndContinue();

      // Father documents page page
      await laBirthFatherServeDocumentsPage.checkYesRadioButton();
      await laBirthFatherServeDocumentsPage.clickSaveAndContinue();

      // Back to main navigaton page
      await laChildDetailsPage.clickOtherPersonLink();

      // Other person parental responsibility page
      await laOtherPersonResponsibilityPage.checkNoRadioButton();
      await laOtherPersonResponsibilityPage.clickSaveAndContinue();

      // Back to main navigation page
      await laChildDetailsPage.clickPlacementAndOrderLink();

      // courts order number page
      await laPlacementOrderNumberPage.fillOrderNumberLabel('abc');
      laPlacementOrderNumberPage.clickSaveAndContinue();

      // courts date page
      await laPlacementDateOfOrderPage.fillDayLabel('01');
      await laPlacementDateOfOrderPage.fillMonthLabel('01');
      await laPlacementDateOfOrderPage.fillYearLabel('2020');
      await laPlacementDateOfOrderPage.clickSaveAndContinue();

      // court orders already in place
      await laPlacementOrdersInPlacePage.checkNoRadioButton();
      await laPlacementOrdersInPlacePage.clickSaveAndContinue();

      // Back to main navigation page
      await laChildDetailsPage.clickSiblingCourtOrderDetailsLink();

      // siblings order page
      await laChildHasOtherSiblingsPage.checkNoRadioButton();
      await laChildHasOtherSiblingsPage.clickSaveAndContinue();

      // Back to main navigation page
      await laChildDetailsPage.clickUploadDocumentLink();

      // upload documents page
      await laUploadDocumentsPage.checkCannotUploadDocumentsCheckbox();
      await laUploadDocumentsPage.clickSaveAndContinue();

      // Back to main navigation page
      await laChildDetailsPage.clickReviewAndSubmitButton();

      // Check you answers page
      await laCheckYourAnswerPage.clickContinue();

      // statement of truth page
      await laStatementOfTruthPage.fillFullNameLabel('John Smith');
      await laStatementOfTruthPage.fillJobTItleLabel('solicitor');
      await laStatementOfTruthPage.fillLocalAuthorityRepresentationLabel('KCC');
      await laStatementOfTruthPage.checkTruthStatementCheckbox();
      await laStatementOfTruthPage.clickConfirm();

      await runAccessibilityScan(makeAxeBuilder, testInfo);
    }
  );
});
