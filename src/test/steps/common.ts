import Axios, { AxiosResponse } from 'axios';
import sysConfig from 'config';
import jwt_decode from 'jwt-decode';
import { Logger, transports } from 'winston';

import { OidcResponse } from '../../main/app/auth/user/oidc';
import { CaseApi, getCaseApi } from '../../main/app/case/CaseApi';
import { Case } from '../../main/app/case/case';
import { Adoption, State } from '../../main/app/case/definition';
import { UserDetails } from '../../main/app/controller/AppRequest';
import { RELATIONSHIP_DATE_URL, WHERE_YOUR_LIVES_ARE_BASED_URL } from '../../main/steps/urls';
import { autoLogin, config as testConfig } from '../config';

const { I, login } = inject();

Before(test => {
  // Retry failed scenarios x times
  test.retries(5);
});

After(async () => {
  await testConfig.clearNewUsers();
});

export const iAmOnPage = (text: string): void => {
  const url = new URL(text, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
};
Given('I go to {string}', iAmOnPage);

Then('the page URL should be {string}', (url: string) => {
  I.waitInUrl(url);
});

Given('I login', () => {
  login('citizen');
});

Given('I create a new user and login', () => {
  login('citizenSingleton');
});

Given('I login with applicant 1', () => {
  autoLogin.login(I, testConfig.GetUser(1).username);
});

export const iClick = (text: string, locator?: CodeceptJS.LocatorOrString, wait?: number): void => {
  I.waitForText(text, wait);
  I.click(locator || text);
};

When('I click {string}', iClick);
When('I select {string}', iClick);

export const checkOptionFor = (optionLabel: string, fieldLabel: string): void =>
  I.checkOption(optionLabel, `//*[contains(text(), '${fieldLabel}')]/..`);
When('I select {string} for {string}', (optionLabel: string, fieldLabel: string) => {
  checkOptionFor(optionLabel, fieldLabel);
});

Given('I choose {string} from {string}', (option: string, select: string) => {
  I.selectOption(select, option);
});

Then('I expect the page title to be {string}', (title: string) => {
  I.seeInTitle(title);
});

Then('the page should include {string}', (text: string) => {
  I.waitForText(text);
});

Then('I wait until the page contains {string}', (text: string) => {
  I.waitForText(text, 25);
});

Then('I wait until the page contains image {string}', (text: string) => {
  I.waitForText(text, 60);
});

Then('the page should not include {string}', (text: string) => {
  I.dontSee(text);
});

Then("I wait until the page doesn't contain {string}", (text: string) => {
  I.waitForFunction(content => document.body.textContent?.search(content) === -1, [text], 20);
});

Then('the form input {string} should be {string}', (formInput: string, value: string) => {
  I.seeInField(formInput, value);
});

Then('{string} should be ticked', (text: string) => {
  I.seeCheckboxIsChecked(text);
});

Then('I cannot go back to the previous page', () => {
  I.dontSeeElement('a.govuk-back-link');
});

Then('I type {string}', (text: string) => {
  I.type(text);
});

export const iClearTheForm = (): void => {
  I.executeScript(() => {
    const checkedInputs = document.querySelectorAll('input:checked') as NodeListOf<HTMLInputElement>;
    for (const checkedInput of checkedInputs) {
      checkedInput.checked = false;
    }

    const clearInputs = (inputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement>) => {
      for (const input of inputs) {
        input.value = '';
      }
    };

    clearInputs(document.querySelectorAll('textarea'));
    clearInputs(document.querySelectorAll('input[type="text"]'));
  });
};
Given('I clear the form', iClearTheForm);

Given("I've said I'm applying as a sole application", () => {
  I.amOnPage('/how-do-you-want-to-apply');
  iClearTheForm();
  I.checkOption('I want to apply on my own, as a sole applicant');
  I.click('Continue');
});

Given("I've said I'm applying as a joint application", () => {
  I.amOnPage('/how-do-you-want-to-apply');
  iClearTheForm();
  I.checkOption('I want to apply jointly');
  I.click('Continue');
});

Given("I've said I'm divorcing my husband", () => {
  I.amOnPage('/applying-with');
  iClearTheForm();
  I.checkOption('My husband');
  I.click('Continue');
});

Given("I've said I do not have my husband's email address", () => {
  I.amOnPage('/their-email-address');
  iClearTheForm();
  I.checkOption('I do not know their email address');
  I.click('Continue');
});

Given('I delete any previously uploaded files', async () => {
  const locator = '//a[text()="Delete"]';
  let numberOfElements = await I.grabNumberOfVisibleElements(locator);

  const maxRetries = 10;
  let i = 0;
  while (numberOfElements > 0 && i < maxRetries) {
    I.click('Delete');
    I.wait(3);
    numberOfElements = await I.grabNumberOfVisibleElements(locator);
    i++;
  }

  if (numberOfElements > 0) {
    throw new Error('Unable to delete previously uploaded files');
  }
});

When('I upload the file {string}', (pathToFile: string) => {
  I.attachFile('input[type="file"]', pathToFile);
});

When('I enter my valid case reference and valid access code', async () => {
  await I.amOnPage('/applicant2/enter-your-access-code');
  iClearTheForm();

  const user = testConfig.GetCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);

  // add a delay after logging a user in because it creates an extra case that needs to be added to the ES index
  await new Promise(resolve => setTimeout(resolve, 5000));

  const userCase = await caseApi.getOrCreateCase(Adoption.ADOPTION, testUser);

  const caseReference = userCase.id;

  if (!caseReference) {
    throw new Error(`No case reference or access code was returned for ${testUser}`);
  }

  iClick('Sign out');
  await login('citizenSingleton');
  await I.amOnPage('/applicant2/enter-your-access-code');
  iClearTheForm();

  iClick('Your reference number');
  I.type(caseReference);
});

