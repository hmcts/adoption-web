import { TranslationFn } from '../../../app/controller/GetController';

const en = {
  title: 'Accessibility statement for the adoption service',
  websiteRanBy: 'This service allows prospective parents to apply to adopt a child online.',
  asManyAsPossible:
    "This service is run by HM Courts and Tribunals. We want as many people as possible to be able to use it, so we've designed it to be accessible. For example, you should be able to:",
  asManyAsPossibleColours: 'change colours, contrast levels and fonts',
  asManyAsPossibleZoom: 'zoom in up to 300% without the text spilling off the screen',
  asManyAsPossibleKeyboard: 'navigate most of the website using just a keyboard',
  asManyAsPossibleSpeech: 'navigate most of the website using speech recognition software',
  asManyAsPossibleListen:
    'listen to most of the website using a screen reader (including the most recent versions of NVDA, CCA (colour contrast Analyser) and voiceover)',
  simpleAsPossible: "We've also made the text as simple as possible to understand.",
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  howAccessible: 'How accessible this website is',
  somePartsNot: 'We know some parts of this service may not be accessible:',
  somePartsNotReflow: 'the text will not reflow in a single column when you change the size of the browser window',
  somePartsNotSpacing: 'you cannot modify the line height or spacing of text',
  somePartsNotFooter: 'all footer links are not yet implemented and so have not been tested.',
  feedbackAndContactInformation: 'Feedback and contact information',
  needMoreInformation:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
  email:
    'Email: <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to adoptionproject@justice.gov.uk">adoptionproject@justice.gov.uk</a>',
  phone: 'Call: 01634 887900',
  openingHours: 'Opening hours: Monday - Friday 9am - 5pm',
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  accessibilityPhoneNumber: 'Telephone: 01634 887900',
  accessibilityOpeningHours: 'Opening hours: Monday - Friday 9am - 5pm',
  improveAccessibility:
    'We’re always looking to improve the accessibility of this website. If you find any problems that aren’t addressed on this page, or think we’re not meeting accessibility requirements, please contact us:',
  enforcementProcedure: 'Enforcement procedure',
  humanRightsCommission:
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).',
  notHappy:
    'If you’ve contacted us about accessibility and you’re not happy with our response, you can contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">Equality Advisory and Support Service (EASS)</a>.',
  contactingUs: 'Contacting us by phone or visiting us in person',
  contactCourtDirectly:
    'If you have a question about accessibility in our family courts, you can <a href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/nearest/search-by-postcode" class="govuk-link" target="blank">contact the court directly</a>.',
  contactTextRelay:
    'We provide a text relay service for people who are deaf, hearing impaired or have a speech impediment.',
  contactInductionLoops:
    'The family courts have audio induction loops and you can also request step-free access, a sign language interpreter or foreign language interpreter.',
  technicalInfo: 'Technical information about this website’s accessibility',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  complianceStatus: 'Compliance status',
  partiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances and exemptions listed below.',
  nonAccessibleContent: 'Non-accessible content',
  accessibilityIssues:
    'Our feedback form and exit survey are both hosted by a third-party provider. We identified a number of accessibility issues with these pages but fixing them is beyond our control. We are liaising with the HMCTS Transforming Performance and Perception team to see what improvements can be made.',
  issuesWithMobile:
    'Content is not presented without loss of information and requiring scrolling in two dimensions while using the Adoption application via Mobile. This doesn’t meet WCAG 2.1 success criterion 1.4.10 (Reflow).',
  linkTextIssues:
    'On some pages, text used for links doesn’t clearly state where the link goes or what it’s for. This doesn’t meet WCAG 2.1 success criterion 2.4.4 (Link Purpose, In Context).',
  colourComboIssue:
    'Some of the colour combinations do not meet enhanced contrasts and are likely to be difficult for people with low vision to read. This doesn’t meet WCAG 1.4.6 Contrast (Enhanced). ',
  welshTranslationIssues:
    'On some pages the language has not been set in the code. This doesn’t meet WCAG 2.1 success criterion 3.1.2 (Language of Page) as Welsh translation is in work in progress.',
  planToFix: 'We plan to fix these content issues by February 2024.',
  contentNotInScope: 'Content that’s not within the scope of the accessibility regulations',
  issuesWithDocumentDescription1:
    'Many of our older PDFs and Word documents do not meet accessibility standards - for example, they may not be structured so they’re accessible to a screen reader. This does not meet WCAG 2.1 success criterion 4.1.2 (name, role value).',
  issuesWithDocumentDescription2:
    'Some of our PDFs and Word documents are essential to providing our services. By February 2024, we plan to either fix these or replace them with accessible HTML pages. Any new PDFs or Word documents we publish will meet accessibility standards.',
  improvingAccessibility: 'What we’re doing to improve accessibility',
  statementCommitted:
    'We’re committed to ensuring our services are accessible to all our customers and that they comply with level AA of the Web Content Accessibility Guidelines – WCAG 2.1.',
  statementDAC:
    'To help us achieve this, we will commission the <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Digital Accessibility Centre">Digital Accessibility Centre (DAC)</a> to carry out a WCAG 2.1 AA level technical compliance audit.',
  DACAudit:
    'Following the DAC audit in December 2022 we have made the following changes to improve accessibility of our online service.',
  DACImprovement1:
    'Below the heading ‘Before you start’ on our start page is a visual list of two items that contains information that the user should know before they start the process of adoption. The list was not semantically marked up, and a screen reader user may not be receiving the same relationship of the contents that a visual user can see. We have now semantically marked up this list so that screen readers will be able to see this list in the same way that non screen reader users can.',
  DACImprovement2:
    'We have removed technical background groupings from the ‘Upload documents’ page as screen reader users may find it problematic understanding the interactive elements provided.',
  DACImprovement3:
    'We have amended the ‘Your personal details’ and ‘Your contact details’ links to state whether they are the first applicant’s details or the second applicant’s details. Screen reader users will no longer need to navigate the content of the page to understand the purpose of the links.',
  DACImprovement4:
    'The user is presented with a summary page once the necessary details are provided by the user completing the adoption journey. There are multiple ‘Change’ links provided that the user can activate to change any information submitted. A number of the ‘Change’ links are duplicated. We have now ensured that any duplicated links within the application summary are unique. This will help users, specifically screen reader users, understand the differences between the links.',
  DACImprovement5:
    'There were certain headings displayed in an incorrect technical list format. We have corrected this so that information is conveyed correctly to screen reader users.',
  DACImprovement6:
    'Users are now given an option to extend their session before the user is timed out. This can let the user decide if they need more time to complete the adoption application. ',
  DACImprovement7:
    'The service has been updated to ensure that keyboard users are positioned at the beginning of page to clear any difficulties that may occur for the user.',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement',
  statementPreparationDate:
    'This statement was prepared on 17 February 2023. It was last reviewed on 17 February 2023. ',
  lastTestedStatement:
    'This website was last tested on 7 December 2022. The test was carried out by the <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Digital Accessibility Centre">Digital Accessibility Centre (DAC)</a>.',
  DACTestStatement:
    'The DAC carried out a WCAG 2.1 AA level technical compliance audit that included over 50 hours of testing by users with a wide range of disabilities. ',
};

