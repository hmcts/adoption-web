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
  section: "The child's details (in welsh)",
  title: 'Choose a family court (in welsh)',
  findFamilyCourtParagraph1:
    'There may be court hearings related to your application to adopt. The birth parents may be present at these. You do not have to attend these hearings. (in welsh)',
  findFamilyCourtParagraph2:
    'You have told us that the court which issued the placement order was <b>London Court</b>. (in welsh)',
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
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('find-family-court content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: { placementOrders: [{ placementOrderId: '123', placementOrderCourt: 'London Court' }] },
  }) as CommonContent;

  let generatedContent;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.findFamilyCourtParagraph1).toEqual(enContent.findFamilyCourtParagraph1);
    expect(generatedContent.findFamilyCourtParagraph2).toEqual(enContent.findFamilyCourtParagraph2);
    expect(generatedContent.findFamilyCourt).toEqual(enContent.findFamilyCourt);
    expect(generatedContent.findFamilyCourtHint).toEqual(enContent.findFamilyCourtHint);
    expect(generatedContent.familyCourtNameParagraph1).toEqual(enContent.familyCourtNameParagraph1);
    expect(generatedContent.familyCourtNameParagraph2).toEqual(enContent.familyCourtNameParagraph2);
    expect(generatedContent.familyCourtNameParagraph3).toEqual(enContent.familyCourtNameParagraph3);
    expect(generatedContent.familyCourtName).toEqual(enContent.familyCourtName);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({
      ...commonContent,
      language: 'cy',
      userCase: { placementOrders: [{ placementOrderId: '123', placementOrderCourt: 'oxford family court' }] },
    });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.findFamilyCourtParagraph1).toEqual(cyContent.findFamilyCourtParagraph1);
    expect(generatedContent.findFamilyCourtParagraph2).toEqual(
      'You have told us that the court which issued the placement order was <b>oxford family court</b>. (in welsh)'
    );
    expect(generatedContent.findFamilyCourt).toEqual(cyContent.findFamilyCourt);
    expect(generatedContent.findFamilyCourtHint).toEqual(cyContent.findFamilyCourtHint);
    expect(generatedContent.familyCourtNameParagraph1).toEqual(cyContent.familyCourtNameParagraph1);
    expect(generatedContent.familyCourtNameParagraph2).toEqual(cyContent.familyCourtNameParagraph2);
    expect(generatedContent.familyCourtNameParagraph3).toEqual(cyContent.familyCourtNameParagraph3);
    expect(generatedContent.familyCourtName).toEqual(cyContent.familyCourtName);
    expect(generatedContent.errors).toEqual(cyContent.errors);
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