When('a case worker issues the application', async () => {
  await I.amOnPage('/applicant2/enter-your-access-code');
  iClearTheForm();

  const user = testConfig.GetCurrentUser();
  const testUser = await iGetTheTestUser(user);
  const caseApi = iGetTheCaseApi(testUser);

  // add a delay after logging a user in because it creates an extra case that needs to be added to the ES index
  await new Promise(resolve => setTimeout(resolve, 5000));

  const userCase = await caseApi.getOrCreateCase(Adoption.ADOPTION, testUser);
  const caseReference = userCase.id;

  if (!caseReference) {
    throw new Error(`No case reference or access code was returned for ${testUser}`);
  }

  const cwUser = await testConfig.GetOrCreateCaseWorker();
  const caseWorker = await iGetTheTestUser(cwUser);
  const cwCaseApi = iGetTheCaseApi(caseWorker);
  await cwCaseApi.triggerEvent(caseReference, {}, 'caseworker-issue-application');
});

export const iGetTheTestUser = async (user: { username: string; password: string }): Promise<UserDetails> => {
  const id: string = sysConfig.get('services.idam.clientID');
  const secret = sysConfig.get('services.idam.clientSecret');
  const tokenUrl: string = sysConfig.get('services.idam.tokenURL');

  const headers = { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' };
  const data = `grant_type=password&username=${user.username}&password=${user.password}&client_id=${id}&client_secret=${secret}&scope=openid%20profile%20roles%20openid%20roles%20profile`;

  const response: AxiosResponse<OidcResponse> = await Axios.post(tokenUrl, data, { headers });

  const jwt = jwt_decode(response.data.id_token) as {
    uid: string;
    sub: string;
    given_name: string;
    family_name: string;
    roles: string[];
  };

  return {
    accessToken: response.data.access_token,
    id: jwt.uid,
    email: jwt.sub,
    givenName: jwt.given_name,
    familyName: jwt.family_name,
  };
};

export const iGetTheCaseApi = (testUser: UserDetails): CaseApi => {
  const logger = new Logger({
    transports: [new transports.Console(), new transports.File({ filename: 'test.log' })],
  });

  return getCaseApi(testUser, logger);
};

export const iSetTheUsersCaseTo = async (userCaseObj: Partial<BrowserCase>): Promise<void> =>
  executeUserCaseScript(userCaseObj, RELATIONSHIP_DATE_URL, WHERE_YOUR_LIVES_ARE_BASED_URL);

const executeUserCaseScript = (userCaseObj, requestPageLink: string, redirectPageLink: string) =>
  I.executeScript(
    async ([userCase, requestUrl, redirectUrl]) => {
      const mainForm = document.getElementById('main-form') as HTMLFormElement;
      const formData = mainForm ? new FormData(mainForm) : new FormData();
      for (const [key, value] of Object.entries(userCase)) {
        formData.set(key, value as string);
      }

      const request = {
        method: 'POST',
        body: new URLSearchParams(formData as unknown as Record<string, string>),
      };

      await fetch(requestUrl, request);
      await new Promise(resolve => setTimeout(resolve, 1500));
      await fetch(redirectUrl, request);
    },
    [userCaseObj, requestPageLink, redirectPageLink]
  );

export interface BrowserCase extends Case {
  state: State;
}