const cy: typeof en = {
  title: 'Datganiad hygyrchedd ar gyfer y gwasanaeth mabwysiadu',
  websiteRanBy: 'Mae’r gwasanaeth hwn yn caniatáu i ddarpar rieni wneud cais i fabwysiadu plentyn ar-lein.',
  asManyAsPossible:
    'Gwasanaeth Llysoedd a Thribiwnlysoedd EM sy’n gyfrifol am y gwasanaeth hwn.  Rydym eisiau i gymaint o bobl â phosibl allu ei ddefnyddio, felly rydym wedi ceisio ei wneud mor hygyrch â phosibl.  Er enghraifft, dylech allu:',
  asManyAsPossibleColours: 'newid y lliwiau, y lefelau cyferbyniad a’r ffontiau',
  asManyAsPossibleZoom: 'gwneud y testun hyd at 300% yn fwy heb iddo ddiflannu oddi ar y sgrin',
  asManyAsPossibleKeyboard: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio bysellfwrdd yn unig",
  asManyAsPossibleSpeech: "llywio'r rhan fwyaf o'r wefan gan ddefnyddio meddalwedd adnabod llais",
  asManyAsPossibleListen:
    'gwrando ar y rhan fwyaf o’r wefan gan ddefnyddio darllenydd sgrin (gan gynnwys fersiynau diweddaraf NVDA, CCA (Dadansoddwr cyferbyniad lliwiau) a VoiceOver)',
  simpleAsPossible: 'Rydym hefyd wedi sicrhau ein bod wedi defnyddio iaith syml.',
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank">Mae AbilityNet</a> yn rhoi cyngor ar sut i wneud eich dyfais yn haws i’w defnyddio os oes gennych anabledd.',
  howAccessible: "Pa mor hygyrch yw'r wefan hon",
  somePartsNot: "Rydym yn gwybod nad yw rhai rhannau o'r wefan hon yn gwbl hygyrch:",
  somePartsNotReflow: 'nid yw’r testun yn newid i fod mewn un golofn pan fyddwch yn newid maint ffenestr y porwr',
  somePartsNotSpacing: 'ni allwch newid lled y llinellau neu fylchiad y testun',
  somePartsNotFooter: 'Nid yw’r holl ddolenni yn y troedynnau yn weithredol ac felly nid ydynt wedi’u profi.',
  feedbackAndContactInformation: 'Adborth a gwybodaeth gyswllt',
  needMoreInformation:
    'Os ydych angen gwybodaeth sydd ar y wefan hon mewn fformat arall megis ar ffurf PDF hygyrch, print bras, fformat hawdd ei ddarllen, recordiad sain neu braille:',
  email:
    'E-bost: <a href="mailto:ymholiadaucymraeg@justice.gov.uk" class="govuk-link">ymholiadaucymraeg@justice.gov.uk</a>',
  phone: 'Ffoniwch: 01634 887900',
  openingHours: 'Oriau agor: Dydd Llun – Dydd Gwener  9am - 5pm',
  considerYourRequest: 'Byddwn yn ystyried eich cais ac yn ymateb o fewn 10 diwrnod gwaith.',
  reportingAccessibility: "Riportio problemau hygyrchedd gyda'r wefan hon",
  accessibilityPhoneNumber: 'Rhif ffôn: 01634 887900',
  accessibilityOpeningHours: 'Oriau agor: Dydd Llun – Dydd Gwener  9am - 5pm',
  improveAccessibility:
    'Rydym wastad yn ceisio gwella hygyrchedd y wefan hon. Os byddwch yn cael unrhyw broblemau nad ydynt yn cael eu crybwyll ar y dudalen hon, neu os ydych yn credu nad ydym yn bodloni gofynion y rheoliadau hygyrchedd, cysylltwch â:',
  enforcementProcedure: 'Y Weithdrefn Orfodi',
  humanRightsCommission:
    'Y Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) sy’n gyfrifol am orfodi Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018 (y ‘rheoliadau hygyrchedd’).',
  notHappy:
    'Os ydych wedi cysylltu â ni ynghylch mater hygyrchedd ac nad ydych yn fodlon â’n hymateb, gallwch gysylltu â’r <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank">Gwasanaeth Chynghori a Chymorth Cydraddoldeb (EASS)</a>.',
  contactingUs: 'Cysylltu â ni dros y ffôn neu ymweld â ni’n bersonol',
  contactCourtDirectly:
    "Os oes gennych gwestiwn am hygyrchedd yn ein llysoedd teulu, gallwch <a href='https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/nearest/search-by-postcode?lang=cy' class='govuk-link' target='_blank' lang='cy'>gysylltu â'r llys yn uniongyrchol</a>.",
  contactTextRelay:
    'Rydym yn darparu gwasanaeth cyfnewid negeseuon testun ar gyfer pobl fyddar, pobl sydd â nam ar eu clyw a phobl sydd â nam ar eu lleferydd.',
  contactInductionLoops:
    'Mae gan y llysoedd teulu ddolenni sain a gallwch hefyd ofyn am gael mynediad heb risiau, cyfieithydd iaith arwyddion neu gyfieithydd iaith dramor.',
  technicalInfo: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
  hmctsIsCommitted:
    'Mae GLlTEM wedi ymrwymo i sicrhau bod ei wefannau yn hygyrch, a hynny yn unol â Rheoliadau Hygyrchedd Cyrff y Sector Gyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018.',
  complianceStatus: 'Statws cydymffurfiaeth',
  partiallyCompliant:
    'Mae’r wefan hon yn cydymffurfio’n rhannol â safon <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">AA Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.1,</a>a hynny oherwydd y materion o beidio â chydymffurfio a’r esemptiadau a restrir isod.',
  nonAccessibleContent: 'Cynnwys anhygyrch',
  accessibilityIssues:
    'Mae ein ffurflen adborth a’r arolwg adborth yn cael eu cynnal gan ddarparwr trydydd parti. Mi wnaethom adnabod nifer o faterion hygyrchedd gyda’r tudalennau hyn ond mae eu datrys y tu hwnt i’n rheolaeth. Rydym yn trafod gyda thîm Trawsnewid Perfformiad a Chanfyddiad GLlTEF i ganfod pa welliannau y gellir eu gwneud.',
  issuesWithMobile:
    'Cynnwys ddim i’w weld heb golli gwybodaeth ac angen sgrolio mewn dwy ffordd wahanol wrth ddefnyddio’r gwasanaeth Mabwysiadu ar ddyfais symudol. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 1.4.3 (Reflow).',
  linkTextIssues:
    'Ar rai tudalennau, nid yw’r testun a ddefnyddir ar gyfer dolenni yn nodi’n glir i ble y bydd y ddolen yn mynd â chi neu beth yw ei phwrpas. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 2.4.4 (Pwrpas y Ddolen, Ystyried y Cyd-destun).',
  colourComboIssue:
    'Nid yw rhai o’r cyfuniadau lliw yn cwrdd â chyferbyniadau uwch ac yn debygol o fod yn anodd i bobl â golwg gwan eu darllen. Nid yw hyn yn bodloni WCAG 1.4.6 Cyferbyniad (Uwch).',
  welshTranslationIssues:
    'Ar rai tudalennau, nid yw’r iaith wedi’i rhoi mewn cod. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 3.1.2 (Iaith tudalen) gan fod y cyfieithiad Cymraeg yn cael ei baratoi ar hyn o bryd.',
  planToFix: 'Rydym yn bwriadu datrys y materion hyn erbyn mis Chwefror 2024.',
  contentNotInScope: 'Cynnwys sydd ddim o fewn cwmpas y rheoliadau hygyrchedd',
  issuesWithDocumentDescription1:
    'Nid yw nifer o’n dogfennau PDF a Word hŷn yn bodloni’r safonau hygyrchedd - er enghraifft, efallai nad ydynt wedi’u strwythuro fel eu bod yn hygyrch i ddarllenydd sgrin. Nid yw hyn yn bodloni WCAG 2.1 maen prawf llwyddiant 4.1.2 (Enw, Rôl, Gwerth).',
  issuesWithDocumentDescription2:
    'Mae rhai o’n dogfennau PDF a Word yn hanfodol i’r gwasanaethau a ddarparwn. Erbyn Chwefror 2024, rydym yn bwriadu i naill ai ddatrys y materion neu eu newid gyda thudalennau HTML hygyrch.  Bydd unrhyw ddogfennau PDF neu Word newydd y byddwn yn eu cyhoeddi yn bodloni’r safonau hygyrchedd.',
  improvingAccessibility: 'Beth rydym yn ei wneud i wella hygyrchedd y gwasanaeth hwn',
  statementCommitted:
    'Rydym wedi ymrwymo i sicrhau bod ein gwasanaethau’n hygyrch i’n holl gwsmeriaid a’u bod yn cydymffurfio â lefel AA Canllawiau Hygyrchedd Cynnwys Gwe - WCAG 2.1.',
  statementDAC:
    'I’n helpu i gyflawni hyn, byddwn yn comisiynu y <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank">Ganolfan Hygyrchedd Digidol (DAC)</a> i gynnal archwiliad cydymffurfiad technegol WCAG 2.1 lefel AA.',
  DACAudit:
    'Yn dilyn archwiliad DAC ym mis Rhagfyr 2022 rydym wedi gwneud y newidiadau canlynol er mwyn gwella hygyrchedd ein gwasanaeth ar-lein. ',
  DACImprovement1:
    'Islaw’r pennawd ‘Cyn i chi ddechrau’ ar ein tudalen cychwyn mae rhestr o ddwy eitem sy’n cynnwys gwybodaeth y dylai’r defnyddiwr ei gwybod cyn iddo ddechrau’r broses mabwysiadu. Nid oedd y rhestr wedi’i marcio’n semantaidd, ac efallai na fydd defnyddiwr darllenydd sgrin yn gweld yr un cynnwys y gall defnyddiwr gweledol ei weld. Rydym bellach wedi marcio’r rhestr hon yn semantaidd fel y bydd darllenwyr sgrin yn gallu gweld y rhestr hon yn yr un ffordd ag y gall defnyddwyr nad ydynt yn defnyddio darllenydd sgrin ei weld.',
  DACImprovement2:
    "Rydym wedi tynnu grwpiau cefndir technegol o’r dudalen ‘Llwytho Dogfennau' gan y gallai defnyddwyr darllenydd sgrin ei chael yn broblematig deall yr elfennau rhyngweithiol a ddarperir. ",
  DACImprovement3:
    'Rydym wedi diwygio’r dolenni ‘Eich manylion personol’ a ‘Eich manylion cyswllt’ er mwyn nodi ai manylion y ceisydd cyntaf neu fanylion yr ail geisydd ydyn nhw. Ni fydd angen i ddefnyddwyr darllenydd sgrin lywio cynnwys y dudalen mwyach er mwyn deall pwrpas y dolenni.',
  DACImprovement4:
    "Cyflwynir tudalen gryno i’r defnyddiwr unwaith y darperir y manylion angenrheidiol gan y defnyddiwr sy’n cwblhau’r siwrnai fabwysiadu. Mae sawl dolen ‘Newid’ wedi eu darparu ar yr amod y gall y defnyddiwr actifadu i newid unrhyw wybodaeth a gyflwynir. Mae nifer o'r dolenni 'Newid' yn cael eu dyblygu. Rydym wedi sicrhau bod unrhyw ddolenni dyblyg o fewn crynodeb y cais yn unigryw. Bydd hyn yn helpu defnyddwyr, yn benodol defnyddwyr darllenwyr sgrin, i ddeall y gwahaniaethau rhwng y dolenni.",
  DACImprovement5:
    "Roedd rhai penawdau yn cael eu harddangos mewn fformat rhestr dechnegol anghywir. Rydym wedi cywiro hyn fel bod gwybodaeth yn cael ei chyfleu'n gywir i ddefnyddwyr darllenydd sgrin.",
  DACImprovement6:
    "Mae defnyddwyr bellach yn cael opsiwn i ymestyn eu sesiwn cyn i’r sesiwn ddod i ben. Gall hyn adael i’r defnyddiwr benderfynu a oes angen mwy o amser arno i gwblhau'r cais mabwysiadu. ",
  DACImprovement7:
    'Cafodd y gwasanaeth ei ddiweddaru i sicrhau bod defnyddwyr bysellfwrdd wedi’u lleoli ar ddechrau’r dudalen er mwyn datrys unrhyw anawsterau a all ddigwydd i’r defnyddiwr.',
  preparationAccessibilityStatement: 'Paratoi’r datganiad hygyrchedd hwn',
  statementPreparationDate:
    'Cafodd y datganiad hwn ei baratoi ar 17 Chwefror 2023. Cafodd ei adolygu ddiwethaf ar 17 Chwefror 2023.',
  lastTestedStatement:
    'Profwyd y wefan hon ddiwethaf ar 7 Rhagfyr 2022. Cynhaliwyd y prawf gan y <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank">Ganolfan Hygyrchedd Digidol (DAC)</a>. ',
  DACTestStatement:
    'Cynhaliodd y DAC archwiliad cydymffurfio technegol lefel AA WCAG 2.1 a oedd yn cynnwys dros 50 awr o brofion gan ddefnyddwyr ag ystod eang o anableddau.',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
