import { TranslationFn } from '../../../app/controller/GetController';

const en = {
  title: 'Accessibility statement for the adoption service',
  websiteRanBy:
    'This accessibility statement applies to <a href="https://apply-for-adoption.platform.hmcts.net/eligibility/start" class="govuk-link" target="_blank" aria-label="This link will open in a new tab">Apply for adoption - Apply to adopt a child placed in your care - GOV.UK (hmcts.net)</a>. This service allows prospective parents to apply to adopt a child who\'s in your care following a court placement order. ',
  asManyAsPossible:
    "This service is run by HM Courts and Tribunals. We want as many people as possible to be able to use it, so we've designed it to be accessible. For example, you should be able to:",
  asManyAsPossibleColours: 'change colours, contrast levels and fonts',
  asManyAsPossibleZoom: 'zoom in up to 300% without the text spilling off the screen',
  asManyAsPossibleKeyboard: 'navigate most of the website using just a keyboard',
  asManyAsPossibleSpeech: 'navigate most of the website using speech recognition software',
  asManyAsPossibleListen:
    'listen to most of the website using a screen reader (including the most recent versions of NVDA, JAWS and voiceover)',
  simpleAsPossible: "We've also made the text as simple as possible to understand.",
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  howAccessible: 'How accessible this website is',
  somePartsNot: 'We know some parts of this website are not fully accessible:',
  somePartsNotReflow: 'some PDF documents may not be fully accessible to screen reader software.',
  feedbackAndContactInformation: 'Feedback and contact information',
  needMoreInformation:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
  findCourtTribunalDetails:
    'Use the <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">Find a Court or Tribunal service</a>' +
    ' to locate your nearest court that deals with adoption. This may not be the same court that made your placement order.',
  askIfUnsure: 'If you are still unsure which court to contact, you can ask your social worker for help.',
  email:
    'email: <a href="mailto:adoptionproject@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to adoptionproject@justice.gov.uk">adoptionproject@justice.gov.uk</a>',
  phone: 'Call: 01634 887900',
  openingHours: 'opening hours are Monday to Friday 9am - 5pm',
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  accessibilityPhoneNumber: 'Call: 01634 887900',
  accessibilityOpeningHours: 'opening hours are Monday to Friday 9am - 5pm',
  improveAccessibility:
    'We’re always looking to improve the accessibility of this website. If you find any problems that aren’t addressed on this page, or think we’re not meeting accessibility requirements, please contact us:',
  enforcementProcedure: 'Enforcement procedure',
  humanRightsCommission:
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).',
  notHappy:
    'If you’ve contacted us about accessibility and you’re not happy with our response, you can contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">Equality Advisory and Support Service (EASS)</a>.',
  contactingUs: 'Contacting us by phone or visiting us in person',
  contactTextRelay:
    'We provide a text relay service for people who are D/deaf, hearing impaired or have a speech impediment.',
  contactInductionLoops:
    'The family courts have audio induction loops or if you contact us before your visit we can arrange a British Sign Language (BSL) interpreter.',
  contactFindOutHowToContactUs:
    'Find out how to contact us at <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">Find a Court or Tribunal service.</a>',
  technicalInfo: 'Technical information about this website’s accessibility',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  complianceStatus: 'Compliance status',
  partiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances listed below.',
  nonAccessibleContent: 'Non-accessible content',
  accessibilityIssues: 'The content listed below is non-accessible for the following reasons.',
  issuesWithMobile: 'Non-compliance with the accessibility regulations',
  linkTextIssues:
    'Some of our PDF documents do not meet accessibility standards - for example, they may not be structured so they’re accessible to a screen reader. This does not meet WCAG 2.1 success criterion 4.1.2 (name, role value). ',
  improvingAccessibility: 'What we’re doing to improve accessibility',
  statementCommitted: 'By February 2024, we plan to fix or replace with HTML pages any non-accessible PDF documents.',
  statementDAC: 'When we update the service or make new releases, we carry out automated accessibility testing.',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement',
  statementPreparationDate: 'This statement was prepared on 13 June 2023. It was last reviewed on 5 July 2023. ',
  lastTestedStatement:
    'This website was last tested on 7 December 2022. The test was carried out by the <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Digital Accessibility Centre">Digital Accessibility Centre (DAC)</a>.',
  DACTestStatement:
    'The DAC carried out a WCAG 2.1 level technical compliance audit that included over 50 hours of testing by users with a wide range of disabilities.',
};

