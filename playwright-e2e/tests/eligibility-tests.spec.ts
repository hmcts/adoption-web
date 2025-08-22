import { Page } from '@playwright/test';

import { test } from '../fixtures/fixtures';
import { runAccessibilityScan } from '../helpers/accessibilityHelper';
import { Eligibility } from '../pages/eligibility.page';
import { urlConfig } from '../utils/urls';

test.describe('Eligibility journey e2e tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(urlConfig.citizenStartUrl);
  });

  const eligibilityTestTags = { tag: ['@eligibility', '@citizen', '@accessibility'] };

  const runEligibilityTest = async (page: Page, testInfo, testFunction) => {
    const eligibility = new Eligibility(page);
    await testFunction(eligibility);
    await runAccessibilityScan(page, testInfo);
  };

  test(
    'Error check throughout eligibility journey to ensure user selects an option for every question',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.errorCheck();
      });
    }
  );

  test(
    'Verify you can only apply to adopt multiple children if they are under 18 years old.',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.isNotover18(eligibility.applyMoreThanOneChildYes);
      });
    }
  );

  test(
    'Verify you can only apply to adopt a child if they are under 18 years old.',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.isNotover18(eligibility.applyMoreThanOneChildNo);
      });
    }
  );

  test(
    "Verify you can only apply to adopt multiple children if they've not been married or in a civil partnership.",
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.isMarriedOrCivilPartnership(eligibility.applyMoreThanOneChildYes);
      });
    }
  );

  test(
    "Verify you can only apply to adopt a child if they've not been married or in a civil partnership.",
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.isMarriedOrCivilPartnership(eligibility.applyMoreThanOneChildNo);
      });
    }
  );

  test(
    'Verify you cannot apply to adopt multiple children unless you have a permanent home in the UK, Channel Islands or Isle of Man.',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.notUKResident(eligibility.applyMoreThanOneChildYes);
      });
    }
  );

  test(
    'Verify you cannot apply to adopt a child unless you have a permanent home in the UK, Channel Islands or Isle of Man.',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.notUKResident(eligibility.applyMoreThanOneChildNo);
      });
    }
  );

  test(
    'Verify you cannot apply to adopt multiple children unless you have a lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident).',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.notUKResident12Months(eligibility.applyMoreThanOneChildYes);
      });
    }
  );

  test(
    'Verify you cannot apply to adopt a child unless you have a lived in the UK, Channel Islands or Isle of Man for the last 12 months (habitually resident).',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.notUKResident12Months(eligibility.applyMoreThanOneChildNo);
      });
    }
  );

  test(
    'Verify you must be 21 or over to adopt multiple children. This includes any other applicant.',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.notUKResident12Months(eligibility.applyMoreThanOneChildYes);
      });
    }
  );

  test(
    'Verify you must be 21 or over to adopt a child. This includes any other applicant.',
    eligibilityTestTags,
    async ({ page }, testInfo) => {
      await runEligibilityTest(page, testInfo, async eligibility => {
        await eligibility.youAndApplicantUnder21(eligibility.applyMoreThanOneChildNo);
      });
    }
  );

  test('Verify eligibility to adopt multiple children.', eligibilityTestTags, async ({ page }, testInfo) => {
    await runEligibilityTest(page, testInfo, async eligibility => {
      await eligibility.youAndApplicantUnder21(eligibility.applyMoreThanOneChildYes);
    });
  });

  test('Verify eligibility to adopt one child.', eligibilityTestTags, async ({ page }, testInfo) => {
    await runEligibilityTest(page, testInfo, async eligibility => {
      await eligibility.youAndApplicantUnder21(eligibility.applyMoreThanOneChildNo);
    });
  });
});
