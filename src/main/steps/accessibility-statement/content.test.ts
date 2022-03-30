import languageAssertions from '../../../test/unit/utils/languageAssertions';
import { CommonContent, generatePageContent } from '../common/common.content';

import { generateContent } from './content';

jest.mock('../../app/form/validation');

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
    'listen to most of the website using a screen reader (including the most recent versions of NVDA, CCA(colour contrast Analyser) and Voiceover)',
  simpleAsPossible: "We've also made the text as simple as possible to understand.",
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability.',
  howAccessible: 'How accessible this website is',
  somePartsNot: 'We know some parts of this service may not be accessible:',
  somePartsNotReflow: 'the text will not reflow in a single column when you change the size of the browser window',
  somePartsNotSpacing: 'you cannot modify the line height or spacing of text',
  somePartsNotFooter: 'All footer links not yet implemented and so has not tested.',
  feedbackAndContactInformation: 'Feedback and contact information',
  needMoreInformation:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille:',
  email:
    'Email: <a href="adoptionproject@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to adoptionproject@justice.gov.uk">adoptionproject@justice.gov.uk</a>',
  phone: 'Call: 01634 887900',
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days.',
  reportingAccessibility: 'Reporting accessibility problems with this website',
  accessibilityPhoneNumber: 'Telephone: 01634 887900',
  improveAccessibility:
    'We’re always looking to improve the accessibility of this website. If you find any problems that aren’t addressed on this page, or think we’re not meeting accessibility requirements, please contact us:',
  enforcementProcedure: 'Enforcement procedure',
  humanRightsCommission:
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’).',
  notHappy:
    'If you’ve contacted us about accessibility and you’re not happy with our response, you can contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">Equality Advisory and Support Service (EASS)</a>.',
  contactingUs: 'Contacting us by phone or visiting us in person',
  contactCourtDirectly:
    'If you have a question about accessibility in our family courts, you can <a href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode" class="govuk-link" target="blank">contact the court directly</a>.',
  contactTextRelay:
    'We provide a text relay service for people who are D/deaf, hearing impaired or have a speech impediment.',
  contactInductionLoops:
    'The family courts have audio induction loops and you can also request step-free access, a sign language interpreter or foreign language interpreter.',
  technicalInfo: 'Technical information about this website’s accessibility',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.',
  complianceStatus: 'Compliance status',
  partiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances and exemptions listed below.',
  partiallyCompliantMobile:
    'Content not presented without loss of information and requiring scrolling in two dimensions while using Adoption application via Mobile.',
  nonAccessibleContent: 'Content that’s not within the scope of the accessibility regulations',
  issuesWithDocuments: 'Documents',
  issuesWithDocumentDescription1:
    'Many of our older PDFs and Word documents do not meet accessibility standards - for example, they may not be structured so they’re accessible to a screen reader. This does not meet WCAG 2.1 success criterion 4.1.2 (name, role value).',
  issuesWithDocumentDescription2:
    'Some of our PDFs and Word documents are essential to providing our services. By December 2021, we plan to either fix these or replace them with accessible HTML pages. Any new PDFs or Word documents we publish will meet accessibility standards.',
  issuesSurveys: 'Surveys',
  issuesSurveysDescription:
    'Our feedback form and exit survey are both hosted by a third-party provider. We identified a number of accessibility issues with these pages but fixing them is beyond our control. We are liaising with the Ministry of Justice Transforming Performance and Perception team to see what improvements can be made.',
  issuesWithLinks: 'Issues with links',
  issuesWithLinksDescription:
    'On some pages, text used for links doesn’t clearly state where the link goes or what its for. This doesn’t meet WCAG 2.1 success criterion 2.4.4 (Link Purpose, In Context).',
  issuesWithHeadings: 'Issues with headings',
  issuesWithHeadingsDescription: 'N/A',
  issuesWithColour: 'Colour contrast',
  issuesWithColourDescription: 'N/A',
  issuesWithLanguage: 'Issues with language',
  issuesWithLanguageDescription:
    'On some pages the language has not been set in the code. This doesn’t meet WCAG 2.1 success criterion 3.1.2 (Language of Page) as “WELSH” translation is in work in progress.',
  issuesWithOther: 'Other known issues',
  issuesWithOtherDescription1: 'N/A',
  howWeTested: 'How we tested this website',
  howWeTestedUI: 'The user interface has been tested by our team using a range of tools.',
  howWeTestedPatty: 'Pa11Y – Test automation tool kit',
  howWeTestedNVDA: 'NVDA tool',
  howWeTestedColourContrast: 'Colour contrast analyser tool for validating contrast ratio’s',
  howWeTestedVoiceOver: 'VoiceOver',
  howWeTestedE2E: 'End-to-end testing for all GDS browsers for keyboard use.',
  improvingAccessibility: 'What we’re doing to improve accessibility',
  statementCommitted:
    'We’re committed to ensuring our services are accessible to all our customers and that they comply with level AA of the Web Content Accessibility Guidelines – WCAG 2.1.',
  statementDAC:
    'To help us achieve this, we will commission the <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Digital Accessibility Centre">Digital Accessibility Centre (DAC)</a> to carry out a WCAG 2.1 AA level technical compliance audit that includes over 50 hours of testing by users with a wide range of disabilities. We will update this statement with the testing date when it is confirmed. Any issues identified during testing will be reviewed and addressed appropriately.',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement',
  statementPreparationDate: 'This statement was prepared on 11 March 2022. It was last reviewed on 11 March 2022.',
  contactHelp: 'Contact us for help:',
};

