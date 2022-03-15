import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Apply to adopt a child placed in your care',
  line1:
    'You can apply to adopt a child who\'s in your care following a <a class="govuk-link" href="/eligibility/start">court placement order.</a>',
  line2:
    'The child must have lived with you for at least 10 weeks before you apply. You will not be able to submit your application until the 10 week period has passed.',
  line3:
    "You can start your application and save progress by selecting 'save as draft'. This will make sure your answers are saved so you can continue working on the application at a later date. You can only submit once all sections are completed.",
  heading1: 'Before you start',
  subheading1: 'Details about the child',
  line4: 'You will need some documents and information about the child:',
  bulletPoint1: "the child's full birth certificate (this includes details of the child's birth parents)",
  bulletPoint2: "details from the child's placement order",
  bulletPoint3: "the birth parents' names, addresses and occupations",
  bulletPoint4:
    "details of any previous court proceedings involving the child, or the child's siblings or half siblings",
  line5: 'Your social worker or adoption agency can help to provide these details.',
  subheading2: 'Details about you',
  line6:
    "You will need to provide details about yourself and any second applicant. Some of the information you provide is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate. Your personal information will not affect your application to adopt.",
  line7: 'The information you provide will only be seen by the court and relevant adoption agencies or authorities.',
  line8:
    'The court processing fee for an application to adopt is <b>£183</b>. Payment is due once the application is complete and ready to submit to the court.',
});

const cy = () => ({
  title: 'Apply to adopt a child placed in your care (in welsh)',
  line1:
    'You can apply to adopt a child who\'s in your care following a <a class="govuk-link" href="/eligibility/start">court placement order.</a> (in welsh)',
  line2:
    'The child must have lived with you for at least 10 weeks before you apply. You will not be able to submit your application until the 10 week period has passed. (in welsh)',
  line3:
    "You can start your application and save progress by selecting 'save as draft'. This will make sure your answers are saved so you can continue working on the application at a later date. You can only submit once all sections are completed. (in welsh)",
  heading1: 'Before you start (in welsh)',
  subheading1: 'Details about the child (in welsh)',
  line4: 'You will need some documents and information about the child: (in welsh)',
  bulletPoint1: "the child's full birth certificate (this includes details of the child's birth parents) (in welsh)",
  bulletPoint2: "details from the child's placement order (in welsh)",
  bulletPoint3: "the birth parents' names, addresses and occupations (in welsh)",
  bulletPoint4:
    "details of any previous court proceedings involving the child, or the child's siblings or half siblings (in welsh)",
  line5: 'Your social worker or adoption agency can help to provide these details. (in welsh)',
  subheading2: 'Details about you (in welsh)',
  line6:
    "You will need to provide details about yourself and any second applicant. Some of the information you provide is needed for the Adoption Register and adoption certificate which will replace the child's birth certificate. Your personal information will not affect your application to adopt. (in welsh)",
  line7:
    'The information you provide will only be seen by the court and relevant adoption agencies or authorities. (in welsh)',
  line8:
    'The court processing fee for an application to adopt is <b>£183</b>. Payment is due once the application is complete and ready to submit to the court. (in welsh)',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
