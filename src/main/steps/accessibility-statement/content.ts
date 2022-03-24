/* istanbul ignore file */
import { TranslationFn } from '../../app/controller/GetController';

const en = () => ({
  title: 'Accessibility Statement',
  statement: 'Accessibility statement for the adoption service',
  websiteRanBy: 'This website is run by HM Courts & Tribunals Service',
  asManyAsPossible:
    'We want as many people as possible to be able to use this website. For example, that means you should be able to:',
  asManyAsPossibleColours: 'change colours, contrast levels and fonts',
  asManyAsPossibleZoom: 'zoom in up to 300% without the text spilling off the screen',
  asManyAsPossibleKeyboard: 'navigate most of the website using just a keyboard',
  asManyAsPossibleSpeech: 'navigate most of the website using speech recognition software',
  asManyAsPossibleListen:
    'listen to most of the website using a screen reader (including the most recent versions of JAWS, NVDA and VoiceOver)',
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  howAccessible: 'How accessible this website is',
  somePartsNot: 'We know some parts of this website aren’t fully accessible, for example:',
  somePartsNotPDF: 'many PDF documents aren’t fully accessible to screen reader software',
  somePartsNotColour: 'colour contrast makes it hard to read text in some parts of the website',
  somePartsNotTextToSpeech: 'text to speech software cannot read all the text on every page',
  somePartsNotEveryLink: 'not every link describes the purpose or destination',
  somePartsNotTextForHyperlinks:
    'the text used for hyperlinks doesn’t always describe the destination and purpose of the link',
  whatToDoIfYouCanAccessParts: 'What to do if you can’t access parts of this website',
  needMoreInformation:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
  email:
    'email <a href="mailto:HMCTSforms@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to HMCTSforms@justice.gov.uk">HMCTSforms@justice.gov.uk</a>',
  phone: 'call 0300 303 0642 (Monday to Friday, 8.30am to 5pm)',
  considerYourRequest: 'We’ll consider your request and get back to you as soon as possible.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  improveAccessibility:
    'We’re always looking to improve the accessibility of this website. If you find any problems that aren’t listed on this page or think we’re not meeting the requirements of the accessibility regulations contact: <a href="mailto:HMCTSforms@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to HMCTSforms@justice.gov.uk">HMCTSforms@justice.gov.uk</a>.',
  enforcementProcedure: 'Enforcement procedure',
  humanRightsCommission:
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the <a href="http://www.legislation.gov.uk/uksi/2018/852/contents/made" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Public Sector Bodies">Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018</a> (the ‘accessibility regulations’).',
  notHappy:
    'If you’re not happy with how we respond to your complaint, <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">contact the Equality Advisory and Support Service (EASS)</a>.',
  technicalInfo: 'Technical information about this website’s accessibility',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  websiteIsPartiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Web Content Accessibility Guidelines">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances listed below.',
  nonAccessibleContent: 'Non accessible content',
  contentListedBelow: 'The content listed below is non-accessible for the following reasons.',
  accessibilityRegulations: 'Non compliance with the accessibility regulations',
  issuesWithLinks: 'Issues with links',
  issuesWithLinksDescription:
    'On some pages, text used for links doesn’t clearly state where the link goes or what its for. This doesn’t meet WCAG 2.1 success criterion 2.4.4 (Link Purpose, In Context).',
  issuesWithHeadings: 'Issues with headings',
  issuesWithHeadingsDescription:
    'On some pages, the order of heading tags is wrong or don’t nest properly. This doesn’t meet WCAG 2.1 success criterion 1.3.1 (Information and Relationships).',
  issuesWithPDF: 'Issues with PDFs and other documents',
  issuesWithPDFDescription:
    'PDFs are used to download and keep legal documents but may not be structured so they’re accessible to a screen reader. This doesn’t meet WCAG 2.1 success criterion 4.1.2 (Name, role value).',
  issuesWithColour: 'Colour contrast',
  issuesWithColourDescription:
    'On some pages the colour of the text and the colour of the background are not in sufficient contrast to each other. This doesn’t meet WCAG 2.1 success criterion 1.4.3 (Contrast, Minimum).',
  issuesWithLanguage: 'Issues with language',
  issuesWithLanguageDescription:
    'On some pages the language has not been set in the code. This doesn’t meet WCAG 2.1 success criterion 3.1.2 (Language of Page).',
  issuesWithOther: 'Other known issues',
  issuesWithOtherDescription1: 'On some pages, we have forms containing empty labels.',
  issuesWithOtherDescription2:
    'Some page elements do not have clear ARIA tags which can effect how screen readers, and ARIA tags that cannot be read by screen readers.',
  issuesWithOtherDescription3: 'Some of the items in the navigation can not be read out using Voice Over.',
  issuesWithOtherDescription4:
    'On some pages, we show progress bars that indicate how far into the service you are. The structure of the progress bars cannot be read clearly by screen readers.',
  improvingAccessibility: 'What we’re doing to improve accessibility',
  planning: 'We are planning an external accessibility audit and will update our statement before our website is live.',
  statementPrepared: 'This statement was prepared on 19 September 2019.',
});

