import { pick } from 'lodash';

import { StepWithContent } from '../../../steps';
import { Form, FormFields } from '../../form/Form';
import { Case } from '../case';

export const getAllPossibleAnswersForPath = (caseState: Partial<Case>, steps: StepWithContent[]): string[] => {
  const sequenceWithForms = steps.filter(step => step.form);

  const getPossibleFields = (step: StepWithContent, fields: string[]) => {
    if (step.form) {
      const formFieldNames = new Form(<FormFields>step.form.fields).getFieldNames().values();
      fields.push(...formFieldNames);
    }

    const nextStepUrl = step.getNextStep(caseState);
    const nextStep = sequenceWithForms.find(sequenceStep => sequenceStep.url === nextStepUrl);

    if (nextStep) {
      return getPossibleFields(nextStep, fields);
    }

    return fields;
  };

  return getPossibleFields(sequenceWithForms[0], []);
};

export const omitUnreachableAnswers = (caseState: Partial<Case>, steps: StepWithContent[]): Partial<Case> =>
  pick(caseState, getAllPossibleAnswersForPath(caseState, steps));
