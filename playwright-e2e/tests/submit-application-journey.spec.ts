import AxeBuilder from '@axe-core/playwright';
import { faker } from '@faker-js/faker';
import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';

import { runAccessibilityScan } from '../helpers/accessibilityHelper';
import * as e2eJourneyHelper from '../helpers/e2eJourneyHelper';
import { setupUser, teardownUser } from '../hooks/createDeleteUser.hook';
import App from '../pages/app.page';
import { getPersonalDetailsStatus } from 'steps/application/task-list/utils';

dotenv.config();

const test = base.extend<{ makeAxeBuilder: () => AxeBuilder }>({
  makeAxeBuilder: async ({ page }, use) => {
    await use(() => new AxeBuilder({ page }));
  },
});

test.describe('e2e submit journeys', () => {
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
    'submitting application where spouse is not a partner',
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
      const stringNumberOfApplicationLocator = 'notSpouseOrCivilPartner';

      // Sign-in
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

      // This is doing something else now
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
      await e2eJourneyHelper.citizenAdoptionSubmitApplication(app, appOneFullname, appTwoFullname);

      await runAccessibilityScan(makeAxeBuilder, testInfo);
    }
  );

  test(
    'submitting application with spouse or civil partner',
    e2eTestTags,
    async ({ page, makeAxeBuilder }, testInfo) => {
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
      e2eJourneyHelper.citizenAdoptionDateChildMovedIn(app);

      // Child's details before adoption
      e2eJourneyHelper.citzenAdoptionChildDetailsBeforeAdoption(app, appOneFirstName, appOneFullname);

      // Child's details after adoption
      e2eJourneyHelper.citizenAdoptionChildDetailsAfterAdoption(app, childFirstName, childLastName);

      // Social Worker Details
      e2eJourneyHelper.citizenAdoptionFamilyCourtDetails(app);

      // The family court details
      e2eJourneyHelper.citizenAdoptionFamilyCourtDetails(app);

      // First applicant Your personal details
      e2eJourneyHelper.citizenAdoptionApplicantPersonalDetails(app);

      // First applicant Your contact details
      e2eJourneyHelper.citizenAdoptionApplicantContactDetails(app);

      //Second applicant personal details
      e2eJourneyHelper.citizenAdoptionSecondApplicantPersonalDetails(app, appTwoFirstName, appTwoLastName);

      //Second applicant contact details
      e2eJourneyHelper.citizenAdoptionSecondApplicantContactDetails(app);

      //submit
      e2eJourneyHelper.citizenAdoptionSubmitApplication(app, appOneFullname, appTwoFullname);

      await runAccessibilityScan(makeAxeBuilder, testInfo);
    }
  );
});
