import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Apply to adopt a child placed in your care',
  line1:
    'You can apply to adopt a child who\'s in your care following a <a class="govuk-link" href="/eligibility/start">court placement order.</a>',
  line2:
    'You can start your application at any time however, the child must have lived with you for at least 10 weeks before you can submit it.',
  line3:
    "You can save your progress in the application by selecting 'save as draft'. This saves your answers so you can continue working on the application at a later date. You can only submit once all sections are complete.",
  heading1: 'Before you start',
  subheading1: 'Details about you',
  line4: 'You need to provide details about yourself and any second applicant.',
  line5:
    "Some of the information is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate.",
  line6:
    "You will be asked for information that is on the child's placement order. This includes the name of the local authority who placed the child in your care and the court which made the order. Your social worker or adoption agency will have this information.",
  line7: 'You will be asked for some personal information. This does not affect your application to adopt.',
  line8: 'The information you provide is only seen by the court and relevant adoption agencies or authorities.',
  subheading2: 'What to expect',
  line9:
    'The court processing fee for an application is £MOCK_AMOUNT. Payment is due once the application is complete and ready to submit to the court.',
  line10:
    "We will notify your local authority of your application. They will provide details to the court about the child you wish to adopt. This includes information about their birth parents and any siblings. If you don't receive an email confirming this has been done within 10 working days, contact your social worker.",
  line11:
    "Once your application and the information from your local authority is submitted, it can take up to 6 weeks before the court contacts you about a first hearing date. You do not have to attend any of the hearing dates. Some of the child's birth relatives can also be present at court hearings. Your social worker can discuss these hearings with you.",
  subheading3: 'Applying for more than one child',
  line12:
    "If you're applying for more than one child, you must submit a new application for each child. You will not be charged if you submit these before midnight on the day of your first application. If you submit after the day of the first application, you will be charged another £183. For this reason we recommend you begin the applications early and have everything you need.",
  line13: 'You must sign in using the same email address and password used in your first application.',
  startnow: 'Start now',
};

const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn a osodwyd yn eich gofal',
  line1:
    'Gallwch wneud cais i fabwysiadu plentyn sydd yn eich gofal yn dilyn <a class="govuk-link" href="/eligibility/start">gorchymyn lleoli gan y llys.</a>',
  line2:
    "Gallwch ddechrau eich cais ar unrhyw adeg fodd bynnag, mae'n rhaid i'r plentyn fod wedi byw gyda chi am o leiaf 10 wythnos cyn y gallwch gyflwyno’r cais.",
  line3:
    "Gallwch gadw eich cais drwy ddewis 'save as draft'. Bydd hyn yn cadw eich atebion fel y gallwch barhau i weithio ar y cais yn hwyrach ymlaen. Dim ond unwaith y bydd pob adran wedi'i chwblhau y gallwch ei gyflwyno.",
  heading1: 'Cyn i chi ddechrau ',
  subheading1: 'Manylion amdanoch chi',
  line4: 'Mae angen i chi ddarparu manylion amdanoch chi eich hun ac unrhyw ail geisydd. ',
  line5:
    "Mae angen rhywfaint o'r wybodaeth ar gyfer y Gofrestr Mabwysiadu a'r dystysgrif fabwysiadu a fydd yn disodli tystysgrif geni’r plentyn.",
  line6:
    "Gofynnir i chi am wybodaeth sydd ar orchymyn lleoli’r plentyn. Mae hyn yn cynnwys enw'r awdurdod lleol a osododd y plentyn yn eich gofal a'r llys a wnaeth y gorchymyn. Bydd gan eich gweithiwr cymdeithasol neu'ch asiantaeth fabwysiadu'r wybodaeth hon.",
  line7: 'Nid yw eich gwybodaeth bersonol yn effeithio ar eich cais i fabwysiadu.',
  line8:
    'Dim ond y llys ac asiantaethau neu awdurdodau mabwysiadu perthnasol fydd yn gweld yr wybodaeth y byddwch yn ei darparu.',
  subheading2: "Beth i'w ddisgwyl",
  line9:
    'Bydd eich awdurdod lleol yn darparu manylion am y plentyn yr hoffech ei fabwysiadu. Mae hyn yn cynnwys gwybodaeth am ei rieni genedigol ac unrhyw frodyr a chwiorydd.',
  line10:
    "Mae’n costio £MOCK_AMOUNT i’r llys brosesu’r cais. Mae disgwyl i'r taliad gael ei wneud unwaith y bydd y cais wedi'i gwblhau ac yn barod i'w gyflwyno i'r llys.",
  line11:
    "Unwaith y byddwch yn cyflwyno eich cais, gall gymryd hyd at 6 wythnos cyn i'r llys gysylltu â chi am ddyddiad y gwrandawiad cyntaf. Nid oes rhaid i chi fod yn bresennol ar unrhyw un o'r dyddiadau hyn.",
  line12: 'Anfonir diweddariadau trwy e-bost, neu drwy’r post os yw hyn yn well gennych.',
  subheading3: '',
  line13: '',
  startnow: 'Dechrau nawr',
};

describe('eligibility > start > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
    fee: {
      FeeCode: 'MOCK_CODE',
      FeeDescription: 'MOCK_DESCRIPTION',
      FeeVersion: 'MOCK_VERSION',
      FeeAmount: 'MOCK_AMOUNT',
    },
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
