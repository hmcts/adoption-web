import { PageContent, TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const getSectionSummaryList = (rows, content: PageContent) => {
  return rows.map(item => ({
    key: { text: item.key },
    value: { text: item.value },
    actions: {
      items: [
        {
          href: item.changeUrl,
          text: content.change,
          visuallyHiddenText: `Change ${item.key}`,
        },
      ],
    },
  }));
};

const en = (): Record<string, unknown> => {
  const sectionTitles = {
    applicationDetails: 'Application details',
    adoptionagencyOrLA: 'Adoption agency or local authority details',
    additionalAoptionagencyOrLA: 'Additional adoption agency or local authority details',
    socialWorkerDetails: "Child's social worker details",
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
  };

  const keys = {
    noOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in',
  };

  const content = {
    section: 'Review your application',
    title: 'Review your answers',
    change: 'Change',
    orderType: 'Order type',
    submitApplication: 'Submit your application',
    checkInfoBeforeSubmit:
      'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing.',
    continue: 'Continue',
    errors: {
      dateChildMovedIn: {
        lessThanTenWeeks: 'You can only submit 10 weeks after the date the child started living continuously with you',
      },
    },
  };

  return {
    ...content,
    sections: [
      {
        title: sectionTitles.applicationDetails,
        rows: getSectionSummaryList(
          [
            { key: keys.noOfApplicants, value: 'some value', changeUrl: '#' },
            { key: keys.dateChildMovedIn, value: 'some value', changeUrl: '#' },
          ],
          content
        ),
      },
    ],
  };
};

const cy = (): Record<string, unknown> => ({
  section: 'Review your application, pay and send (in welsh)',
  title: 'Check your answers (in welsh)',
  submitApplication: 'Submit your application (in welsh)',
  checkInfoBeforeSubmit:
    'You should check that all the information given in your application is correct before you submit. Once submitted, your application will be sent to the court for processing. (in welsh)',
  continue: 'Continue (in welsh)',
  errors: {
    dateChildMovedIn: {
      lessThanTenWeeks:
        'You can only submit 10 weeks after the date the child started living continuously with you (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    dateChildMovedIn: { type: 'hidden', hidden: true },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
