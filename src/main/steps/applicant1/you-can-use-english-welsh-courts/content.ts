import { JurisdictionConnections } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import type { CommonContent } from '../../common/common.content';

const en = (
  {
    isDivorce,
    partner,
    applyForAdoption,
    applyForDissolution,
    habitualResidentHelpText1,
    habitualResidentHelpText2,
  }: CommonContent,
  connections: JurisdictionConnections[]
) => {
  const apply = isDivorce ? applyForAdoption : applyForDissolution;
  const enHabitualResident = {
    helpText1:
      "If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.",
    helpText2: habitualResidentHelpText1,
    helpText3: habitualResidentHelpText2,
  };
  const enApp1App2Resident = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because both of you are 'habitually resident'.`,
    readMore: 'Read more about habitual residence',
    ...enHabitualResident,
  };
  const enApp1App2LastResident = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because both of you were last 'habitually resident' and one of you still lives here.`,
    readMore: 'Read more about habitual residence',
    ...enHabitualResident,
  };
  const enApp2Resident = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because your ${partner} is 'habitually resident'.`,
    readMore: 'Read more about habitual residence',
    ...enHabitualResident,
  };
  const enApp1ResidentTwelveMonths = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because you are 'habitually resident' and have lived here for at least 12 months.`,
    readMore: 'Read more about habitual residence',
    ...enHabitualResident,
  };
  const enApp1App2Domiciled = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because both of you are 'domiciled' in England or Wales.`,
    readMore: 'Read more about domicile',
    helpText1:
      'When you’re born, you acquire a <strong>domicile of origin</strong>.  This is usually: <ul class="govuk-list govuk-list--bullet"> <li>the country your father was domiciled in if your parents were married</li> <li>the country your mother was domiciled in if your parents were unmarried, or your father had died before you were born</li> </ul>',
    helpText2:
      'If you leave your domicile of origin and settle in another country as an adult, the new country may become your <strong>domicile of choice</strong>.',
    helpText3: 'You should select Yes if you have either type of domicile in England or Wales.',
    helpText4: 'If you’re not sure about your domicile you should get legal advice.',
  };
  const enApp1Resident = {
    line1: `Your answers indicate that you can ${apply} in England and Wales because you are 'habitually resident'.`,
    readMore: 'Read more about habitual residence',
    ...enHabitualResident,
  };
  const enConnections: Partial<Record<JurisdictionConnections, typeof enApp1App2Resident | undefined>> = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: enApp1App2Resident,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: enApp1App2LastResident,
    [JurisdictionConnections.APP_2_RESIDENT]: enApp2Resident,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: enApp1ResidentTwelveMonths,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: enApp1App2Domiciled,
    [JurisdictionConnections.APP_1_RESIDENT_JOINT]: enApp1Resident,
  };

  return {
    title: `You can use English or Welsh courts to ${isDivorce ? 'get a divorce' : applyForDissolution}`,
    ...enConnections[connections[0]],
  };
};

const cy = ({ isDivorce, partner }: CommonContent, connections: JurisdictionConnections[]) => {
  const apply = isDivorce ? 'cais am ysgariad' : 'cais';
  const cyApp1App2Resident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod ill dau yn preswylio yno’n arferol.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr, dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp1App2LastResident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod ill dau yn preswylio yno’n arferol a bod un ohonoch yn dal i fyw yno.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn ‘preswylio’n arferol’ yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr , dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp2Resident = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am fod eich ${partner} yn preswylio’n arferol yno.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn preswylio’n arferol yno yn ôl y gyfraith.',
    helpText2:
      'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr gynhwysfawr o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yng Nghymru neu Loegr. Os nad ydych yn siwr , dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp1ResidentTwelveMonths = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am eich bod yn preswylio yno’n arferol a’ch bod wedi byw yma am o leiaf 12 mis.`,
    readMore: 'Darllenwch fwy am breswylio’n arferol',
    helpText1:
      'Os ydych chi’n treulio’r rhan fwyaf o’ch amser yng Nghymru a Lloegr, rydych yn preswylio’n arferol yno yn ôl y gyfraith.',
    helpText2:
      'Mae’n bosib i hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant mewn ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Lloegr.',
    helpText3:
      'Nid yw’r enghreifftiau uchod yn rhestr ddihysbydd o amgylchiadau sy’n enghreifftio preswylfa arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yn rhywle. Os nad ydych yn siwr, dylech ofyn am gyngor cyfreithiol.',
  };
  const cyApp1App2Domiciled = {
    line1: `Mae eich atebion yn dangos y gallwch wneud ${apply} yng Nghymru a Lloegr am mai yng Nghymru a Lloegr y mae domisil y ddau ohonoch.`,
    readMore: 'Darllenwch fwy am beth yw domisil',
    helpText1:
      'Pan rydych yn cael eich geni, rydych yn cael <strong>mamwlad</strong>.Fel arfer, hwn yw: <ul class="govuk-list govuk-list--bullet"> <li>y wlad yr oedd eich tad â’i ddomisil ynddi os oedd eich rhieni yn briod</li> <li>y wlad yr oedd eich mam â’i domisil ynddi os nad oedd eich rhieni yn briod, neu os oedd eich tad wedi marw cyn ichi gael eich geni</li> </ul>',
    helpText2:
      'Os byddwch yn gadael eich domisil gwreiddiol ac yn ymsefydlu mewn gwlad arall fel oedolyn, efallai y daw’r wlad honno yn <strong>ddomisil drwy ddewis</strong> ichi.',
    helpText3: 'Dylech ddewis Ydy os oes gennych un o’r ddau fath o ddomisil yng Nghymru neu Loegr.',
    helpText4: 'Os nad ydych chi’n siwr am eich domisil, dylech ofyn am gyngor cyfreithiol.',
  };

  const cyConnections: Partial<Record<JurisdictionConnections, typeof cyApp1App2Resident | undefined>> = {
    [JurisdictionConnections.APP_1_APP_2_RESIDENT]: cyApp1App2Resident,
    [JurisdictionConnections.APP_1_APP_2_LAST_RESIDENT]: cyApp1App2LastResident,
    [JurisdictionConnections.APP_2_RESIDENT]: cyApp2Resident,
    [JurisdictionConnections.APP_1_RESIDENT_TWELVE_MONTHS]: cyApp1ResidentTwelveMonths,
    [JurisdictionConnections.APP_1_APP_2_DOMICILED]: cyApp1App2Domiciled,
  };

  return {
    title: `Gallwch ddefnyddio llys yng Nghymru neu Loegr ${
      isDivorce ? 'i gael ysgariad' : "i ddod â'ch partneriaeth sifil i ben"
    }`,
    ...cyConnections[connections[0]],
  };
};

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

const languages = { en, cy };

export const generateContent: TranslationFn = content => {
  if (!content.userCase?.connections?.length) {
    throw new Error('User cannot view "You can use English/Welsh courts" page if they have no connections');
  }

  const translations = languages[content.language](content, content.userCase.connections);
  return {
    ...translations,
    form,
  };
};
