import fs from 'fs';

import Axios from 'axios';
import htmlReporter from 'pa11y/lib/reporters/html';
import puppeteer from 'puppeteer';

import * as urls from '../../main/steps/urls';
import { config } from '../config';

const pa11y = require('pa11y');
const axios = Axios.create({ baseURL: config.TEST_URL });

interface Pa11yResult {
  documentTitle: string;
  pageUrl: string;
  issues: PallyIssue[];
}

interface PallyIssue {
  code: string;
  context: string;
  message: string;
  selector: string;
  type: string;
  typeCode: number;
}

const ignoredA11yErrors = [];

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return axios.get(url);
}

function runPally(url: string, browser, page): Promise<Pa11yResult> {
  let screenCapture: string | boolean = false;
  if (!config.TestHeadlessBrowser) {
    const screenshotDir = `${__dirname}/../../../output/pa11y`;
    fs.mkdirSync(screenshotDir, { recursive: true });
    screenCapture = `${screenshotDir}/${url.replace(/^\/$/, 'home').replace('/', '')}.png`;
  }

  const { TEST_URL } = config;
  const fullUrl = `${TEST_URL.endsWith('/') ? TEST_URL.slice(0, TEST_URL.length - 1) : TEST_URL}${url}`;
  return pa11y(fullUrl, {
    ignore: ignoredA11yErrors,
    browser,
    page,
    screenCapture,
    hideElements: '.govuk-footer__licence-logo, .govuk-header__logotype-crown',
  });
}

function expectNoErrors(messages: PallyIssue[]): void {
  const errors = messages.filter(m => m.type === 'error');

  if (errors.length > 0) {
    const errorsAsJson = `${JSON.stringify(errors, null, 2)}`;
    throw new Error(`There are accessibility issues: \n${errorsAsJson}\n`);
  }
}

jest.retryTimes(3);
jest.setTimeout(15000);

describe('Accessibility', () => {
  let browser;
  let cookies;
  let hasAfterAllRun = false;

  const setup = async () => {
    if (hasAfterAllRun) {
      return;
    }
    if (browser) {
      await browser.close();
    }

    browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: true });
    browser.on('disconnected', setup);

    // Login once only for other pages to reuse session
    const page = await browser.newPage();
    await page.goto(config.TEST_URL);
    await page.type('#username', process.env.CITIZEN_USERNAME);
    await page.type('#password', process.env.CITIZEN_PASSWORD);
    await page.click('input[type="submit"]');
    cookies = await page.cookies(config.TEST_URL);
  };

  beforeAll(setup);

  afterAll(async () => {
    hasAfterAllRun = true;
    await browser.close();
  });

  const IGNORED_URLS = [
    urls.SIGN_IN_URL,
    urls.SIGN_OUT_URL,
    urls.CALLBACK_URL,
    urls.SAVE_AND_SIGN_OUT,
    urls.KEEP_ALIVE_URL,
    urls.TIMED_OUT_URL,
    urls.CSRF_TOKEN_ERROR_URL,
    urls.RESPONDENT,
    urls.APPLICATION_ENDED,
    urls.APPLICANT_1,
    urls.APPLICANT_2,
    urls.CHILDREN,
    urls.BIRTH_MOTHER,
    urls.BIRTH_FATHER,
    urls.OTHER_PARENT,
    urls.SIBLING,
    urls.RELATIONSHIP_DATE_URL,
    urls.CHECK_JURISDICTION,
    urls.WHERE_YOUR_LIVES_ARE_BASED_URL,
    urls.JURISDICTION_INTERSTITIAL_URL,
    urls.RESIDUAL_JURISDICTION,
    urls.JURISDICTION_MAY_NOT_BE_ABLE_TO,
    urls.JURISDICTION_CONNECTION_SUMMARY,
    urls.YOUR_NAME,
    urls.APPLY_FINANCIAL_ORDER,
    urls.SENT_TO_APPLICANT2_FOR_REVIEW,
    urls.PAY_AND_SUBMIT,
    urls.NO_RESPONSE_YET,
    urls.APPLICATION_SUBMITTED,
    urls.SWITCH_TO_SOLE_APPLICATION,
    urls.CONFIRM_JOINT_APPLICATION,
    urls.HUB_PAGE,
    urls.HOW_DO_YOU_WANT_TO_RESPOND,
    urls.ELIGIBILITY_URL,
    urls.INELIGIBLE_TO_ADOPT,
    urls.REVIEW_PAY_SUBMIT,
    urls.PAY_YOUR_FEE,
    urls.PAYMENT_CALLBACK_URL,
    urls.EQUALITY,
    urls.DOCUMENT_MANAGER,
    urls.LA_DOCUMENT_MANAGER,
    urls.UPLOAD_YOUR_DOCUMENTS,
    urls.CHILDREN_FIND_PLACEMENT_ORDER_COURT,
    urls.CHILDREN_FIND_FAMILY_COURT,
    urls.CHILDREN_PLACEMENT_ORDER_COURT,
    urls.APPLICANT_1_OCCUPATION,
    urls.APPLICANT_2_OCCUPATION,
    urls.CHILDREN_PLACEMENT_ORDER_NUMBER,
    urls.SIBLING_ORDER_CASE_NUMBER,
    urls.BIRTH_MOTHER_OCCUPATION,
    urls.BIRTH_FATHER_OCCUPATION,
  ];
  const urlsToTest = Object.values(urls).filter(url => !IGNORED_URLS.includes(url) && !url.startsWith(urls.LA_PORTAL));

  describe.each(urlsToTest)('Page %s', url => {
    let page;

    test(`Page ${url} should have no accessibility errors`, async () => {
      page = await browser.newPage();
      await page.goto(config.TEST_URL);
      await page.setCookie(...cookies);

      await ensurePageCallWillSucceed(url);

      const result = await runPally(url, browser, page);
      const html = await htmlReporter.results(result);

      const reportsDir = `${__dirname}/../../../output/pa11y${url.slice(0, url.lastIndexOf('/'))}`;
      fs.mkdirSync(reportsDir, { recursive: true });
      fs.writeFileSync(`${reportsDir}${url.slice(url.lastIndexOf('/'))}.html`, html);

      expect(result.issues).toEqual(expect.any(Array));
      expectNoErrors(result.issues);
    });
  });
});

