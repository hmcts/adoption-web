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
  title: 'The Adoption Service Privacy policy (in Welsh)',
  info1:
    'The Ministry of Justice (MoJ) is committed to the protection and security of your personal information. (in Welsh)',
  info2:
    'This privacy policy explains why we collect your personal data and what we do with it. It also explains your rights and how to enforce them. (in Welsh)',
  info3:
    'It is important that you read this notice so that you are aware of how and why we are using such information. This privacy notice describes how we collect and use personal information during and after your relationship with us, in accordance with data protection law. They will be updated regularly. (in Welsh)',
  whoManages: 'Who manages this service (in Welsh)',
  managedBy:
    'This service is managed by HM Courts and Tribunals Service (HMCTS), which is an executive agency of the Ministry of Justice (MoJ). (in Welsh)',
  moj: "The MoJ is known as the data controller for data protection purposes. <a class='govuk-link' href='https://www.gov.uk/government/organisations/ministry-of-justice/about/personal-information-charter' target='_blank'>The MoJ personal information charter (opens in a new window)</a> explains how the MoJ processes personal data. (in Welsh)",
  responsibleForDeciding:
    'As part of the MoJ, HMCTS is responsible for deciding how your personal data is used and for protecting the personal data you provide. (in Welsh)',
  moreInformation:
    "More information about using this service is in the <a class='govuk-link' href='/terms-and-conditions'>terms and conditions</a>. (in Welsh)",
  thePersonal: 'Why we collect your personal data (in Welsh)',
  personalInformation:
    'Most of the personal information we process is provided to us directly by you for one the purposes of applying to adopt a child. (in Welsh)',
  whenYouUseAdoptionService: 'We collect your personal data to: (in Welsh)',
  applicationProcess: 'process your application (in Welsh)',
  legalRequirements: 'meet legal requirements (in Welsh)',
  improvementService: 'make improvements to this service (in Welsh)',
  personalDataProcessApplication:
    'Our staff use your personal data to process your application. They work in the UK and your data is stored in the UK. (in Welsh)',
  collectPersonalData: 'The personal data we collect (in Welsh)',
  onlineAdoptionServiceUse: 'When you use the online adoption service we ask for your: (in Welsh)',
  nameAndOthers: 'name, and any other names you are known as (in Welsh)',
  emailAddress: 'email address (in Welsh)',
  phoneNumber: 'phone number (in Welsh)',
  homeAddress: 'home address (in Welsh)',
  dateOfBirth: 'date of birth (in Welsh)',
  occupation: 'occupation (in Welsh)',
  specialCategoriesInformation:
    'We also collect special categories of information via protected characteristic questions which are optional, such as: (in Welsh)',
  race: 'race or ethnicity (in Welsh)',
  health: 'health, sex life or sexual orientation (in Welsh)',
  genetics: 'genetics or biometrics (in Welsh)',
  religiousBeliefs: 'religious or philosophical beliefs (in Welsh)',
  usingYourData: 'Using your data (in Welsh)',
  asPart:
    'As part of your application you’ll be asked to use your email address to set up an account. You will be able to use this email address and password to sign into other HMCTS services. (in Welsh)',
  weMayAskForPermission:
    'We may ask for your permission to use your email address to send you emails using GOV.UK Notify. This system processes emails only within the European Economic Area until the point where emails are handed over to the email provider you use. (in Welsh)',
  weUseCookies:
    "We use <a class='govuk-link' href='/cookies'>cookies</a> to collect data that tells us about how you’re using this service, including: (in Welsh)",
  ifYouOpenEmail: 'if you open an email from us or click on a link in an email (in Welsh)',
  yourComputer: 'your computer, phone or tablet’s IP address (in Welsh)',
  theRegion: 'the region or town where you’re using your computer, phone or tablet (in Welsh)',
  theWeb: 'the web browser you use (in Welsh)',
  storingYourData: 'Storing your data (in Welsh)',
  savedInformation:
    'Information you enter in the online adoption service is saved until you decide to submit it. This allows you to save what you are doing and continue later. Saved information that you do not submit will be deleted after 180 days. (in Welsh)',
  postSubmissionData:
    'After you submit your application, the information you entered will be stored for 100 years and then deleted. (in Welsh)',
  sharingYourData: 'Sharing your data (in Welsh)',
  ifAnother:
    'While processing your application, another government department, agency or organisation might be involved and we may share your data with them. (in Welsh)',
  ifYouContactUs:
    'If you contact us and ask for help with the service you’re using, your personal data may be shared with the <a class="govuk-link" href="https://www.goodthingsfoundation.org/" target="_blank">Good Things Foundation (opens in a new window)</a>. This is a company who we have partnered with to offer face to face support. (in Welsh)',
  crime:
    'In some circumstances we may share your data. For example, to prevent or detect crime, or to produce anonymised statistics. (in Welsh)',
  weUse:
    "We use Google Analytics to collect data about how a website is used. This anonymous data is shared with Google. Find out about this in our <a class='govuk-link' href='/terms-and-conditions'>terms and conditions</a>. (in Welsh)",
  lawfulBases:
    'Under the UK General Data Protection Regulation (UK GDPR), the lawful bases we rely on for processing this information are: (in Welsh)',
  consent:
    'Your consent. You are able to withdraw your consent at any time. You can do this by contacting Disclosure Team, Post point 10.24, 102 Petty France, London, SW1H 9AJ (in Welsh)',
  legalObligation: 'We have a legal obligation. (in Welsh)',
  vitalInterest: 'We have a vital interest. (in Welsh)',
  publicTask: 'We need it to perform a public task. (in Welsh)',
  legitimateInterest: 'We have a legitimate interest (in Welsh)',
  storeAndShare: 'Storing and sharing your data internationally (in Welsh)',
  personalInformationOutsideUK:
    'Sometimes we need to send your personal information outside of the UK. When we do this we comply with data protection law. (in Welsh)',
  yourRights: 'Your rights (in Welsh)',
  youCanAsk: 'You can ask: (in Welsh)',
  toSeePersonal: 'to see the personal data that we hold on you (in Welsh)',
  toHavePersonal: 'to have the personal data corrected (in Welsh)',
  toHaveDataRemoved:
    'to have the personal data removed or deleted (this will depend on the circumstances, for example if you decide not to continue your application) (in Welsh)',
  thatAccessIsRestricted:
    'that access to the personal data is restricted (for example, you can ask to have your data stored for longer and not automatically deleted) (in Welsh)',
  personalDataNotProcessed: 'that your personal data is not processed (in Welsh)',
  transferPersonalInformation:
    'that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances (in Welsh)',
  ifYouWantToSeePersonal: 'If you want to see the personal data that we hold on you, you can: (in Welsh)',
  completeForm:
    "complete a form to make a <a class='govuk-link' href='https://www.gov.uk/government/publications/request-your-personal-data-from-moj' target='_blank'>subject access request (opens in a new window)</a>. Your request goes to the MoJ as data controller (in Welsh)",
  writeToUs: 'write to us: Disclosure Team, Post point 10.38, 102 Petty France, London, SW1H 9AJ (in Welsh)',
  emailUs:
    'email: <a href="mailto:data.access@justice.gov.uk" class="govuk-link">data.access@justice.gov.uk</a> (in Welsh)',
  askMoreInformation: 'You can ask for more information about: (in Welsh)',
  agreementsWeHave: 'agreements we have on sharing information with other organisations (in Welsh)',
  withoutTellingYou: 'when we are allowed to pass on personal information without telling you (in Welsh)',
  ourInstructions: 'our instructions to staff on how to collect, use or delete your personal information (in Welsh)',
  howWeCheck: 'how we check that the information we hold is accurate and up-to-date (in Welsh)',
  howToComplain: 'How to complain (in Welsh)',
  seeOurComplaints:
    "See our <a class='govuk-link' href='https://www.gov.uk/government/organisations/hm-courts-and-tribunals-service/about/complaints-procedure' target='_blank'>complaints procedure (opens in a new window)</a> if you want to complain about how we've handled your personal data. (in Welsh)",
  concernsDataProtection:
    'If you have any concerns about our use of your personal data, you can contact the MoJ data protection officer: (in Welsh)',
  mojAddress:
    'Data Protection Officer <br/> Ministry of Justice <br/> 3rd Floor, Post Point 3.20 <br/> 10 South Colonnades <br/> Canary Wharf <br/> London <br/> E14 4PU (in Welsh)',
  mojEmailAddress: '<a href="mailto:dpo@justice.gov.uk" class="govuk-link">dpo@justice.gov.uk</a> (in Welsh)',
  youCanAlsoComplain:
    "You can also complain to the <a class='govuk-link' href='https://ico.org.uk/global/contact-us'>Information Commissioner’s Office</a> if you’re not satisfied with our response or believe we are not processing your personal data lawfully. (in Welsh)",
  icoAddress:
    'Information Commissioner’s Office <br/> Wycliffe House <br/> Water Lane <br/> Wilmslow <br/> Cheshire <br/> SK9 5AF (in Welsh)',
  icoHelplineNumber: 'Helpline number: 0303 123 1113 (in Welsh)',
  icoWebsite: "ICO website: <a class='govuk-link' href='https://ico.org.uk'>https://www.ico.org.uk</a> (in Welsh)",
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
