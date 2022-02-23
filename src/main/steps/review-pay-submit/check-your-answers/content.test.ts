import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { ApplyingWith, Gender, YesNoNotsure } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Review your application',
  title: 'Review your answers',
  change: 'Change',
  submitApplication: 'Submit your application',
  checkInfoBeforeSubmit:
    'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing.',
  continue: 'Continue',
  applyingWith: {
    [ApplyingWith.ALONE]: "I'm applying on my own",
    [ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER]: "I'm applying with my spouse or civil partner",
    [ApplyingWith.WITH_SOME_ONE_ELSE]: "I'm applying with someone who is not my spouse or civil partner",
  },
  gender: {
    [Gender.MALE]: 'Male',
    [Gender.FEMALE]: 'Female',
    [Gender.INTERSEX]: 'Other',
  },
  yesNoNotsure: {
    [YesNoNotsure.YES]: 'Yes',
    [YesNoNotsure.NO]: 'No',
    [YesNoNotsure.NOT_SURE]: 'Not sure',
  },
  sectionTitles: {
    applicationDetails: 'Application details',
    adoptionagencyOrLA: 'Adoption agency or local authority details',
    additionalAoptionagencyOrLA: 'Additional adoption agency or local authority details',
    socialWorkerDetails: "Child's social worker details",
    applicantDetails: "Applicant's details",
    firstApplicantDetails: "First applicant's details",
    secondApplicantDetails: "Second applicant's details",
    childDetails: "Child's details",
    birthMotherDetails: "Birth mother's details",
    birthFatherDetails: "Birth father's details",
    otherParentDetails: "Other parent's details",
    childPlacementAndCourtOrders: "Child's placement and court orders",
    siblingCourtOrders: 'Sibling court orders',
    familyCourtDetails: 'Family court details',
    uploadedDocuments: 'Uploaded documents',
  },
  keys: {
    noOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in',
    name: 'Name',
    phoneNumber: 'Phone number',
    emailAddress: 'Email address',
    nameOfContact: 'Name of contact',
    emailOfContact: 'Email address of contact',
    teamEmailAddress: 'Team email address',
    additionalAdoptionAgency: 'Additional adoption agency',
    fullName: 'Full name',
    previousNames: 'Previous names',
    dateOfBirth: 'Date of birth',
    occupation: 'Occupation',
    address: 'Address',
    sexAtBirth: 'Sex at birth',
    nationality: 'Nationality',
    fullNameAfterAdoption: 'Full name after adoption',
    alive: 'Alive',
    addressKnown: 'Address known',
    nameOnBirthCertificate: 'Name on birth certificate',
    otherParent: 'Is there another person with parental responsibility?',
    placementOrder: 'Placement order',
    typeOfOrder: 'Type of order',
    orderNumber: 'Order case or serial number',
    court: 'Court',
    date: 'Date',
    courtOrder: 'Court order',
    siblingCourtOrders: 'Sibling with court orders',
    siblingName: 'Sibling name',
    familyCourtName: 'Family court name',
    applicantDocuments: "Applicant's documents",
    childDocuments: "Child's documents",
  },
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks: 'You can only submit 10 weeks after the date the child started living continuously with you',
    },
  },
};

const cyContent = () => ({
  section: 'Review your application, pay and send (in welsh)',
  title: 'Check your answers (in welsh)',
  continue: 'Continue (in welsh)',
});

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */

describe('check-your-answer > content', () => {
  const commonContent = {
    language: 'en',
    userCase: mockUserCase,
  } as unknown as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      userCase: { ...mockUserCase, applyingWith: ApplyingWith.WITH_SPOUSE_OR_CIVIL_PARTNER },
      language: 'cy',
    });
    const content = cyContent();
    expect(generatedContent.section).toEqual(content.section);
    expect(generatedContent.title).toEqual(content.title);
    expect(generatedContent.continue).toEqual(content.continue);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
