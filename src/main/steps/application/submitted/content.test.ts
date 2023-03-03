import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Application submitted',
  referenceNumberAndChildName:
    'Your reference number<br><strong>1234567890123456</strong> <br><br><strong>CHILD_FIRST_NAME CHILD_LAST_NAME</strong>',
  emailSentConfirmation:
    'We have sent you a confirmation email. If you have not received this, you should check your junk or spam folder.',
  nextStep: 'What happens next',
  line1:
    "Your application is sent to the local authority who will provide details of the child's birth parents and any siblings. They will send your application and a separate adoption report (Annex A) to the court. If you don't receive an email confirming this has been done within 10 working days, contact your social worker.",
  line2:
    'The court reviews your application and informs the birth parents, if applicable, of your application to adopt. They might ask the court for leave to oppose. Your social worker should let you know if this happens and how it will affect your application to adopt.',
  line3:
    'There will be a number of court hearings involving the local authority and social workers. You do not have to attend these. Birth relatives of the child may also attend the hearings.',
  line4:
    'Once the adoption order is granted, an adoption certificate is created. This replaces the child\'s birth certificate. It can be ordered from the <a href="https://www.gov.uk/general-register-office" class="govuk-link" target="_blank">General Register Office</a> for a small fee.',
  line5:
    'You should contact your social worker for updates on your application. The adoption service cannot provide these.',
  multipleChildren: 'Adopting more than one child',
  line6:
    'If you are applying for more than one child, you must complete and submit a new application for each child. This must be done before midnight on the day you submitted your first application or you will be charged an additional court fee of £183.',
  line7: 'You will be asked the same questions. This is because each application is treated separately.',
  line8:
    'You might find it useful to take a note of each new reference number next to the name of the child you are applying to adopt. The emails you receive will only contain the reference number.',
  line9: 'You must use the same email address and password for all your applications.',
  newApplication: 'Start a new application for a different child',
  printApplication: 'Print your application',
};

const cyContent = {
  title: 'Cais wedi’i gyflwyno',
  referenceNumberAndChildName:
    'Eich cyfeirnod<br><strong>1234567890123456</strong> <br><br><strong>CHILD_FIRST_NAME CHILD_LAST_NAME</strong>',
  emailSentConfirmation:
    'Rydym wedi anfon neges gadarnhau atoch drwy e-bost. Os nad ydych wedi cael y neges hon, dylech wirio eich ffolder sothach neu spam.',
  nextStep: 'Beth fydd yn digwydd nesaf',
  line1:
    'Fe anfonir eich cais i’r awdurdod lleol a fydd yn darparu manylion am rieni biolegol y plentyn ac unrhyw frodyr/chwiorydd. Byddant yn anfon eich cais ac adroddiad mabwysiadu ar wahân (Atodiad A) i’r llys. Os na chewch neges e-bost yn cadarnhau bod hyn wedi’i wneud o fewn 10 diwrnod gwaith, cysylltwch â’ch gweithiwr cymdeithasol.',
  line2:
    'Bydd y llys yn adolygu eich cais ac yn hysbysu’r rhieni biolegol, os yw’n berthnasol, am eich cais i fabwysiadu. Efallai y byddant yn gofyn i’r llys am ganiatâd i’w wrthwynebu. Dylai eich gweithiwr cymdeithasol adael i chi wybod os digwydd hyn a sut bydd yn effeithio ar eich cais i fabwysiadu.',
  line3:
    'Fe gynhelir nifer o wrandawiadau llys gyda’r awdurdod lleol a’r gweithwyr cymdeithasol. Nid oes rhaid ichi fynychu’r rhain. Efallai y bydd perthnasau biolegol y plentyn hefyd yn mynychu’r gwrandawiadau.',
  line4:
    'Unwaith y bydd y gorchymyn mabwysiadu yn cael ei gymeradwyo, bydd tystysgrif mabwysiadu yn cael ei chyflwyno. Bydd y dystysgrif hon yn disodli tystysgrif geni’r plentyn. Gellir ei harchebu o’r <a href="https://www.gov.uk/general-register-office" class="govuk-link" target="_blank">Swyddfa Gofrestru Gyffredinol</a> am ffi fechan.',
  line5:
    'Dylech gysylltu â’ch gweithiwr cymdeithasol i gael diweddariadau am eich cais. Ni all y gwasanaeth mabwysiadu roi diweddariadau i chi.',
  multipleChildren: 'Mabwysiadu mwy nag un plentyn',
  line6:
    'Os ydych chi’n gwneud cais i fabwysiadu mwy nag un plentyn, mae’n rhaid i chi gwblhau a chyflwyno cais newydd ar gyfer pob plentyn. Rhaid gwneud hyn cyn hanner nos ar y dyddiad y byddwch yn cyflwyno eich cais cyntaf neu fe godir ffi llys ychwanegol arnoch o £183.',
  line7: 'Fe ofynnir yr un cwestiynau i chi. Mae hyn oherwydd fe ymdrinnir â phob cais ar wahân.',
  line8:
    'Efallai y byddai’n eich helpu i nodi pob cyfeirnod newydd wrth enw’r plentyn rydych yn gwneud cais i’w fabwysiadu. Dim ond y cyfeirnod fydd wedi’i nodi ar y negeseuon e-bost a anfonir atoch.',
  line9: 'Rhaid ichi ddefnyddio’r un cyfeiriad e-bost a chyfrinair ar gyfer pob cais.',
  newApplication: 'Dechrau cais newydd ar gyfer plentyn arall',
  printApplication: 'Argraffu eich cais',
};

describe('application-submmitted > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      hyphenatedCaseRef: '1234567890123456',
      childrenFirstName: 'CHILD_FIRST_NAME',
      childrenLastName: 'CHILD_LAST_NAME',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