const cy: typeof en = () => ({
  title: 'Datganiad Hygyrchedd',
  statement: 'Datganiad hygyrchedd ar gyfer y gwasanaeth mabwysiadu',
  websiteRanBy: 'Gwasanaeth Llysoedd a Thribiwnlysoedd EM sy’n gyfrifol am y wefan hon',
  asManyAsPossible:
    "Rydym eisiau i gymaint â phosib o bobl i allu defnyddio'r wefan hon. Er enghraifft, mae hyn yn golygu y dylech allu:",
  asManyAsPossibleColours: 'newid y lliwiau, y lefelau cyferbyniad a’r ffontiau',
  asManyAsPossibleZoom: 'gwneud y testun hyd at 300% yn fwy heb iddo ddiflannu oddi ar y sgrin',
  asManyAsPossibleKeyboard: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio bysellfwrdd yn unig",
  asManyAsPossibleSpeech: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio meddalwedd adnabod llais",
  asManyAsPossibleListen:
    "gwrando ar y rhan fwyaf o'r wefan gan ddefnyddio darllenydd sgrin (gan gynnwys fersiynau diweddaraf JAWS, NVDA a VoiceOver)",
  abilityNet:
    '<a href="https://mcmw.abilitynet.neug.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab ar gyfer AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  howAccessible: "Pa mor hygyrch yw'r wefan hon",
  somePartsNot: "Rydym yn gwybod nad yw rhai rhannau o'r wefan hon yn gwbl hygyrch, er enghraifft:",
  somePartsNotPDF: 'nid yw rhai dogfennau PDF yn gwbl hygyrch i feddalwedd darllen sgrîn',
  somePartsNotColour: "mae’r lliwiau’n golygu ei bod yn anodd darllen y testun mewn rhai rhannau o'r wefan",
  somePartsNotTextToSpeech: 'ni all meddalwedd adnabod llais ddarllen yr holl destun ar bob tudalen',
  somePartsNotEveryLink: 'nid yw pob dolen yn cynnwys disgrifiad o’i phwrpas neu i ble y bydd yn mynd â chi',
  somePartsNotTextForHyperlinks:
    'nid yw’ r testun a ddefnyddir ar gyfer hyperddolenni wastad yn disgrifio i ble y bydd yn mynd â chi neu bwrpas y ddolen',
  whatToDoIfYouCanAccessParts: "Beth i'w wneud os na allwch ddefnyddio rhai rhannau o'r wefan hon",
  needMoreInformation:
    'Os ydych angen gwybodaeth sydd ar y wefan hon mewn fformat arall megis ar ffurf PDF hygyrch, print bras, fformat hawdd ei ddarllen, recordiad sain neu braille:',
  email:
    'e-bost <a href=”mailto:HMCTSforms@justice.gov.uk” class=”govuk-link” aria-label=”Bydd y ddolen hon yn agor mewn neges e-bost newydd i HMCTSforms@justice.gov.uk">HMCTSforms@justice.gov.uk</a>',
  phone: 'ffoniwch 0300 303 5171 (dydd Llun i ddydd Gwener, 8.30am - 5pm)',
  considerYourRequest: 'Byddwn yn ystyried eich cais ac yn ymateb cyn gynted â phosib.',
  reportingAccessibility: "Riportio problemau hygyrchedd gyda'r wefan hon",
  improveAccessibility:
    'Rydym bob amser yn ceisio gwella hygyrchedd y wefan hon. Os byddwch yn cael unrhyw broblemau nad ydynt yn cael eu crybwyll ar y dudalen hon, neu os ydych yn credu nad ydym yn bodloni gofynion y rheoliadau hygyrchedd, cysylltwch â: <a href=”mailto:HMCTSforms@justice.gov.uk” class=”govuk-link” aria-label=”Bydd y ddolen hon yn agor mewn neges e-bost newydd i HMCTSforms@justice.gov.uk”>HMCTSforms@justice.gov.uk</a>.',
  enforcementProcedure: 'Y Weithdrefn Orfodi',
  humanRightsCommission:
    'Y Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) sy’n gyfrifol am neufodi’r <a href=”http://www.legislation.gov.uk/uksi/2018/852/contents/made” class=”govuk-link” target=”_blank” aria-label=”Bydd y ddolen hon yn agor mewn tab newydd ar gyfer Cyrff y Sector Cyhoeddus”>Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018</a> (y’ rheoliadau hygyrchedd‘).”,',
  notHappy:
    'Os nad ydych chi’ n fodlon gyda’r ffordd rydym yn ymateb i’ch cwyn, <a href=https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label=Bydd y ddolen hon yn agor mewn tab newydd ar gyfer y Gwasanaeth Cynghori a Chymorth Cydraddoldeb">cysylltwch â’r Gwasanaeth Cynghori a Chymorth Cydraddoldeb (EASS)</a>.",',
  technicalInfo: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
  hmctsIsCommitted:
    'Mae GLlTEM wedi ymrwymo i sicrhau bod ei wefannau yn hygyrch, a hynny yn unol â Rheoliadau Hygyrchedd Cyrff y Sector Gyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018.',
  websiteIsPartiallyCompliant:
    '"Mae’r wefan hon yn cydymffurfio’n rhannol â <a href=https://www.w3.neug/TR/WCAG21/" class="govuk-link" target="_blank" aria-label=Bydd y ddolen hon yn agor mewn tab newydd ar gyfer y Canllawiau Hygyrchedd Cynnwys Gwe">Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.1</a> safon AA, a hynny oherwydd y materion o beidio â chydymffurfio a restrir isod.',
  nonAccessibleContent: 'Cynnwys nad yw’n hygyrch',
  contentListedBelow: 'Nid yw’r cynnwys isod yn hygyrch am y rhesymau canlynol.',
  accessibilityRegulations: 'Anghydymffurfio â’r rheoliadau hygyrchedd',
  issuesWithLinks: 'Problemau gyda dolenni',
  issuesWithLinksDescription:
    'Ar rai tudalennau, nid yw’r testun a ddefnyddir ar gyfer rhai dolenni yn nodi’n glir i ble y bydd y ddolen yn mynd â chi neu beth yw ei phwrpas. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 2.4.4 (Pwrpas y Ddolen, Ystyried y Cyd-destun).',
  issuesWithHeadings: 'Problemau gyda phenawdau',
  issuesWithHeadingsDescription:
    'Ar rai tudalennau, mae trefn tagiau penawdau yn anghywir neu nid ydynt yn y lle iawn. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 1.3.1 (Gwybodaeth a Pherthnasau).',
  issuesWithPDF: 'Problemau gyda dogfennau PDF a dogfennau eraill',
  issuesWithPDFDescription:
    'Defnyddir dogfennau PDF i lwytho a chadw dogfennau cyfreithiol ond mae’n bosib nad ydynt wedi’u strwythuro fel eu bod yn hygyrch i ddarllenydd sgrîn. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 4.1.2 (Enw, Rôl, Gwerth).',
  issuesWithColour: 'Cyferbyniad lliwiau',
  issuesWithColourDescription:
    "Ar rai tudalennau, nid yw lliw y testun a lliw y cefndir yn ddigon gwahanol i'w gilydd. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 1.4.3 (Cyferbyniad isaf).",
  issuesWithLanguage: 'Problemau ieithyddol',
  issuesWithLanguageDescription:
    'Ar rai tudalennau, nid yw’r iaith wedi’i rhoi mewn cod. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 3.1.2 (Iaith tudalen).',
  issuesWithOther: 'Problemau hysbys eraill',
  issuesWithOtherDescription1: 'Ar rai tudalennau, mae gennym ffurflenni sy’n cynnwys labeli gwag.',
  issuesWithOtherDescription2:
    'Nid yw rhai tudalennau’n cynnwys tagiau ARIA clir sy’n golygu na all darllenwyr sgrin ddarllen y tudalennau.',
  issuesWithOtherDescription3: 'Ni ellir defnyddio Voice Over i ddisgrifio cynnwys rhai tudalennau.',
  issuesWithOtherDescription4:
    "Ar rai tudalennau, rydym yn defnyddio barrau cynnydd i ddangos faint o'r gwasanaeth sydd gennych ar ôl. Ni all darllenwyr sgrîn ddarllen strwythur y barrau cynnydd yn glir.",
  improvingAccessibility: 'Beth rydym yn ei wneud i wella hygyrchedd',
  planning:
    'Rydym yn cynllunio i gynnal awdit hygyrchedd allanol a byddwn yn diweddaru ein datganiad cyn y daw ein gwefan yn fyw.',
  statementPrepared: 'Cafodd y datganiad hwn ei baratoi ar 19 Medi 2019.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
