jest.mock('path', () => ({
  join: jest.fn((_arg0, ...rest) => `MOCK_BASE_DIR/${(rest as string[]).join('/')}`),
}));

import { YesNoNotsure, YesOrNo } from '../../app/case/definition';

import { laPortalSequence } from './laPortalSequence';

describe('la-portal > laPortalSequence', () => {
  test('should contain 62 entries in sibling screen sequence', () => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    expect(laPortalSequence).toHaveLength(62);
    let incr = 0;
    expect(laPortalSequence[incr].url).toBe('/la-portal/kba-case-ref');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/kba-completed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/start-page');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/negative-scenario');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/check-your-answers');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/sex-at-birth');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/sex-at-birth');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/child/nationality');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/nationality');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/nationality');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/full-name');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/full-name');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-mother/still-alive');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/still-alive');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/still-alive');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ birthMotherStillAlive: YesNoNotsure.YES })).toBe(
      '/la-portal/birth-mother/nationality'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/nationality');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/nationality');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-mother/occupation');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/occupation');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/occupation');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-mother/address-known');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/address-known');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address-known');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ birthMotherAddressKnown: YesOrNo.YES })).toBe(
      '/la-portal/birth-mother/address/lookup'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/address/lookup');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/lookup');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-mother/address/select');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/address/select');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/select');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-mother/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/address/manual');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/manual');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-mother/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/address/international');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/international');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-mother/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-mother/last-address-confirmed');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/last-address-confirmed');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/name-on-certificate');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/name-on-certificate');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/identity-known');
    expect(laPortalSequence[incr].getNextStep({ birthFatherNameOnCertificate: YesOrNo.YES })).toBe(
      '/la-portal/birth-father/full-name'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/identity-known');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/identity-known');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ birthFatherIdentityKnown: YesOrNo.YES })).toBe(
      '/la-portal/birth-father/full-name'
    );
    expect(laPortalSequence[incr].getNextStep({ birthFatherIdentityKnown: YesOrNo.NO })).toBe('/la-portal/task-list');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/full-name');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/full-name');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/still-alive');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/still-alive');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/alive');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ birthFatherStillAlive: YesNoNotsure.YES })).toBe(
      '/la-portal/birth-father/parental-responsibility'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/parental-responsibility');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/parental-responsibility');
    expect(laPortalSequence[incr].getNextStep({ birthFatherResponsibility: YesOrNo.YES })).toBe(
      '/la-portal/birth-father/parental-responsibility/granted'
    );
    expect(laPortalSequence[incr].getNextStep({ birthFatherResponsibility: YesOrNo.NO })).toBe(
      '/la-portal/birth-father/parental-responsibility/no-responsibility'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/parental-responsibility/granted');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/parental-responsibility/granted');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/nationality');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/parental-responsibility/no-responsibility');
    expect(laPortalSequence[incr].contentDir).toBe(
      'MOCK_BASE_DIR/../birth-father/parental-responsibility/no-responsibility'
    );
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/nationality');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/nationality');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/nationality');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/occupation');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/occupation');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/occupation');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/address-known');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/address-known');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address-known');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ birthFatherAddressKnown: YesOrNo.YES })).toBe(
      '/la-portal/birth-father/address/lookup'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/address/lookup');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/lookup');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/address/select');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/address/select');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/select');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/address/manual');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/manual');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/address/international');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/international');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/birth-father/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/birth-father/last-address-confirmed');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../birth-father/last-address-confirmed');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/exists');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/exists');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ otherParentExists: YesOrNo.YES })).toBe(
      '/la-portal/other-parent/full-name'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/full-name');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/full-name');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/other-parent/address-known');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/address-known');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address-known');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ otherParentAddressKnown: YesOrNo.YES })).toBe(
      '/la-portal/other-parent/address/lookup'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/address/lookup');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/lookup');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/other-parent/address/select');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/address/select');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/select');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/other-parent/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/address/manual');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/manual');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/other-parent/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/address/international');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/international');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/other-parent/last-address-confirmed');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/other-parent/last-address-confirmed');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../other-parent/last-address-confirmed');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/placement-order-type');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-type');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/child/placement-order-number');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/placement-order-number');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-number');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/child/placement-order-court');
    expect(
      laPortalSequence[incr].getNextStep({
        placementOrders: [{ placementOrderId: 'MOCK_ID' }],
        selectedPlacementOrderId: 'MOCK_ID',
      })
    ).toBe('/la-portal/child/placement-order-date');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/placement-order-court');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-court');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/child/placement-order-date');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/placement-order-date');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-date');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/child/placement-order-summary');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/placement-order-summary');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-summary');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ addAnotherPlacementOrder: YesOrNo.YES })).toBe(
      '/la-portal/child/placement-order-type?add=1609459200000'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/placement-order-check-your-answers');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-check-your-answers');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/child/placement-order-summary');
    expect(
      laPortalSequence[incr].getNextStep({ hasSiblings: YesNoNotsure.YES, siblings: [{ siblingId: 'MOCK_ID' }] })
    ).toBe('/la-portal/child/placement-order-summary');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/child/remove-placement-order');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../children/remove-placement-order');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/child/placement-order-summary');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/sibling/exists');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../sibling/exists');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/sibling/relation');
    expect(laPortalSequence[incr].getNextStep({ hasSiblings: YesNoNotsure.NO })).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ hasSiblings: YesNoNotsure.NOT_SURE })).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ hasSiblings: YesNoNotsure.YES, siblings: [] })).toBe(
      '/la-portal/sibling/relation'
    );
    expect(
      laPortalSequence[incr].getNextStep({ hasSiblings: YesNoNotsure.YES, siblings: [{ siblingId: 'MOCK_ID' }] })
    ).toBe('/la-portal/sibling/summary');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/sibling/relation');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../sibling/relation');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/sibling/placement-order-type');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/sibling/placement-order-type');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../sibling/placement-order-type');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/sibling/placement-order-number');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/sibling/placement-order-number');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../sibling/placement-order-number');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/sibling/summary');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/sibling/summary');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../sibling/summary');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[incr].getNextStep({ addAnotherSiblingPlacementOrder: YesOrNo.YES })).toBe(
      '/la-portal/sibling/relation?add=1609459200000'
    );

    expect(laPortalSequence[++incr].url).toBe('/la-portal/sibling/placement-order-check-your-answers');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../sibling/placement-order-check-your-answers');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/sibling/summary');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/sibling/remove-placement-order');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../sibling/remove-placement-order');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/sibling/summary');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/confirmation');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/cookies');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../application/cookies');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/privacy-policy');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../application/privacy-policy');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/accessibility-statement');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../application/accessibility-statement');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/terms-and-conditions');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../application/terms-and-conditions');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/contact-us');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../application/contact-us');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/check-your-answers');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/check-your-answers');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/statement-of-truth');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/statement-of-truth');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/statement-of-truth');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/confirmation');

    expect(laPortalSequence[++incr].url).toBe('/la-portal/la-portal/upload-your-documents');
    expect(laPortalSequence[incr].contentDir).toBe('MOCK_BASE_DIR/../la-portal/upload-your-documents');
    expect(laPortalSequence[incr].getNextStep({})).toBe('/la-portal/task-list');
  });
});
