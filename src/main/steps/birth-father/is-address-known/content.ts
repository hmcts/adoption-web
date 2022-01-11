import { Radios } from '../../../steps/common/components/radios';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const enContent = {
  section: SECTION,
  title: 'Do you have the birth father’s last known address?',
};

const cyContent = {
  section: SECTION_IN_WELSH,
  title: 'Do you have the birth father’s last known address? (in Welsh)',
};

const fieldName = 'birthFatherAddressKnown';

const values = {
  yes: 'Yes',
  no: 'No',
};

export const { form, generateContent } = new Radios(enContent, cyContent, fieldName, values);
