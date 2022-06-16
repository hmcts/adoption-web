import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
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
  line7: 'Your personal information does not affect your application to adopt.',
  line8: 'The information you provide is only seen by the court and relevant adoption agencies or authorities.',
  subheading2: 'What to expect',
  line9:
    'Your local authority will provide details about the child you wish to adopt. This includes information about their birth parents and any siblings.',
  line10: `The court processing fee for an application is £${content.fee?.FeeAmount}. Payment is due once the application is complete and ready to submit to the court.`,
  line11:
    'Once you submit your application, it can take up to 6 weeks before the court contacts you about a first hearing date. You do not have to attend any of the hearing dates.',
  line12: 'Updates are sent via email, or post if this is preferable.',
});

const cy: typeof en = content => ({
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd yn eich gofal',
  line1:
    'Gallwch wneud cais i fabwysiadu plentyn sydd yn eich gofal ar ôl <a class="govuk-link" href="/eligibility/start">i’r llys wneud gorchymyn lleoli.</a>',
  line2:
    'Gallwch gychwyn eich cais unrhyw bryd, ond mae’n rhaid bod y plentyn wedi bod yn byw gyda chi am o leiaf 10 wythnos cyn y gallwch ei gyflwyno.',
  line3:
    'Gallwch gadw eich cais unrhyw bryd drwy glicio ar ‘cadw fel drafft’. Bydd hyn yn sicrhau bod eich atebion yn cael eu cadw fel y gallwch barhau i weithio ar y cais nes ymlaen. Gallwch ond cyflwyno’r cais pan fydd yr holl adrannau wedi’u llenwi.',
  heading1: 'Cyn i chi ddechrau',
  subheading1: 'Eich manylion chi',
  line4: 'Mae angen i chi ddarparu eich manylion chi a manylion unrhyw ail geisydd.',
  line5:
    'Mae rhywfaint o’r wybodaeth a ddarperir gennych yn angenrheidiol ar gyfer y Gofrestr Plant Mabwysiedig a’r dystysgrif mabwysiadu, a fydd yn disodli tystysgrif geni’r plentyn.',
  line6:
    'Fe ofynnir am wybodaeth sydd ar orchymyn lleoli’r plentyn. Mae hyn yn cynnwys enw’r awdurdod lleol a wnaeth leoli’r plentyn yn eich gofal ac enw’r llys a wnaeth y gorchymyn. Gallwch gael yr wybodaeth hon gan eich gweithiwr cymdeithasol neu asiantaeth fabwysiadu.',
  line7: 'Nid yw eich gwybodaeth bersonol yn effeithio ar eich cais i fabwysiadu.',
  line8:
    'Dim ond y llys a’r asiantaethau neu’r awdurdodau mabwysiadu perthnasol fydd yn gweld yr wybodaeth a ddarperir gennych.',
  subheading2: 'Beth i’w ddisgwyl',
  line9:
    'Bydd eich awdurdod lleol yn darparu gwybodaeth am y plentyn yr ydych eisiau ei fabwysiadu. Mae hyn yn cynnwys gwybodaeth am eu rhieni biolegol ac unrhyw frodyr/chwiorydd.',
  line10: `Ffi prosesu’r llys ar gyfer gwneud cais i fabwysiadu yw £${content.fee?.FeeAmount}. Mae’r taliad yn ddyledus unwaith y bydd y cais wedi’i gwblhau ac yn barod i’w gyflwyno i’r llys.`,
  line11:
    'Unwaith y byddwch yn cyflwyno eich cais, gall gymryd hyd at 6 wythnos cyn i’r llys gysylltu â chi gyda manylion dyddiad y gwrandawiad cyntaf. Nid oes rhaid i chi fynychu’r llys ar unrhyw un o ddyddiadau’r gwrandawiadau.',
  line12: 'Fe anfonir diweddariadau atoch drwy e-bost neu drwy’r post os byddech yn ffafrio hynny.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
