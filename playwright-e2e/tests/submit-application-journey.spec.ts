import { test } from '@playwright/test';
import * as dotenv from 'dotenv';
import App from '../pages/app.page';
import { setupUser } from '../hooks/createDeleteUser.hook'
import { teardownUser } from '../hooks/createDeleteUser.hook'
import { faker } from '@faker-js/faker';

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


      const appOneFirstName = faker.person.firstName();
      const appOneLastName = faker.person.lastName();
      const appTwoFirstName = faker.person.firstName();
      const appTwoLastName = faker.person.lastName();
      const appOneFullname = appOneFirstName + ' ' + appOneLastName;
      const appTwoFullname = appTwoFirstName + ' ' + appTwoLastName;
      const childFirstName = faker.person.firstName();
      const childLastName = faker.person.lastName();
      
      await app.signIn.signIn(userEmail, userPassword);
      await app.numberOfApplicants.applyWithSpouseOrCivil();
      await app.basePage.clickSaveAndContinue();

      // Date child moved in with you
      await app.tasklist.dateChildMovedIn.click();
      await app.basePage.enterDate(-2);
      await app.basePage.clickSaveAndContinue();

      // Child's details before adoption
      await app.tasklist.childsDetails.click();
      await app.basePage.fillFirstLastName(appOneFirstName, appOneLastName);
      await app.basePage.clickSaveAndContinue();

      // Child's details after adoption
      await app.basePage.fillFirstLastName(childFirstName, childLastName);
      await app.basePage.clickSaveAndContinue();
      await app.basePage.enterDate(-2);
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
      await app.basePage.enterDate(-22);
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

      //Second applicant personal details
      await app.tasklist.secondApplicantPersonalDetails.click();
      await app.basePage.fillFirstLastName(appTwoFirstName, appTwoLastName);
      await app.basePage.clickSaveAndContinue();
      await app.addApplicants.otherNamesNo.check();
      await app.basePage.clickSaveAndContinue();
      await app.basePage.enterDate(-22);
      await app.basePage.clickSaveAndContinue();
      await app.addApplicants.addOccupationSecond();
      await app.basePage.clickSaveAndContinue();
      await app.extraSupport.noSupportNeeded();
      await app.basePage.clickSaveAndContinue();

      // Second applicant contact details
      await app.tasklist.secondApplicantContactDetails.click()
      await app.page.getByLabel('Yes').check(); //do you live at the same address?
      await app.basePage.clickSaveAndContinue();
      await app.contactDetails.fillContactDetails('abcdefg@domain.com', '0800800800');
      await app.basePage.clickSaveAndContinue();
      await app.contactDetails.englishLang.check();
      await app.basePage.clickSaveAndContinue();

      //submit
      
      await app.tasklist.reviewAndSubmit.click();
      await app.pcq.noPcqAnswers();
      await app.basePage.clickSaveAndContinue();
      await app.page.pause();
      await app.reviewSubmit.reviewAnswers();
      await app.page.pause();
      await app.basePage.clickSaveAndContinue();
      await app.reviewSubmit.statementOfTruth(appOneFullname, appTwoFullname);
      
     
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

