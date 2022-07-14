jest.mock('path', () => ({
  join: jest.fn((_arg0, ...rest) => `MOCK_BASE_DIR/${(rest as string[]).join('/')}`),
}));

import { YesNoNotsure, YesOrNo } from '../../app/case/definition';

import { laPortalSequence } from './laPortalSequence';

describe('la-portal > laPortalSequence', () => {
  test('should contain 52 entries in sibling screen sequence', () => {
    Date.now = jest.fn(() => +new Date('2021-01-01'));
    expect(laPortalSequence).toHaveLength(53);

    expect(laPortalSequence[0].url).toBe('/la-portal/kba-case-ref');
    expect(laPortalSequence[0].getNextStep({})).toBe('/la-portal/kba-completed');

    expect(laPortalSequence[1].url).toBe('/la-portal/task-list');
    expect(laPortalSequence[1].getNextStep({})).toBe('/');

    expect(laPortalSequence[2].url).toBe('/la-portal/child/sex-at-birth');
    expect(laPortalSequence[2].contentDir).toBe('MOCK_BASE_DIR/../children/sex-at-birth');
    expect(laPortalSequence[2].getNextStep({})).toBe('/la-portal/child/nationality');

    expect(laPortalSequence[3].url).toBe('/la-portal/child/nationality');
    expect(laPortalSequence[3].contentDir).toBe('MOCK_BASE_DIR/../children/nationality');
    expect(laPortalSequence[3].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[4].url).toBe('/la-portal/birth-mother/full-name');
    expect(laPortalSequence[4].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/full-name');
    expect(laPortalSequence[4].getNextStep({})).toBe('/la-portal/birth-mother/still-alive');

    expect(laPortalSequence[5].url).toBe('/la-portal/birth-mother/still-alive');
    expect(laPortalSequence[5].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/still-alive');
    expect(laPortalSequence[5].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[5].getNextStep({ birthMotherStillAlive: YesNoNotsure.YES })).toBe(
      '/la-portal/birth-mother/nationality'
    );

    expect(laPortalSequence[6].url).toBe('/la-portal/birth-mother/nationality');
    expect(laPortalSequence[6].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/nationality');
    expect(laPortalSequence[6].getNextStep({})).toBe('/la-portal/birth-mother/occupation');

    expect(laPortalSequence[7].url).toBe('/la-portal/birth-mother/occupation');
    expect(laPortalSequence[7].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/occupation');
    expect(laPortalSequence[7].getNextStep({})).toBe('/la-portal/birth-mother/address-known');

    expect(laPortalSequence[8].url).toBe('/la-portal/birth-mother/address-known');
    expect(laPortalSequence[8].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address-known');
    expect(laPortalSequence[8].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[8].getNextStep({ birthMotherAddressKnown: YesOrNo.YES })).toBe(
      '/la-portal/birth-mother/address/lookup'
    );

    expect(laPortalSequence[9].url).toBe('/la-portal/birth-mother/address/lookup');
    expect(laPortalSequence[9].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/lookup');
    expect(laPortalSequence[9].getNextStep({})).toBe('/la-portal/birth-mother/address/select');

    expect(laPortalSequence[10].url).toBe('/la-portal/birth-mother/address/select');
    expect(laPortalSequence[10].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/select');
    expect(laPortalSequence[10].getNextStep({})).toBe('/la-portal/birth-mother/last-address-confirmed');

    expect(laPortalSequence[11].url).toBe('/la-portal/birth-mother/address/manual');
    expect(laPortalSequence[11].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/manual');
    expect(laPortalSequence[11].getNextStep({})).toBe('/la-portal/birth-mother/last-address-confirmed');

    expect(laPortalSequence[12].url).toBe('/la-portal/birth-mother/address/international');
    expect(laPortalSequence[12].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/address/international');
    expect(laPortalSequence[12].getNextStep({})).toBe('/la-portal/birth-mother/last-address-confirmed');

    expect(laPortalSequence[13].url).toBe('/la-portal/birth-mother/last-address-confirmed');
    expect(laPortalSequence[13].contentDir).toBe('MOCK_BASE_DIR/../birth-mother/last-address-confirmed');
    expect(laPortalSequence[13].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[14].url).toBe('/la-portal/birth-father/name-on-certificate');
    expect(laPortalSequence[14].contentDir).toBe('MOCK_BASE_DIR/../birth-father/name-on-certificate');
    expect(laPortalSequence[14].getNextStep({})).toBe('/la-portal/birth-father/identity-known');
    expect(laPortalSequence[14].getNextStep({ birthFatherNameOnCertificate: YesOrNo.YES })).toBe(
      '/la-portal/birth-father/full-name'
    );

    expect(laPortalSequence[15].url).toBe('/la-portal/birth-father/identity-known');
    expect(laPortalSequence[15].contentDir).toBe('MOCK_BASE_DIR/../birth-father/identity-known');
    expect(laPortalSequence[15].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[16].url).toBe('/la-portal/birth-father/full-name');
    expect(laPortalSequence[16].contentDir).toBe('MOCK_BASE_DIR/../birth-father/full-name');
    expect(laPortalSequence[16].getNextStep({})).toBe('/la-portal/birth-father/still-alive');

    expect(laPortalSequence[17].url).toBe('/la-portal/birth-father/still-alive');
    expect(laPortalSequence[17].contentDir).toBe('MOCK_BASE_DIR/../birth-father/alive');
    expect(laPortalSequence[17].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[17].getNextStep({ birthFatherStillAlive: YesNoNotsure.YES })).toBe(
      '/la-portal/birth-father/nationality'
    );

    expect(laPortalSequence[18].url).toBe('/la-portal/birth-father/nationality');
    expect(laPortalSequence[18].contentDir).toBe('MOCK_BASE_DIR/../birth-father/nationality');
    expect(laPortalSequence[18].getNextStep({})).toBe('/la-portal/birth-father/occupation');

    expect(laPortalSequence[19].url).toBe('/la-portal/birth-father/occupation');
    expect(laPortalSequence[19].contentDir).toBe('MOCK_BASE_DIR/../birth-father/occupation');
    expect(laPortalSequence[19].getNextStep({})).toBe('/la-portal/birth-father/address-known');

    expect(laPortalSequence[20].url).toBe('/la-portal/birth-father/address-known');
    expect(laPortalSequence[20].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address-known');
    expect(laPortalSequence[20].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[20].getNextStep({ birthFatherAddressKnown: YesOrNo.YES })).toBe(
      '/la-portal/birth-father/address/lookup'
    );

    expect(laPortalSequence[21].url).toBe('/la-portal/birth-father/address/lookup');
    expect(laPortalSequence[21].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/lookup');
    expect(laPortalSequence[21].getNextStep({})).toBe('/la-portal/birth-father/address/select');

    expect(laPortalSequence[22].url).toBe('/la-portal/birth-father/address/select');
    expect(laPortalSequence[22].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/select');
    expect(laPortalSequence[22].getNextStep({})).toBe('/la-portal/birth-father/last-address-confirmed');

    expect(laPortalSequence[23].url).toBe('/la-portal/birth-father/address/manual');
    expect(laPortalSequence[23].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/manual');
    expect(laPortalSequence[23].getNextStep({})).toBe('/la-portal/birth-father/last-address-confirmed');

    expect(laPortalSequence[24].url).toBe('/la-portal/birth-father/address/international');
    expect(laPortalSequence[24].contentDir).toBe('MOCK_BASE_DIR/../birth-father/address/international');
    expect(laPortalSequence[24].getNextStep({})).toBe('/la-portal/birth-father/last-address-confirmed');

    expect(laPortalSequence[25].url).toBe('/la-portal/birth-father/last-address-confirmed');
    expect(laPortalSequence[25].contentDir).toBe('MOCK_BASE_DIR/../birth-father/last-address-confirmed');
    expect(laPortalSequence[25].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[26].url).toBe('/la-portal/other-parent/exists');
    expect(laPortalSequence[26].contentDir).toBe('MOCK_BASE_DIR/../other-parent/exists');
    expect(laPortalSequence[26].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[26].getNextStep({ otherParentExists: YesOrNo.YES })).toBe(
      '/la-portal/other-parent/full-name'
    );

    expect(laPortalSequence[27].url).toBe('/la-portal/other-parent/full-name');
    expect(laPortalSequence[27].contentDir).toBe('MOCK_BASE_DIR/../other-parent/full-name');
    expect(laPortalSequence[27].getNextStep({})).toBe('/la-portal/other-parent/address-known');

    expect(laPortalSequence[28].url).toBe('/la-portal/other-parent/address-known');
    expect(laPortalSequence[28].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address-known');
    expect(laPortalSequence[28].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[28].getNextStep({ otherParentAddressKnown: YesOrNo.YES })).toBe(
      '/la-portal/other-parent/address/lookup'
    );

    expect(laPortalSequence[29].url).toBe('/la-portal/other-parent/address/lookup');
    expect(laPortalSequence[29].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/lookup');
    expect(laPortalSequence[29].getNextStep({})).toBe('/la-portal/other-parent/address/select');

    expect(laPortalSequence[30].url).toBe('/la-portal/other-parent/address/select');
    expect(laPortalSequence[30].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/select');
    expect(laPortalSequence[30].getNextStep({})).toBe('/la-portal/other-parent/last-address-confirmed');

    expect(laPortalSequence[31].url).toBe('/la-portal/other-parent/address/manual');
    expect(laPortalSequence[31].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/manual');
    expect(laPortalSequence[31].getNextStep({})).toBe('/la-portal/other-parent/last-address-confirmed');

    expect(laPortalSequence[32].url).toBe('/la-portal/other-parent/address/international');
    expect(laPortalSequence[32].contentDir).toBe('MOCK_BASE_DIR/../other-parent/address/international');
    expect(laPortalSequence[32].getNextStep({})).toBe('/la-portal/other-parent/last-address-confirmed');

    expect(laPortalSequence[33].url).toBe('/la-portal/other-parent/last-address-confirmed');
    expect(laPortalSequence[33].contentDir).toBe('MOCK_BASE_DIR/../other-parent/last-address-confirmed');
    expect(laPortalSequence[33].getNextStep({})).toBe('/la-portal/task-list');

    expect(laPortalSequence[34].url).toBe('/la-portal/child/placement-order-type');
    expect(laPortalSequence[34].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-type');
    expect(laPortalSequence[34].getNextStep({})).toBe('/la-portal/child/placement-order-number');

    expect(laPortalSequence[35].url).toBe('/la-portal/child/placement-order-number');
    expect(laPortalSequence[35].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-number');
    expect(laPortalSequence[35].getNextStep({})).toBe('/la-portal/child/placement-order-date');

    expect(laPortalSequence[36].url).toBe('/la-portal/child/placement-order-court');
    expect(laPortalSequence[36].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-court');
    expect(laPortalSequence[36].getNextStep({})).toBe('/la-portal/child/placement-order-date');

    expect(laPortalSequence[37].url).toBe('/la-portal/child/placement-order-date');
    expect(laPortalSequence[37].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-date');
    expect(laPortalSequence[37].getNextStep({})).toBe('/la-portal/child/placement-order-summary');

    expect(laPortalSequence[38].url).toBe('/la-portal/child/placement-order-summary');
    expect(laPortalSequence[38].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-summary');
    expect(laPortalSequence[38].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[38].getNextStep({ addAnotherPlacementOrder: YesOrNo.YES })).toBe(
      '/la-portal/child/placement-order-type?add=1609459200000'
    );

    expect(laPortalSequence[39].url).toBe('/la-portal/child/placement-order-check-your-answers');
    expect(laPortalSequence[39].contentDir).toBe('MOCK_BASE_DIR/../children/placement-order-check-your-answers');
    expect(laPortalSequence[39].getNextStep({})).toBe('/la-portal/child/placement-order-summary');

    expect(laPortalSequence[40].url).toBe('/la-portal/sibling/exists');
    expect(laPortalSequence[40].contentDir).toBe('MOCK_BASE_DIR/../sibling/exists');
    expect(laPortalSequence[40].getNextStep({})).toBe('/la-portal/sibling/relation');
    expect(laPortalSequence[40].getNextStep({ hasSiblings: YesNoNotsure.NO })).toBe('/la-portal/task-list');
    expect(laPortalSequence[40].getNextStep({ hasSiblings: YesNoNotsure.NOT_SURE })).toBe('/la-portal/task-list');
    expect(laPortalSequence[40].getNextStep({ hasSiblings: YesNoNotsure.YES, siblings: [] })).toBe(
      '/la-portal/sibling/relation'
    );
    expect(
      laPortalSequence[41].getNextStep({ hasSiblings: YesNoNotsure.YES, siblings: [{ siblingId: 'MOCK_ID' }] })
    ).toBe('/la-portal/sibling/placement-order-type');

    expect(laPortalSequence[41].url).toBe('/la-portal/sibling/relation');
    expect(laPortalSequence[41].contentDir).toBe('MOCK_BASE_DIR/../sibling/relation');
    expect(laPortalSequence[41].getNextStep({})).toBe('/la-portal/sibling/placement-order-type');

    expect(laPortalSequence[42].url).toBe('/la-portal/sibling/placement-order-type');
    expect(laPortalSequence[42].contentDir).toBe('MOCK_BASE_DIR/../sibling/placement-order-type');
    expect(laPortalSequence[42].getNextStep({})).toBe('/la-portal/sibling/placement-order-number');

    expect(laPortalSequence[43].url).toBe('/la-portal/sibling/placement-order-number');
    expect(laPortalSequence[43].contentDir).toBe('MOCK_BASE_DIR/../sibling/placement-order-number');
    expect(laPortalSequence[43].getNextStep({})).toBe('/la-portal/sibling/summary');

    expect(laPortalSequence[44].url).toBe('/la-portal/sibling/summary');
    expect(laPortalSequence[44].contentDir).toBe('MOCK_BASE_DIR/../sibling/summary');
    expect(laPortalSequence[44].getNextStep({})).toBe('/la-portal/task-list');
    expect(laPortalSequence[44].getNextStep({ addAnotherSiblingPlacementOrder: YesOrNo.YES })).toBe(
      '/la-portal/sibling/relation?add=1609459200000'
    );

    expect(laPortalSequence[45].url).toBe('/la-portal/sibling/placement-order-check-your-answers');
    expect(laPortalSequence[45].contentDir).toBe('MOCK_BASE_DIR/../sibling/placement-order-check-your-answers');
    expect(laPortalSequence[45].getNextStep({})).toBe('/la-portal/sibling/summary');

    expect(laPortalSequence[46].url).toBe('/la-portal/sibling/remove-placement-order');
    expect(laPortalSequence[46].contentDir).toBe('MOCK_BASE_DIR/../sibling/remove-placement-order');
    expect(laPortalSequence[46].getNextStep({})).toBe('/la-portal/sibling/summary');

    expect(laPortalSequence[47].url).toBe('/la-portal/cookies');
    expect(laPortalSequence[47].contentDir).toBe('MOCK_BASE_DIR/../application/cookies');
    expect(laPortalSequence[47].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[48].url).toBe('/la-portal/privacy-policy');
    expect(laPortalSequence[48].contentDir).toBe('MOCK_BASE_DIR/../application/privacy-policy');
    expect(laPortalSequence[48].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[49].url).toBe('/la-portal/accessibility-statement');
    expect(laPortalSequence[49].contentDir).toBe('MOCK_BASE_DIR/../application/accessibility-statement');
    expect(laPortalSequence[49].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[50].url).toBe('/la-portal/terms-and-conditions');
    expect(laPortalSequence[50].contentDir).toBe('MOCK_BASE_DIR/../application/terms-and-conditions');
    expect(laPortalSequence[50].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[51].url).toBe('/la-portal/contact-us');
    expect(laPortalSequence[51].contentDir).toBe('MOCK_BASE_DIR/../application/contact-us');
    expect(laPortalSequence[51].getNextStep({})).toBe('/la-portal/kba-case-ref');

    expect(laPortalSequence[52].url).toBe('/la-portal/la-portal/upload-your-documents');
    expect(laPortalSequence[52].contentDir).toBe('MOCK_BASE_DIR/../la-portal/upload-your-documents');
    expect(laPortalSequence[52].getNextStep({})).toBe('/la-portal/task-list');
  });
});
