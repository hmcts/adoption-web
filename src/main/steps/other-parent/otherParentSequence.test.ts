import { YesOrNo } from '../../app/case/definition';
import {
  OTHER_PARENT_ADDRESS_KNOWN,
  OTHER_PARENT_EXISTS,
  OTHER_PARENT_INTERNATIONAL_ADDRESS,
  OTHER_PARENT_MANUAL_ADDRESS,
  OTHER_PARENT_NAME,
  OTHER_PARENT_POSTCODE_LOOKUP,
  OTHER_PARENT_RESPONSIBILITY_GRANTED,
  OTHER_PARENT_VERIFY_ADDRESS,
  TASK_LIST_URL,
} from '../urls';

import { otherParentSequence } from './otherParentSequence';

const [
  isOnCertificate,
  fullName,
  responsibilityGranted,
  isAddressKnown,
  address,
  addressLookUp,
  manualAddress,
  internationalAddress,
] = otherParentSequence;

const otherParent = 'aboutOtherParent';

describe('other parent sequence', () => {
  describe('should have the correct fields for each step', () => {
    it('should be correct for other parent exists', () => {
      const { url, showInSection, getNextStep } = isOnCertificate;

      expect(url).toBe(OTHER_PARENT_EXISTS);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({ otherParentExists: YesOrNo.YES })).toBe(OTHER_PARENT_NAME);
      expect(getNextStep({ otherParentExists: YesOrNo.NO })).toBe(TASK_LIST_URL);
    });

    it('should be correct for fullName', () => {
      const { url, showInSection, getNextStep } = fullName;

      expect(url).toBe(OTHER_PARENT_NAME);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({})).toBe(OTHER_PARENT_RESPONSIBILITY_GRANTED);
    });

    it('should be correct for responsibilityGranted', () => {
      const { url, showInSection, getNextStep } = responsibilityGranted;

      expect(url).toBe(OTHER_PARENT_RESPONSIBILITY_GRANTED);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({})).toBe(OTHER_PARENT_ADDRESS_KNOWN);
    });

    it('should be correct for isAddressKnown', () => {
      const { url, showInSection, getNextStep } = isAddressKnown;

      expect(url).toBe(OTHER_PARENT_ADDRESS_KNOWN);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({ otherParentAddressKnown: YesOrNo.YES })).toBe(OTHER_PARENT_POSTCODE_LOOKUP);
      expect(getNextStep({ otherParentAddressKnown: YesOrNo.NO })).toBe(TASK_LIST_URL);
    });

    it('should be correct for address', () => {
      const { url, showInSection, getNextStep } = address;

      expect(url).toBe(OTHER_PARENT_POSTCODE_LOOKUP);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({})).toBe(OTHER_PARENT_VERIFY_ADDRESS);
    });

    it('should be correct for address verification', () => {
      const { url, showInSection, getNextStep } = addressLookUp;

      expect(url).toBe(OTHER_PARENT_VERIFY_ADDRESS);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({})).toBe(TASK_LIST_URL);
    });

    it('should be correct for manualAddress', () => {
      const { url, showInSection, getNextStep } = manualAddress;

      expect(url).toBe(OTHER_PARENT_MANUAL_ADDRESS);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({})).toBe(TASK_LIST_URL);
    });

    it('should be correct for internationalAddress', () => {
      const { url, showInSection, getNextStep } = internationalAddress;

      expect(url).toBe(OTHER_PARENT_INTERNATIONAL_ADDRESS);
      expect(showInSection).toBe(otherParent);
      expect(getNextStep({})).toBe(TASK_LIST_URL);
    });
  });
});
