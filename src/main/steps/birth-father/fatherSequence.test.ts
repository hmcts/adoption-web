import { YesNoUnsure, YesOrNo } from '../../app/case/definition';
import {
  BIRTH_FATHER_ADDRESS,
  BIRTH_FATHER_FULL_NAME,
  BIRTH_FATHER_IS_ADDRESS_KNOWN,
  BIRTH_FATHER_IS_ALIVE,
  BIRTH_FATHER_IS_NAME_ON_CERTIFICATE,
  BIRTH_FATHER_MANUAL_ADDRESS,
  BIRTH_FATHER_MANUAL_INTERNATIONAL_ADDRESS,
  BIRTH_FATHER_NATIONALITY,
  BIRTH_FATHER_OCCUPATION,
  OTHER_PARENT_IS_ANOTHER_RESPONSIBLE,
  TASK_LIST_URL,
} from '../urls';

import { birthFatherSequence } from './fatherSequence';

const [
  isOnCertificate,
  fullName,
  isAlive,
  nationality,
  occupation,
  isAddressKnown,
  address,
  manualAddress,
  internationalAddress,
] = birthFatherSequence;

const aboutChildren = 'aboutChildren';

describe('birth father sequence', () => {
  describe('should have the correct fields for each step', () => {
    it('should be correct for isOnCertificate', () => {
      const { url, showInSection, getNextStep } = isOnCertificate;

      expect(url).toBe(BIRTH_FATHER_IS_NAME_ON_CERTIFICATE);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({ isFathersNameOnCertificate: YesOrNo.YES })).toBe(BIRTH_FATHER_FULL_NAME);
      expect(getNextStep({ isFathersNameOnCertificate: YesOrNo.NO })).toBe(OTHER_PARENT_IS_ANOTHER_RESPONSIBLE);
    });

    it('should be correct for fullName', () => {
      const { url, showInSection, getNextStep } = fullName;

      expect(url).toBe(BIRTH_FATHER_FULL_NAME);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(BIRTH_FATHER_IS_ALIVE);
    });

    it('should be correct for isAlive', () => {
      const { url, showInSection, getNextStep } = isAlive;

      expect(url).toBe(BIRTH_FATHER_IS_ALIVE);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({ isFatherStillAlive: YesNoUnsure.YES })).toBe(BIRTH_FATHER_NATIONALITY);
      expect(getNextStep({ isFatherStillAlive: YesNoUnsure.NO })).toBe(TASK_LIST_URL);
      expect(getNextStep({ isFatherStillAlive: YesNoUnsure.UNSURE })).toBe(TASK_LIST_URL);
    });

    it('should be correct for nationality', () => {
      const { url, showInSection, getNextStep } = nationality;

      expect(url).toBe(BIRTH_FATHER_NATIONALITY);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(BIRTH_FATHER_OCCUPATION);
    });

    it('should be correct for occupation', () => {
      const { url, showInSection, getNextStep } = occupation;

      expect(url).toBe(BIRTH_FATHER_OCCUPATION);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(BIRTH_FATHER_IS_ADDRESS_KNOWN);
    });

    it('should be correct for isAddressKnown', () => {
      const { url, showInSection, getNextStep } = isAddressKnown;

      expect(url).toBe(BIRTH_FATHER_IS_ADDRESS_KNOWN);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({ isFathersAddressKnown: YesOrNo.YES })).toBe(BIRTH_FATHER_ADDRESS);
      expect(getNextStep({ isFathersAddressKnown: YesOrNo.NO })).toBe(TASK_LIST_URL);
    });

    it('should be correct for address', () => {
      const { url, showInSection, getNextStep } = address;

      expect(url).toBe(BIRTH_FATHER_ADDRESS);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(TASK_LIST_URL);
    });

    it('should be correct for manualAddress', () => {
      const { url, showInSection, getNextStep } = manualAddress;

      expect(url).toBe(BIRTH_FATHER_MANUAL_ADDRESS);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(TASK_LIST_URL);
    });

    it('should be correct for internationalAddress', () => {
      const { url, showInSection, getNextStep } = internationalAddress;

      expect(url).toBe(BIRTH_FATHER_MANUAL_INTERNATIONAL_ADDRESS);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(TASK_LIST_URL);
    });
  });
});
