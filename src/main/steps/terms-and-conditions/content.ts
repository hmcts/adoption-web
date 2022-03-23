import { TranslationFn } from '../../app/controller/GetController';

const en = {
  title: 'Terms and conditions',
  thisPage:
    'By using this service you’re agreeing to these terms of use. This includes the <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">privacy policy</a>.',
  termsAndConditions: 'Terms and conditions for professional users',
  termsAndConditionsProfessional:
    "If you are a professional user, you'll be asked to agree to the additional terms and conditions of the service after you create a MyHMCTS account.",
  whoWeAre: 'Who we are',
  managedBy:
    "This service is managed by Her Majesty's Courts and Tribunals Service (referred to as 'us' or 'we' from now on). You should check these terms and conditions regularly. We may update them at any time without notice. If you continue to use this service after the terms and conditions have changed, you are deemed to have agreed to the changes.",
  info: 'Information provided by this service',
  service:
    'This service provides information to support your claim or application. We cannot give legal advice on individual cases. You should answer the questions in the service based on your circumstances and seek legal advice if you need it.',
  stored: 'Sharing and storing data',
  dataStored:
    'Our <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">privacy policy</a> explains where your data is stored, and who it is shared with. Our cookie policy explains how this service uses and stores cookies.',
  applicationLaw: 'Laws applying to this service',
  dispute:
    'Your use of this service and any dispute arising from its use will be  governed by and construed in accordance with the laws of England and Wales, including but not limited to the:',
  dispute1: 'Computer Misuse Act 1990',
  dispute2: 'Data Protection Act 1998 (until 25 May 2018)',
  dispute3: 'Data Protection Act 2018 (from 25 May 2018)',
  dispute4: 'General Data Protection Regulation',
  dispute5: 'Mental Capacity Act 2005',
  responsible: 'How to use this service responsibly',
  risks:
    "There are risks in using a shared computer (for example, in a library) to access this service. It's your responsibility to be aware of these risks and to avoid using any computer which may leave your personal information accessible to others. You're responsible if you choose to leave a computer unprotected while using this service. You should take your own precautions to ensure that the way you access this service does not expose you to the risk of:",
  precautions1: 'viruses',
  precautions2: 'malicious computer code',
  precautions3: 'other forms of interference which may damage your computer system',
  knowinglyIntroducing:
    'You must not misuse this service by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to this service, the system on which it is stored, or any server, computer or database connected to it. You must not attack this site using a denial-of-service attack or a distributed denial-of-service attack.',
  personallySensitiveInformation: 'Entering personally sensitive information',
  containsSeveral:
    'This online service contains several free-text fields in which you may choose to enter information which is personally sensitive. If you enter information about your:',
  religiousBeliefs: 'religious beliefs',
  sexualOrientation: 'sexual orientation or sex life',
  racialOrigins: 'racial or ethnic origins',
  politicalOpinions: 'political opinions',
  philosophicalBeliefs: 'religious or philosophical beliefs',
  tradeMembership: 'trade union membership',
  geneticData: 'genetic data or biometric data',
  healthData: 'health data',
  consentGiven:
    'you give us your consent to processing this information for the purpose of dealing with your application. For more information about how we collect and store your personal data, see the <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">privacy policy</a>.',
  disclaimer: 'Disclaimer',
  disclaimerGuarantee:
    "While we make every effort to keep information up to date, we don't provide any guarantees, conditions or warranties that it will be:",
  current: 'current',
  secure: 'secure',
  accurate: 'accurate',
  complete: 'complete',
  bugFree: 'free from bugs or viruses',
  advice:
    "We don't publish advice. You should get professional or specialist advice before doing anything on the basis of the information in the service. We're not liable for any loss or damage that may come from using this service. This includes:",
  losses: 'any direct, indirect or consequential losses',
  civilWrongs:
    "any loss or damage caused by civil wrongs ('tort', including negligence), breach of contract or otherwise",
  serviceUse: 'the use of this service, GOV.UK and any websites that are linked to or from it',
  inabilityToUse: 'the inability to use this service, GOV.UK and any websites that are linked to or from it',
  damageForeseeable:
    "This applies if the loss or damage was foreseeable, arose in the normal course of things or you advised us that it might happen. This includes (but isn't limited to) the loss of your:",
  income: 'income or revenue',
  salary: 'salary, benefits or other payments',
  business: 'business',
  profits: 'profits or contracts',
  opportunity: 'opportunity',
  anticipatedSavings: 'anticipated savings',
  data: 'data',
  goodwill: 'goodwill or reputation',
  tangibleProperty: 'tangible property',
  intangibleProperty: 'intangible property, including loss, corruption or damage to data or any computer system',
  wastedTime: 'wasted management or office time',
  liable: 'We may still be liable for:',
  death: 'death or personal injury arising from our negligence',
  fraudulentMisrepresentation: 'fraudulent misrepresentation',
  anyOtherLiability: 'any other liability which cannot be excluded or limited under applicable law',
  contactUs:
    '<a class="govuk-link" href="https://hmcts-access.service.gov.uk/contact-us" target="_blank">Contact us</a> for further information.',
};

