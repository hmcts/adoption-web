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
  'Verify eligibility to adopt multiple children.',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.isEligible(eligibility.applyMoreThanOneChildYes);

    const accessibilityScanResults = await makeAxeBuilder()
      .disableRules(['target-size']) //bug raised: https://tools.hmcts.net/jira/browse/ADOP-2445
      .analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);

test(
  'Verify eligibility to adopt one child.',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.isEligible(eligibility.applyMoreThanOneChildNo);

    const accessibilityScanResults = await makeAxeBuilder()
      .disableRules(['target-size']) //bug raised: https://tools.hmcts.net/jira/browse/ADOP-2445
      .analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);
