import * as fs from 'fs';

import { CaseWithId } from '../app/case/case';
import { AppRequest, Eligibility, LaPortalKBA } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { FormContent } from '../app/form/Form';

import { applicant1Sequence } from './applicant1/applicant1Sequence';
import { applicant2Sequence } from './applicant2/applicant2Sequence';
import { applicationSequence } from './application/applicationSequence';
import { birthFatherSequence } from './birth-father/birthFatherSequence';
import { birthMotherSequence } from './birth-mother/birthMotherSequence';
import { childrenSequence } from './children/childrenSequence';
import { Step } from './constants';
import { Step as EligibilityStep, eligibilitySequence } from './eligibility/eligibilitySequence';
import { laPortalSequence } from './la-portal/laPortalSequence';
import { otherParentSequence } from './other-parent/otherParentSequence';
import { reviewPaySubmitSequence } from './review-pay-submit/reviewPaySubmitSequence';
import { siblingSequence } from './sibling/siblingSequence';
import {
  APPLICANT_1,
  APPLICANT_2,
  BIRTH_FATHER,
  BIRTH_MOTHER,
  CHECK_ANSWERS_URL,
  CHILDREN,
  LA_PORTAL,
  OTHER_PARENT,
  REVIEW_PAY_SUBMIT,
  SIBLING,
  TASK_LIST_URL,
} from './urls';

export const getNextStepUrl = (req: AppRequest, data: Partial<CaseWithId> | LaPortalKBA): string => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((req.body as any).saveAsDraft) {
    return TASK_LIST_URL;
  }
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = [
    ...applicant1Sequence,
    ...applicant2Sequence,
    ...childrenSequence,
    ...birthMotherSequence,
    ...birthFatherSequence,
    ...otherParentSequence,
    ...reviewPaySubmitSequence,
    ...siblingSequence,
    ...laPortalSequence,
  ].find(s => s.url === path);

  const url = nextStep ? nextStep.getNextStep(data) : TASK_LIST_URL;

  return `${url}${queryString}`;
};

export const getNextEligibilityStepUrl = (req: AppRequest, data: Eligibility): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = [...eligibilitySequence].find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data) : CHECK_ANSWERS_URL;

  return `${url}${queryString}`;
};

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};

const getStepFiles = (stepDir: string) => {
  const commonTemplatePath = `${__dirname}/common/template.njk`;
  const stepContentFile = `${stepDir}/content.ts`;
  const content = fs.existsSync(stepContentFile) ? require(stepContentFile) : {};
  const stepViewFile = `${stepDir}/template.njk`;
  const view = fs.existsSync(stepViewFile) ? stepViewFile : commonTemplatePath;

  return { content, view };
};

export type StepWithContent = Step & {
  stepDir: string;
  generateContent: TranslationFn;
  form: FormContent;
  view: string;
};

const getStepsWithContent = (sequence: Step[] | EligibilityStep[], subDir: string): StepWithContent[] => {
  const dir = __dirname;

  const results: StepWithContent[] = [];
  for (const step of sequence) {
    if (step.url.includes('la-portal')) {
      console.log(step);
    }

    let stepDir = step.contentDir;
    if (!stepDir) {
      const stepUrl = step.url === '/' ? '/home' : step.url;
      const path = stepUrl.startsWith(subDir) ? stepUrl : `${subDir}${stepUrl}`;
      stepDir = `${dir}${path}`;
    }
    const { content, view } = getStepFiles(stepDir);
    results.push({ stepDir, ...step, ...content, view });
  }
  return results;
};

export const stepsWithContentEligibility = getStepsWithContent(eligibilitySequence, '/eligibility');
export const stepsWithContentApplication = getStepsWithContent(applicationSequence, '/application');
export const stepsWithContentApplicant1 = getStepsWithContent(applicant1Sequence, APPLICANT_1);
export const stepsWithContentApplicant2 = getStepsWithContent(applicant2Sequence, APPLICANT_2);
export const stepsWithContentChildren = getStepsWithContent(childrenSequence, CHILDREN);
export const stepsWithContentBirthFather = getStepsWithContent(birthFatherSequence, BIRTH_FATHER);
export const stepsWithContentBirthMother = getStepsWithContent(birthMotherSequence, BIRTH_MOTHER);
export const stepsWithContentOtherParent = getStepsWithContent(otherParentSequence, OTHER_PARENT);
export const stepsWithContentSibling = getStepsWithContent(siblingSequence, SIBLING);
export const stepsWithContentReviewPaySubmit = getStepsWithContent(reviewPaySubmitSequence, REVIEW_PAY_SUBMIT);
export const stepsWithContentLaPortal = getStepsWithContent(laPortalSequence, LA_PORTAL);
export const stepsWithContent = [
  ...stepsWithContentEligibility,
  ...stepsWithContentApplication,
  ...stepsWithContentApplicant1,
  ...stepsWithContentApplicant2,
  ...stepsWithContentChildren,
  ...stepsWithContentBirthFather,
  ...stepsWithContentBirthMother,
  ...stepsWithContentOtherParent,
  ...stepsWithContentReviewPaySubmit,
  ...stepsWithContentSibling,
  ...stepsWithContentLaPortal,
];
