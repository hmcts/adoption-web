/* eslint-disable @typescript-eslint/ban-types */
import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Application details',
  title: 'Is the child you are applying to adopt the subject of a court granted Placement Order?',
  orderGrantedNo:
    'Unfortunately you cannot use the online adoption application. You must apply by post for all other types of adoption such as:',
  stepChild: 'adopting a stepchild',
  stepChildUrl: 'https://www.gov.uk/child-adoption/adopting-a-stepchild',
  overseaChild: 'adopting a child from overseas',
  overseaChildUrl: 'https://www.gov.uk/child-adoption/adopting-a-child-from-overseas',
  specialGuardian1: 'adopting a child when you’re their',
  specialGuardian2: 'special guardian',
  specialGuardianUrl: 'https://www.gov.uk/apply-special-guardian',
  ageSixWeeks: 'adopting a child under the age of 6 weeks whose parents have asked for the adoption',
  moreInfo1: 'You can find more information',
  moreInfo2: 'here',
  moreInfo3: 'or contact your social worker for support.',
  moreInfoUrl: 'https://www.gov.uk/child-adoption',
  continue: 'Continue',
  errors: {
    orderGrantedEligible: {
      required: 'Select if the child you are applying to adopt the subject of a court granted Placement Order',
    },
  },
};

const cyContent = {
  section: 'Manylion y cais',
  title: 'A yw’r plentyn yr ydych yn gwneud cais i’w fabwysiadu yn destun Gorchymyn Lleoli a ganiatawyd gan y llys?',
  orderGrantedNo:
    "Yn anffodus, ni allwch ddefnyddio'r cais mabwysiadu ar-lein. Mae'n rhaid i chi wneud cais drwy'r post ar gyfer pob math arall o fabwysiadu fel:",
  stepChild: 'mabwysiadu llysblentyn',
  stepChildUrl: 'https://www.gov.uk/mabwysiadu-plentyn/mabwysiadu-llysblentyn',
  overseaChild: 'mabwysiadu plentyn o wlad dramor',
  overseaChildUrl: 'https://www.gov.uk/mabwysiadu-plentyn/mabwysiadu-plentyn-o-wlad-dramor',
  specialGuardian1: 'mabwysiadu plentyn pan ydych yn',
  specialGuardian2: 'warcheidwad arbennig iddynt',
  specialGuardianUrl: 'https://www.gov.uk/apply-special-guardian',
  ageSixWeeks: "mabwysiadu plentyn o dan 6 wythnos oed y mae'r rhieni wedi gofyn i'r plentyn gael ei fabwysiadu",
  moreInfo1: 'Gallwch ddod o hyd i fwy o wybodaeth',
  moreInfo2: 'yma',
  moreInfo3: "neu gysylltu gyda'r gweithiwr cymdeithasol am gefnogaeth.",
  moreInfoUrl: 'https://www.gov.uk/mabwysiadu-plentyn',
  continue: 'Parhau',
  yes: 'Ydw',
  no: 'Nac ydw',
  errors: {
    orderGrantedEligible: {
      required:
        'Dewiswch a ydych yw’r plentyn yr ydych yn gwneud cais i’w fabwysiadu yn destun Gorchymyn Lleoli a ganiatawyd gan y llys.',
    },
  },
};

describe('order granted', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain multiple children field', () => {
    const fields = (generatedContent.form as FormContent).fields as FormFields;

    const field = fields.orderGrantedEligible as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(enContent.title);
    expect((field.section as Function)(generatedContent)).toBe(enContent.section);
    expect((field.values[1].label as Function)(commonContent)).toBe(commonContent.no);
    expect(field.values[1].value).toBe(YesNoNotsure.NO);
    expect((field.values[0].label as Function)(commonContent)).toBe(commonContent.yes);
    expect(field.values[0].value).toBe(YesNoNotsure.YES);
    expect((field.values[1].conditionalText as Function)(generatedContent)).toBe(
      '<p class="govuk-label">Unfortunately you cannot use the online adoption application. You must apply by post for all other types of adoption such as:</p>' +
        '<ul class="govuk-list govuk-list--bullet">' +
        '<li><a class="govuk-link" href="https://www.gov.uk/child-adoption/adopting-a-stepchild">adopting a stepchild</a></li>' +
        '<li><a class="govuk-link" href="https://www.gov.uk/child-adoption/adopting-a-child-from-overseas">adopting a child from overseas</a></li>' +
        '<li>adopting a child when you’re their <a class="govuk-link" href="https://www.gov.uk/apply-special-guardian">special guardian</a></li>' +
        '<li>adopting a child under the age of 6 weeks whose parents have asked for the adoption</li>' +
        '</ul>' +
        '<p class="govuk-label">You can find more information <a class="govuk-link" href="https://www.gov.uk/child-adoption">here</a> or contact your social worker for support.</p>'
    );
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain submit button', () => {
    expect(((generatedContent.form as FormContent).submit.text as Function)(commonContent)).toBe(
      commonContent.continue
    );
  });
});
