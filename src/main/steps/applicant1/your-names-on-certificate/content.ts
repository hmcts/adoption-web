import { Gender } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isFieldLetters } from '../../../app/form/validation';
import type { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, selectedGender }: CommonContent, relationship: string) => {
  let personOfMaidenName = 'you or your civil partner';
  if (isDivorce) {
    personOfMaidenName = selectedGender === Gender.MALE ? 'you' : 'your wife';
  }

  return {
    title: `Your names on your ${relationship} certificate`,
    line1: `These are the names you and your ${partner} used before you ${
      isDivorce ? 'were married' : 'formed your civil partnership'
    }. They can sometimes be different from your current names. For example, if ${personOfMaidenName} had a maiden name.`,
    warningText: `Copy the ${relationship} certificate exactly. For example, if it says ‘Sarah Brown (formerly known as Sarah Smith)’, then enter that.`,
    applicant1FullNameOnCertificate: `Copy your full name from the ${relationship} certificate`,
    applicant2FullNameOnCertificate: `Copy your ${partner}'s full name from the ${relationship} certificate`,
    hint: 'Include all the text related to the name',
    errors: {
      applicant1FullNameOnCertificate: {
        required: 'You have not entered anything. Enter your full name as it appears on your marriage certificate.',
        invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
      },
      applicant2FullNameOnCertificate: {
        required: 'You have not entered anything. Enter their full name as it appears on your marriage certificate.',
        invalid: 'You have entered an invalid character, like a number. Enter your name using letters only.',
      },
    },
  };
};

const cy = ({ isDivorce, partner, selectedGender }: CommonContent, relationship: string) => {
  let personOfMaidenName = 'gan eich partner sifil';
  if (isDivorce) {
    personOfMaidenName = selectedGender === Gender.MALE ? 'gennych chi' : 'gan eich gwraig';
  }

  return {
    title: `Eich enwau fel y maent yn ymddangos ar eich tystysgrif ${relationship}`,
    line1: `Dyma'r enwau yr oeddech chi a'ch ${partner} yn eu defnyddio cyn i chi ${
      isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
    }. Weithiau gallant fod yn wahanol i'ch enwau cyfredol. Er enghraifft, os oedd ${personOfMaidenName} enw cyn priodi.`,
    warningText: `Copïwch union eriad y dystysgrif ${relationship}. Er enghraifft, os yw'n dweud ‘Sarah Brown (a elwid yn flaenorol yn Sarah Smith)’, yna rhowch hynny.`,
    applicant1FullNameOnCertificate: `Copïwch eich enw yn llawn fel y mae'n ymddangos ar y dystysgrif ${relationship}`,
    applicant2FullNameOnCertificate: `Copïwch enw llawn eich ${partner} fel y mae'n ymddangos ar y dystysgrif ${relationship}`,
    hint: 'Dylech gynnwys testun eich enw yn llawn',
    errors: {
      applicant1FullNameOnCertificate: {
        required:
          'Nid ydych wedi nodi unrhyw beth. Rhowch eich enw yn llawn fel y mae’n ymddangos ar eich tystysgrif priodas',
        invalid:
          'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig. ',
      },
      applicant2FullNameOnCertificate: {
        required:
          'Nid ydych wedi nodi unrhyw beth. Rhowch eu henw yn llawn fel y mae’n ymddangos ar eich tystysgrif priodas',
        invalid:
          'Rydych wedi defnyddio nod annillys, er enghraifft rhif. Nodwch eich enw gan ddefnyddio llythrennau yn unig. ',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant1FullNameOnCertificate: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.applicant1FullNameOnCertificate,
      hint: l => l.hint,
      validator: value => isFieldFilledIn(value) || isFieldLetters(value),
    },
    applicant2FullNameOnCertificate: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.applicant2FullNameOnCertificate,
      hint: l => l.hint,
      validator: value => isFieldFilledIn(value) || isFieldLetters(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const relationship = content.isDivorce ? content.marriage : content.civilPartnership;
  const translations = languages[content.language](content, relationship);
  return {
    ...translations,
    form,
  };
};
