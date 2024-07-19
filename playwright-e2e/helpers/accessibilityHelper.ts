import AxeBuilder from '@axe-core/playwright';
import { TestInfo } from '@playwright/test';
import { expect } from '../fixtures/fixtures';

type MakeAxeBuilder = () => AxeBuilder;
export async function attachTestInfo(testInfo: TestInfo, data: object): Promise<void> {
  await testInfo.attach('accessibility-scan-results', {
    body: JSON.stringify(data, null, 2),
    contentType: 'application/json',
  });
}
export async function runAccessibilityScan(makeAxeBuilder: MakeAxeBuilder, testInfo: TestInfo): Promise<void> {
  const accessibilityScanResults = await makeAxeBuilder()
    .disableRules(['aria-allowed-attr', 'target-size'])
    //axe-core triggers known GDS issue (https://github.com/alphagov/govuk-frontend/issues/979) on conditional radio buttons (https://design-system.service.gov.uk/components/radios/conditional-reveal/)
    //bug raised for target size: https://tools.hmcts.net/jira/browse/ADOP-2445
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
    .analyze();
  await attachTestInfo(testInfo, accessibilityScanResults);
  expect(accessibilityScanResults.violations).toEqual([]);
}
export { expect } from "@playwright/test";
