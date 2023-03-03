import { TranslationFn } from '../../../app/controller/GetController';

const en = content => ({
  title: 'Your application has been submitted',
  referenceNumber: `Application reference number<br><strong>${content.userCase.hyphenatedCaseRef}</strong>`,
  emailSentConfirmation: 'We have sent a confirmation to the email addresses registered. ',
  line1:
    'The application will now be sent to the court for processing. If you did not upload the Annex A as part of the evidence for the application, you should do this within 10 working days to prevent delays and reminders from being sent. ',
  line2:
    'If you cannot upload the Annex A within 10 working days from when you submitted the application, you can email it directly to the court.',
  line3: 'An email will be sent to the applicants to let them know that their application is with the court.',
  line4:
    'You should discuss any attendance at the hearings with the applicants. Particularly if there is a risk that the birth parents may be there.',
});

const cy: typeof en = content => ({
  title: 'Mae eich cais wedi cael ei gyflwyno',
  referenceNumber: `Cyfeirnod y cais<br><strong>${content.userCase.hyphenatedCaseRef}</strong>`,
  emailSentConfirmation: 'Rydym wedi anfon e-bost cadarnhad i’r cyfeiriadau e-bost a gofrestrwyd.',
  line1:
    'Bydd y cais nawr yn cael ei anfon i’r llys i’w brosesu. Os na wnaethoch uwchlwytho Atodiad A fel rhan o’r dystiolaeth ar gyfer y cais, dylech wneud hynny cyn gynted â phosib ac o fewn 10 diwrnod gwaith i atal oedi a negeseuon atgoffa rhag cael eu hanfon. ',
  line2:
    "Os na allwch uwchlwytho Atodiad A o fewn 10 diwrnod gwaith o'r adeg y gwnaethoch gyflwyno'r cais, gallwch ei e-bostio'n uniongyrchol i'r llys. ",
  line3: 'Fe anfonir e-bost at y ceiswyr i’w hysbysu bod eu cais wedi cyrraedd y llys. ',
  line4:
    'Dylech drafod unrhyw bresenoldeb yn y gwrandawiadau gyda’r ceiswyr. yn enwedig os oes risg y gallai"r rhieni genedigol fod yno.',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language](content);
};
