// import { PropertiesVolume } from '../main/modules/properties-volume';
// import { Application } from 'express';

// if (!process.env.TEST_PASSWORD) {
//   new PropertiesVolume().enableFor({ locals: { developmentMode: true } } as unknown as Application);
// }

import sysConfig from 'config';
import { getTokenFromApi } from '../main/app/auth/service/get-service-auth-token';

import { IdamUserManager } from './steps/IdamUserManager';

// better handling of unhandled exceptions
process.on('unhandledRejection', reason => {
  throw reason;
});

getTokenFromApi();

const generateTestUsername = () => `adoption.web.automationTest.${new Date().getTime()}@hmcts.net`;
const TestUser = generateTestUsername();
const TestPass = process.env.CITIZEN_PASSWORD || sysConfig.get('e2e.userTestPassword') || '';
const idamUserManager = new IdamUserManager(sysConfig.get('services.idam.tokenURL'));

export const autoLogin = {
  login: (I: CodeceptJS.I, username = TestUser, password = TestPass): void => {
    I.amOnPage(`${process.env.ADOP_WEB_URL}`);
    I.wait(5);
    I.waitForText('Sign in or create an account', 30);
    I.fillField('username', username);
    I.wait(2);
    I.fillField('password', password);
    I.click('Sign in');
    I.waitForText('Are you applying on your own, or with someone else?', 30);
  },
  check: (I: CodeceptJS.I): void => {
    I.amOnPage(`${process.env.ADOP_WEB_URL}`);
    I.waitForText('Are you applying on your own, or with someone else?');
  },
  restore: (I: CodeceptJS.I, cookies: CodeceptJS.Cookie[]): void => {
    I.amOnPage('/info');
    I.setCookie(cookies);
  },
};

export const config = {
  TEST_URL: process.env.ADOP_WEB_URL || 'https://adoption-web.aat.platform.hmcts.net/',
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
    steps: ['../steps/common.ts', '../steps/date.ts', '../steps/check-your-answers.ts', '../steps/happy-path.ts'],
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