const cy = {
  title: 'Accessibility statement for the adoption service (in Welsh)',
  websiteRanBy: 'This service allows prospective parents to apply to adopt a child online. (in Welsh)',
  asManyAsPossible:
    "This service is run by HM Courts and Tribunals. We want as many people as possible to be able to use it, so we've designed it to be accessible. For example, you should be able to: (in Welsh)",
  asManyAsPossibleColours: 'change colours, contrast levels and fonts (in Welsh)',
  asManyAsPossibleZoom: 'zoom in up to 300% without the text spilling off the screen (in Welsh)',
  asManyAsPossibleKeyboard: 'navigate most of the website using just a keyboard (in Welsh)',
  asManyAsPossibleSpeech: 'navigate most of the website using speech recognition software (in Welsh)',
  asManyAsPossibleListen:
    'listen to most of the website using a screen reader (including the most recent versions of NVDA, CCA(colour contrast Analyser) and Voiceover) (in Welsh)',
  simpleAsPossible: "We've also made the text as simple as possible to understand. (in Welsh)",
  abilityNet:
    '<a href="https://mcmw.abilitynet.org.uk" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for AbilityNet">AbilityNet</a> has advice on making your device easier to use if you have a disability. (in Welsh)',
  howAccessible: 'How accessible this website is (in Welsh)',
  somePartsNot: 'We know some parts of this service may not be accessible: (in Welsh)',
  somePartsNotReflow:
    'the text will not reflow in a single column when you change the size of the browser window (in Welsh)',
  somePartsNotSpacing: 'you cannot modify the line height or spacing of text (in Welsh)',
  somePartsNotFooter: 'All footer links not yet implemented and so has not tested. (in Welsh)',
  feedbackAndContactInformation: 'Feedback and contact information (in Welsh)',
  needMoreInformation:
    'If you need information on this website in a different format like accessible PDF, large print, easy read, audio recording or braille: (in Welsh)',
  email:
    'Email: <a href="adoptionproject@justice.gov.uk" class="govuk-link" aria-label="This link will open in a new email to adoptionproject@justice.gov.uk">adoptionproject@justice.gov.uk</a> (in Welsh)',
  phone: 'Call: 01634 887900 (in Welsh)',
  considerYourRequest: 'We’ll consider your request and get back to you in 10 working days. (in Welsh)',
  reportingAccessibility: 'Reporting accessibility problems with this website (in Welsh)',
  accessibilityPhoneNumber: 'Telephone: 01634 887900 (in Welsh)',
  improveAccessibility:
    'We’re always looking to improve the accessibility of this website. If you find any problems that aren’t addressed on this page, or think we’re not meeting accessibility requirements, please contact us: (in Welsh)',
  enforcementProcedure: 'Enforcement procedure (in Welsh)',
  humanRightsCommission:
    'The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’). (in Welsh)',
  notHappy:
    'If you’ve contacted us about accessibility and you’re not happy with our response, you can contact the <a href="https://www.equalityadvisoryservice.com/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Equality Advisory and Support Service">Equality Advisory and Support Service (EASS)</a>. (in Welsh)',
  contactingUs: 'Contacting us by phone or visiting us in person (in Welsh)',
  contactCourtDirectly:
    'If you have a question about accessibility in our family courts, you can <a href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode" class="govuk-link" target="blank">contact the court directly</a>. (in Welsh)',
  contactTextRelay:
    'We provide a text relay service for people who are D/deaf, hearing impaired or have a speech impediment. (in Welsh)',
  contactInductionLoops:
    'The family courts have audio induction loops and you can also request step-free access, a sign language interpreter or foreign language interpreter. (in Welsh)',
  technicalInfo: 'Technical information about this website’s accessibility (in Welsh)',
  hmctsIsCommitted:
    'HMCTS is committed to making its website accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018. (in Welsh)',
  complianceStatus: 'Compliance status (in Welsh)',
  partiallyCompliant:
    'This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG21/" class="govuk-link" target="blank">Web Content Accessibility Guidelines version 2.1</a> AA standard, due to the non-compliances and exemptions listed below. (in Welsh)',
  partiallyCompliantMobile:
    'Content not presented without loss of information and requiring scrolling in two dimensions while using Adoption application via Mobile. (in Welsh)',
  nonAccessibleContent: 'Content that’s not within the scope of the accessibility regulations (in Welsh)',
  issuesWithDocuments: 'Documents (in Welsh)',
  issuesWithDocumentDescription1:
    'Many of our older PDFs and Word documents do not meet accessibility standards - for example, they may not be structured so they’re accessible to a screen reader. This does not meet WCAG 2.1 success criterion 4.1.2 (name, role value). (in Welsh)',
  issuesWithDocumentDescription2:
    'Some of our PDFs and Word documents are essential to providing our services. By December 2021, we plan to either fix these or replace them with accessible HTML pages. Any new PDFs or Word documents we publish will meet accessibility standards. (in Welsh)',
  issuesSurveys: 'Surveys (in Welsh)',
  issuesSurveysDescription:
    'Our feedback form and exit survey are both hosted by a third-party provider. We identified a number of accessibility issues with these pages but fixing them is beyond our control. We are liaising with the Ministry of Justice Transforming Performance and Perception team to see what improvements can be made. (in Welsh)',
  issuesWithLinks: 'Issues with links (in Welsh)',
  issuesWithLinksDescription:
    'On some pages, text used for links doesn’t clearly state where the link goes or what its for. This doesn’t meet WCAG 2.1 success criterion 2.4.4 (Link Purpose, In Context). (in Welsh)',
  issuesWithHeadings: 'Issues with headings (in Welsh)',
  issuesWithHeadingsDescription: 'N/A (in Welsh)',
  issuesWithColour: 'Colour contrast (in Welsh)',
  issuesWithColourDescription: 'N/A (in Welsh)',
  issuesWithLanguage: 'Issues with language (in Welsh)',
  issuesWithLanguageDescription:
    'On some pages the language has not been set in the code. This doesn’t meet WCAG 2.1 success criterion 3.1.2 (Language of Page) as “WELSH” translation is in work in progress. (in Welsh)',
  issuesWithOther: 'Other known issues (in Welsh)',
  issuesWithOtherDescription1: 'N/A (in Welsh)',
  howWeTested: 'How we tested this website (in Welsh)',
  howWeTestedUI: 'The user interface has been tested by our team using a range of tools. (in Welsh)',
  howWeTestedPatty: 'Pa11Y – Test automation tool kit (in Welsh)',
  howWeTestedNVDA: 'NVDA tool (in Welsh)',
  howWeTestedColourContrast: 'Colour contrast analyser tool for validating contrast ratio’s (in Welsh)',
  howWeTestedVoiceOver: 'VoiceOver (in Welsh)',
  howWeTestedE2E: 'End-to-end testing for all GDS browsers for keyboard use. (in Welsh)',
  improvingAccessibility: 'What we’re doing to improve accessibility (in Welsh)',
  statementCommitted:
    'We’re committed to ensuring our services are accessible to all our customers and that they comply with level AA of the Web Content Accessibility Guidelines – WCAG 2.1. (in Welsh)',
  statementDAC:
    'To help us achieve this, we will commission the <a href="https://digitalaccessibilitycentre.org/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Digital Accessibility Centre">Digital Accessibility Centre (DAC)</a> to carry out a WCAG 2.1 AA level technical compliance audit that includes over 50 hours of testing by users with a wide range of disabilities. We will update this statement with the testing date when it is confirmed. Any issues identified during testing will be reviewed and addressed appropriately. (in Welsh)',
  preparationAccessibilityStatement: 'Preparation of this accessibility statement (in Welsh)',
  statementPreparationDate:
    'This statement was prepared on 11 March 2022. It was last reviewed on 11 March 2022. (in Welsh)',
  contactHelp: 'Contact us for help: (in Welsh)',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('accessibility statement > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
