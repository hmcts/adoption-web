import { Radios } from '../../common/components/radios';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const enContent = {
  section: SECTION,
  label: 'Do you have the birth father’s last known address?',
};

const cyContent = {
  section: SECTION_IN_WELSH,
  label: 'Do you have the birth father’s last known address? (in Welsh)',
};

const fieldName = 'birthFatherAddressKnown';

const values = [
  { key: 'yes', value: 'Yes' },
  { key: 'no', value: 'No' },
];

export const { form, generateContent } = new Radios(enContent, cyContent, fieldName, values);
