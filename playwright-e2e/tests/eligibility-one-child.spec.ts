import { expect, test } from '../fixtures/fixtures';
import { Eligibility } from '../pages/eligibility-pages';
import { urlConfig } from '../utils/urls';

const attachTestInfo = async (testInfo, data) => {
  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(data, null, 2),
    contentType: 'application/json',
  });
};

test.beforeEach(async ({ page }) => {
  await page.goto(urlConfig.citizenStartUrl);
});

test(
  'Verify eligibility to adopt one child.',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.isEligible();

    const accessibilityScanResults = await makeAxeBuilder().disableRules(['target-size']).analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);

test(
  'Verify you can only apply to adopt a child if they are under 18 years old.',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.isNotover18();

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);

test(
  "Verify you can only apply to adopt a child if they've not been married or in a civil partnership.",
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.isMarriedOrCivilPartnership();

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);

test(
  'Verify you must be 21 or over to adopt a child. This includes any other applicant.',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.youAndApplicantUnder21();

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);

test(
  'Verify you cannot apply to adopt a child unless you have a permanent home in the UK, Channel Islands or Isle of Man.',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.notUKResident();

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);

test(
  'Verify you cannot apply to adopt a child unless you have a lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident).',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.notUKResident();

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);