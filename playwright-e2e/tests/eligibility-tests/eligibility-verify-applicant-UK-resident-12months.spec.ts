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
  'Verify you cannot apply to adopt multiple children unless you have a lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident).',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.notUKResident12Months(eligibility.applyMoreThanOneChildYes);

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
    await eligibility.notUKResident12Months(eligibility.applyMoreThanOneChildNo);

    const accessibilityScanResults = await makeAxeBuilder().analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);
