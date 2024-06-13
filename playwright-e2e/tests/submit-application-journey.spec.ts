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
      await app.basePage.saveAndContinue.click();

      // Date child moved in with you
      await app.tasklist.dateChildMovedIn.click();
      await app.basePage.enterDate(-2);
      await app.basePage.saveAndContinue.click();

      // Child's details before adoption
      await app.tasklist.childsDetails.click();
      await app.basePage.fillFirstLastName(appOneFirstName, appOneLastName);
      await app.basePage.saveAndContinue.click();

      // Child's details after adoption
      await app.basePage.fillFirstLastName(childFirstName, childLastName);
      await app.basePage.saveAndContinue.click();
      await app.basePage.enterDate(-2);
      await app.basePage.saveAndContinue.click();

      // Adoption agency and social worker
      await app.tasklist.adoptionAgency.click();
      await app.adoptionAgency.childsChildSocialWorkerDetails('sandwell'); 
      await app.basePage.saveAndContinue.click();
      await app.adoptionAgency.childsYourSocialWorkerDetails('sandwell');
      await app.basePage.saveAndContinue.click();
      await app.adoptionAgency.anotherAdoptionAgencyNo();
      await app.basePage.saveAndContinue.click();

      // The family court details
      await app.tasklist.familyCourtDetails.click();
      await app.familyCourt.courtLocation('luton');
      await app.basePage.saveAndContinue.click();
      await app.familyCourt.sameCourtYes();
      await app.basePage.saveAndContinue.click();

      // First applicant Your personal details
      await app.tasklist.firstApplicantPersonalDetails.click();
      await app.basePage.saveAndContinue.click();
      await app.addApplicants.otherNamesSelectNo();
      await app.basePage.saveAndContinue.click();
      await app.basePage.enterDate(-22);
      await app.basePage.saveAndContinue.click();
      await app.addApplicants.addOccupationFirst();
      await app.basePage.saveAndContinue.click();
      await app.extraSupport.noSupportNeeded();
      await app.basePage.saveAndContinue.click();

      // First applicant Your contact details
      // await page.getByRole('link', { name: 'Your contact details  First' }).click();
      await app.tasklist.firstApplicantContactDetails.click();
      await app.basePage.postcodeFindAddress('BN26 6AL', '0');
      await app.basePage.saveAndContinue.click();
      await app.contactDetails.fillContactDetails('1234567890@domain.com', '0800800800');
      await app.basePage.saveAndContinue.click();
      await app.contactDetails.englishLang.check();
      await app.basePage.saveAndContinue.click();

      //Second applicant personal details
      await app.tasklist.secondApplicantPersonalDetails.click();
      await app.basePage.fillFirstLastName(appTwoFirstName, appTwoLastName);
      await app.basePage.saveAndContinue.click();
      await app.addApplicants.otherNamesNo.check();
      await app.basePage.saveAndContinue.click();
      await app.basePage.enterDate(-22);
      await app.basePage.saveAndContinue.click();
      await app.addApplicants.addOccupationSecond();
      await app.basePage.saveAndContinue.click();
      await app.extraSupport.noSupportNeeded();
      await app.basePage.saveAndContinue.click();

      // Second applicant contact details
      await app.tasklist.secondApplicantContactDetails.click()
      await app.page.getByLabel('Yes').check(); //do you live at the same address?
      await app.basePage.saveAndContinue.click();
      await app.contactDetails.fillContactDetails('abcdefg@domain.com', '0800800800');
      await app.basePage.saveAndContinue.click();
      await app.contactDetails.englishLang.check();
      await app.basePage.saveAndContinue.click();

      //submit
      
      await app.tasklist.reviewAndSubmit.click();
      await app.pcq.noPcqAnswers();
      await app.basePage.saveAndContinue.click();
      await app.page.pause();
      await app.reviewSubmit.statementOfTruth(appOneFullname, appTwoFullname);
      await app.reviewSubmit.fillCardDetails(appOneFullname, 'abcdefg@domain.com');
    });

    test('submitting application with someone who is not my spouse or civil partner', async ({ page }) => {
      console.log('what is this ?' + process.env.IDAM_TESTING_SUPPORT_USERS_URL);
    });

    test('submitting application on my own', async ({ page }) => {
      // TO DO
    });
  }
);


