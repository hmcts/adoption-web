import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { PlacementOrder } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Sibling details',
  for: '',
  orderType: 'Type of order',
  orderNumber: 'Order case or serial number',
  change: 'Change',
  continue: 'Continue',
};

const cyContent = {
  section: 'Manylion y brawd/chwaer',
  for: '',
  orderType: 'Math o neuchymyn',
  orderNumber: 'Rhif cyfresol neu rif yr achos ar y gorchymyn',
  change: 'Newid',
  continue: 'Parhau',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('sibling > placement-order-check-your-answers > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingFirstName: 'MOCK_FIRST_NAME',
          siblingLastNames: 'MOCK_LAST_NAMES',
          siblingPlacementOrders: [
            {
              placementOrderId: 'MOCK_PO_ID',
              placementOrderType: 'MOCK_TYPE',
              placementOrderNumber: 'MOCK_NUMBER',
            },
          ],
        },
      ],
      selectedSiblingId: 'MOCK_SIBLING_ID',
      selectedSiblingPoId: 'MOCK_PO_ID',
    },
  } as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test.each([
    {
      firstName: undefined,
      lastName: undefined,
      placementOrderType: undefined,
      expected: { title: ' for  ', placementOrderType: undefined },
    },
    {
      firstName: 'MOCK_FIRST_NAME',
      lastName: 'MOCK_LAST_NAME',
      placementOrderType: 'MOCK_TYPE',
      expected: { title: 'MOCK_TYPE for MOCK_FIRST_NAME MOCK_LAST_NAME', placementOrderType: 'MOCK_TYPE' },
    },
  ])('should create correct items for summaryList when %o', ({ firstName, lastName, placementOrderType, expected }) => {
    commonContent.userCase!.siblings![0]!.siblingFirstName = firstName;
    commonContent.userCase!.siblings![0]!.siblingLastNames = lastName;
    (commonContent.userCase!.siblings![0]!.siblingPlacementOrders![0] as PlacementOrder).placementOrderType =
      placementOrderType;
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.title).toBe(expected.title);
    expect(generatedContent.placementOrderListItems).toEqual([
      {
        key: { text: 'Sibling name' },
        value: { text: 'MOCK_FIRST_NAME MOCK_LAST_NAME' },
      },
      {
        key: { text: 'Type of order' },
        value: { text: expected.placementOrderType },
        actions: {
          items: [
            {
              href: '/sibling/placement-order-type?change=MOCK_SIBLING_ID/MOCK_PO_ID&returnUrl=/sibling/placement-order-check-your-answers',
              text: 'Change',
              visuallyHiddenText: 'Type of order',
            },
          ],
        },
      },
      {
        key: { text: 'Order case or serial number' },
        value: { text: 'MOCK_NUMBER' },
        actions: {
          items: [
            {
              href: '/sibling/placement-order-number?change=MOCK_SIBLING_ID/MOCK_PO_ID&returnUrl=/sibling/placement-order-check-your-answers',
              text: 'Change',
              visuallyHiddenText: 'Order case or serial number',
            },
          ],
        },
      },
    ]);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(enContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
