import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form'; //FormFieldsFn
import { isFieldFilledIn } from '../../../app/form/validation';

const getCourtListItems = (courtList, selectedCourt) =>
  courtList
    .filter(item => item.site_name !== selectedCourt)
    .map(item => ({ text: item.site_name, value: item.site_name }));

const en = content => ({
  section: "The child's details",
  title: 'Choose a family court',
  label: 'Enter the full name of the court',
  findFamilyCourtParagraph1:
    'There may be court hearings related to your application to adopt. The birth parents may be present at these. You do not have to attend these hearings.',
  findFamilyCourtParagraph2: `You have told us that the court which issued the placement order was <b>${content.userCase?.placementOrderCourt}</b>.`,
  findFamilyCourt: 'Do you want the hearings to be heard in the same court?',
  findFamilyCourtHint: 'You should discuss this with your social worker or adoption agency.',
  familyCourtNameParagraph2:
    'You do not have to attend court hearings. We recommend staying with the same court so that birth parents are not alerted to your location. It is important that you discuss this with the social worker. The judge has the final decision about where court hearings take place.',
  familyCourtName: 'Enter the full name of the court',
  familyCourtNameParagraph3:
    '<br>If you cannot find the court you can search using the postcode in the <a class="govuk-link" href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode" target="_blank">court finder service</a>.',
  options: [
    ...getCourtListItems(content.courtList, content.userCase.familyCourtName),
    { text: content.userCase.familyCourtName, value: content.userCase.familyCourtName, selected: true },
  ],
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
  label: 'Nac ydwdwch enw llawn y llys',
  findFamilyCourtParagraph1:
    'Efallai cynhelir gwrandawiadau llys sy’n ymwneud â’ch cais i fabwysiadu. Efallai bydd y rheini biolegol yn bresennol yn y gwrandawiadau hyn. Nid oes rhaid ichi fynychu’r gwrandawiadau hyn.',
  findFamilyCourtParagraph2: `Rydych wedi dweud wrthym mai’r llys a gyhoeddodd y gorchymyn lleoli oedd <b>${content.userCase?.placementOrderCourt}</b>.`,
  findFamilyCourt: 'A ydych eisiau i’r gwrandawiadau cael eu gwrando yn yr un llys?',
  findFamilyCourtHint: 'Dylech drafod hyn gyda’ch gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadu.',
  familyCourtNameParagraph2:
    "Nid oes rhaid i chi fynychu gwrandawiadau llys. Rydym yn argymell aros gyda'r un llys fel nad yw rhieni biolegol yn dod i wybod am eich lleoliad. Mae'n bwysig eich bod yn trafod hyn gyda'r gweithiwr cymdeithasol. Y barnwr fydd yn penderfynu’n derfynol ble mae gwrandawiadau llys yn cael eu cynnal.",
  familyCourtName: 'Nac ydwdwch enw llawn y llys',
  familyCourtNameParagraph3:
    'Os na allwch ddod o hyd i\'r llys gallwch chwilio drwy ddefnyddio\'r cod post yn y <a class="govuk-link" href="https://www.find-court-tribunal.service.gov.uk/services/childcare-and-parenting/adoption/search-by-postcode" target="_blank">gwasanaeth dod o hyd i lysoedd.</a>.',
  options: [
    ...getCourtListItems(content.courtList, content.userCase.familyCourtName),
    { text: content.userCase.familyCourtName, value: content.userCase.familyCourtName, selected: true },
  ],
  errors: {
    findFamilyCourt: {
      required: "Dewiswch ie os ydych am i'r gwrandawiadau gael eu clywed yn yr un llys",
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
      labelHidden: false,
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
            p2: {
              label: l => l.familyCourtNameParagraph2,
              type: 'label',
            },
            // p4: {
            //   label: l => l.familyCourtName,
            //   type: 'label',
            // },
            familyCourtName: {
              type: 'select-dropdown',
              id: 'location-picker',
              options: l => l.options,
              validator: isFieldFilledIn,
              label: l => l.label,
              classes: 's',
            },
            p3: {
              label: l => l.familyCourtNameParagraph3,
              type: 'label',
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
