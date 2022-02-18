import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

describe('start content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toEqual('Apply to adopt a child placed in your care');
    expect(generatedContent.line1).toEqual(
      "You can apply to adopt a child who's in your care following a court placement order."
    );
    expect(generatedContent.line2).toEqual(
      'They must have lived with you permanently for at least 10 weeks before the court will look at your application.'
    );
    expect(generatedContent.line3).toEqual('You can still fill in the application form before that time.');
    expect(generatedContent.heading1).toEqual('Before you start');
    expect(generatedContent.line4).toEqual(
      "Work with your social worker to fill in this form. You'll need information only they might have."
    );
    expect(generatedContent.line5).toEqual("You'll need the child's:");
    expect(generatedContent.bulletPoint1).toEqual('full birth certificate');
    expect(generatedContent.bulletPoint2).toEqual('placement order details');
    expect(generatedContent.line6).toEqual(
      "You'll also need to post the child's full birth certificate to the family court reviewing your application."
    );
    expect(generatedContent.insetText).toEqual(
      'Information you give about the child will only be seen by the court and social workers.'
    );
    expect(generatedContent.line7).toEqual("You'll also be asked about the child's:");
    expect(generatedContent.bulletPoint3).toEqual('birth parents, such as name, address and occupation');
    expect(generatedContent.bulletPoint4).toEqual('past court proceedings');
    expect(generatedContent.bulletPoint5).toEqual('past court proceedings for siblings or half-siblings');
    expect(generatedContent.heading2).toEqual('Other things your might need to apply');
    expect(generatedContent.line8).toEqual("You'll need to upload each applicant's:");
    expect(generatedContent.bulletPoint6).toEqual('passport photo page');
    expect(generatedContent.bulletPoint7).toEqual('driving licence');
    expect(generatedContent.line9).toEqual("If relevant, you'll also need to upload:");
    expect(generatedContent.bulletPoint8).toEqual(
      'your marriage or civil partnership certificate, in English or Welsh'
    );
    expect(generatedContent.bulletPoint9).toEqual("your spouse or civil partner's death certificate");
    expect(generatedContent.bulletPoint10).toEqual('adoption');
    expect(generatedContent.bulletPoint11).toEqual('a dissolution order or nullity order of your civil partnership');
    expect(generatedContent.bulletPoint12).toEqual('a decree of judicial separation');
    expect(generatedContent.bulletPoint13).toEqual(
      "if you're using a different name from the one on your marriage or civil partnership certificate, evidence to explain the difference – for example, your deed poll"
    );
    expect(generatedContent.bulletPoint14).toEqual('a copy of your UK visa');
    expect(generatedContent.bulletPoint15).toEqual('any passport pages that have UK immigration entry stamps');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.title).toEqual('Apply to adopt a child placed in your care (in welsh) ');
    expect(generatedContent.line1).toEqual(
      "You can apply to adopt a child who's in your care following a court placement order. (in welsh) "
    );
    expect(generatedContent.line2).toEqual(
      'They must have lived with you permanently for at least 10 weeks before the court will look at your application. (in welsh) '
    );
    expect(generatedContent.line3).toEqual('You can still fill in the application form before that time. (in welsh) ');
    expect(generatedContent.heading1).toEqual('Before you start (in welsh) ');
    expect(generatedContent.line4).toEqual(
      "Work with your social worker to fill in this form. You'll need information only they might have. (in welsh) "
    );
    expect(generatedContent.line5).toEqual("You'll need the child's: (in welsh) ");
    expect(generatedContent.bulletPoint1).toEqual('full birth certificate (in welsh) ');
    expect(generatedContent.bulletPoint2).toEqual('placement order details (in welsh) ');
    expect(generatedContent.line6).toEqual(
      "You'll also need to post the child's full birth certificate to the family court reviewing your application. (in welsh) "
    );
    expect(generatedContent.insetText).toEqual(
      'Information you give about the child will only be seen by the court and social workers. (in welsh) '
    );
    expect(generatedContent.line7).toEqual("You'll also be asked about the child's: (in welsh) ");
    expect(generatedContent.bulletPoint3).toEqual('birth parents, such as name, address and occupation (in welsh) ');
    expect(generatedContent.bulletPoint4).toEqual('past court proceedings (in welsh) ');
    expect(generatedContent.bulletPoint5).toEqual('past court proceedings for siblings or half-siblings (in welsh) ');
    expect(generatedContent.heading2).toEqual('Other things your might need to apply (in welsh) ');
    expect(generatedContent.line8).toEqual("You'll need to upload each applicant's: (in welsh) ");
    expect(generatedContent.bulletPoint6).toEqual('passport photo page (in welsh) ');
    expect(generatedContent.bulletPoint7).toEqual('driving licence (in welsh) ');
    expect(generatedContent.line9).toEqual("If relevant, you'll also need to upload: (in welsh) ");
    expect(generatedContent.bulletPoint8).toEqual(
      'your marriage or civil partnership certificate, in English or Welsh (in welsh) '
    );
    expect(generatedContent.bulletPoint9).toEqual("your spouse or civil partner's death certificate (in welsh) ");
    expect(generatedContent.bulletPoint10).toEqual('adoption (in welsh) ');
    expect(generatedContent.bulletPoint11).toEqual(
      'a dissolution order or nullity order of your civil partnership (in welsh) '
    );
    expect(generatedContent.bulletPoint12).toEqual('a decree of judicial separation (in welsh) ');
    expect(generatedContent.bulletPoint13).toEqual(
      "if you're using a different name from the one on your marriage or civil partnership certificate, evidence to explain the difference – for example, your deed poll (in welsh) "
    );
    expect(generatedContent.bulletPoint14).toEqual('a copy of your UK visa (in welsh) ');
    expect(generatedContent.bulletPoint15).toEqual(
      'any passport pages that have UK immigration entry stamps (in welsh) '
    );
  });
});
