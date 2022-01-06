import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: "The child's details",
  title: 'Orders already in place',
  orderType: 'Type of order',
  orderNumber: 'Order case or serial number',
  orderCourt: 'Court',
  orderDate: 'Order date',
  placementOrder: 'Placement Order',
  change: 'Change',
  continue: 'Continue',
};

const cyContent = {
  section: "The child's details (in welsh)",
  title: 'Orders already in place (in welsh)',
  orderType: 'Type of order (in welsh)',
  orderNumber: 'Order case or serial number (in welsh)',
  orderCourt: 'Court (in welsh)',
  orderDate: 'Order date (in welsh)',
  placementOrder: 'Placement Order (in welsh)',
  change: 'Change (in welsh)',
  continue: 'Continue (in welsh)',
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('children > placement-order-check-your-answers content', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      selectedPlacementOrderId: 'MOCK_ID',
      placementOrders: [
        {
          placementOrderId: 'MOCK_ID',
          placementOrderNumber: 'MOCK_NUMBER',
          placementOrderCourt: 'MOCK_COURT',
          placementOrderDate: { day: '02', month: '11', year: '2021' },
        },
      ],
    },
  } as CommonContent;

  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.placementOrder).toEqual(enContent.placementOrder);
    expect(generatedContent.change).toEqual(enContent.change);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.placementOrder).toEqual(cyContent.placementOrder);
    expect(generatedContent.change).toEqual(cyContent.change);
  });

  test('should create correct items for summaryList', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.placementOrderListItems).toEqual([
      { key: { text: 'Type of order' }, value: { text: 'Placement Order' }, actions: { items: [] } },
      {
        key: { text: 'Order case or serial number' },
        value: { text: 'MOCK_NUMBER' },
        actions: {
          items: [
            {
              href: '/children/placement-order-number?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: 'change-order-number',
            },
          ],
        },
      },
      {
        key: { text: 'Court' },
        value: { text: 'MOCK_COURT' },
        actions: {
          items: [
            {
              href: '/children/placement-order-court?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: 'change-order-court',
            },
          ],
        },
      },
      {
        key: { text: 'Order date' },
        value: { text: '2 November 2021' },
        actions: {
          items: [
            {
              href: '/children/placement-order-date?change=MOCK_ID',
              text: 'Change',
              visuallyHiddenText: 'change-order-date',
            },
          ],
        },
      },
    ]);
  });

  test('should create correct items for summaryList when there are more than one placement order', () => {
    commonContent.userCase!.placementOrders!.push({
      placementOrderId: 'MOCK_ID2',
      placementOrderNumber: 'MOCK_NUMBER2',
      placementOrderCourt: 'MOCK_COURT2',
      placementOrderDate: { day: '12', month: '05', year: '2020' },
    });
    commonContent.userCase!.selectedPlacementOrderId = 'MOCK_ID2';

    const generatedContent = generateContent(commonContent);
    expect(generatedContent.placementOrderListItems).toEqual([
      {
        key: { text: 'Type of order' },
        value: { text: 'Placement Order' },
        actions: {
          items: [
            {
              href: '/children/placement-order-type?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: 'change-order-type',
            },
          ],
        },
      },
      {
        key: { text: 'Order case or serial number' },
        value: { text: 'MOCK_NUMBER2' },
        actions: {
          items: [
            {
              href: '/children/placement-order-number?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: 'change-order-number',
            },
          ],
        },
      },
      {
        key: { text: 'Court' },
        value: { text: 'MOCK_COURT2' },
        actions: {
          items: [
            {
              href: '/children/placement-order-court?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: 'change-order-court',
            },
          ],
        },
      },
      {
        key: { text: 'Order date' },
        value: { text: '12 May 2020' },
        actions: {
          items: [
            {
              href: '/children/placement-order-date?change=MOCK_ID2',
              text: 'Change',
              visuallyHiddenText: 'change-order-date',
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
