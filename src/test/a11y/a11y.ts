import fs from 'fs';

import Axios from 'axios';
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

function ensurePageCallWillSucceed(url: string): Promise<void> {
  return axios.get(url);
}

function runPally(url: string, browser): Promise<Pa11yResult> {
  let screenCapture: string | boolean = false;
  if (!config.TestHeadlessBrowser) {
    const screenshotDir = `${__dirname}/../../../functional-output/pa11y`;
    fs.mkdirSync(screenshotDir, { recursive: true });
    screenCapture = `${screenshotDir}/${url.replace(/^\/$/, 'home').replace('/', '')}.png`;
  }

  const fullUrl = `${config.TEST_URL}${url}`;
  return pa11y(fullUrl, {
    browser,
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

    browser = await puppeteer.launch({ ignoreHTTPSErrors: true });
    browser.on('disconnected', setup);

    // Login once only for other pages to reuse session
    const page = await browser.newPage();
    console.log(config.TEST_URL);
    await page.goto(config.TEST_URL);
    await page.type('#username', process.env.CITIZEN_USERNAME);
    await page.type('#password', process.env.CITIZEN_PASSWORD);
    await page.click('input[type="submit"]');
    cookies = await page.cookies(config.TEST_URL);
    console.log(cookies);
    await page.close();
  };

  beforeAll(setup);

  beforeEach(async () => {
    const page = await browser.newPage();
    await page.goto(config.TEST_URL);
    await page.setCookie(...cookies);
    await page.goto(`${config.TEST_URL}/info`);
    await page.close();
  });

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
  ];
  const urlsNoSignOut = Object.values(urls)
    .filter(url => !IGNORED_URLS.includes(url))
    .map(item => item.slice(1));
  console.log(urlsNoSignOut);
  // const urlsNoSignOut = [urls.RELATIONSHIP_NOT_BROKEN_URL]
  test.each(urlsNoSignOut)('Page %s should have no accessibility errors', async url => {
    await ensurePageCallWillSucceed(url);
    console.log('url ', url);
    const result = await runPally(url, browser);
    console.log('result ', result);
    expect(result.issues).toEqual(expect.any(Array));
    expectNoErrors(result.issues);
  });
});
