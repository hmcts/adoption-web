import { faker } from '@faker-js/faker';
import { test } from '../fixtures/fixtures.ts';
import * as dotenv from 'dotenv';

import * as e2eJourneyHelper from '../helpers/e2eJourneyHelper.ts';
import App from '../pages/app.page.ts';

dotenv.config();

test.describe('e2e submit journeys', () => {
  let userEmail: string;
  let userPassword: string;

  test.beforeEach(async ({ citizenUserUtils }) => {
    const userInfo = await citizenUserUtils.createUser();
    if (userInfo) {
      userEmail = userInfo.email;
      userPassword = userInfo.password;
    }
  });

  const e2eTestTags = { tag: ['@e2e', '@citizen', '@accessibility'] };

  test('submitting application where spouse is not a partner', e2eTestTags, async ({ page, axeUtils }, testInfo) => {
    const app = new App(page);
    const appOneFirstName = faker.person.firstName();
    const appOneLastName = faker.person.lastName();
    const appTwoFirstName = faker.person.firstName();
    const appTwoLastName = faker.person.lastName();
    const appOneFullname = appOneFirstName + ' ' + appOneLastName;
    const appTwoFullname = appTwoFirstName + ' ' + appTwoFirstName;
    const childFirstName = faker.person.firstName();
    const childLastName = faker.person.lastName();
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

    await axeUtils.audit();
  });

  test('submitting application with spouse or civil partner', e2eTestTags, async ({ page, axeUtils }, testInfo) => {
    const app = new App(page);
    const appOneFirstName = faker.person.firstName();
    const appOneLastName = faker.person.lastName();
    const appTwoFirstName = faker.person.firstName();
    const appTwoLastName = faker.person.lastName();
    const appOneFullname = appOneFirstName + ' ' + appOneLastName;
    const appTwoFullname = appTwoFirstName + ' ' + appTwoLastName;
    const childFirstName = faker.person.firstName();
    const childLastName = faker.person.lastName();
    const stringNumberOfApplicationLocator = 'spouseOrCivilPartner';

    // Sign in
    await e2eJourneyHelper.citizenAdoptionSignInWithPartner(
      app,
      userEmail,
      userPassword,
      stringNumberOfApplicationLocator
    );

    // Date child moved in with you
    await e2eJourneyHelper.citizenAdoptionDateChildMovedIn(app);

    // Child's details before adoption
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

    //Second applicant contact details
    await e2eJourneyHelper.citizenAdoptionSecondApplicantContactDetails(app);

    //submit
    await e2eJourneyHelper.citizenAdoptionSubmitApplication(
      app,
      appOneFullname,
      appTwoFullname,
      stringNumberOfApplicationLocator
    );
    await axeUtils.audit();
  });
});