describe('Accessibility LA portal', () => {
  let browser;
  let cookies;
  let hasAfterAllRun = false;
  let page;

  const setup = async () => {
    if (hasAfterAllRun) {
      return;
    }
    if (browser) {
      await browser.close();
    }

    browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: true });
    browser.on('disconnected', setup);
    // Login once only for other pages to reuse session
    page = await browser.newPage();
    const relativeUrl = config.TEST_URL.endsWith('/')
      ? config.TEST_URL.slice(0, config.TEST_URL.length - 1)
      : config.TEST_URL;
    await page.goto(`${relativeUrl}${urls.LA_PORTAL_KBA_CASE_REF}`);
    await page.type('#kbaCaseRef', '1660928381607622');
    await page.type('#kbaChildName', 'a a');
    await page.type('#kbaChildrenDateOfBirth-day', '1');
    await page.type('#kbaChildrenDateOfBirth-month', '1');
    await page.type('#kbaChildrenDateOfBirth-year', '2021');
    await page.click('button[type="submit"]');
    cookies = await page.cookies(config.TEST_URL);
  };

  beforeAll(setup);

  afterAll(async () => {
    hasAfterAllRun = true;
    await browser.close();
  });

  const IGNORED_URLS = [
    urls.LA_PORTAL_KBA_CASE_REF,
    urls.LA_PORTAL_KBA_CALLBACK,
    urls.LA_PORTAL_UPLOAD_YOUR_DOCUMENTS,
    urls.LA_PORTAL_CHILD_PLACEMENT_ORDER_COURT,
    urls.LA_PORTAL_BIRTH_MOTHER_OCCUPATION,
    urls.LA_PORTAL_BIRTH_FATHER_OCCUPATION,
  ];

  const urlsToTest = Object.values(urls).filter(url => url.startsWith(urls.LA_PORTAL) && !IGNORED_URLS.includes(url));

  describe.each(urlsToTest)('Page %s', url => {
    test(`Page ${url} should have no accessibility errors`, async () => {
      // await page.setCookie(...cookies);
      console.log(cookies);
      const relativeUrl = config.TEST_URL.endsWith('/')
        ? config.TEST_URL.slice(0, config.TEST_URL.length - 1)
        : config.TEST_URL;
      await page.goto(`${relativeUrl}${urls.LA_PORTAL_START_PAGE}`);

      // await ensurePageCallWillSucceed(url);

      const result = await runPally(url, browser, page);
      const html = await htmlReporter.results(result);

      const reportsDir = `${__dirname}/../../../output/pa11y${url.slice(0, url.lastIndexOf('/'))}`;
      fs.mkdirSync(reportsDir, { recursive: true });
      fs.writeFileSync(`${reportsDir}${url.slice(url.lastIndexOf('/'))}.html`, html);

      expect(result.issues).toEqual(expect.any(Array));
      expectNoErrors(result.issues);
    });
  });
});
