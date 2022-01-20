import { stepsWithContentApplicant1 } from '../../../steps';
import { generatePageContent } from '../../../steps/common/common.content';
import { Sections } from '../../../steps/constants';
import { PageLink, YOUR_NAME } from '../../../steps/urls';
import type { FormOptions } from '../../form/Form';
import { Case } from '../case';

import type { GovUkNunjucksSummary } from './govUkNunjucksSummary';
import { omitUnreachableAnswers } from './possibleAnswers';

export const getAnswerRows = function (
  section: Sections,
  isCompleteCase = false,
  showActions = true,
  overrideStepsContent?: number
): GovUkNunjucksSummary[] {
  const {
    language,
    userCase,
    userEmail,
    isJointApplication,
  }: {
    language: 'en' | 'cy';
    isDivorce: boolean;
    userCase: Partial<Case>;
    userEmail: string;
    isJointApplication: boolean;
  } = this.ctx;

  const { stepsWithContent, processedUserCase } = setUpSteps(
    userCase,
    isCompleteCase,
    isJointApplication,
    overrideStepsContent
  );

  let sameSexHasBeenAnswered = false;

  return stepsWithContent
    .filter(step => (isCompleteCase ? step.showInCompleteSection === section : step.showInSection === section))
    .flatMap(step => {
      const fields = typeof step.form.fields === 'function' ? step.form.fields(processedUserCase) : step.form.fields;
      const fieldKeys = Object.keys(fields);
      let stepContent;
      try {
        stepContent = {
          ...this.ctx,
          ...generatePageContent({
            language,
            pageContent: step.generateContent,
            userCase: processedUserCase,
            userEmail,
          }),
        };
      } catch {
        // Some steps may throw an error if the user is not allowed to view them yet
        return [];
      }

      const questionAnswers: GovUkNunjucksSummary[] = [];
      const addQuestionAnswer = (question: string, answer: string, link?: PageLink, html?: string) =>
        questionAnswers.push({
          key: {
            html: question,
            classes: 'govuk-!-width-two-thirds',
          },
          value: {
            html: answer + (html || ''),
          },
          ...(!showActions
            ? {}
            : {
                actions: {
                  items: [
                    {
                      href: link || step.url,
                      text: this.ctx.change,
                      visuallyHiddenText: question,
                    },
                  ],
                },
              }),
        });

      if (isCompleteCase && section === Sections.AboutPartnership && sameSexHasBeenAnswered === false) {
        sameSexHasBeenAnswered = true;
        addQuestionAnswer('Same-sex couples', 'We were a same-sex couple when we got married');
      }

      for (const fieldKey of fieldKeys) {
        const field = fields[fieldKey] as FormOptions;
        let answer = getAnswer(processedUserCase, field, fieldKey);
        if (!field.label || !answer) {
          continue;
        }

        const question = typeof field.label === 'function' ? field.label(stepContent) : field.label;
        if (field.type === 'radios') {
          answer = getSelectedRadioLabel(answer, field, stepContent);
        }
        if (field.type === 'checkboxes') {
          const checkedLabels = getCheckedLabels(answer, field, stepContent);
          if (!checkedLabels?.length) {
            continue;
          }
          answer = checkedLabels.join('\n');
        }

        const customQuestion = this.ctx.stepQuestions[step.url]?.[fieldKey];
        const customAnswerFn = this.ctx.stepAnswers[step.url]?.[fieldKey];
        const customAnswer =
          customAnswerFn && typeof customAnswerFn === 'function' ? customAnswerFn(stepContent) : customAnswerFn;
        if (customAnswer === false) {
          continue;
        }
        const customAnswerWithHtml = this.ctx.stepAnswersWithHTML?.[step.url]?.[fieldKey];
        const stepLinks = isCompleteCase ? undefined : this.ctx.stepLinks[step.url];

        addQuestionAnswer(
          customQuestion || (question as string),
          this.env.filters.nl2br(this.env.filters.escape(customAnswer ?? answer)),
          stepLinks,
          customAnswerWithHtml
        );
      }

      if (isCompleteCase) {
        const [question, answer] = getCompleteQuestionAnswers(step.url, processedUserCase);
        if (question && answer) {
          addQuestionAnswer(question, answer);
        }
      }

      return questionAnswers;
    });
};

const getAnswer = (userCase, field, fieldKey) =>
  field.type === 'checkboxes'
    ? field.values.reduce((previous, current) => [...previous, [current.name, userCase?.[current.name]]], [])
    : userCase?.[fieldKey];

const getCheckedLabels = (answer, field, stepContent) =>
  answer
    .filter(([, value]) => value?.length)
    .map(([key]) => {
      const checkbox = field.values.find(checkboxField => checkboxField.name === key);
      return typeof checkbox?.label === 'function' ? checkbox.label(stepContent) : checkbox?.label;
    });

const getSelectedRadioLabel = (answer, field, stepContent) => {
  const selectedRadio = field.values.find(radio => radio.value === answer);
  return typeof selectedRadio?.label === 'function' ? selectedRadio.label(stepContent) : selectedRadio?.label;
};

const setUpSteps = (
  userCase: Partial<Case>,
  isCompleteCase: boolean,
  isJointApplication: boolean,
  overrideStepsContent?: number
) => {
  if ((!isCompleteCase && overrideStepsContent !== 2) || overrideStepsContent === 1) {
    const stepsWithContent = stepsWithContentApplicant1;
    const processedUserCase = omitUnreachableAnswers(userCase, stepsWithContentApplicant1);

    return { stepsWithContent, processedUserCase };
  } else {
    const stepsWithContent = isCompleteCase ? [...stepsWithContentApplicant1] : getApplicant2Steps(isJointApplication);

    const applicant2ProcessedUserCase = omitUnreachableAnswers(userCase, getApplicant2Steps(isJointApplication));
    const applicant1ProcessedUserCase = omitUnreachableAnswers(userCase, stepsWithContentApplicant1);
    const processedUserCase = isCompleteCase
      ? { ...applicant2ProcessedUserCase, ...applicant1ProcessedUserCase }
      : applicant2ProcessedUserCase;

    return { stepsWithContent, processedUserCase };
  }
};

const getApplicant2Steps = (isJointApplication: boolean) => {
  return isJointApplication ? [] : [];
};

const getCompleteQuestionAnswers = (stepUrl: string, processedUserCase: Partial<Case>): [string, string] => {
  let question;
  let answer;
  console.log(processedUserCase);

  switch (stepUrl) {
    case YOUR_NAME: {
      question = 'Full name on the marriage certificate';
      break;
    }
  }

  return [question, answer];
};
