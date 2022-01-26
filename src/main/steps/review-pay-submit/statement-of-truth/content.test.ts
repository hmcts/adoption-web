/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable jest/expect-expect */
import { FormContent } from '../../../app/form/Form'; //FormFields
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const CY = 'cy';
const EN = 'en';

const enContent = {
  section: 'Review your application, pay and send',
  title: 'Statement of truth',
  statement:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in the truth.',
  reviewBeforeSubmit:
    "Once you submit your application, you cannot make any further changes. You can select 'Save as draft' to review your application before you submit.",
  applicant1IBelieveApplicationIsTrue:
    'I believe that the facts stated in this form and any additional documents are true.',
  applicant1IBelieveApplicationIsTrue2:
    'The primary applicant believes that the facts stated in this form and any additional documents are true.',
  applicant2IBelieveApplicationIsTrue: 'I am authorised by the second applicant to sign this statement.',
  applicant1SotFullName: 'Enter your full name',
  applicant2SotFullName: "Enter the second applicant's full name (if applicable)",
  confirm: 'Confirm',
  errors: {
    applicant1IBelieveApplicationIsTrue: {
      required: 'Confirm your statement of truth',
    },
    applicant1SotFullName: {
      required: 'Enter a full name',
    },
    applicant2SotFullName: {
      required: 'Enter a full name',
    },
  },
};

const cyContent = {
  section: 'Review your application, pay and send (in Welsh)',
  title: 'Statement of truth (in Welsh)',
  statement:
    'I understand that proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement in a document verified by a statement of truth without an honest belief in the truth. (in Welsh)',
  reviewBeforeSubmit:
    "Once you submit your application, you cannot make any further changes. You can select 'Save as draft' to review your application before you submit. (in Welsh)",
  applicant1IBelieveApplicationIsTrue:
    'I believe that the facts stated in this form and any additional documents are true. (in Welsh)',
  applicant1IBelieveApplicationIsTru2:
    'The primary applicant believes that the facts stated in this form and any additional documents are true. (in Welsh)',
  applicant2IBelieveApplicationIsTrue: 'I am authorised by the second applicant to sign this statement. (in Welsh)',
  applicant1SotFullName: 'Enter your full name (in Welsh)',
  applicant2SotFullName: "Enter the second applicant's full name (if applicable) (in Welsh)",
  confirm: 'Confirm (in Welsh)',
  errors: {
    applicant1IBelieveApplicationIsTrue: {
      required: 'Confirm your statement of truth (in Welsh)',
    },
    applicant1SotFullName: {
      required: 'Enter a full name (in Welsh)',
    },
    applicant2SotFullName: {
      required: 'Enter a full name (in Welsh)',
    },
  },
};

const langAssertions = (language, content) => {
  const generatedContent = generateContent({ language, userCase: {} } as CommonContent);
  const {
    section,
    title,
    statement,
    reviewBeforeSubmit,
    applicant1IBelieveApplicationIsTrue,
    applicant1IBelieveApplicationIsTrue2,
    applicant2IBelieveApplicationIsTrue,
    applicant1SotFullName,
    applicant2SotFullName,
    confirm,
    errors,
  } = content;

  expect(generatedContent.section).toEqual(section);
  expect(generatedContent.title).toEqual(title);
  expect(generatedContent.statement).toEqual(statement);
  expect(generatedContent.reviewBeforeSubmit).toEqual(reviewBeforeSubmit);
  expect(generatedContent.applicant1IBelieveApplicationIsTrue).toEqual(applicant1IBelieveApplicationIsTrue);
  expect(generatedContent.applicant1IBelieveApplicationIsTrue2).toEqual(applicant1IBelieveApplicationIsTrue2);
  expect(generatedContent.applicant2IBelieveApplicationIsTrue).toEqual(applicant2IBelieveApplicationIsTrue);
  expect(generatedContent.applicant1SotFullName).toEqual(applicant1SotFullName);
  expect(generatedContent.applicant2SotFullName).toEqual(applicant2SotFullName);
  expect(generatedContent.confirm).toEqual(confirm);
  expect(generatedContent.errors).toEqual(errors);
};

const commonContent = { language: EN } as CommonContent;

describe('occupation content', () => {
  it('should return the correct content for language = en', () => {
    langAssertions(EN, enContent);
  });

  it('should return the correct content for language = cy', () => {
    langAssertions(CY, cyContent);
  });

  // it('should have an adopAgencyOrLaName text input field', () => {
  //   const generatedContent = generateContent(commonContent);
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const adopAgencyOrLaName = fields.adopAgencyOrLaName;

  //   expect(adopAgencyOrLaName.type).toBe('text');
  //   expect((adopAgencyOrLaName.label as Function)(generateContent(commonContent))).toBe(enContent.adopAgencyName);

  //   (adopAgencyOrLaName.validator as Function)('MockAgencyName');
  //   expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyName');
  // });

  // it('should have an adopAgencyOrLaPhoneNumber text input field', () => {
  //   const generatedContent = generateContent(commonContent);
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const adopAgencyOrLaPhoneNumber = fields.adopAgencyOrLaPhoneNumber;

  //   expect(adopAgencyOrLaPhoneNumber.type).toBe('text');
  //   expect((adopAgencyOrLaPhoneNumber.label as Function)(generateContent(commonContent))).toBe(
  //     enContent.adopAgencyPhone
  //   );

  //   (adopAgencyOrLaPhoneNumber.validator as Function)('MockAgencyPhoneNumber');
  //   expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyPhoneNumber');
  // });

  // it('should have an adopAgencyOrLaContactName text input field', () => {
  //   const generatedContent = generateContent(commonContent);
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const adopAgencyOrLaContactName = fields.adopAgencyOrLaContactName;

  //   expect(adopAgencyOrLaContactName.type).toBe('text');
  //   expect((adopAgencyOrLaContactName.label as Function)(generateContent(commonContent))).toBe(
  //     enContent.adopAgencyContactName
  //   );

  //   (adopAgencyOrLaContactName.validator as Function)('MockAgencyContactName');
  //   expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactName');
  // });

  // it('should have an adopAgencyOrLaContactEmail text input field', () => {
  //   const generatedContent = generateContent(commonContent);
  //   const form = generatedContent.form as FormContent;
  //   const fields = form.fields as FormFields;
  //   const adopAgencyOrLaContactEmail = fields.adopAgencyOrLaContactEmail;

  //   expect(adopAgencyOrLaContactEmail.type).toBe('text');
  //   expect((adopAgencyOrLaContactEmail.label as Function)(generateContent(commonContent))).toBe(
  //     enContent.adopAgencyContactEmail
  //   );

  //   (adopAgencyOrLaContactEmail.validator as Function)('MockAgencyContactEmail');
  //   expect(isFieldFilledIn).toHaveBeenCalledWith('MockAgencyContactEmail');
  // });

  // it('should contain submit button', () => {
  //   const generatedContent = generateContent(commonContent);
  //   const form = generatedContent.form as FormContent;
  //   expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  // });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.saveAsDraft?.text as Function)(generatePageContent({ language: EN }))).toBe('Save as draft');
  });
});
