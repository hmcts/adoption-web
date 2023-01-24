import { capitalize } from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { Fee, State } from '../../app/case/definition';
import { Eligibility } from '../../app/controller/AppRequest';
import { PageContent, TranslationFn } from '../../app/controller/GetController';
import { CourtVenue } from '../../app/court/location';
import { SAVE_AND_SIGN_OUT } from '../../steps/urls';

const en = {
  phase: 'Beta',
  applyForAdoption: 'apply for adoption',
  applyForDissolution: 'Apply for adoption',
  feedback:
    'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="https://www.smartsurvey.co.uk/s/Adoption_Feedback/?pageurl=PAGE_TITLE" target="_blank">feedback</a> will help us to improve it.',
  languageToggle: '<a href="?lng=cy" class="govuk-link language">Cymraeg</a>',
  govUk: 'GOV.UK',
  back: 'Back',
  continue: 'Save and continue',
  change: 'Change',
  upload: 'Upload',
  download: 'Download',
  delete: 'Delete',
  warning: 'Warning',
  required: 'You have not answered the question. You need to select an answer before continuing.',
  notAnswered: 'You have not answered the question.',
  errorSaving: 'Sorry, we are unable to save your application right now. Please try again later.',
  errorSendingInvite:
    'Sorry, we’re having technical problems sending your application for review. Please try again in a few minutes.',
  ogl: 'All content is available under the <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated',
  errorSummaryHeading: 'There is a problem',
  saveAndSignOut: 'Save and sign out',
  saveAsDraft: 'Save as draft',
  signOut: 'Sign out',
  signIn: 'Sign in',
  accessibility: 'Accessibility statement',
  cookies: 'Cookies',
  privacyPolicy: 'Privacy policy',
  termsAndConditions: 'Terms and conditions',
  contactUs: 'Contact us',
  marriage: 'marriage',
  civilPartnership: 'civil partnership',
  endingCivilPartnership: 'ending a civil partnership',
  husband: 'husband',
  wife: 'wife',
  partner: 'partner',
  civilPartner: 'civil partner',
  withHim: 'with him',
  withHer: 'with her',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
  yes: 'Yes',
  no: 'No',
  notSure: 'Not sure',
  english: 'English',
  welsh: 'Welsh',
  contactUsForHelp: 'Contact us for help',
  webChat: 'Web chat',
  webChatDetails:
    'All our web chat agents are busy helping other people. Please try again later or contact us using one of the ways below.',
  sendUsAMessage: 'Send us a message',
  TBC: 'TBC',
  sendUsAMessageTBC: 'Send us a message  (email TBC)',
  sendUsAMessageDetails: 'We aim to get back to you within 5 days.',
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0642',
  telephoneDetails: 'Monday to Friday, 8am to 8pm, Saturday 8am to 2pm.',
  habitualResidentHelpText1:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  habitualResidentHelpText2:
    'The examples above aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  cookiesHeading: 'Cookies on',
  cookiesLine1: 'We use some essential cookies to make this service work.',
  cookiesLine2:
    'We’d also like to use analytics cookies so we can understand how you use the service and make improvements.',
  acceptAnalyticsCookies: 'Accept analytics cookies',
  rejectAnalyticsCookies: 'Reject analytics cookies',
  viewCookies: 'View cookies',
  hideMessage: 'Hide cookie message',
  cookiesAcceptedMessage:
    '<p class="govuk-body">You’ve accepted additional cookies. You can <a class="govuk-link" href="/cookies">change your cookie settings</a> at any time.</p>',
  cookiesRejectedMessage:
    '<p class="govuk-body">You’ve rejected additional cookies. You can <a class="govuk-link" href="/cookies">change your cookie settings</a> at any time.</p>',
  laPortalCookiesAcceptedMessage:
    '<p class="govuk-body">You’ve accepted additional cookies. You can <a class="govuk-link" href="/la-portal/cookies">change your cookie settings</a> at any time.</p>',
  laPortalCookiesRejectedMessage:
    '<p class="govuk-body">You’ve rejected additional cookies. You can <a class="govuk-link" href="la-portal/cookies">change your cookie settings</a> at any time.</p>',
  changeCookiesHeading: 'Change your cookie settings',
  allowAnalyticsCookies: 'Allow cookies that measure website use?',
  useAnalyticsCookies: 'Use cookies that measure my website use',
  doNotUseAnalyticsCookies: 'Do not use cookies that measure my website use',
  save: 'Save',
  cookiesSaved: 'Your cookie settings were saved',
  additionalCookies:
    'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
  goToHomepage: 'Go to homepage',
  apmCookiesHeadings: 'Allow cookies that measure website application performance monitoring?',
  useApmCookies: 'Use cookies that measure website application performance monitoring',
  doNotUseApmCookies: 'Do not use cookies that measure website application performance monitoring',
  timeout: {
    title: 'You are about to be signed out',
    part1: 'You are going to be signed out of your application in',
    part2: 'because of inactivity. This is to protect your personal information.',
    buttonText: 'Continue with your application',
    twoMinutes: '2 minutes',
    minutes: 'minute',
    seconds: 'seconds',
  },
  saveAndSignOutLink: SAVE_AND_SIGN_OUT,
};

