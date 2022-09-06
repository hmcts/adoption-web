import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Getting started',
  heading1: 'Submitting a response to an adoption application',
  line3:
    'Use this service to complete an application form that has been submitted by the prospective adoptive parents. You can save your progress at any time however, you must submit the application within xxx days.',
  heading2: 'What you will need',
  line4: 'In order to complete the application and submit it to the court you will need:',
  line5: "child's full birth certificate",
  line6: 'marriage or civil partnership certificates of the applicants (if appropriate)',
  line7: 'death certificates of birth parents (if appropriate)',
  line8: 'last known addresses of the birth parents',
  line9: 'Certificates must be certified.',
  line10: 'You can also provide additional evidence such as:',
  line11: 'sealed or certified placement order for the child',
  line12: "any court orders for the child and/or child's siblings",
  line13: 'Annex A (if available)',
  line14: 'maintenance agreements or awards',
  line15:
    'two copies of photo ID of the applicants (passports, driving licences) including any immigration stamps on the pages',
  line16: 'any visas relating to the applicants if appropriate',
  line17:
    "You will be asked questions about the child's birth parents and siblings. You can review your answers to these questions before you submit the application.",
  heading3: 'Completing your response to the application',
  line18:
    'Any member of your team can access the application and add information. You should note that if two people access the application at the same time, whoever saves it may override information given by the other person.',
  line19: 'Completing and submitting your response to an application should not take longer than 30 minutes.',
};

const cyContent = {
  title: 'Cychwyn arni',
  heading1: 'Cyflwyno ymateb i gais mabwysiadu',
  line3:
    'Defnyddiwch y gwasanaeth hwn i lenwi ffurflen gais sydd wedi ei chyflwyno gan y darpar rieni mabwysiadol. Gallwch gadw eich ffurflen ar unrhyw adeg, fodd bynnag, rhaid i chi gyflwyno’r cais o fewn xxx o ddyddiau.',
  heading2: 'Beth fyddwch chi ei angen',
  line4: "Er mwyn llenwi'r cais a'i gyflwyno i'r llys byddwch angen:",
  line5: 'tystysgrif geni llawn y plentyn',
  line6: "tystysgrifau priodas neu bartneriaeth sifil y ceiswyr (os yw'n briodol)",
  line7: "tystysgrifau marwolaeth y rhieni biolegol (os yw'n briodol)",
  line8: 'cyfeiriadau hysbys olaf y rhieni biolegol',
  line9: 'Rhaid bod tystysgrifau wedi’u hardystio.',
  line10: 'Gallwch hefyd ddarparu tystiolaeth ychwanegol fel:',
  line11: 'gorchymyn lleoli wedi’i selio neu ei ardystio ar gyfer y plentyn',
  line12: 'unrhyw orchmynion llys i’r plentyn a/neu frodyr a chwiorydd y plentyn',
  line13: 'Atodiad A (os yw ar gael)',
  line14: 'cytundebau cynnal neu ddyfarniadau',
  line15:
    'dau gopi o ID gyda llun ar gyfer y ceiswyr (pasbortau, trwyddedau gyrru) gan gynnwys unrhyw stampiau mewnfudo ar y tudalennau',
  line16: "unrhyw fisas sy’n ymwneud â’r ceiswyr os yw'n briodol",
  line17:
    "Gofynnir cwestiynau i chi am rieni biolegol a brodyr a chwiorydd y plentyn. Gallwch adolygu eich atebion i'r cwestiynau hyn cyn i chi gyflwyno'r cais.",
  heading3: "Llenwi eich ymateb i'r cais",
  line18:
    "Gall unrhyw aelod o'ch tîm gael mynediad i’r cais ac ychwanegu gwybodaeth. Dylech nodi, os bydd dau unigolyn yn cael mynediad i’r cais ar yr un pryd, y gall pwy bynnag sy’n ei gadw ddiystyru gwybodaeth a roddir gan yr unigolyn arall.",
  line19: 'Ni ddylai gymryd mwy nag 30 munud i chi lenwi a chyflwyno eich ymateb i’r cais.',
};

describe('eligibility > start > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
    // fee: {
    //   FeeCode: 'MOCK_CODE',
    //   FeeDescription: 'MOCK_DESCRIPTION',
    //   FeeVersion: 'MOCK_VERSION',
    //   FeeAmount: 'MOCK_AMOUNT',
    // },
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