const cy: typeof en = {
  title: 'Terms and conditions (in Welsh)',
  thisPage:
    'By using this service you’re agreeing to these terms of use. This includes the <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">privacy policy</a>. (in Welsh)',
  termsAndConditions: 'Terms and conditions for professional users (in Welsh)',
  termsAndConditionsProfessional:
    "If you are a professional user, you'll be asked to agree to the additional terms and conditions of the service after you create a MyHMCTS account. (in Welsh)",
  whoWeAre: 'Who we are (in Welsh)',
  managedBy:
    "This service is managed by Her Majesty's Courts and Tribunals Service (referred to as 'us' or 'we' from now on). You should check these terms and conditions regularly. We may update them at any time without notice. If you continue to use this service after the terms and conditions have changed, you are deemed to have agreed to the changes. (in Welsh)",
  info: 'Information provided by this service (in Welsh)',
  service:
    'This service provides information to support your claim or application. We cannot give legal advice on individual cases. You should answer the questions in the service based on your circumstances and seek legal advice if you need it. (in Welsh)',
  stored: 'Sharing and storing data (in Welsh)',
  dataStored:
    'Our <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">privacy policy</a> explains where your data is stored, and who it is shared with. Our cookie policy explains how this service uses and stores cookies. (in Welsh)',
  applicationLaw: 'Laws applying to this service (in Welsh)',
  dispute:
    'Your use of this service and any dispute arising from its use will be  governed by and construed in accordance with the laws of England and Wales, including but not limited to the: (in Welsh)',
  dispute1: 'Computer Misuse Act 1990 (in Welsh)',
  dispute2: 'Data Protection Act 1998 (until 25 May 2018) (in Welsh)',
  dispute3: 'Data Protection Act 2018 (from 25 May 2018) (in Welsh)',
  dispute4: 'General Data Protection Regulation (in Welsh)',
  dispute5: 'Mental Capacity Act 2005 (in Welsh)',
  responsible: 'How to use this service responsibly (in Welsh)',
  risks:
    "There are risks in using a shared computer (for example, in a library) to access this service. It's your responsibility to be aware of these risks and to avoid using any computer which may leave your personal information accessible to others. You're responsible if you choose to leave a computer unprotected while using this service. You should take your own precautions to ensure that the way you access this service does not expose you to the risk of: (in Welsh)",
  precautions1: 'viruses (in Welsh)',
  precautions2: 'malicious computer code (in Welsh)',
  precautions3: 'other forms of interference which may damage your computer system (in Welsh)',
  knowinglyIntroducing:
    'You must not misuse this service by knowingly introducing viruses, trojans, worms, logic bombs or other material which is malicious or technologically harmful. You must not attempt to gain unauthorised access to this service, the system on which it is stored, or any server, computer or database connected to it. You must not attack this site using a denial-of-service attack or a distributed denial-of-service attack. (in Welsh)',
  personallySensitiveInformation: 'Entering personally sensitive information (in Welsh)',
  containsSeveral:
    'This online service contains several free-text fields in which you may choose to enter information which is personally sensitive. If you enter information about your: (in Welsh)',
  religiousBeliefs: 'religious beliefs (in Welsh)',
  sexualOrientation: 'sexual orientation or sex life (in Welsh)',
  racialOrigins: 'racial or ethnic origins (in Welsh)',
  politicalOpinions: 'political opinions (in Welsh)',
  philosophicalBeliefs: 'religious or philosophical beliefs (in Welsh)',
  tradeMembership: 'trade union membership (in Welsh)',
  geneticData: 'genetic data or biometric data (in Welsh)',
  healthData: 'health data (in Welsh)',
  consentGiven:
    'you give us your consent to processing this information for the purpose of dealing with your application. For more information about how we collect and store your personal data, see the <a class="govuk-link" href="https://www.gov.uk/help/privacy-policy" target="_blank">privacy policy</a>. (in Welsh)',
  disclaimer: 'Disclaimer (in Welsh)',
  disclaimerGuarantee:
    "While we make every effort to keep information up to date, we don't provide any guarantees, conditions or warranties that it will be: (in Welsh)",
  current: 'current (in Welsh)',
  secure: 'secure (in Welsh)',
  accurate: 'accurate (in Welsh)',
  complete: 'complete (in Welsh)',
  bugFree: 'free from bugs or viruses (in Welsh)',
  advice:
    "We don't publish advice. You should get professional or specialist advice before doing anything on the basis of the information in the service. We're not liable for any loss or damage that may come from using this service. This includes: (in Welsh)",
  losses: 'any direct, indirect or consequential losses (in Welsh)',
  civilWrongs:
    "any loss or damage caused by civil wrongs ('tort (in Welsh)', including negligence), breach of contract or otherwise (in Welsh)",
  serviceUse: 'the use of this service, GOV.UK and any websites that are linked to or from it (in Welsh)',
  inabilityToUse: 'the inability to use this service, GOV.UK and any websites that are linked to or from it (in Welsh)',
  damageForeseeable:
    "This applies if the loss or damage was foreseeable, arose in the normal course of things or you advised us that it might happen. This includes (but isn't limited to) the loss of your: (in Welsh)",
  income: 'income or revenue (in Welsh)',
  salary: 'salary, benefits or other payments (in Welsh)',
  business: 'business (in Welsh)',
  profits: 'profits or contracts (in Welsh)',
  opportunity: 'opportunity (in Welsh)',
  anticipatedSavings: 'anticipated savings (in Welsh)',
  data: 'data (in Welsh)',
  goodwill: 'goodwill or reputation (in Welsh)',
  tangibleProperty: 'tangible property (in Welsh)',
  intangibleProperty:
    'intangible property, including loss, corruption or damage to data or any computer system (in Welsh)',
  wastedTime: 'wasted management or office time (in Welsh)',
  liable: 'We may still be liable for: (in Welsh)',
  death: 'death or personal injury arising from our negligence (in Welsh)',
  fraudulentMisrepresentation: 'fraudulent misrepresentation (in Welsh)',
  anyOtherLiability: 'any other liability which cannot be excluded or limited under applicable law (in Welsh)',
  contactUs:
    '<a class="govuk-link" href="https://hmcts-access.service.gov.uk/contact-us" target="_blank">Contact us</a> for further information. (in Welsh)',
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
