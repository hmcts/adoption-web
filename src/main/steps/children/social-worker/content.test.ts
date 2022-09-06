import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, LanguageLookup, ValidationCheck } from '../../../app/form/Form';
import { isEmailValid, isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  section: 'Application details',
  title: "Child's social worker details",
  line1: 'You can get these details from your local authority or adoption agency.',
  childSocialWorkerName: "Name of child's social worker",
  childSocialWorkerPhoneNumber: 'Phone number',
  childSocialWorkerEmail: 'Email address (if known)',
  childSocialWorkerEmailHint: 'The email address should be an official government email that ends in gov.uk.',
  childLocalAuthority: "Child's local authority",
  childLocalAuthorityEmail: 'Local authority email address',
  childLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate. It should end in gov.uk.',
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority.',
  errors: {
    childSocialWorkerName: {
      required: 'Enter a name',
    },
    childSocialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    childSocialWorkerEmail: {
      invalid: 'Enter an email address that ends in gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
    childLocalAuthority: {
      required: 'Enter a name',
    },
    childLocalAuthorityEmail: {
      required: 'Enter an email address in the correct format, like name@gov.uk',
      invalid: 'Enter an email address that ends in gov.uk',
      invalidGovUkEmail: 'Enter an email address that ends in gov.uk',
    },
  },
};

const cyContent = {
  section: 'Manylion y cais',
  title: 'Manylion gweithiwr cymdeithasol y plentyn',
  line1: 'Gallwch gael y manylion hyn gan eich awdurdod lleol neu asiantaeth fabwysiadu.',
  childSocialWorkerName: 'Enw gweithiwr cymdeithasol y plentyn',
  childSocialWorkerPhoneNumber: 'Rhif ffôn',
  childSocialWorkerEmail: "Cyfeiriad e-bost (os yw'n hysbys)",
  childSocialWorkerEmailHint:
    "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth sy'n terfynu â gov.uk.",
  childLocalAuthority: 'Awdurdod lleol y plentyn',
  childLocalAuthorityEmail: 'Cyfeiriad e-bost yr awdurdod lleol',
  childLocalAuthorityEmailHint:
    'Defnyddir hwn i anfon hysbysiad i’r awdurdod lleol i symud eich cais yn eiflaen, felly mae’n bwysig ei fod yn gywir. Dylai ddiweddu gyda gov.uk.',
  childLocalAuthorityHint:
    "Dyma'r awdurdod lleol sydd â chyfrifoldeb rhiant dros y plentyn. Gall fod yn wahanol i'ch awdurdod lleol eich hun.",
  errors: {
    childSocialWorkerName: {
      required: 'Rhowch enw',
    },
    childSocialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    childSocialWorkerEmail: {
      invalid: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
    },
    childLocalAuthority: {
      required: 'Rhowch enw',
    },
    childLocalAuthorityEmail: {
      required: 'Nodwch gyfeiriad e-bost yn y fformat cywir, fel enw@gov.uk',
      invalid: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
      invalidGovUkEmail: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
    },
  },
};

const commonContent = { language: EN } as CommonContent;

describe('children > social-worker > content', () => {
  it('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an childSocialWorkerName text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childSocialWorkerName = fields.childSocialWorkerName;

    expect(childSocialWorkerName.type).toBe('text');
    expect((childSocialWorkerName.label as LanguageLookup)(generatedContent)).toBe(enContent.childSocialWorkerName);

    (childSocialWorkerName.validator as ValidationCheck)('MockName', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockName', {});
  });

  it('should have an childSocialWorkerPhoneNumber text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childSocialWorkerPhoneNumber = fields.childSocialWorkerPhoneNumber;

    expect(childSocialWorkerPhoneNumber.type).toBe('text');
    expect((childSocialWorkerPhoneNumber.label as LanguageLookup)(generatedContent)).toBe(
      enContent.childSocialWorkerPhoneNumber
    );

    (childSocialWorkerPhoneNumber.validator as ValidationCheck)('MockPhoneNumber', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockPhoneNumber');
  });

  it('should have an childSocialWorkerEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childSocialWorkerEmail = fields.childSocialWorkerEmail;

    expect(childSocialWorkerEmail.type).toBe('text');
    expect((childSocialWorkerEmail.label as LanguageLookup)(generatedContent)).toBe(enContent.childSocialWorkerEmail);

    (childSocialWorkerEmail.validator as ValidationCheck)('MockEmail', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockEmail');
  });

  it('should have an childLocalAuthority text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childLocalAuthority = fields.childLocalAuthority;

    expect(childLocalAuthority.type).toBe('text');
    expect((childLocalAuthority.label as LanguageLookup)(generatedContent)).toBe(enContent.childLocalAuthority);

    (childLocalAuthority.validator as ValidationCheck)('MockEmail', {});
    expect(isFieldFilledIn).toHaveBeenCalled();
    (childLocalAuthority.validator as ValidationCheck)(undefined, {});
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
