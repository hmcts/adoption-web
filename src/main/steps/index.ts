import * as fs from 'fs';

import { Case, CaseWithId } from '../app/case/case';
import { AppRequest, Eligibility } from '../app/controller/AppRequest';
import { TranslationFn } from '../app/controller/GetController';
import { Form, FormContent } from '../app/form/Form';

import { Step, applicant1Sequence } from './applicant1Sequence';
import { applicant2Sequence } from './applicant2/applicant2Sequence';
import { birthFatherSequence } from './birth-father/fatherSequence';
import { childrenSequence } from './children/childrenSequence';
import { Step as EligibilityStep, eligibilitySequence } from './eligibilitySequence';
import { APPLICANT_1, APPLICANT_2, BIRTH_FATHER, CHECK_ANSWERS_URL, CHILDREN } from './urls';

const stepForms: Record<string, Form> = {};

[applicant1Sequence].forEach((sequence: Step[], i: number) => {
  const dir = __dirname + (i === 0 ? '/applicant1' : '');
  for (const step of sequence) {
    const stepContentFile = `${dir}${step.url}/content.ts`;
    if (fs.existsSync(stepContentFile)) {
      const content = require(stepContentFile);

      if (content.form) {
        stepForms[step.url] = new Form(content.form.fields);
      }
    }
  }
});

const getNextIncompleteStep = (
  data: CaseWithId,
  step: Step,
  sequence: Step[],
  removeExcluded = false,
  checkedSteps: Step[] = []
): string => {
  const stepForm = stepForms[step.url];
  // if this step has a form
  if (stepForm !== undefined) {
    // and that form has errors
    if (!stepForm.isComplete(data) || stepForm.getErrors(data).length > 0) {
      // go to that step
      return removeExcluded && checkedSteps.length && step.excludeFromContinueApplication
        ? checkedSteps[checkedSteps.length - 1].url
        : step.url;
    } else {
      // if there are no errors go to the next page and work out what to do
      const nextStepUrl = step.getNextStep(data);
      const nextStep = sequence.find(s => s.url === nextStepUrl);

      return nextStep
        ? getNextIncompleteStep(data, nextStep, sequence, removeExcluded, checkedSteps.concat(step))
        : CHECK_ANSWERS_URL;
    }
  }

  // if the page has no form then ask it where to go
  return step.getNextStep(data);
};

export const getNextIncompleteStepUrl = (req: AppRequest): string => {
  const { queryString } = getPathAndQueryString(req);
  const sequence = getUserSequence();
  const url = getNextIncompleteStep(req.session.userCase, sequence[0], sequence, true);

  return `${url}${queryString}`;
};

export const getNextStepUrl = (req: AppRequest, data: Partial<Case>): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = [...applicant1Sequence, ...applicant2Sequence, ...childrenSequence, ...birthFatherSequence].find(
    s => s.url === path
  );
  const url = nextStep ? nextStep.getNextStep(data) : CHECK_ANSWERS_URL;

  return `${url}${queryString}`;
};

export const getNextEligibilityStepUrl = (req: AppRequest, data: Eligibility): string => {
  const { path, queryString } = getPathAndQueryString(req);
  const nextStep = [...eligibilitySequence].find(s => s.url === path);
  const url = nextStep ? nextStep.getNextStep(data) : CHECK_ANSWERS_URL;

  return `${url}${queryString}`;
};

const getUserSequence = () => {
  return applicant1Sequence;
};

const getPathAndQueryString = (req: AppRequest): { path: string; queryString: string } => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';
  return { path, queryString };
};

const getStepFiles = (stepDir: string) => {
  const stepContentFile = `${stepDir}/content.ts`;
  const content = fs.existsSync(stepContentFile) ? require(stepContentFile) : {};
  const stepViewFile = `${stepDir}/template.njk`;
  const view = fs.existsSync(stepViewFile) ? stepViewFile : `${stepDir}/../../common/template.njk`;

  return { content, view };
};

export type StepWithContent = Step & {
  stepDir: string;
  generateContent: TranslationFn;
  form: FormContent;
  view: string;
};

const getStepsWithContent = (sequence: Step[] | EligibilityStep[], subDir = ''): StepWithContent[] => {
  const dir = __dirname;

  const results: StepWithContent[] = [];
  for (const step of sequence) {
    const stepDir = `${dir}${step.url.startsWith(subDir) ? step.url : `${subDir}${step.url}`}`;
    const { content, view } = getStepFiles(stepDir);
    results.push({ stepDir, ...step, ...content, view });
  }
  return results;
};

export const stepsWithContentEligibility = getStepsWithContent(eligibilitySequence, '/eligibility');
export const stepsWithContentApplicant1 = getStepsWithContent(applicant1Sequence, APPLICANT_1);
export const stepsWithContentApplicant2 = getStepsWithContent(applicant2Sequence, APPLICANT_2);
export const stepsWithContentChildren = getStepsWithContent(childrenSequence, CHILDREN);
export const stepsWithContentBirthFather = getStepsWithContent(birthFatherSequence, BIRTH_FATHER);
export const stepsWithContent = [
  ...stepsWithContentEligibility,
  ...stepsWithContentApplicant1,
  ...stepsWithContentApplicant2,
  ...stepsWithContentChildren,
  ...stepsWithContentBirthFather,
];
