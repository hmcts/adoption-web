import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Before you start',
  line1:
    'This online service can only be used to apply for post placement adoptions. This means adopting a child who has been placed in your care by a local authority. To adopt a step-child, a child from overseas or a baby that has been willingly given up by the birth parents, you must <a class="govuk-link" href="https://www.gov.uk/government/publications/form-a58-application-for-an-adoption-order-section-46-adoption-and-children-act-2002">apply for an adoption order.</a>',
  line2:
    'You can start your application at any time however, the child must have lived with you for at least 10 weeks before you can submit it.',
  subheading1: 'Details about you',
  line3: 'You need to provide details about yourself and any second applicant.',
  line4:
    "Some of the information is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate.",
  line5:
    "You will be asked for information that is on the child's placement order. This includes the name of the local authority who placed the child in your care and the court which made the order. Your social worker or adoption agency will have this information.",
  line6: 'You will be asked for some personal information. This does not affect your application to adopt.',
  subheading2: 'What to expect',
  line7:
    "We will notify your local authority of your application. They will provide details to the court about the child you wish to adopt. This includes information about their birth parents and any siblings. If you don't receive an email confirming this has been done within 10 working days, contact your social worker.",
  line8:
    "Once your application and the information from your local authority is submitted, it can take up to 6 weeks before the court contacts you about a first hearing date. You do not have to attend any of the hearing dates. Some of the child's birth relatives can also be present at court hearings. Your social worker can discuss these hearings with you.",
  continue: 'Continue',
});

const cy: typeof en = () => ({
  title: 'Cyn ichi ddechrau',
  line1:
    'Gellir defnyddio’r gwasanaeth ar-lein hwn i wneud ceisiadau mabwysiadu ar ôl lleoliad yn unig. Mae hyn yn golygu mabwysiadu plentyn sydd wedi cael ei roi dan eich gofal gan awdurdod lleol. Rhaid i chi <a class="govuk-link" href="https://www.gov.uk/government/publications/form-a58-application-for-an-adoption-order-section-46-adoption-and-children-act-2002">wneud cais am orchymyn mabwysiadu</a> i fabwysiadu llysblentyn, plentyn o dramor neu faban y mae ei rieni wedi cytuno i’w roi i ffwrdd.',
  line2:
    "Gallwch ddechrau eich cais ar unrhyw adeg fodd bynnag, mae'n rhaid i'r plentyn fod wedi byw gyda chi am o leiaf 10 wythnos cyn y gallwch gyflwyno’r cais.",
  subheading1: 'Manylion amdanoch chi',
  line3: 'Mae angen i chi ddarparu manylion amdanoch chi eich hun ac unrhyw ail geisydd. ',
  line4:
    "Mae angen rhywfaint o'r wybodaeth ar gyfer y Gofrestr Mabwysiadu a'r dystysgrif fabwysiadu a fydd yn disodli tystysgrif geni’r plentyn.",
  line5:
    "Gofynnir i chi am wybodaeth sydd ar orchymyn lleoli’r plentyn. Mae hyn yn cynnwys enw'r awdurdod lleol a osododd y plentyn yn eich gofal a'r llys a wnaeth y gorchymyn. Bydd gan eich gweithiwr cymdeithasol neu'ch asiantaeth fabwysiadu'r wybodaeth hon.",
  line6: 'Fe ofynnir am rywfaint o wybodaeth bersonol gennych. Nid yw hyn yn effeithio ar eich cais i fabwysiadu.',
  subheading2: "Beth i'w ddisgwyl",
  line7:
    'Byddwn yn hysbysu eich awdurdod lleol am eich cais. Byddant yn rhoi manylion i’r llys am y plentyn rydych yn dymuno ei fabwysiadu. Mae hyn yn cynnwys gwybodaeth am eu rhieni biolegol ac unrhyw frodyr/chwiorydd. Os na chewch neges e-bost yn cadarnhau bod hyn wedi’i wneud o fewn 10 diwrnod gwaith, cysylltwch â’ch gweithiwr cymdeithasol.',
  line8:
    'Unwaith y bydd eich cais a’r wybodaeth gan eich awdurdod lleol wedi’u cyflwyno, gall gymryd hyd at 6 wythnos cyn i’r llys gysylltu â chi gyda manylion dyddiad y gwrandawiad cyntaf. Nid oes rhaid i chi fynychu unrhyw un o’r gwrandawiadau llys. Gall rhai o berthnasau biolegol y plentyn hefyd fod yn bresennol yn y gwrandawiadau llys. Gall eich gweithiwr cymdeithasol drafod y gwrandawiadau hyn gyda chi.',
  continue: 'Parhau',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
