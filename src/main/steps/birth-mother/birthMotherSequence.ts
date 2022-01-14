import { YesNoNotsure, YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import * as Urls from '../urls';

export const birthMotherSequence: Step[] = [
  {
    url: Urls.BIRTH_MOTHER_FULL_NAME,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.BIRTH_MOTHER_STILL_ALIVE,
  },
  {
    url: Urls.BIRTH_MOTHER_STILL_ALIVE,
    showInSection: Sections.AboutBirthMother,
    getNextStep: data =>
      data.birthMotherStillAlive === YesNoNotsure.YES ? Urls.BIRTH_MOTHER_NATIONALITY : Urls.TASK_LIST_URL,
  },
  {
    url: Urls.BIRTH_MOTHER_NATIONALITY,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.BIRTH_MOTHER_OCCUPATION,
  },
  {
    url: Urls.BIRTH_MOTHER_OCCUPATION,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.BIRTH_MOTHER_ADDRESS_KNOWN,
  },
  {
    url: Urls.BIRTH_MOTHER_ADDRESS_KNOWN,
    showInSection: Sections.AboutBirthMother,
    getNextStep: data =>
      data.birthMotherAddressKnown === YesOrNo.YES ? Urls.BIRTH_MOTHER_FIND_ADDRESS : Urls.TASK_LIST_URL,
  },
  {
    url: Urls.BIRTH_MOTHER_FIND_ADDRESS,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.BIRTH_MOTHER_SELECT_ADDRESS,
  },
  {
    url: Urls.BIRTH_MOTHER_SELECT_ADDRESS,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.BIRTH_MOTHER_MANUAL_ADDRESS,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
  {
    url: Urls.BIRTH_MOTHER_INTERNATIONAL_ADDRESS,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
