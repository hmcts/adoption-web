import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
import App from '../pages/app.page';
import { setupUser } from '../hooks/createDeleteUser.hook'
import { teardownUser } from '../hooks/createDeleteUser.hook'

dotenv.config();

test.describe(
  'e2e submit journeys',
  { tag: '@submit'}, () => {
    let userEmail: string;
    let userPassword: string;
    let userId: string;

    test.beforeEach(async ({ page }) => {
      const userInfo = await setupUser(page);
      if (userInfo) {
        userEmail = userInfo.email;
        userPassword = userInfo.password;
        userId = userInfo.id;
      }
    });

    test.afterEach('Status check', async ({ page }) => {
      await teardownUser(page, userId);
    });

    test('submitting application with spouse or civil partner', async ({ page }) => {
      const app = new App(page);


      await app.signIn.signIn(userEmail, userPassword);
      await app.numberOfApplicants.applyWithSpouseOrCivil();
      await app.basePage.clickSaveAndContinue();

      // Date child moved in with you
      await app.tasklist.dateChildMovedIn.click();
      await app.dateChildMoved.dateChildMovedInToday();
      await app.basePage.clickSaveAndContinue();

      // Child's details before adoption
      await app.tasklist.childsDetails.click();
      await app.basePage.fillFirstLastName();
      await app.basePage.clickSaveAndContinue();

      // Child's details after adoption
      await app.basePage.fillFirstLastName();
      await app.basePage.clickSaveAndContinue();
      await app.childDetails.childsDob();
      await app.basePage.clickSaveAndContinue();

      // Adoption agency and social worker
      await app.tasklist.adoptionAgency.click();
      await app.adoptionAgency.childsChildSocialWorkerDetails(); 
      await app.basePage.clickSaveAndContinue();
      await app.adoptionAgency.childsYourSocialWorkerDetails();
      await app.basePage.clickSaveAndContinue();
      await app.adoptionAgency.anotherAdoptionAgencyNo();
      await app.basePage.clickSaveAndContinue();

      // The family court details
      await app.tasklist.familyCourtDetails.click();

      await app.familyCourt.selectWhichCourt();
      await app.basePage.clickSaveAndContinue();
      await app.familyCourt.sameCourtYes();
      await app.basePage.clickSaveAndContinue();

      // First applicant Your personal details
      await app.tasklist.firstApplicantPersonalDetails.click();
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
      // await page.getByRole('link', { name: 'Your contact details  First' }).click();
      await app.tasklist.firstApplicantContactDetails.click();
      await app.basePage.postcodeFindAddress('BN26 6AL', '0');
      await app.basePage.clickSaveAndContinue();
      await app.contactDetails.fillContactDetails('1234567890@domain.com', '0800800800');
      await app.basePage.clickSaveAndContinue();
      await app.contactDetails.englishLang.check();
      await app.basePage.clickSaveAndContinue();
      await app.addApplicants.otherNamesNo.check();
      await app.basePage.clickSaveAndContinue();
      await app.addApplicants.dob();
      await app.basePage.clickSaveAndContinue();

      // // Second applicant Your personal details
      await app.tasklist.secondApplicantPersonalDetails.click();
      await app.basePage.fillFirstLastName();
      await app.basePage.clickSaveAndContinue();
      await app.addApplicants.dob();
      await app.basePage.clickSaveAndContinue();
      await app.addApplicants.addOccupationSecond();
      await app.basePage.clickSaveAndContinue();
      await app.extraSupport.noSupportNeeded();
      // await page.getByRole('button', { name: 'Save and continue' }).click();
      // await page.getByLabel('No', { exact: true }).check();
      // await page.getByRole('button', { name: 'Save and continue' }).click();
      // await page.getByLabel('Day').click();
      // await page.getByLabel('Day').fill('30');
      // await page.getByLabel('Month').click();
      // await page.getByLabel('Month').fill('05');
      // await page.getByLabel('Year').click();
      // await page.getByLabel('Year').fill('2024');
      // await app.basePage.clickSaveAndContinue();
      // await page.locator('#applicant2Occupation').click();
      // await page.locator('#applicant2Occupation').fill('teacher');
      // await app.basePage.clickSaveAndContinue();
      // await page.getByLabel('No - I do not need any extra').check();
      // await app.basePage.clickSaveAndContinue();

      // // Second applicant Your contact details
      // await page.getByRole('link', { name: 'Your contact details  Second' }).click();
      // await page.getByLabel('Yes').check();
      // await app.basePage.clickSaveAndContinue();
      // await page.getByLabel('Email address').click();
      // await page.getByLabel('Email address').fill('firstname+lastname@domain.com');
      // await page.getByLabel('UK phone number').click();
      // await page.getByLabel('UK phone number').fill('0800800800');
      // await app.basePage.clickSaveAndContinue();
      // await page.getByLabel('English').check();
      await app.basePage.clickSaveAndContinue();
    });

    test('submitting application with someone who is not my spouse or civil partner', async ({ page }) => {
      console.log('what is this ?' + process.env.IDAM_TESTING_SUPPORT_USERS_URL);
    });

    test('submitting application on my own', async ({ page }) => {
      // TO DO
    });
  }
);
function axeBuilder(testInfo: any) {
  throw new Error('Function not implemented.');
}

function makeAxeBuilderFunction(testInfo: any) {
  throw new Error('Function not implemented.');
}

