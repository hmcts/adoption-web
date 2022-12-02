import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormInput, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const enContent = {
  section: "The child's details",
  title: 'Choose a family court',
  findFamilyCourtParagraph1:
    'There may be court hearings related to your application to adopt. The birth parents may be present at these. You do not have to attend these hearings.',
  findFamilyCourtParagraph2: 'You have told us that the court which issued the placement order was <b>MOCK</b>.',
  findFamilyCourt: 'Do you want the hearings to be heard in the same court?',
  findFamilyCourtHint: 'You should discuss this with your social worker or adoption agency.',
  familyCourtNameParagraph2:
    'You do not have to attend court hearings. We recommend staying with the same court so that birth parents are not alerted to your location. It is important that you discuss this with the social worker. The judge has the final decision about where court hearings take place.',
  familyCourtName: 'Enter the full name of the court',
  familyCourtNameParagraph3:
    '<br>If you cannot find the court you can search using the postcode in the <a class="govuk-link" href="https://www.gov.uk/find-court-tribunal" target="_blank">court finder service</a>.',
  options: [{ text: 'MOCK', value: 'MOCK', selected: true }],
  errors: {
    findFamilyCourt: {
      required: 'Please answer the question',
    },
    familyCourtName: {
      required: 'Enter the name of the court',
    },
  },
};

const cyContent = {
  section: 'Manylion y plentyn',
  title: 'Dewiswch lys teulu',
  findFamilyCourtParagraph1:
    'Efallai cynhelir gwrandawiadau llys sy’n ymwneud â’ch cais i fabwysiadu. Efallai bydd y rheini biolegol yn bresennol yn y gwrandawiadau hyn. Nid oes rhaid ichi fynychu’r gwrandawiadau hyn.',
  findFamilyCourtParagraph2: 'Rydych wedi dweud wrthym mai’r llys a gyhoeddodd y gorchymyn lleoli oedd <b>MOCK</b>.',
  findFamilyCourt: 'A ydych eisiau i’r gwrandawiadau cael eu gwrando yn yr un llys?',
  findFamilyCourtHint: 'Dylech drafod hyn gyda’ch gweithiwr cymdeithasol neu’ch asiantaeth fabwysiadu.',
  familyCourtNameParagraph2:
    "Nid oes rhaid i chi fynychu gwrandawiadau llys. Rydym yn argymell aros gyda'r un llys fel nad yw rhieni biolegol yn dod i wybod am eich lleoliad. Mae'n bwysig eich bod yn trafod hyn gyda'r gweithiwr cymdeithasol. Y barnwr fydd yn penderfynu’n derfynol ble mae gwrandawiadau llys yn cael eu cynnal.",
  familyCourtName: 'Nac ydwdwch enw llawn y llys',
  familyCourtNameParagraph3:
    'Os na allwch ddod o hyd i\'r llys gallwch chwilio drwy ddefnyddio\'r cod post yn y <a class="govuk-link" href="https://www.gov.uk/find-court-tribunal" target="_blank">gwasanaeth dod o hyd i lysoedd.</a>.',
  options: [{ text: 'MOCK', value: 'MOCK', selected: true }],
  errors: {
    findFamilyCourt: {
      required: "Dewiswch ie os ydych am i'r gwrandawiadau gael eu clywed yn yr un llys",
    },
    familyCourtName: {
      required: 'Nac ydwdwch enw’r llys',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > find-family-court > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { placementOrderCourt: 'MOCK', familyCourtName: 'MOCK' },
    courtList: [{ site_name: 'MOCK', is_case_management_location: '', epimms_id: '', venue_name: 'MOCK' }],
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () =>
      generateContent({
        ...commonContent,
        language: 'cy',
        userCase: { placementOrderCourt: 'MOCK', familyCourtName: 'MOCK' },
      })
    );
  });

  test('should contain findFamilyCourt field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;
    const field = fields.findFamilyCourt as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.findFamilyCourt);
    expect(((field as FormInput).hint as Function)(generatedContent)).toBe(enContent.findFamilyCourtHint);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesOrNo.YES);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesOrNo.NO);
    expect(field.validator).toBe(isFieldFilledIn);

    const field2 = field.values[1].subFields!.familyCourtName;
    expect(field2.type).toBe('select-dropdown');

    const field4 = field.values[1].subFields!.p2;
    expect((field4?.label as Function)(generatedContent)).toBe(enContent.familyCourtNameParagraph2);
    expect(field4.type).toBe('label');

    const field5 = field.values[1].subFields!.p3;
    expect((field5?.label as Function)(generatedContent)).toBe(enContent.familyCourtNameParagraph3);
    expect(field5.type).toBe('label');
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });

  test('should contain saveAsDraft button', () => {
    expect(((generatedContent.form as FormContent).saveAsDraft?.text as Function)(commonContent)).toBe(
      commonContent.saveAsDraft
    );
  });
});
/* eslint-enable @typescript-eslint/ban-types */
