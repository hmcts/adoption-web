import { CaseWithId } from '../../app/case/case';
import * as Urls from '../urls';

export enum Sections {
  AboutBirthMother = 'aboutBirthMother',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => Urls.PageLink;
}

export const birthMotherSequence: Step[] = [
  {
    url: Urls.BIRTH_MOTHER_FULL_NAME,
    showInSection: Sections.AboutBirthMother,
    getNextStep: () => Urls.TASK_LIST_URL,
  },
];
