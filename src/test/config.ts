import { PropertiesVolume } from '../main/modules/properties-volume';
import { Application } from 'express';

if (!process.env.TEST_PASSWORD) {
  new PropertiesVolume().enableFor({ locals: { developmentMode: true } } as unknown as Application);
}

import sysConfig from 'config';
import { getTokenFromApi } from '../main/app/auth/service/get-service-auth-token';
import { YOUR_DETAILS_URL } from '../main/steps/urls';

import { IdamUserManager } from './steps/IdamUserManager';

// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
  throw reason;
});

getTokenFromApi();

const generateTestUsername = () => `nfdiv.frontend.test.${new Date().getTime()}.${Math.random()}@hmcts.net`;
const TestUser = generateTestUsername();
const TestPass = process.env.TEST_PASSWORD || sysConfig.get('e2e.userTestPassword') || '';
const idamUserManager = new IdamUserManager(sysConfig.get('services.idam.tokenURL'));

export const autoLogin = {
  login: (I: CodeceptJS.I, username = TestUser, password = TestPass): void => {
    I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
    I.waitForText('Sign in or create an account');
    I.fillField('username', username);
    I.fillField('password', password);
    I.click('Sign in');
    I.waitForText('Apply for a divorce', 30);
  },
  check: (I: CodeceptJS.I): void => {
    I.amOnPage(`${YOUR_DETAILS_URL}?lng=en`);
    I.waitForText('Apply for a divorce');
  },
  restore: (I: CodeceptJS.I, cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const config = {
  TEST_URL: process.env.TEST_URL || 'http://localhost:3001',
  TestHeadlessBrowser: process.env.TEST_HEADLESS ? process.env.TEST_HEADLESS === 'true' : true,
  TestSlowMo: 250,
  WaitForTimeout: 10000,
  GetCurrentUser: (): { username: string; password: string } => ({
    username: idamUserManager.getCurrentUsername(),
    password: TestPass,
  }),
  GetUser: (index: number): { username: string; password: string } => ({
    username: idamUserManager.getUsername(index),
    password: TestPass,
  }),
  GetOrCreateCaseWorker: async (): Promise<{ username: string; password: string }> => {
    let caseWorker = idamUserManager.getCaseWorker();
    if (!caseWorker) {
      caseWorker = generateTestUsername();
      await idamUserManager.createCaseWorker(caseWorker, TestPass);
    }
    return {
      username: caseWorker,
      password: TestPass,
    };
  },
  clearNewUsers: async (): Promise<void> => {
    await idamUserManager.clearAndKeepOnlyOriginalUser();
  },
  Gherkin: {
    features: './features/**/*.feature',
    steps: [
      '../steps/common.ts',
      '../steps/date.ts',
      '../steps/check-your-answers.ts',
      '../steps/happy-path.ts',
      '../steps/you-need-to-review-your-application.ts',
    ],
  },
  bootstrap: async (): Promise<void> => idamUserManager.createUser(TestUser, TestPass),
  teardown: async (): Promise<void> => idamUserManager.deleteAll(),
  helpers: {},
  AutoLogin: {
    enabled: true,
    saveToFile: false,
    users: {
      citizen: autoLogin,
      citizenSingleton: {
        login: (I: CodeceptJS.I): void => {
          const username = generateTestUsername();
          idamUserManager.createUser(username, TestPass);
          autoLogin.login(I, username, TestPass);
        },
        check: autoLogin.check,
        fetch: (): void => {
          // don't fetch existing login
        },
        restore: (): void => {
          // don't restore existing login
        },
      },
    },
  },
};

config.helpers = {
  Playwright: {
    url: config.TEST_URL,
    show: !config.TestHeadlessBrowser,
    browser: 'chromium',
    waitForTimeout: config.WaitForTimeout,
    waitForAction: 1000,
    waitForNavigation: 'networkidle0',
    ignoreHTTPSErrors: true,
  },
};
