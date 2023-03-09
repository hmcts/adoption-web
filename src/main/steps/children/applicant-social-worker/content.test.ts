import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup, ValidationCheck } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  section: 'Application details',
  title: 'Your social worker details',
  line1: 'This is the social worker attached to your local authority.',
  applicantSocialWorkerName: 'Name of your social worker',
  applicantSocialWorkerNameHint: 'If you do not yet have a social worker, insert the name of your contact.',
  applicantSocialWorkerPhoneNumber: 'Phone number',
  applicantSocialWorkerEmail: 'Email address (if known)',
  applicantSocialWorkerEmailHint: 'The email address should be an official government email that ends in gov.uk.',
  applicantLocalAuthorityLabel: 'Name of local authority',
  applicantLocalAuthorityEmail: 'Your local authority email address',
  applicantLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate. It should end in gov.uk.',
  applicantLocalAuthorityHint:
    'This is the local authority that your social worker works for. They will be named on the placement order if you are not sure.',
  errors: {
    applicantSocialWorkerName: {
      required: 'Enter a name',
    },
    applicantSocialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    applicantSocialWorkerEmail: {
      invalid: 'Enter an email address in the correct format, like name@gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
    applicantLocalAuthority: {
      required: 'Enter a name',
    },
    applicantLocalAuthorityEmail: {
      required: 'Enter an email address in the correct format, like name@gov.uk',
      invalid: 'Enter an email address in the correct format, like name@gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
  },
};

const cyContent = {
  section: 'Manylion y cais',
  title: 'Manylion eich gweithiwr cymdeithasol',
  line1: "Dyma'r gweithiwr cymdeithasol sydd yn gweithio i’ch awdurdod lleol.",
  applicantSocialWorkerName: 'Enw eich gweithiwr cymdeithasol',
  applicantSocialWorkerNameHint: 'Os nad oes gennych weithiwr cymdeithasol eto, rhowch enw eich cyswllt.',
  applicantSocialWorkerPhoneNumber: 'Rhif ffôn',
  applicantSocialWorkerEmail: "Cyfeiriad e-bost (os yw'n hysbys)",
  applicantSocialWorkerEmailHint:
    "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth sy'n terfynu â gov.uk.",
  applicantLocalAuthorityLabel: "Enw'r awdurdod lleol",
  applicantLocalAuthorityEmail: 'Cyfeiriad e-bost eich awdurdod lleol',
  applicantLocalAuthorityEmailHint:
    'Defnyddir hwn i anfon hysbysiad i’r awdurdod lleol i symud eich cais yn eiflaen, felly mae’n bwysig ei fod yn gywir. Dylai ddiweddu gyda gov.uk.',
  applicantLocalAuthorityHint:
    "Dyma'r awdurdod lleol y mae eich gweithiwr cymdeithasol yn gweithio iddo. Bydd wedi’i enwi ar y gorchymyn lleoli os nad ydych yn siŵr.",
  errors: {
    applicantSocialWorkerName: {
      required: 'Rhowch enw',
    },
    applicantSocialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    applicantSocialWorkerEmail: {
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@gov.uk',
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
    },
    applicantLocalAuthority: {
      required: 'Rhowch enw',
    },
    applicantLocalAuthorityEmail: {
      required: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@gov.uk',
      invalid: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@gov.uk',
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
    },
  },
};

describe('children > applicant-social-worker > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { childLocalAuthority: 'MOCK', applicantLocalAuthority: 'MOCK' },
    localAuthorityList: [{ code: 'MOCK', name: 'MOCK' }],
  }) as CommonContent;

  it('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an applicantSocialWorkerName text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicantSocialWorkerName = fields.applicantSocialWorkerName;

    expect(applicantSocialWorkerName.type).toBe('text');
    expect((applicantSocialWorkerName.label as LanguageLookup)(generatedContent)).toBe(
      enContent.applicantSocialWorkerName
    );
    expect((applicantSocialWorkerName.hint as LanguageLookup)(generatedContent)).toBe(
      enContent.applicantSocialWorkerNameHint
    );

    (applicantSocialWorkerName.validator as ValidationCheck)('MockName', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName', {});
  });

  it('should have an applicantSocialWorkerPhoneNumber text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicantSocialWorkerPhoneNumber = fields.applicantSocialWorkerPhoneNumber;

    expect(applicantSocialWorkerPhoneNumber.type).toBe('text');
    expect((applicantSocialWorkerPhoneNumber.label as LanguageLookup)(generatedContent)).toBe(
      enContent.applicantSocialWorkerPhoneNumber
    );

    (applicantSocialWorkerPhoneNumber.validator as ValidationCheck)('MockPhoneNumber', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockPhoneNumber');
  });

  it('should have an applicantSocialWorkerEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicantSocialWorkerEmail = fields.applicantSocialWorkerEmail;

    expect(applicantSocialWorkerEmail.type).toBe('text');
    expect((applicantSocialWorkerEmail.label as LanguageLookup)(generatedContent)).toBe(
      enContent.applicantSocialWorkerEmail
    );
    expect((applicantSocialWorkerEmail.hint as LanguageLookup)(generatedContent)).toBe(
      enContent.applicantSocialWorkerEmailHint
    );

    (applicantSocialWorkerEmail.validator as ValidationCheck)('MockEmail', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockEmail');
  });

  it('should have an applicantLocalAuthority text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicantLocalAuthority = fields.applicantLocalAuthority;

    expect(applicantLocalAuthority.type).toBe('select-dropdown');

    expect(isEmailValid).toHaveBeenCalledWith('MockEmail');
    expect(isEmailValid).not.toHaveBeenCalledWith();
  });

  it('should have an applicantLocalAuthorityEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicantLocalAuthorityEmail = fields.applicantLocalAuthorityEmail;

    expect(applicantLocalAuthorityEmail.type).toBe('text');
    expect((applicantLocalAuthorityEmail.label as LanguageLookup)(generatedContent)).toBe(
      enContent.applicantLocalAuthorityEmail
    );
    expect((applicantLocalAuthorityEmail.hint as LanguageLookup)(generatedContent)).toBe(
      enContent.applicantLocalAuthorityEmailHint
    );

    (applicantLocalAuthorityEmail.validator as ValidationCheck)('MockEmail', {});
    expect(isEmailValid).toHaveBeenCalledWith('MockEmail');
    (applicantLocalAuthorityEmail.validator as ValidationCheck)(undefined, {});
    expect(isEmailValid).not.toHaveBeenCalledWith();
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as LanguageLookup)(generatePageContent({ language: EN }) as Record<string, never>)).toBe(
      'Save and continue'
    );
  });

  it('should contain saveAsDraft button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect(
      (form.saveAsDraft?.text as LanguageLookup)(generatePageContent({ language: EN }) as Record<string, never>)
    ).toBe('Save as draft');
  });
});
