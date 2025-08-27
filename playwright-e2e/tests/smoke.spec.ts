import * as dotenv from 'dotenv';

import { expect, test } from '../fixtures/fixtures';
import App from '../pages/app.page';
import { toggleBanner, toggleConfig } from '../utils/toggles';
import { urlConfig } from '../utils/urls';

dotenv.config();

test.describe('smoke test', () => {
  let userEmail: string;
  let userPassword: string;

  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(async ({ citizenUserUtils }) => {
    const userInfo = await citizenUserUtils.createUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
    }
  });

  const smokeTestTags = { tag: ['@smoke', '@citizen', '@accessibility'] };
  async function submitSingleApplicationJourney(
    page,
    axeUtils,
    testInfo,
    applicantNumber,
    socialWorkLocation,
    familyCourtLocation,
    postcode1,
    telephone1
  ) {
    const app = new App(page);

    const appOneName = await app.applicantOneNameCreate();
    const childNames = await app.childNameCreate();

    await app.page.goto(urlConfig.citizenStartUrl);
    if (toggleBanner.bannerEnabled) {
      await expect(app.basePage.banner.bannerTitle).toBeVisible({ timeout: 500 });
      await expect(app.basePage.banner.bannerText).toBeVisible({ timeout: 500 });
    }

    await app.signIn.navigateTo();
    await app.signIn.signIn(userEmail, userPassword);
    await app.numberOfApplicants.numberOfApplication(applicantNumber);
    await app.basePage.clickSaveAndContinue();

    await app.childMoveIn(); // Date child moved in with you

    await app.fillChildDetails(
      childNames.prevChildFirstName,
      childNames.prevChildLastName,
      childNames.newChildFirstName,
      childNames.newChildLastName
    ); // Child's details before adoption

    await app.fillSocialWorkerLocation1(socialWorkLocation); //fill social worker location
    await app.fillFamilyCourtLocation(familyCourtLocation); // The family court details

    // Fill personal details
    await app.tasklist.yourPersonalDetails.click();
    await app.fillPersonalDetails();
    await app.tasklist.yourContactDetails.click();
    await app.fillContactDetails(postcode1, telephone1);

    // Submit
    await app.tasklist.reviewAndSubmit.click();
    if (toggleConfig.pcqTestsEnabled) {
      await app.pcq.noPcqAnswers();
    }
    await app.reviewSubmit.reviewAnswers(applicantNumber);
    await app.basePage.clickSaveAndContinue();
    await app.reviewSubmit.statementOfTruthOne(appOneName.appOneFullname);
    await app.reviewSubmit.fillCardDetails(appOneName.appOneFullname, userEmail, postcode1);

    await axeUtils.audit(); //Axe-core accessibility scan using helper function
  }

  test(
    'smoke test: single person submits an adoption application',
    smokeTestTags,
    async ({ page, axeUtils }, testInfo) => {
      await submitSingleApplicationJourney(
        page,
        axeUtils,
        testInfo,
        'alone',
        'Sandwell Metropolitan Council',
        'Leicester County Court',
        'BN26 6AL',
        '08008008000'
      );
    }
  );
});
