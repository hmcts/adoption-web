import { expect, test } from '../../fixtures/fixtures';
import { Eligibility } from '../../pages/eligibility-pages';
import { urlConfig } from '../../utils/urls';

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
  "Verify you can only apply to adopt multiple children if they've not been married or in a civil partnership.",
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.isMarriedOrCivilPartnership(eligibility.applyMoreThanOneChildYes);

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
    await eligibility.isMarriedOrCivilPartnership(eligibility.applyMoreThanOneChildNo);

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);