const cy: typeof en = {
  title: 'Datganiad hygyrchedd ar gyfer y gwasanaeth mabwysiadu',
  websiteRanBy:
    'Mae’r datganiad hygyrchedd hwn yn berthnasol i <a href="https://apply-for-adoption.platform.hmcts.net/eligibility/start" class="govuk-link" target="_blank" aria-label="This link will open in a new tab">Gwneud cais i fabwysiadu – Gwneud cais i fabwysiadu plentyn sydd yn eich gofal - GOV.UK (hmcts.net).</a> Mae’r gwasanaeth hwn yn caniatáu i ddarpar rieni wneud cais i fabwysiadu plentyn sydd yn eich gofal yn dilyn gorchymyn lleoli gan y llys.',
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
  somePartsNotReflow: 'Efallai na fydd rhai dogfennau PDF yn gwbl hygyrch i feddalwedd darllenydd sgrin.',
  feedbackAndContactInformation: 'Adborth a gwybodaeth gyswllt',
  needMoreInformation:
    'Os ydych angen gwybodaeth sydd ar y wefan hon mewn fformat arall megis ar ffurf PDF hygyrch, print bras, fformat hawdd ei ddarllen, recordiad sain neu braille:',
  findCourtTribunalDetails:
    'Defnyddiwch y <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">gwasanaeth Dod o hyd i lys neu dribiwnlys</a>' +
    ' i ddod o hyd i’ch llys agosaf sy’n delio â mabwysiadu. Efallai nad hwn yw’r un llys a wnaeth eich gorchymyn lleoli.',
  askIfUnsure:
    'Os ydych yn dal yn ansicr pa lys i gysylltu ag ef, gallwch ofyn i’ch gweithiwr cymdeithasol am gymorth.',
  email:
    'E-bost: <a href="mailto:ymholiadaucymraeg@justice.gov.uk" class="govuk-link">ymholiadaucymraeg@justice.gov.uk</a>',
  phone: 'Ffoniwch: 01634 887900',
  openingHours: 'Yr oriau agor  yw dydd Llun i ddydd Gwener 9am - 5pm',
  considerYourRequest: 'Byddwn yn ystyried eich cais ac yn ymateb o fewn 10 diwrnod gwaith.',
  reportingAccessibility: "Riportio problemau hygyrchedd gyda'r wefan hon",
  accessibilityPhoneNumber: 'Ffoniwch: 01634 887900',
  accessibilityOpeningHours: 'Yr oriau agor  yw dydd Llun i ddydd Gwener 9am - 5pm',
  improveAccessibility:
    'Rydym bob amser yn ceisio gwella hygyrchedd y wefan hon. Os byddwch yn cael unrhyw broblemau nad ydynt wedi’u cynnwys ar y dudalen hon, neu’n credu nad ydym yn bodloni’r gofynion o ran hygyrchedd, cysylltwch â ni:',
  enforcementProcedure: 'Y Weithdrefn Orfodi',
  humanRightsCommission:
    'Y Comisiwn Cydraddoldeb a Hawliau Dynol (EHRC) sy’n gyfrifol am orfodi Rheoliadau Hygyrchedd Cyrff y Sector Cyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018 (y ‘rheoliadau hygyrchedd’).',
  notHappy:
    'Os ydych wedi cysylltu â ni ynghylch mater hygyrchedd ac nad ydych yn fodlon â’n hymateb, gallwch gysylltu â’r <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank">Gwasanaeth Chynghori a Chymorth Cydraddoldeb (EASS)</a>.',
  contactingUs: 'Cysylltu â ni dros y ffôn neu ymweld â ni’n bersonol',
  contactTextRelay:
    'Rydym yn darparu gwasanaeth cyfnewid negeseuon testun ar gyfer pobl fyddar, pobl sydd â nam ar eu clyw a phobl sydd â nam ar eu lleferydd.',
  contactInductionLoops:
    'Mae gan y llysoedd teulu ddolenni sain a gallwch hefyd ofyn am gael mynediad heb risiau, cyfieithydd iaith arwyddion neu gyfieithydd iaith dramor.',
  contactFindOutHowToContactUs:
    'Gallwch gael rhagor o wybodaeth am sut i gysylltu â ni yn <a href="https://www.gov.uk/find-court-tribunal" class="govuk-link" target="blank">Chwilio am lys neu dribiwnlys</a>',
  technicalInfo: 'Gwybodaeth dechnegol am hygyrchedd y wefan hon',
  hmctsIsCommitted:
    'Mae GLlTEM wedi ymrwymo i sicrhau bod ei wefannau yn hygyrch, a hynny yn unol â Rheoliadau Hygyrchedd Cyrff y Sector Gyhoeddus (Gwefannau a Rhaglenni Symudol) (Rhif 2) 2018.',
  complianceStatus: 'Statws cydymffurfiaeth',
  partiallyCompliant:
    'Mae’r wefan hon yn cydymffurfio’n rhannol â safon <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">AA Canllawiau Hygyrchedd Cynnwys Gwe fersiwn 2.1,</a>a hynny oherwydd y materion o beidio â chydymffurfio a’r esemptiadau a restrir isod.',
  nonAccessibleContent: 'Cynnwys anhygyrch',
  accessibilityIssues: 'Nid   yw’r  cynnwys  a restrir isod yn hygyrch am y  rhesymau canlynol.',
  issuesWithMobile: 'Diffyg cydymffurfio  â’r  rheoliadau hygyrchedd',
  linkTextIssues:
    'Nid yw rhai o’n dogfennau PDF yn bodloni safonau hygyrchedd - er enghraifft, efallai na fyddant wedi’u strwythuro fel eu bod yn hygyrch i ddarllenydd sgrin. Nid yw hyn yn bodloni maen prawf llwyddiant 4.1.2 WCAG 2.1 (enw,  gwerth rôl).',
  improvingAccessibility: 'Beth rydym yn ei wneud i wella hygyrchedd y gwasanaeth hwn',
  statementCommitted:
    'Erbyn mis Chwefror 2024, rydym yn bwriadu trwsio neu ddisodli unrhyw ddogfennau PDF  nad ydynt yn hygyrch gyda thudalennau HTML.',
  statementDAC:
    'Pan fyddwn yn  diweddaru’r gwasanaeth  neu’n gwneud datganiadau newydd, rydym yn cynnal  profion hygyrchedd awtomataidd.',
  preparationAccessibilityStatement: 'Paratoi’r datganiad hygyrchedd hwn',
  statementPreparationDate:
    'Paratowyd y datganiad  hwn ar  13 Mehefin 2023. Fe’i  hadolygwyd ddiwethaf ar 5 Gorffennaf 2023.',
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
