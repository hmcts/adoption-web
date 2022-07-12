import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form'; //FormFieldsFn
import { isFieldFilledIn } from '../../../app/form/validation';

const en = content => ({
  section: "The child's details",
  title: 'Choose a family court',
  findFamilyCourtParagraph1:
    'There may be court hearings related to your application to adopt. The birth parents may be present at these. You do not have to attend these hearings.',
  findFamilyCourtParagraph2: `You have told us that the court which issued the placement order was <b>${content.userCase?.placementOrderCourt}</b>.`,
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

const cy: typeof en = content => ({
  section: 'Manylion y plentyn',
  title: 'Dewiswch lys teulu',
  findFamilyCourtParagraph1:
    'Efallai cynhelir gwrandawiadau llys sy’n ymwneud â’ch cais i fabwysiadu. Efallai bydd y rheini biolegol yn bresennol yn y gwrandawiadau hyn. Nid oes rhaid ichi fynychu’r gwrandawiadau hyn.',
  findFamilyCourtParagraph2: `Rydych wedi dweud wrthym mai’r llys a gyhoeddodd y gorchymyn lleoli oedd <b>${content.userCase?.placementOrderCourt}</b>.`,
  findFamilyCourt: 'A ydych eisiau i’r gwrandawiadau cael eu gwrando yn yr un llys?',
  findFamilyCourtHint: 'Dylech drafod hyn gyda’ch gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadu.',
  familyCourtNameParagraph1:
    '<p class="govuk-label"><a  target="_blank" href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode?lng=cy">Dewiswch eich llys teulu</a></p>',
  familyCourtNameParagraph2:
    'Dewch o hyd i’r llys teulu yn y dref neu’r rhanbarth rydych yn dymuno i’ch cais gael ei wrando. Bydd y ddolen yn agor mewn ffenestr newydd. Dychwelwch i’r tab yma i nodi enw’r llys.',
  familyCourtNameParagraph3:
    'Nac ydwdwch bydd eich cais yn cael gyflwyno i’r barnwr. Y barnwr sy’n gwneud y penderfyniad terfynol am lle bydd y gwrandawiadau llys yn cymryd rhan.',
  familyCourtName: 'Nac ydwdwch enw llawn y llys',
  errors: {
    findFamilyCourt: {
      required: 'Atebwch y cwestiwn os gwelwch yn dda',
    },
    familyCourtName: {
      required: 'Nac ydwdwch enw’r llys',
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
