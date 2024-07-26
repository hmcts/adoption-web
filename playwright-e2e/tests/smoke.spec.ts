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

    const appOneName = await app.applicantOneNameCreate();
    const childNames = await app.childNameCreate();
    
    await app.signIn.signIn(userEmail, userPassword);
    await app.numberOfApplicants.numberOfApplication(applicantNumber);
    await app.basePage.clickSaveAndContinue();
    
    await app.childMoveIn(); // Date child moved in with you
   
    
    await app.fillChildDetails(childNames.prevChildFirstName, childNames.prevChildLastName, childNames.newChildFirstName, childNames.newChildLastName);// Child's details before adoption
    
    await app.fillSocialWorkerLocation1(socialWorkLocation);//fill social worker location
    await app.fillFamilyCourtLocation(familyCourtLocation);// The family court details
    
    // Fill personal details
    await app.tasklist.yourPersonalDetails.click(); 
    await app.fillPersonalDetails();
    await app.tasklist.yourContactDetails.click();
    await app.fillContactDetails(postcode1, telephone1);
    
    // Submit
    await app.tasklist.reviewAndSubmit.click(); 
    await app.pcq.noPcqAnswers();
    await app.reviewSubmit.reviewAnswers(applicantNumber);
    await app.basePage.clickSaveAndContinue();
    await app.reviewSubmit.statementOfTruthOne(appOneName.appOneFullname)
    await app.reviewSubmit.fillCardDetails(appOneName.appOneFullname, userEmail, postcode1);
    
    await runAccessibilityScan(makeAxeBuilder, testInfo);//Axe-core accessibility scan using helper function
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
