import { JurisdictionConnections } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

export const jurisdictionMoreDetailsContent = (
  connections: JurisdictionConnections[] | undefined,
  isRespondent = false
): { connectedToEnglandWales: string; readMore: string } => {
  const resConnection = enContainsHabitualResConnection(connections);
  const domConnection = enContainsDomConnection(connections);

  const connectionIndex = isRespondent || (resConnection && domConnection) ? 2 : domConnection ? 1 : 0;

  const connectionText = [
    'Read more about habitual residence',
    'Read more about domicile',
    'Read more about your connections',
  ];
  const totalText = [
    Object.values(enHabitualResident).join('<br><br>').replace('Habitual residence<br><br>', ''),
    Object.values(enDomicile).join('<br><br>').replace('Domicile<br><br>', '').replace('</ul><br><br>', '</ul>'),
    Object.values(enHabitualResident)
      .join('<br><br>')
      .replace('Habitual residence', '<strong>Habitual residence</strong>') +
      '<br><br>' +
      Object.values(enDomicile)
        .join('<br><br>')
        .replace('Domicile', '<strong>Domicile</strong>')
        .replace('</ul><br><br>', '</ul>'),
  ];

  return { connectedToEnglandWales: totalText[connectionIndex], readMore: connectionText[connectionIndex] };
};

const enHabitualResident = {
  helpText1: 'Habitual residence',
  helpText2:
    'If your lives are mainly based in England or Wales then you’re what is legally known as ‘habitually resident’.',
  helpText3:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  helpText4:
    'The examples above aren’t a complete list of what makes up habitual residence, ' +
    'and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
};
const enDomicile = {
  helpText5: 'Domicile',
  helpText6:
    'Your domicile is usually the place in which you were born, regard as your permanent home and to which you have the closest ties.',
  helpText7:
    'However, domicile can be more complex, for example, if you or your parents have moved countries in the past.',
  helpText8: "When you’re born, you acquire a 'domicile of origin'. This is usually:",
  helpText9:
    '<ul class="govuk-list govuk-list--bullet"><li class="govuk-list govuk-list--bullet">the country your father was domiciled in if your parents were married</li>' +
    '<li class="govuk-list govuk-list--bullet">the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li></ul>',
  helpText10:
    "If you leave your domicile of origin and settle in another country as an adult, the new country may become your 'domicile of choice'.",
  helpText11: 'If you’re not sure about your domicile, you should get legal advice.',
};

const enContainsHabitualResConnection = (
  connections: JurisdictionConnections[] | undefined
): typeof enHabitualResident | undefined => {
  if (
    connections &&
    (connections.includes(JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT) ||
      connections.includes(JurisdictionConnections.APP_2_RESIDENT) ||
      connections.includes(JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS) ||
      connections.includes(JurisdictionConnections.APP_1_APP_2_RESIDENT) ||
      connections.includes(JurisdictionConnections.APP_1_RESIDENT_JOINT) ||
      connections.includes(JurisdictionConnections.RESIDUAL_JURISDICTION) ||
      connections.includes(JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS))
  ) {
    return enHabitualResident;
  }
};

const enContainsDomConnection = (connections: JurisdictionConnections[] | undefined): typeof enDomicile | undefined => {
  if (
    connections &&
    (connections.includes(JurisdictionConnections.APP_1_APP_2_DOMICILED) ||
      connections.includes(JurisdictionConnections.APP_1_DOMICILED) ||
      connections.includes(JurisdictionConnections.APP_2_DOMICILED))
  ) {
    return enDomicile;
  }
};

const en = ({ isDivorce, partner, userCase }: CommonContent) => {
  return {
    title: `You can use English or Welsh courts to ${isDivorce ? 'get a divorce' : 'end your civil partnership'}`,
    line1: `Your answers indicate that you can apply ${
      isDivorce ? 'for a divorce' : 'to end your civil partnership'
    } in England and Wales because:`,
    connectionBulletPoints: {
      [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: `you and your ${partner} were both last habitually resident and one of you still lives here`,
      [JurisdictionConnections.APP_2_RESIDENT]: `your ${partner} is habitually resident`,
      [JurisdictionConnections.APP_1_RESIDENT_SIX_MONTHS]:
        'you’re domiciled and habitually resident and have lived here for at least 6 months',
      [JurisdictionConnections.APP_1_APP_2_DOMICILED]: `both you and your ${partner} are domiciled`,
      [JurisdictionConnections.RESIDUAL_JURISDICTION]:
        'the courts of England and Wales have jurisdiction on a residual basis',
      [JurisdictionConnections.APP_1_DOMICILED]: 'you are domiciled in England or Wales',
      [JurisdictionConnections.APP_2_DOMICILED]: `your ${partner} is domiciled in England or Wales`,
    },
    readMore: 'Read more about your connections',
    ...enContainsHabitualResConnection(userCase?.connections),
    ...enContainsDomConnection(userCase?.connections),
  };
};

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    connections: {
      type: 'hidden',
      label: l => l.title,
      labelHidden: true,
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
