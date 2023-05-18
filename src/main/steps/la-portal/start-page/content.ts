import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Getting started',
  heading1: 'Submitting a response to an adoption application',
  line3:
    'Use this service to complete an application form that has been submitted by the prospective adoptive parents. You can save your progress at any time however, you should submit the application within 10 working days',
  line4:
    'You should upload the Annex A and any other relevant documents with the application so they can be processed together by the court. This will help prevent delays and reminders from being sent.',
  line5:
    'If the Annex A or other relevant documents are unavailable when you submit the application, you can email them to the court directly.',
  heading2: 'What you will need',
  line6: 'In order to complete the application and submit it to the court you will need:',
  line7: "child's full birth certificate",
  line8: 'death certificates of birth parents (if appropriate)',
  line9: 'last known addresses of the birth parents',
  line10: 'Certificates must be certified.',
  line11: 'You can also provide additional evidence such as:',
  line12: 'sealed or certified placement order for the child',
  line13: "any court orders for the child  and/or child's siblings",
  line14: 'Annex A (if available)',
  line15: 'maintenance agreements or awards',
  line16:
    "You will be asked questions about the child's birth parents and siblings. You can review your answers to these questions before you submit the application.",
  heading3: 'Completing your response to the application',
  line17:
    'Any member of your team can access the application and add information. You should note that if two people access the application at the same time, whoever saves it may override information given by the other person.',
  line18: 'Completing and submitting your response to an application should not take longer than 30 minutes.',
  startnow: 'Start now',
});

const cy: typeof en = () => ({
  title: 'Cychwyn arni',
  heading1: 'Cyflwyno ymateb i gais mabwysiadu',
  line3:
    'Defnyddiwch y gwasanaeth hwn i lenwi ffurflen gais sydd wedi ei chyflwyno gan y darpar rieni mabwysiadol. Gallwch gadw eich cais ar unrhyw adeg, fodd bynnag, dylech gyflwyno’r cais o fewn 10 diwrnod gwaith.',
  line4:
    'Dylech lwytho Atodiad A ac unrhyw ddogfennau perthnasol eraill gyda’r cais fel y gallant gael eu prosesu gyda’i gilydd gan y llys. Bydd hyn yn helpu i atal oedi a negeseuon atgoffa rhag cael eu hanfon.',
  line5:
    'Os na fydd Atodiad A neu ddogfennau perthnasol eraill ar gael pan fyddwch yn cyflwyno’r cais, gallwch eu hanfon ar e-bost yn uniongyrchol i’r llys.',
  heading2: 'Beth fyddwch chi ei angen',
  line6: "Er mwyn llenwi'r cais a'i gyflwyno i'r llys byddwch angen:",
  line7: 'tystysgrif geni llawn y plentyn',
  line8: "tystysgrifau marwolaeth y rhieni biolegol (os yw'n briodol)",
  line9: 'cyfeiriadau hysbys olaf y rhieni biolegol',
  line10: 'Rhaid bod tystysgrifau wedi’u hardystio.',
  line11: 'Gallwch hefyd ddarparu tystiolaeth ychwanegol fel:',
  line12: 'gorchymyn lleoli wedi’i selio neu ei ardystio ar gyfer y plentyn',
  line13: 'unrhyw orchmynion llys i’r plentyn a/neu frodyr a chwiorydd y plentyn',
  line14: 'Atodiad A (os yw ar gael)',
  line15: 'cytundebau cynnal neu ddyfarniadau',
  line16:
    "Gofynnir cwestiynau i chi am rieni biolegol a brodyr a chwiorydd y plentyn. Gallwch adolygu eich atebion i'r cwestiynau hyn cyn i chi gyflwyno'r cais.",
  heading3: "Llenwi eich ymateb i'r cais",
  line17:
    "Gall unrhyw aelod o'ch tîm gael mynediad i’r cais ac ychwanegu gwybodaeth. Dylech nodi, os bydd dau unigolyn yn cael mynediad i’r cais ar yr un pryd, y gall pwy bynnag sy’n ei gadw ddiystyru gwybodaeth a roddir gan yr unigolyn arall.",
  line18: 'Ni ddylai gymryd mwy nag 30 munud i chi lenwi a chyflwyno eich ymateb i’r cais.',
  startnow: 'Dechrau nawr',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
