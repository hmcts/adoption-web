import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'The Adoption Service Privacy policy',
  info1: 'The Ministry of Justice (MoJ) is committed to the protection and security of your personal information.',
  info2:
    'This privacy policy explains why we collect your personal data and what we do with it. It also explains your rights and how to enforce them.',
  info3:
    'It is important that you read this notice so that you are aware of how and why we are using such information. This privacy notice describes how we collect and use personal information during and after your relationship with us, in accordance with data protection law. They will be updated regularly.',
  whoManages: 'Who manages this service',
  managedBy:
    'This service is managed by HM Courts and Tribunals Service (HMCTS), which is an executive agency of the Ministry of Justice (MoJ).',
  moj: "The MoJ is known as the data controller for data protection purposes. <a class='govuk-link' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter' target='_blank'>The MoJ personal information charter (opens in a new window)</a> explains how the MoJ processes personal data.",
  responsibleForDeciding:
    'As part of the MoJ, HMCTS is responsible for deciding how your personal data is used and for protecting the personal data you provide.',
  moreInformation:
    "More information about using this service is in the <a class='govuk-link' href='/terms-and-conditions'>terms and conditions</a>.",
  thePersonal: 'Why we collect your personal data',
  personalInformation:
    'Most of the personal information we process is provided to us directly by you for one the purposes of applying to adopt a child.',
  whenYouUseAdoptionService: 'We collect your personal data to:',
  applicationProcess: 'process your application',
  legalRequirements: 'meet legal requirements',
  improvementService: 'make improvements to this service',
  personalDataProcessApplication:
    'Our staff use your personal data to process your application. They work in the UK and your data is stored in the UK.',
  collectPersonalData: 'The personal data we collect',
  onlineAdoptionServiceUse: 'When you use the online adoption service we ask for your:',
  nameAndOthers: 'name, and any other names you are known as',
  emailAddress: 'email address',
  phoneNumber: 'phone number',
  homeAddress: 'home address',
  dateOfBirth: 'date of birth',
  occupation: 'occupation',
  specialCategoriesInformation:
    'We also collect special categories of information via protected characteristic questions which are optional, such as:',
  race: 'race or ethnicity',
  health: 'health, sex life or sexual orientation',
  genetics: 'genetics or biometrics',
  religiousBeliefs: 'religious or philosophical beliefs',
  usingYourData: 'Using your data',
  asPart:
    'As part of your application you’ll be asked to use your email address to set up an account. You will be able to use this email address and password to sign into other HMCTS services.',
  weMayAskForPermission:
    'We may ask for your permission to use your email address to send you emails using GOV.UK Notify. This system processes emails only within the European Economic Area until the point where emails are handed over to the email provider you use.',
  weUseCookies:
    "We use <a class='govuk-link' href='/cookies'>cookies</a> to collect data that tells us about how you’re using this service, including:",
  ifYouOpenEmail: 'if you open an email from us or click on a link in an email',
  yourComputer: 'your computer, phone or tablet’s IP address',
  theRegion: 'the region or town where you’re using your computer, phone or tablet',
  theWeb: 'the web browser you use',
  storingYourData: 'Storing your data',
  savedInformation:
    'Information you enter in the online adoption service is saved until you decide to submit it. This allows you to save what you are doing and continue later. Saved information that you do not submit will be deleted after 180 days.',
  postSubmissionData:
    'After you submit your application, the information you entered will be stored for 100 years and then deleted.',
  sharingYourData: 'Sharing your data',
  ifAnother:
    'While processing your application, another government department, agency or organisation might be involved and we may share your data with them.',
  ifYouContactUs:
    'If you contact us and ask for help with the service you’re using, your personal data may be shared with the <a class="govuk-link" href="https://www.goodthingsfoundation.org/" target="_blank">Good Things Foundation (opens in a new window)</a>. This is a company who we have partnered with to offer face to face support.',
  crime:
    'In some circumstances we may share your data. For example, to prevent or detect crime, or to produce anonymised statistics.',
  weUse:
    "We use Google Analytics to collect data about how a website is used. This anonymous data is shared with Google. Find out about this in our <a class='govuk-link' href='/terms-and-conditions'>terms and conditions</a>.",
  lawfulBases:
    'Under the UK General Data Protection Regulation (UK GDPR), the lawful bases we rely on for processing this information are:',
  consent:
    'Your consent. You are able to withdraw your consent at any time. You can do this by contacting Disclosure Team, Post point 10.24, 102 Petty France, London, SW1H 9AJ',
  legalObligation: 'We have a legal obligation.',
  vitalInterest: 'We have a vital interest.',
  publicTask: 'We need it to perform a public task.',
  legitimateInterest: 'We have a legitimate interest',
  storeAndShare: 'Storing and sharing your data internationally',
  personalInformationOutsideUK:
    'Sometimes we need to send your personal information outside of the UK. When we do this we comply with data protection law.',
  yourRights: 'Your rights',
  youCanAsk: 'You can ask:',
  toSeePersonal: 'to see the personal data that we hold on you',
  toHavePersonal: 'to have the personal data corrected',
  toHaveDataRemoved:
    'to have the personal data removed or deleted (this will depend on the circumstances, for example if you decide not to continue your application)',
  thatAccessIsRestricted:
    'that access to the personal data is restricted (for example, you can ask to have your data stored for longer and not automatically deleted)',
  personalDataNotProcessed: 'that your personal data is not processed',
  transferPersonalInformation:
    'that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances',
  ifYouWantToSeePersonal: 'If you want to see the personal data that we hold on you, you can:',
  completeForm:
    "complete a form to make a <a class='govuk-link' href='https://www.gov.uk/government/publications/request-your-personal-data-from-moj' target='_blank'>subject access request (opens in a new window)</a>. Your request goes to the MoJ as data controller",
  writeToUs: 'write to us: Disclosure Team, Post point 10.24, 102 Petty France, London, SW1H 9AJ',
  emailUs: 'email: <a href="mailto:data.access@justice.gov.uk" class="govuk-link">data.access@justice.gov.uk</a>',
  askMoreInformation: 'You can ask for more information about:',
  agreementsWeHave: 'agreements we have on sharing information with other organisations',
  withoutTellingYou: 'when we are allowed to pass on personal information without telling you',
  ourInstructions: 'our instructions to staff on how to collect, use or delete your personal information',
  howWeCheck: 'how we check that the information we hold is accurate and up-to-date',
  howToComplain: 'How to complain',
  seeOurComplaints:
    "See our <a class='govuk-link' href='https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure' target='_blank'>complaints procedure (opens in a new window)</a> if you want to complain about how we've handled your personal data.",
  concernsDataProtection:
    'If you have any concerns about our use of your personal data, you can contact the MoJ data protection officer:',
  mojAddress:
    'Data Protection Officer <br/> Ministry of Justice <br/> 3rd Floor, Post Point 3.20 <br/> 10 South Colonnades <br/> Canary Wharf <br/> London <br/> E14 4PU',
  mojEmailAddress: '<a href="mailto:dpo@justice.gov.uk" class="govuk-link">dpo@justice.gov.uk</a>',
  youCanAlsoComplain: 'You can also complain to the ICO if you are unhappy with how we have used your data.',
  icoAddress:
    'Information Commissioner’s Office <br/> Wycliffe House <br/> Water Lane <br/> Wilmslow <br/> Cheshire <br/> SK9 5AF',
  icoHelplineNumber: 'Helpline number: 0303 123 1113',
  icoWebsite: "ICO website: <a class='govuk-link' href='https://ico.org.uk'>https://www.ico.org.uk</a>",
};

