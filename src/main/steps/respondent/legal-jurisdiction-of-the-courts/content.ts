import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { connectionBulletPointsTextForRespondent } from '../../../app/jurisdiction/bulletedPointsContent';
import type { CommonContent } from '../../common/common.content';

const en = ({ isDivorce, partner, required, userCase }: CommonContent) => {
  return {
    title: 'The legal power (jurisdiction) of the courts',
    line1: `Your ${partner} was asked some questions to find out whether the courts of England and Wales have the legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }.`,
    line2: 'Their answers indicated that the reason the courts have jurisdiction is because:',
    connectionBulletPoints: userCase ? connectionBulletPointsTextForRespondent(userCase.connections!) : [],
    jurisdictionAgree: `Do you agree the courts of England and Wales have legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }?`,
    reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: `Explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
      isDivorce ? 'grant your divorce' : 'end your civil partnership'
    }.`,
    inWhichCountryIsYourLifeMainlyBased: 'Which country is your life mainly based?',
    yes: 'Yes, I agree the courts have jurisdiction',
    no: 'No, I do not agree the courts have jurisdiction',
    readMore: 'What this means',
    readMoreContent: `<h2>Habitual residence</h2>
    <p>If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.</p>

    <p>This may include working, owning property, having children in school, and your main family life taking place in England or Wales.</p>

    <p>The examples above are not a complete list of what makes up habitual residence. Just because some of them apply to you, that does not mean you’re habitually resident. If you’re not sure, you should get legal advice.</p>
    <h2>Domicile</h2>
    <p>Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.</p>
    <p>However, domicile can be more complex. For example, if you or your parents have moved countries in the past. </p>
    <p>When you’re born, you acquire the ‘domicile of origin’. This is usually:
    <ul>
    <li>the country your father was domiciled in if your parents were married </li>
    <li>the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li>
    </ul></p>
    <p>If you leave your domicile of origin and settle in another country as an adult, the new country may become your ‘domicile of choice’. </p>
    <p>If you’re not sure about your domicile, you should get legal advice. </p>
    <h2>Residual jurisdiction</h2>
    <p>Usually, to be eligible for residual jurisdiction you or your ${partner} must be domiciled in England. Neither of you must be nationals of or habitually resident in, another country in the EU (except Denmark).</p>

    <p>In addition, if you’re married to a member of the same sex, you may be eligible for residual jurisdiction if: (all the following apply): </p>
    <ul>
    <li>you married each other in the UK </li>
    <li>neither of you are nationals of, or habitually resident in, another country in the EU (except Denmark) </li>
    <li>it would be in the interests of natural justice for the court to consider this application (this may apply if, for example, your home country does not allow  ${
      isDivorce ? 'divorce' : 'ending of a civil partnership'
    } between same-sex couples</li>
    </ul>
    <p>However, residual jurisdiction can be complex. If you’re not sure whether this applies to you then you should get legal advice</p> `,
    errors: {
      jurisdictionAgree: {
        required,
      },
      reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
        required: `You need to explain why you think the courts of England and Wales do not have the legal power (jurisdiction) to ${
          isDivorce ? 'grant your divorce' : 'end your civil partnership'
        }`,
        characterLengthError: 'You have exceeded the number of characters allowed',
      },
      inWhichCountryIsYourLifeMainlyBased: {
        required: 'You need to tell us which country your life is mainly based',
      },
    },
  };
};

const cy = en;

export const form: FormContent = {
  fields: {
    jurisdictionAgree: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.jurisdictionAgree,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            reasonCourtsOfEnglandAndWalesHaveNoJurisdiction: {
              type: 'textarea',
              label: l => l.reasonCourtsOfEnglandAndWalesHaveNoJurisdiction,
              labelSize: 's',
              validator: value => isFieldFilledIn(value),
            },
            inWhichCountryIsYourLifeMainlyBased: {
              type: 'textarea',
              label: l => l.inWhichCountryIsYourLifeMainlyBased,
              labelSize: 's',
              validator: value => isFieldFilledIn(value),
            },
          },
        },
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
