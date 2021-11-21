import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import type { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, required, marriage, civilPartnership }: CommonContent) => {
  const partnership = isDivorce ? marriage : civilPartnership;
  return {
    title: `Other court cases relating to this ${partnership}`,
    line1: `The court needs to know if there are any other legal proceedings related to your ${partnership}. For example, another court case which has already dealt with ending this ${partnership}. This includes any court cases which are ongoing, finished or abandoned, either in the UK or overseas.`,
    question: `Are there, or have there ever been, any other court cases relating to this ${partnership}?`,
    hint: 'Not including legal proceedings that may happen in the future.',
    subField: 'What do the legal proceedings relate to?',
    errors: {
      applicant1LegalProceedings: {
        required,
      },
    },
  };
};

const cy = ({ isDivorce, partner, required, marriage, civilPartnership }: CommonContent) => {
  const partnership = isDivorce ? marriage : civilPartnership;
  return {
    title: 'Achosion llys eraill',
    line1: `Mae'r llys angen gwybod os oes unrhyw achosion cyfreithiol eraill yng nghyswllt eich ${partnership}, eich eiddo, neu'ch plant. Mae hyn yn cynnwys unrhyw achosion cyfreithiol sydd:`,
    point1: 'yn gyfredol, sydd wedi dod i ben, neu achos y rhoddwyd gorau iddo',
    point2: `rhyngoch chi a'ch ${partner}`,
    point3: `rhyngoch chi, eich ${partner} ac unrhyw un arall`,
    question: `A oes, neu a oes wedi bod erioed, unrhyw achosion cyfreithiol eraill yng nghyswllt eich ${partnership}, eich eiddo, neu'ch plant?`,
    hint: "Nid yw'n cynnwys unrhyw achosion cyfreithiol a all ddigwydd yn y dyfodol",
    subField: "Ynghylch beth y mae'r achos cyfreithiol?",
    subFieldHint: "Dewiswch bob un sy'n berthnasol",
    partnership: `Ein ${partnership}`,
    property: 'Ein heiddo',
    children: 'Ein plant',
    errors: {
      applicant1LegalProceedings: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1LegalProceedings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.question,
      hint: l => l.hint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
