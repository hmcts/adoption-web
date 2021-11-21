import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';

const en = ({ partner, required }: CommonContent) => ({
  title: 'Your domicile',
  line1:
    'Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.',
  line2: 'However, domicile can be more complex, for example if you or your parents have moved countries in the past.',
  readMore: 'Read more about domicile',
  more1: 'You should select yes if either of the following types of domicile in England or Wales apply.',
  more2: 'When you’re born, you acquire a <strong>domicile of origin</strong>. This is usually:',
  moreBullet1: 'the country your father was domiciled in if your parents were married',
  moreBullet2:
    'the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born',
  more3:
    'If you leave your domicile of origin and settle in another country as an adult, the new country may become your <strong>domicile of choice</strong>.',
  more4: 'If you’re not sure about your domicile you should get legal advice.',
  applicant1DomicileInEnglandWales: 'Is your domicile in England or Wales?',
  applicant2DomicileInEnglandWales: `Is your ${partner}’s domicile in England or Wales?`,
  errors: {
    applicant1DomicileInEnglandWales: { required },
    applicant2DomicileInEnglandWales: { required },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: 'Eich domisil',
  line1:
    'Gan amlaf, eich domisil yw lle y cawsoch eich geni, y lle yr ydych yn meddwl amdano fel eich cartref parhaol a’r lle y mae eich teulu a’ch ffrindiau agosaf yn byw.',
  line2:
    'Ond, gall eich domisil fod yn fwy cymhleth, er enghraifft os ydych chi neu eich rhieni wedi symud o un wlad i’r llall yn y gorffennol.',
  readMore: 'Darllenwch fwy am beth yw domisil',
  more1: "Dylech ddewis Ydy os yw unrhyw un o'r mathau canlynol o ddomisil yng Nghymru neu Loegr yn berthnasol i chi.",
  more2: "Pan gewch eich geni, rhoddir <strong>‘domisil gwreiddiol’</strong> i chi. Fel arfer, hon yw'r wlad:",
  moreBullet1: "yr oedd eich tad â'i ddomisil ynddi os oedd eich rhieni'n briod",
  moreBullet2:
    'yr oedd eich mam â’i domisil ynddi os nad oedd eich rhieni yn briod, neu os oedd eich tad wedi marw cyn ichi gael eich geni',
  more3:
    'Os byddwch yn gadael eich domisil gwreiddiol ac yn ymgartrefu mewn gwlad arall fel oedolyn, yna gallai’r wlad newydd ddod yn <strong>‘ddomisil dewisol’</strong> ichi.',
  more4: 'Os nad ydych chi’n siŵr am eich domisil, dylech gael cyngor cyfreithiol.',
  applicant1DomicileInEnglandWales: 'A yw eich domisil yng Nghymru neu Loegr?',
  yes: 'Ydy',
  no: 'Nac ydy',
  applicant2DomicileInEnglandWales: `A yw domisil eich ${partner} yng Nghymru neu Loegr?`,
  errors: {
    applicant1DomicileInEnglandWales: {
      required: 'Nid ydych wedi ateb y cwestiwn. Mae angen ichi ddewis ateb cyn parhau.',
    },
    applicant2DomicileInEnglandWales: {
      required: 'Nid ydych wedi ateb y cwestiwn. Mae angen ichi ddewis ateb cyn parhau.',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1DomicileInEnglandWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant1DomicileInEnglandWales,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
    applicant2DomicileInEnglandWales: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.applicant2DomicileInEnglandWales,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
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

export const generateContent: TranslationFn = (content: CommonContent) => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