const cy: typeof en = {
  title: 'Polisi Preifatrwydd y Gwasanaeth Mabwysiadu',
  info1: 'Mae’r Weinyddiaeth Gyfiawnder (MoJ) wedi ymrwymo i ddiogelu ac amddiffyn eich gwybodaeth bersonol.',
  info2:
    'Mae’r polisi preifatrwydd hwn yn egluro pam rydym yn casglu eich data personol a beth rydym yn ei wneud ag ef. Mae hefyd yn egluro eich hawliau a sut i’w gorfodi.',
  info3:
    "Mae'n bwysig eich bod yn darllen yr hysbysiad hwn fel eich bod yn ymwybodol o sut a pham yr ydym yn defnyddio gwybodaeth o'r fath. Mae'r hysbysiad preifatrwydd hwn yn disgrifio sut rydym yn casglu ac yn defnyddio gwybodaeth bersonol yn ystod ac ar ôl eich cysylltiad â ni, yn unol â chyfraith diogelu data. Byddant yn cael eu diweddaru'n rheolaidd.",
  whoManages: "Pwy sy’n rheoli'r gwasanaeth hwn",
  managedBy:
    'Gwasanaeth Llysoedd a Thribiwnlysoedd EM (GLlTEM) sy’n rheoli’r gwasanaeth hwn, sef un o asiantaethau gweithredol y Weinyddiaeth Gyfiawnder (MoJ).',
  moj: "MoJ yw’r rheolydd data at ddibenion diogelu data. <a class='govuk-link' target = 'blank' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter.cy'>Mae siarter gwybodaeth bersonol y Weinyddiaeth Gyfiawnder (yn agor mewn ffenestr newydd)</a> yn esbonio sut mae’r MoJ yn prosesu data personol.",
  responsibleForDeciding:
    "Fel rhan o’r MoJ, mae GLlTEM yn gyfrifol am benderfynu sut mae eich data personol yn cael ei ddefnyddio ac am ddiogelu'r data personol rydych yn ei ddarparu.",
  moreInformation:
    "Gallwch gael rhagor o wybodaeth am ddefnyddio’r gwasanaeth hwn yn y <a class='govuk-link' href='/terms-and-conditions'>telerau ac amodau</a>.",
  thePersonal: 'Pam rydym ni’n casglu eich data personol',
  personalInformation:
    'Mae’r rhan fwyaf o’r wybodaeth bersonol a broseswn yn cael ei darparu i ni yn uniongyrchol gennych chi at ddibenion gwneud cais i fabwysiadu plentyn.',
  whenYouUseAdoptionService: 'Rydym ni’n casglu eich data personol i:',
  applicationProcess: 'prosesu eich cais',
  legalRequirements: 'bodloni gofynion cyfreithiol',
  improvementService: 'gwella’r gwasanaeth hwn',
  personalDataProcessApplication:
    'Mae ein staff yn defnyddio eich data personol i brosesu eich cais. Maent yn gweithio yn y DU ac mae eich data yn cael ei storio yn y DU.',
  collectPersonalData: 'Y data personol rydym ni’n casglu',
  onlineAdoptionServiceUse: 'Pan fyddwch yn defnyddio’r gwasanaeth mabwysiadu ar-lein hwn, byddwn yn gofyn am eich:',
  nameAndOthers: 'enw, ac unrhyw enwau eraill yr ydych yn cael eich adnabod wrthynt',
  emailAddress: 'cyfeiriad e-bost',
  phoneNumber: 'rhif ffôn',
  homeAddress: 'cyfeiriad cartref',
  dateOfBirth: 'dyddiad geni',
  occupation: 'galwedigaeth',
  specialCategoriesInformation:
    "Rydym hefyd yn casglu gwybodaeth drwy ofyn cwestiynau am nodweddion gwarchodedig sy'n ddewisol, megis:",
  race: 'hil neu ethnigrwydd',
  health: 'iechyd, bywyd rhywiol neu gyfeiriadedd rhywiol',
  genetics: 'geneteg neu fiometreg',
  religiousBeliefs: 'credoau crefyddol neu athronyddol',
  usingYourData: 'Defnyddio eich data',
  asPart:
    'Fel rhan o’ch cais fe ofynnir ichi ddefnyddio eich cyfeiriad e-bost i greu cyfrif. Byddwch yn gallu defnyddio’r cyfeiriad e-bost hwn a chyfrinair i fewngofnodi i wasanaethau eraill GLlTEM.',
  weMayAskForPermission:
    'Efallai y byddwn yn gofyn am eich caniatâd i ddefnyddio eich cyfeiriad e-bost i anfon negeseuon e-bost atoch trwy’r system GOV.UK Notify. Mae’r system hon yn prosesu negeseuon e-bost o fewn Ardal Economaidd Ewrop yn unig tan y pwynt lle caiff negeseuon e-bost eu trosglwyddo i’r darparwr e-bost a ddefnyddiwch.',
  weUseCookies:
    "Rydym yn defnyddio <a class='govuk-link' href='/cookies'>cwcis</a> i gasglu data sy’n dweud wrthym sut rydych yn defnyddio’r gwasanaeth hwn, gan gynnwys:",
  ifYouOpenEmail: 'os byddwch yn agor neges e-bost gennym neu’n clicio ar ddolen mewn e-bost',
  yourComputer: "cyfeiriad IP eich cyfrifiadur, eich ffôn symudol neu'ch tabled",
  theRegion: 'yr ardal neu’r dref lle rydych yn defnyddio’ch cyfrifiadur, eich ffôn symudol neu’ch tabled',
  theWeb: 'y porwr gwe rydych yn ei ddefnyddio',
  storingYourData: 'Storio eich data',
  savedInformation:
    "Caiff yr wybodaeth rydych yn ei rhoi yn eich cais i fabwysiadu ar-lein ei storio hyd nes y byddwch yn penderfynu cyflwyno’ch cais. Bydd hyn yn eich galluogi i arbed beth ydych yn ei wneud a pharhau â'ch cais yn hwyrach ymlaen. Bydd gwybodaeth sydd wedi cael ei storio nad ydych yn ei chyflwyno yn cael ei dileu ar ôl 180 diwrnod.",
  postSubmissionData:
    "Ar ôl i chi gyflwyno’ch cais, bydd yr wybodaeth a roesoch yn cael ei storio am 100 mlynedd ac yna'n cael ei dileu.",
  sharingYourData: 'Rhannu eich data',
  ifAnother:
    'Pan fydd eich hawliad neu eich cais ei brosesu, mae’n bosib y byddwn angen cysylltu ag adran, asiantaeth neu sefydliad arall yn y llywodraeth ac efallai y byddwn yn rhannu eich data gyda nhw.',
  ifYouContactUs:
    "Os byddwch yn cysylltu â ni ac yn gofyn am help gyda’r gwasanaeth rydych yn ei ddefnyddio, efallai y byddwn yn rhannu eich data personol gyda’r <a class='govuk-link' href='https://www.goodthingsfoundation.org/' target='_blank'>Good Things Foundation (yn agor mewn ffenestr newydd)</a>. Rydym yn gweithio mewn partneriaeth â'r cwmni hwn i gynnig cefnogaeth wyneb yn wyneb.",
  crime:
    'Mewn rhai amgylchiadau efallai y byddwn yn rhannu eich data. Er enghraifft er mwyn atal neu i ddatrys trosedd, neu i gynhyrchu ystadegau cyffredinol.',
  weUse:
    "Rydym yn defnyddio Google Analytics i gasglu data am sut y defnyddir gwefan. Mae'r data cyffredinol hwn yn cael ei rannu â Google. Gallwch gael gwybodaeth am hyn yn ein  <a class='govuk-link' href='/terms-and-conditions'>telerau ac amodau</a>.",
  lawfulBases:
    'O dan Reoliad Diogelu Data Cyffredinol y DU (GDPR y DU), y seiliau cyfreithlon yr ydym yn dibynnu arnynt ar gyfer prosesu’r wybodaeth hon yw:',
  consent:
    'Eich caniatâd. Gallwch dynnu eich caniatâd yn ôl ar unrhyw adeg. Gallwch wneud hyn drwy gysylltu â’r Tîm Datgelu, Post point 10.24, 102 Petty France, Llundain SW1H 9AJ',
  legalObligation: 'Mae gennym rwymedigaeth gyfreithiol.',
  vitalInterest: 'Mae gennym ddiddordeb hanfodol.',
  publicTask: 'Mae ei angen arnom i gyflawni tasg gyhoeddus.',
  legitimateInterest: 'Mae gennym ddiddordeb dilys',
  storeAndShare: 'Storio a rhannu eich data’n rhyngwladol',
  personalInformationOutsideUK:
    "Weithiau efallai y bydd angen inni anfon eich gwybodaeth bersonol y tu allan i'r DU. Pan fyddwn yn gwneud hyn, byddwn yn cydymffurfio â chyfraith diogelu data.",
  yourRights: 'Eich hawliau',
  youCanAsk: 'Gallwch ofyn:',
  toSeePersonal: 'i gael gweld y data personol rydym yn ei gadw amdanoch',
  toHavePersonal: "i'r data personol gael ei gywiro",
  toHaveDataRemoved:
    "i'r data personol gael ei symud neu ei ddileu (bydd hyn yn ddibynnol ar yr amgylchiadau, er enghraifft os ydych chi’n penderfynu peidio â pharhau gyda’ch cais)",
  thatAccessIsRestricted:
    "i gyfyngu ar y mynediad at y data personol (er enghraifft, gallwch ofyn i'ch data gael ei storio am gyfnod hirach a pheidio â chael ei ddileu'n awtomatig)",
  personalDataNotProcessed: 'nad yw eich data personol yn cael ei brosesu',
  transferPersonalInformation:
    "ein bod yn trosglwyddo'r wybodaeth bersonol a roesoch i ni i sefydliad arall, neu i chi, mewn rhai amgylchiadau",
  ifYouWantToSeePersonal: 'Os ydych eisiau gweld y data personol rydym yn ei gadw amdanoch, gallwch:',
  completeForm:
    "llenwi ffurflen i wneud <a class='govuk-link' target = 'blank' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter.cy'>cais gwrthrych am wybodaeth (yn agor mewn ffenestr newydd)</a>. Bydd eich cais yn mynd i’r rheolydd data, sef MoJ.",
  writeToUs: 'ysgrifennu atom yn: Disclosure Team, Post point 10.24, 102 Petty France, Llundain, SW1H 9AJ',
  emailUs: 'e-bost: <a href="mailto:data.access@justice.gov.uk" class="govuk-link">data.access@justice.gov.uk</a>',
  askMoreInformation: 'Gallwch ofyn am fwy o wybodaeth ynghylch:',
  agreementsWeHave: 'cytundebau sydd gennym ar rannu gwybodaeth gyda sefydliadau eraill',
  withoutTellingYou: 'pryd y caniateir inni drosglwyddo gwybodaeth bersonol amdanoch heb roi gwybod ichi',
  ourInstructions: 'ein cyfarwyddiadau i staff ynghylch sut i gasglu, defnyddio neu ddileu eich gwybodaeth bersonol',
  howWeCheck: 'sut rydym yn gwirio bod yr wybodaeth sydd gennym yn gywir ac yn gyfredol',
  howToComplain: 'Sut i wneud cwyn',
  seeOurComplaints:
    "Gweler ein <a class='govuk-link' target='blank' href='https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure.cy'>trefn gwyno (yn agor mewn ffenestr newydd)</a> os ydych eisiau cwyno am sut rydym wedi trin eich data personol.",
  concernsDataProtection:
    "Os oes gennych unrhyw bryderon am ein defnydd o'ch data personol, gallwch gysylltu â swyddog diogelu data'r MoJ:",
  mojAddress:
    'Swyddog Diogelu Data Y <br/> Weinyddiaeth Gyfiawnder <br/> 3ydd Llawr, Post Point 3.20 <br/> 10 South Colonnades <br/> Canary Wharf <br/> Llundain <br/> E14 4PU',
  mojEmailAddress: '<a href="mailto:dpo@justice.gov.uk" class="govuk-link">dpo@justice.gov.uk</a>',
  youCanAlsoComplain: "Gallwch hefyd gwyno i'r ICO os ydych yn anhapus â'r ffordd rydym wedi defnyddio'ch data.",
  icoAddress:
    "Swyddfa'r <br/> Comisiynydd Gwybodaeth Wycliffe House <br/> Water Lane <br/> Wilmslow <br/> Swydd <br/> Gaer SK9 5AF",
  icoHelplineNumber: 'Rhif y llinell gymorth 0303 123 1113',
  icoWebsite: "Gwefan ICO: <a class='govuk-link' href='https://ico.org.uk'>https://www.ico.org.uk</a>",
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
