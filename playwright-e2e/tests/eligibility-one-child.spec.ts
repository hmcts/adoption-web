import { test } from '@playwright/test';

import { Eligibility } from '../pages/eligibility-pages';
import { urlConfig } from '../settings/urls';

test.beforeEach(async ({ page }) => {
  await page.goto(urlConfig.citizenStartUrl);
});

test('Verify eligibility to adopt one child.', async ({ page }) => {
  const eligibility = new Eligibility(page);
  await eligibility.isEligible();
});

test('Verify you can only apply to adopt a child if they are under 18 years old.', async ({ page }) => {
  const eligibility = new Eligibility(page);
  await eligibility.isNotover18();
});

test("Verify you can only apply to adopt a child if they've not been married or in a civil partnership.", async ({
  page,
}) => {
  const eligibility = new Eligibility(page);
  await eligibility.isMarriedOrCivilPartnership();
});

test('Verify you must be 21 or over to adopt a child. This includes any other applicant.', async ({ page }) => {
  const eligibility = new Eligibility(page);
  await eligibility.youAndApplicantUnder21();
});

test('Verify you cannot apply to adopt a child unless you have a permanent home in the UK, Channel Islands or Isle of Man.', async ({
  page,
}) => {
  const eligibility = new Eligibility(page);
  await eligibility.notUKResident();
});

test('Verify you cannot apply to adopt a child unless you have a lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident).', async ({
  page,
}) => {
  const eligibility = new Eligibility(page);
  await eligibility.notUKResident12Months();
});
