import { TranslationFn } from '../../../app/controller/GetController';

const en = () => ({
  title: 'Apply to adopt a child placed in your care',
  line1: "You can apply to adopt a child who's in your care following a court placement order.",
  line2:
    'They must have lived with you permanently for at least 10 weeks before the court will look at your application.',
  line3: 'You can still fill in the application form before that time.',
  heading1: 'Before you start',
  line4: "Work with your social worker to fill in this form. You'll need information only they might have.",
  line5: "You'll need the child's:",
  bulletPoint1: 'full birth certificate',
  bulletPoint2: 'placement order details',
  line6: "You'll also need to post the child's full birth certificate to the family court reviewing your application.",
  insetText: 'Information you give about the child will only be seen by the court and social workers.',
  line7: "You'll also be asked about the child's:",
  bulletPoint3: 'birth parents, such as name, address and occupation',
  bulletPoint4: 'past court proceedings',
  bulletPoint5: 'past court proceedings for siblings or half-siblings',
  heading2: 'Other things your might need to apply',
  line8: "You'll need to upload each applicant's:",
  bulletPoint6: 'passport photo page',
  bulletPoint7: 'driving licence',
  line9: "If relevant, you'll also need to upload:",
  bulletPoint8: 'your marriage or civil partnership certificate, in English or Welsh',
  bulletPoint9: "your spouse or civil partner's death certificate",
  bulletPoint10: 'a decree absolute of divorce or decree of nullity of your marriage',
  bulletPoint11: 'a dissolution order or nullity order of your civil partnership',
  bulletPoint12: 'a decree of judicial separation',
  bulletPoint13:
    "if you're using a different name from the one on your marriage or civil partnership certificate, evidence to explain the difference – for example, your deed poll",
  bulletPoint14: 'a copy of your UK visa',
  bulletPoint15: 'any passport pages that have UK immigration entry stamps',
});

const cy: typeof en = () => ({
  title: 'Apply to adopt a child placed in your care',
  line1: "You can apply to adopt a child who's in your care following a court placement order.",
  line2:
    'They must have lived with you permanently for at least 10 weeks before the court will look at your application.',
  line3: 'You can still fill in the application form before that time.',
  heading1: 'Before you start',
  line4: "Work with your social worker to fill in this form. You'll need information only they might have.",
  line5: "You'll need the child's:",
  bulletPoint1: 'full birth certificate',
  bulletPoint2: 'placement order details',
  line6: "You'll also need to post the child's full birth certificate to the family court reviewing your application.",
  insetText: 'Information you give about the child will only be seen by the court and social workers.',
  line7: "You'll also be asked about the child's:",
  bulletPoint3: 'birth parents, such as name, address and occupation',
  bulletPoint4: 'past court proceedings',
  bulletPoint5: 'past court proceedings for siblings or half-siblings',
  heading2: 'Other things your might need to apply',
  line8: "You'll need to upload each applicant's:",
  bulletPoint6: 'passport photo page',
  bulletPoint7: 'driving licence',
  line9: "If relevant, you'll also need to upload:",
  bulletPoint8: 'birth parents, such as name, address and occupation',
  bulletPoint9: 'birth parents, such as name, address and occupation',
  bulletPoint10: 'birth parents, such as name, address and occupation',
  bulletPoint11: 'birth parents, such as name, address and occupation',
  bulletPoint12: 'birth parents, such as name, address and occupation',
  bulletPoint13: 'birth parents, such as name, address and occupation',
  bulletPoint14: 'birth parents, such as name, address and occupation',
  bulletPoint15: 'birth parents, such as name, address and occupation',
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language]();
};
