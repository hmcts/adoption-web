import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form'; //FormFieldsFn
import { isFieldFilledIn } from '../../../app/form/validation';

const en = content => ({
  section: "The child's details",
  title: 'Choose a family court',
  findFamilyCourtParagraph1:
    'There may be court hearings related to your application to adopt. The birth parents may be present at these. You do not have to attend these hearings.',
  findFamilyCourtParagraph2: `You have told us that the court which issued the placement order was <b>${content.userCase.placementOrders[0].placementOrderCourt}</b>.`,
  findFamilyCourt: 'Do you want the hearings to be heard in the same court?',
  findFamilyCourtHint: 'You should discuss this with your social worker or adoption agency.',
  familyCourtNameParagraph1:
    '<p class="govuk-label"><a  target="_blank" href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode">Choose your family court</a></p>',
  familyCourtNameParagraph2:
    'Find the family court in the town or region you want your application heard. The link will open in a new tab. Return to this tab to enter the court name.',
  familyCourtNameParagraph3:
    'Note that your request will be submitted to the judge. The judge has the final decision about where court hearings will take place.',
  familyCourtName: 'Enter the full name of the court',
  errors: {
    findFamilyCourt: {
      required: 'Please answer the question',
    },
    familyCourtName: {
      required: 'Enter the name of the court',
    },
  },
});

const cy = content => ({
  section: "The child's details (in welsh)",
  title: 'Choose a family court (in welsh)',
  findFamilyCourtParagraph1:
    'There may be court hearings related to your application to adopt. The birth parents may be present at these. You do not have to attend these hearings. (in welsh)',
  findFamilyCourtParagraph2: `You have told us that the court which issued the placement order was <b>${content.userCase.placementOrders[0].placementOrderCourt}</b>. (in welsh)`,
  findFamilyCourt: 'Do you want the hearings to be heard in the same court? (in welsh)',
  findFamilyCourtHint: 'You should discuss this with your social worker or adoption agency. (in welsh)',
  familyCourtNameParagraph1:
    '<p class="govuk-label"><a  target="_blank" href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode">Choose your family court</a></p> (in welsh)',
  familyCourtNameParagraph2:
    'Find the family court in the town or region you want your application heard. The link will open in a new tab. Return to this tab to enter the court name. (in welsh)',
  familyCourtNameParagraph3:
    'Note that your request will be submitted to the judge. The judge has the final decision about where court hearings will take place. (in welsh)',
  familyCourtName: 'Enter the full name of the court (in welsh)',
  errors: {
    findFamilyCourt: {
      required: 'Please answer the question (in welsh)',
    },
    familyCourtName: {
      required: 'Enter the name of the court (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    findFamilyCourt: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      label: l => l.findFamilyCourt,
      hint: l => l.findFamilyCourtHint,
      labelSize: 'normal',

      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            p1: {
              label: l => l.familyCourtNameParagraph1,
              type: 'label',
            },
            p2: {
              label: l => l.familyCourtNameParagraph2,
              type: 'label',
            },
            p3: {
              label: l => l.familyCourtNameParagraph3,
              type: 'label',
            },
            familyCourtName: {
              type: 'text',
              label: l => l.familyCourtName,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  saveAsDraft: {
    text: l => l.saveAsDraft,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
