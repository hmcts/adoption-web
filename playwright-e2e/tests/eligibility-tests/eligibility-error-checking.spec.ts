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
  'Error check throughout eligibility journey to ensure user selects an option for every question',
  { tag: ['@eligibility', '@citizen', '@accessibility'] },
  async ({ page, makeAxeBuilder }, testInfo) => {
    const eligibility = new Eligibility(page);
    await eligibility.errorCheck();

    const accessibilityScanResults = await makeAxeBuilder()
      .disableRules(['aria-allowed-attr', 'target-size'])
      //axe-core triggers known GDS issue (https://github.com/alphagov/govuk-frontend/issues/979) on conditional radio buttons (https://design-system.service.gov.uk/components/radios/conditional-reveal/)
      //bug raised: https://tools.hmcts.net/jira/browse/ADOP-2445
      .analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
  }
);