const cy: typeof en = {
  ...en, // @TODO delete me to get a list of missing translations
  phase: 'Beta',
  applyForAdoption: 'Gwneud cais i fabwysiadu',
  applyForDissolution: 'Gwneud cais i fabwysiadu',
  feedback:
    'Mae hwn yn wasanaeth newydd <a class="govuk-link" aria-label="Dolen adborth, Bydd hyn yn agor tab newydd. Bydd arnoch angen dychwelyd i’r tab hwn a pharhau gyda’ch cais o fewn 60 munud fel na fyddwch yn colli eich cynnydd." href="https://www.smartsurvey.co.uk/s/Adoption_Feedback/?pageurl=PAGE_TITLE" target="_blank">Bydd adborth</a> yn ein helpu ni i’w wella.',
  languageToggle: '<a href="?lng=en" class="govuk-link language">English</a>',
  govUk: 'GOV.UK',
  back: 'Yn ôl',
  continue: 'Cadw a pharhau',
  change: 'Newid',
  upload: 'Uwchlwytho',
  download: 'Llwytho i lawr',
  delete: 'Dileu',
  warning: 'Rhybudd',
  required: 'Nid ydych wedi ateb y cwestiwn. Rhaid ichi ddewis ateb cyn symud ymlaen.',
  notAnswered: 'Nid ydych wedi ateb y cwestiwn.',
  errorSaving: 'Yn anffodus ni allwn gadw eich cais ar hyn o bryd. Rhowch gynnig arall arni yn hwyrach ymlaen.',
  ogl: 'Mae’r holl gynnwys ar gael o dan <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license" >Drwydded Agored y Llywodraeth f3.0</a>, oni nodir fel arall',
  errorSummaryHeading: 'Mae yna broblem',
  saveAndSignOut: 'Cadw ac allgofnodi',
  saveAsDraft: 'Cadw fel drafft',
  signOut: 'Allgofnodi',
  signIn: 'Mewngofnodi',
  accessibility: 'Datganiad Hygyrchedd',
  cookies: 'Cwcis',
  privacyPolicy: 'Polisi preifatrwydd',
  termsAndConditions: 'Telerau ac amodau',
  contactUs: 'Cysylltwch â ni',
  marriage: 'priodas',
  endingCivilPartnership: 'dod â phartneriaeth sifil i ben',
  civilPartnership: 'partneriaeth sifil',
  husband: 'gŵr',
  wife: 'gwraig',
  partner: 'partner',
  civilPartner: 'partner sifil',
  withHim: 'gydag ef',
  withHer: 'gyda hi',
  months: [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ],
  dateFormat: {
    day: 'Diwrnod',
    month: 'Mis',
    year: 'Blwyddyn',
  },
  yes: 'Oes',
  no: 'Nac oes',
  notSure: 'Ddim yn siŵr',
  english: 'Saesneg',
  welsh: 'Cymraeg',
  contactUsForHelp: 'Cysylltwch â ni am help',
  webChat: 'Sgwrsio dros y we',
  webChatDetails:
    "Mae ein holl asiantau sgwrsio dros y we yn brysur yn helpu pobl eraill. Dewch yn ôl nes ymlaen neu cysylltwch â ni trwy un o'r dulliau uchod.",
  sendUsAMessage: 'Anfonwch neges atom',
  TBC: 'i’w gadarnhau',
  sendUsAMessageTBC: 'Anfonwch neges atom  (email i’w gadarnhau)',
  sendUsAMessageDetails: 'Byddwn yn anelu at ymateb o fewn 5 diwrnod gwaith.',
  telephone: 'Ffôn',
  telephoneNumber: '0300 303 5171',
  telephoneDetails: 'Dydd Llun i ddydd Iau, 9am i 5pm, dydd Gwener 9am i 4.30pm.',
  cookiesHeading: 'Cwcis ymlaen',
  cookiesLine1: "Rydym yn defnyddio rhai cwcis hanfodol i wneud i'r gwasanaeth hwn weithio.",
  cookiesLine2:
    "Hoffem hefyd ddefnyddio cwcis dadansoddol fel y gallwn ddeall sut rydych yn defnyddio'r gwasanaeth a gwneud gwelliannau.",
  acceptAnalyticsCookies: 'Derbyn cwcis dadansoddeg',
  rejectAnalyticsCookies: 'Gwrthod cwcis dadansoddeg',
  viewCookies: 'Gweld cwcis',
  hideMessage: 'Cuddio neges cwci',
  cookiesAcceptedMessage:
    '<p class="govuk-body">Rydych chi wedi derbyn cwcis ychwanegol. Gallwch chi <a class="govuk-link" href="/cookies">newid eich gosodiadau cwci</a> ar unrhyw bryd.</p>',
  cookiesRejectedMessage:
    '<p class="govuk-body">Rydych chi wedi gwrthod cwcis ychwanegol. Gallwch chi <a class="govuk-link" href="/cookies">newid eich gosodiadau cwci</a> ar unrhyw bryd.</p>',
  laPortalCookiesAcceptedMessage:
    '<p class="govuk-body">Rydych chi wedi derbyn cwcis ychwanegol. Gallwch chi <a class="govuk-link" href="/la-portal/cookies">newid eich gosodiadau cwci</a> ar unrhyw bryd.</p>',
  laPortalCookiesRejectedMessage:
    '<p class="govuk-body">Rydych chi wedi gwrthod cwcis ychwanegol. Gallwch chi <a class="govuk-link" href="/la-portal/cookies">newid eich gosodiadau cwci</a> ar unrhyw bryd.</p>',
  changeCookiesHeading: 'Newidiwch eich gosodiadau cwci',
  allowAnalyticsCookies: "Caniatáu cwcis sy'n mesur defnydd gwefan?",
  useAnalyticsCookies: "Defnyddio cwcis sy'n mesur fy nefnydd gwefan",
  doNotUseAnalyticsCookies: "Peidiwch â defnyddio cwcis sy'n mesur defnydd fy ngwefan",
  save: 'Arbed',
  cookiesSaved: 'Cadwyd eich gosodiadau cwci',
  additionalCookies:
    'Gall gwasanaethau’r llywodraeth osod cwcis ychwanegol ac, os felly, bydd ganddynt eu polisi cwcis a’u baner eu hunain.',
  goToHomepage: 'Ewch i hafan',
  apmCookiesHeadings: "Caniatáu cwcis sy'n mesur monitro perfformiad cymwysiadau gwefan?",
  useApmCookies: "Defnyddio cwcis sy'n mesur monitro perfformiad cymwysiadau gwefan",
  doNotUseApmCookies: "Peidiwch â defnyddio cwcis sy'n mesur monitro perfformiad cymwysiadau gwefan",
  timeout: {
    title: 'Rydych ar fin cael eich allgofnodi',
    part1: "Rydych yn mynd i gael eich allgofnodi o'ch cais i mewn",
    part2: 'oherwydd anweithgarwch. Mae hyn er mwyn diogelu eich gwybodaeth bersonol.',
    buttonText: "Parhewch â'ch cais",
    twoMinutes: '2 munudau',
    minutes: 'munud',
    seconds: 'eiliadau',
  },
  saveAndSignOutLink: SAVE_AND_SIGN_OUT,
};

