import { expect} from '../fixtures/fixtures';

export async function attachTestInfo(testInfo: any, data: any): Promise<void> {
    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(data, null, 2),
        contentType: 'application/json',
    });
}

export async function runAccessibilityScan(makeAxeBuilder: any, testInfo: any): Promise<void> {
    const accessibilityScanResults = await makeAxeBuilder()
    .disableRules(['aria-allowed-attr', 'target-size'])
    //axe-core triggers known GDS issue (https://github.com/alphagov/govuk-frontend/issues/979) on conditional radio buttons (https://design-system.service.gov.uk/components/radios/conditional-reveal/)
    //bug raised for target size: https://tools.hmcts.net/jira/browse/ADOP-2445
        .analyze();
    await attachTestInfo(testInfo, accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
}
