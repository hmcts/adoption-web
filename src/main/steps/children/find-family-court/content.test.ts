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
  findFamilyCourtParagraph2:
    'You have told us that the court which issued the placement order was <b>London Court</b>.',
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
};

const cyContent = {
  section: 'Manylion y plentyn',
  title: 'Dewiswch lys teulu',
  findFamilyCourtParagraph1:
    'Efallai cynhelir gwrandawiadau llys sy’n ymwneud â’ch cais i fabwysiadu. Efallai bydd y rheini biolegol yn bresennol yn y gwrandawiadau hyn. Nid oes rhaid ichi fynychu’r gwrandawiadau hyn.',
  findFamilyCourtParagraph2:
    'Rydych wedi dweud wrthym mai’r llys a gyhoeddodd y gorchymyn lleoli oedd <b>London Court</b>.',
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
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > find-family-court > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { placementOrderCourt: 'London Court' },
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
        userCase: { placementOrderCourt: 'London Court' },
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
    expect((field2?.label as Function)(generatedContent)).toBe(enContent.familyCourtName);
    expect(field2.type).toBe('text');
    expect(field2?.labelSize).toBe(null);

    const field3 = field.values[1].subFields!.p1;
    expect((field3?.label as Function)(generatedContent)).toBe(enContent.familyCourtNameParagraph1);
    expect(field3.type).toBe('label');

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