export const generatePageContent = ({
  language,
  pageContent,
  userCase,
  userEmail,
  addresses = [],
  eligibility,
  fee,
  courtList,
}: {
  language: Language;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  userEmail?: string;
  addresses?: [];
  eligibility?: Eligibility;
  fee?: Fee;
  courtList?: CourtVenue[];
}): PageContent => {
  const commonTranslations: typeof en = language === 'en' ? en : cy;
  const serviceName = getServiceName(commonTranslations);
  const contactEmail = 'todo@test.com';
  const isAmendableStates = userCase && [State.Draft].includes(userCase.state!);

  const content: CommonContent = {
    ...commonTranslations,
    serviceName,
    language,
    userCase,
    courtList,
    userEmail,
    contactEmail,
    addresses,
    eligibility,
    fee,
    isAmendableStates,
  };

  if (pageContent) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

const getServiceName = (translations: typeof en): string => {
  return capitalize(translations.applyForAdoption);
};

export type CommonContent = typeof en & {
  language: Language;
  serviceName: string;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  courtList?: CourtVenue[];
  userEmail?: string;
  contactEmail?: string;
  referenceNumber?: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  addresses?: any[];
  eligibility?: Eligibility;
  fee?: Fee;
  isAmendableStates?: boolean;
};

export type Language = 'en' | 'cy';
