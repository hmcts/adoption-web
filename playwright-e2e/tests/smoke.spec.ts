import AxeBuilder from '@axe-core/playwright';
import { faker } from '@faker-js/faker';
import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';

import { runAccessibilityScan } from '../helpers/accessibilityHelper';
import { setupUser, teardownUser } from '../hooks/createDeleteUser.hook';
import App from '../pages/app.page';

dotenv.config();

const test = base.extend<{ makeAxeBuilder: () => AxeBuilder }>({
  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }));
  },
});

test.describe('smoke test', () => {
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

  const smokeTestTags = { tag: ['@smoke', '@citizen', '@accessibility'] };

  async function submitSingleApplicationJourney(page, 
    makeAxeBuilder, 
    testInfo, 
    applicantNumber, 
    socialWorkLocation, 
    familyCourtLocation, 
    postcode1, 
    telephone1) {
    const app = new App(page);

    await app.applicantOneNameCreate();
    await app.childNameCreate();
    
    await app.signIn.signIn(userEmail, userPassword);
    await app.numberOfApplicants.numberOfApplication(applicantNumber);
    await app.basePage.clickSaveAndContinue();

    // Date child moved in with you
    await app.childMoveIn();
    // Child's details before adoption
    await app.fillChildDetails(prevChildFirstName, prevChildLastName, newChildFirstName, newChildLastName);
    //fill social worker location
    await app.fillSocialWorkerLocation1(socialWorkLocation);

    // The family court details
    await app.fillFamilyCourtLocation(familyCourtLocation);
    
    // First applicant Your personal details
    await app.tasklist.yourPersonalDetails.click();
    await app.basePage.clickSaveAndContinue();
    await app.addApplicants.otherNamesSelectNo();
    await app.basePage.clickSaveAndContinue();
    await app.addApplicants.dob();
    await app.basePage.clickSaveAndContinue();
    await app.addApplicants.addOccupationFirst();
    await app.basePage.clickSaveAndContinue();
    await app.extraSupport.noSupportNeeded();
    await app.basePage.clickSaveAndContinue();

    // First applicant Your contact details
    await app.tasklist.yourContactDetails.click();
    await app.basePage.postcodeFindAddress(postcode1, '0');
    await app.basePage.clickSaveAndContinue();
    await app.contactDetails.fillContactDetails('test@local.com', telephone1);
    await app.basePage.clickSaveAndContinue();
    await app.contactDetails.englishLang.check();
    await app.basePage.clickSaveAndContinue();

    
    // Submit
    await app.tasklist.reviewAndSubmit.click();
    await app.pcq.noPcqAnswers();
    await app.reviewSubmit.reviewAnswers(applicantNumber);
    await app.basePage.clickSaveAndContinue();
    await app.reviewSubmit.statementOfTruthOne(appOneFullname)
    await app.reviewSubmit.fillCardDetails(appOneFullname, userEmail, postcode1);
    await runAccessibilityScan(makeAxeBuilder, testInfo);
  }

  test(
    'smoke test: single person submits an adoption application',
    smokeTestTags,
    async ({ page, makeAxeBuilder }, testInfo) => {
      await submitSingleApplicationJourney(
        page, 
        makeAxeBuilder, 
        testInfo, 
        'alone', 
        'Sandwell Metropolitan Council', 
        'Leicester County Court', 
        'BN26 6AL', 
        '0800800800'
      );
    }
  );
});
