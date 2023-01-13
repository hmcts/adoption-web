import { Step } from '../constants';
import * as Urls from '../urls';

export const applicationSequence: Step[] = [
  {
    url: Urls.HOME_URL,
    getNextStep: () => Urls.HOME_URL,
  },
  {
    url: Urls.START_PLACEMENT_URL,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.APPLYING_WITH_URL,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.APPLICATION_SUBMITTED,
    getNextStep: () => Urls.APPLICATION_SUBMITTED,
  },
  {
    url: Urls.COOKIES_PAGE,
    getNextStep: () => Urls.HOME_URL,
  },
  {
    url: Urls.PRIVACY_POLICY,
    getNextStep: () => Urls.HOME_URL,
  },
  {
    url: Urls.ACCESSIBILITY_STATEMENT,
    getNextStep: () => Urls.HOME_URL,
  },
  {
    url: Urls.TERMS_AND_CONDITIONS,
    getNextStep: () => Urls.HOME_URL,
  },
  {
    url: Urls.CONTACT_US,
    getNextStep: () => Urls.HOME_URL,
  },
  {
    url: Urls.TASK_LIST_URL,
    getNextStep: () => Urls.HOME_URL,
  },
  {
    url: Urls.SAVE_AND_SIGN_OUT,
    getNextStep: () => Urls.SIGN_IN_URL,
  },
  {
    url: Urls.TIMED_OUT_URL,
    getNextStep: () => Urls.SIGN_IN_URL,
  },
  {
    url: Urls.SAVE_AS_DRAFT,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
