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
  childSocialWorkerEmailHint: 'The email address should be an official government email.',
  childLocalAuthorityLabel: "Child's local authority",
  childLocalAuthorityEmail: 'Local authority email address',
  childLocalAuthorityEmailHint:
    'This will be used to send a notification to the local authority to progress your application so it is important that it is accurate.',
  childLocalAuthorityHint:
    'This is the local authority with parental responsibility for the child. It may be different to your own local authority. They will be named on the placement order if you are not sure',
  errors: {
    childSocialWorkerName: {
      required: 'Enter name of child’s social worker',
    },
    childSocialWorkerPhoneNumber: {
      required: 'Enter a UK telephone number',
      invalid: 'Enter a UK telephone number',
    },
    childSocialWorkerEmail: {
      invalid: 'Enter an email address that ends in gov.uk',
      invalidGovUkEmail:
        'The email address provided is not an approved email address, please contact your social worker or representative to confirm the correct email for use',
    },
    childLocalAuthority: {
      required: 'Enter name of local authority',
    },
    childLocalAuthorityEmail: {
      required:
        'You have not entered an email address, please contact your social worker or representative to confirm the correct email for use.',
      invalid:
        'You have not entered an email address, please contact your social worker or representative to confirm the correct email for use.',
      invalidGovUkEmail:
        'The email address provided is not an approved email address, please contact your social worker or representative to confirm the correct email for use',
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
  childSocialWorkerEmailHint: "Dylai'r cyfeiriad e-bost fod yn e-bost swyddogol gan y llywodraeth.",
  childLocalAuthorityLabel: 'Awdurdod lleol y plentyn',
  childLocalAuthorityEmail: 'Cyfeiriad e-bost yr awdurdod lleol',
  childLocalAuthorityEmailHint:
    'Defnyddir hwn i anfon hysbysiad i’r awdurdod lleol i symud eich cais yn eiflaen, felly mae’n bwysig ei fod yn gywir.',
  childLocalAuthorityHint:
    "Dyma'r awdurdod lleol sydd â chyfrifoldeb rhiant dros y plentyn. Gall fod yn wahanol i'ch awdurdod lleol eich hun. Bydd wedi’i enwi ar y gorchymyn lleoli os nad ydych yn siŵr.",
  errors: {
    childSocialWorkerName: {
      required: 'Rhowch enw gweithiwr cymdeithasol y plentyn',
    },
    childSocialWorkerPhoneNumber: {
      required: 'Rhowch rif ffôn yn y DU',
      invalid: 'Rhowch rif ffôn yn y DU',
    },
    childSocialWorkerEmail: {
      invalid: "Rhowch gyfeiriad e-bost sy'n terfynu â gov.uk",
      invalidGovUkEmail:
        'Nid yw’r cyfeiriad e-bost a ddarparwyd yn gyfeiriad e-bost cymeradwy. Cysylltwch â’ch gweithiwr cymdeithasol neu gynrychiolydd i gadarnhau’r cyfeiriad e-bost cywir',
    },
    childLocalAuthority: {
      required: 'Rhowch enw’r awdurdod lleol',
    },
    childLocalAuthorityEmail: {
      required:
        'Nid ydych wedi nodi cyfeiriad e-bost. Cysylltwch â’ch gweithiwr cymdeithasol neu’ch cynrychiolydd i gadarnhau beth yw’r cyfeiriad e-bost cywir i ddefnyddio.',
      invalid:
        'Nid ydych wedi nodi cyfeiriad e-bost. Cysylltwch â’ch gweithiwr cymdeithasol neu’ch cynrychiolydd i gadarnhau beth yw’r cyfeiriad e-bost cywir i ddefnyddio.',
      invalidGovUkEmail:
        'Nid yw’r cyfeiriad e-bost a ddarparwyd yn gyfeiriad e-bost cymeradwy. Cysylltwch â’ch gweithiwr cymdeithasol neu gynrychiolydd i gadarnhau’r cyfeiriad e-bost cywir',
    },
  },
};

describe('children > social-worker > content', () => {
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
    expect((childSocialWorkerEmail.hint as LanguageLookup)(generatedContent)).toBe(
      enContent.childSocialWorkerEmailHint
    );

    (childSocialWorkerEmail.validator as ValidationCheck)('MockEmail', {});
    expect(isFieldFilledIn).toHaveBeenCalledWith('MockEmail');
  });

  it('should have an childLocalAuthority select-dropdown input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childLocalAuthority = fields.childLocalAuthority;

    expect(childLocalAuthority.type).toBe('select-dropdown');

    expect(isFieldFilledIn).toHaveBeenCalled();
    expect(isEmailValid).not.toHaveBeenCalledWith();
  });

  it('should have an childLocalAuthorityEmail text input field', () => {
    const generatedContent = generateContent(commonContent) as Record<string, never>;
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const childLocalAuthorityEmail = fields.childLocalAuthorityEmail;

    expect(childLocalAuthorityEmail.type).toBe('text');
    expect((childLocalAuthorityEmail.label as LanguageLookup)(generatedContent)).toBe(
      enContent.childLocalAuthorityEmail
    );
    expect((childLocalAuthorityEmail.hint as LanguageLookup)(generatedContent)).toBe(
      enContent.childLocalAuthorityEmailHint
    );

    (childLocalAuthorityEmail.validator as ValidationCheck)('MockEmail', {});
    expect(isFieldFilledIn).toHaveBeenCalled();
    (childLocalAuthorityEmail.validator as ValidationCheck)(undefined, {});
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
