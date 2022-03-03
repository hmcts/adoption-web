import { YesNoNotsure, YesOrNo } from '../../app/case/definition';
import {
  BIRTH_FATHER_ADDRESS_KNOWN,
  BIRTH_FATHER_ADDRESS_LOOKUP,
  BIRTH_FATHER_ADDRESS_SELECT,
  BIRTH_FATHER_FULL_NAME,
  BIRTH_FATHER_INTERNATIONAL_ADDRESS,
  BIRTH_FATHER_MANUAL_ADDRESS,
  BIRTH_FATHER_NAME_ON_CERTIFICATE,
  BIRTH_FATHER_NATIONALITY,
  BIRTH_FATHER_OCCUPATION,
  BIRTH_FATHER_STILL_ALIVE,
  OTHER_PARENT_EXISTS,
  TASK_LIST_URL,
} from '../urls';

import { birthFatherSequence } from './birthFatherSequence';

const [
  isOnCertificate,
  fullName,
  isAlive,
  nationality,
  occupation,
  isAddressKnown,
  addressLookup,
  addressSelect,
  manualAddress,
  internationalAddress,
] = birthFatherSequence;

const aboutChildren = 'aboutChildren';

describe('birth father sequence', () => {
  describe('should have the correct fields for each step', () => {
    it('should be correct for isOnCertificate', () => {
      const { url, showInSection, getNextStep } = isOnCertificate;

      expect(url).toBe(BIRTH_FATHER_NAME_ON_CERTIFICATE);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({ birthFatherNameOnCertificate: YesOrNo.YES })).toBe(BIRTH_FATHER_FULL_NAME);
      expect(getNextStep({ birthFatherNameOnCertificate: YesOrNo.NO })).toBe(OTHER_PARENT_EXISTS);
    });

    it('should be correct for fullName', () => {
      const { url, showInSection, getNextStep } = fullName;

      expect(url).toBe(BIRTH_FATHER_FULL_NAME);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(BIRTH_FATHER_STILL_ALIVE);
    });

    it('should be correct for isAlive', () => {
      const { url, showInSection, getNextStep } = isAlive;

      expect(url).toBe(BIRTH_FATHER_STILL_ALIVE);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({ birthFatherStillAlive: YesNoNotsure.YES })).toBe(BIRTH_FATHER_NATIONALITY);
      expect(getNextStep({ birthFatherStillAlive: YesNoNotsure.NO })).toBe(TASK_LIST_URL);
      expect(getNextStep({ birthFatherStillAlive: YesNoNotsure.NOT_SURE })).toBe(TASK_LIST_URL);
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
      expect(getNextStep({})).toBe(BIRTH_FATHER_ADDRESS_KNOWN);
    });

    it('should be correct for isAddressKnown', () => {
      const { url, showInSection, getNextStep } = isAddressKnown;

      expect(url).toBe(BIRTH_FATHER_ADDRESS_KNOWN);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({ birthFatherAddressKnown: YesOrNo.YES })).toBe(BIRTH_FATHER_ADDRESS_LOOKUP);
      expect(getNextStep({ birthFatherAddressKnown: YesOrNo.NO })).toBe(TASK_LIST_URL);
    });

    it('should be correct for addressLookup', () => {
      const { url, showInSection, getNextStep } = addressLookup;

      expect(url).toBe(BIRTH_FATHER_ADDRESS_LOOKUP);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(BIRTH_FATHER_ADDRESS_SELECT);
    });

    it('should be correct for addressSelect', () => {
      const { url, showInSection, getNextStep } = addressSelect;

      expect(url).toBe(BIRTH_FATHER_ADDRESS_SELECT);
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

      expect(url).toBe(BIRTH_FATHER_INTERNATIONAL_ADDRESS);
      expect(showInSection).toBe(aboutChildren);
      expect(getNextStep({})).toBe(TASK_LIST_URL);
    });
  });
});
