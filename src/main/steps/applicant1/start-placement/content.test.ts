import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  title: 'Apply to adopt a child placed in your care',
  line1:
    'You can apply to adopt a child who\'s in your care following a <a class="govuk-link" href="/eligibility/start">court placement order.</a>',
  line2:
    'The child must have lived with you for at least 10 weeks before you apply. You will not be able to submit your application until the 10 week period has passed.',
  line3:
    "You can start your application and save progress by selecting 'save as draft'. This will make sure your answers are saved so you can continue working on the application at a later date. You can only submit once all sections are completed.",
  heading1: 'Before you start',
  subheading1: 'Details about the child',
  line4: 'You will need some documents and information about the child:',
  bulletPoint1: "the child's full birth certificate (this includes details of the child's birth parents)",
  bulletPoint2: "details from the child's placement order",
  bulletPoint3: "the birth parents' names, addresses and occupations",
  bulletPoint4:
    "details of any previous court proceedings involving the child, or the child's siblings or half siblings",
  line5: 'Your social worker or adoption agency can help to provide these details.',
  subheading2: 'Details about you',
  line6:
    "You will need to provide details about yourself and any second applicant. Some of the information you provide is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate. Your personal information will not affect your application to adopt.",
  line7: 'The information you provide will only be seen by the court and relevant adoption agencies or authorities.',
  line8: 'Start now',
};

const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn yn eich gofal',
  line1:
    'Gallwch wneud cais i fabwysiadu plentyn sydd yn eich gofal ar ôl i’r llys wneud gorchymyn lleoli.</a>',
  line2:
    'Rhaid bod y plentyn wedi byw gyda chi am o leiaf 10 wythnos cyn ichi wneud cais. Ni fyddwch yn gallu cyflwyno’ch cais nes bod y cyfnod o 10 wythnos wedi mynd heibio.',
  line3:
    'Gallwch gychwyn eich cais a chadw eich cynnydd trwy glicio ar ‘cadw fel drafft’. Bydd hyn yn sicrhau bod eich atebion yn cael eu cadw fel y gallwch barhau i weithio ar y cais yn ddiweddarach. Gallwch ond cyflwyno’r cais pan fydd yr holl adrannau wedi’u cwblhau.',
  heading1: 'Cyn ichi ddechrau',
  subheading1: 'Manylion am y plentyn',
  line4: 'Bydd arnoch angen rhai dogfennau a gwybodaeth am y plentyn:',
  bulletPoint1: 'tystysgrif geni llawn y plentyn (mae hyn yn cynnwys manylion rheini biolegol y plentyn)',
  bulletPoint2: 'manylion o orchymyn lleoli’r plentyn',
  bulletPoint3: 'enwau, cyfeiriadau a galwedigaethau’r rhieni biolegol',
  bulletPoint4:
    'manylion unrhyw achosion llys blaenorol sy’n ymwneud â’r plentyn, neu frodyr/chwiorydd neu hanner brodyr/chwiorydd y plentyn',
  line5: 'Gall eich gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadu eich helpu i ddarparu’r manylion hyn.',
  subheading2: 'Eich manylion chi',
  line6:
    'Bydd arnoch angen darparu manylion am eich hun ac unrhyw ail geisydd. Bydd angen rhywfaint o’r wybodaeth byddwch yn ei darparu ar gyfer y Gofrestr  Fabwysiadu a’r dystysgrif mabwysiadu, a fydd yn disodli tystysgrif geni’r plentyn. Ni fydd eich gwybodaeth bersonol yn effeithio ar eich cais i fabwysiadu.',
  line7:
    'Dim ond y llys fydd yn gweld yr wybodaeth a ddarperir gennych, ynghyd â’r asiantaethau mabwysiadau neu’r awdurdodau perthnasol.',
  line8: 'Dechrau Nawr',
};

describe('applicant1 > start-placement > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
