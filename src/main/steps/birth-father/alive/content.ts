import { Radios } from '../../common/components/radios';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const enContent = {
  section: SECTION,
  title: "Is the child's birth father still alive?",
};

const cyContent = {
  section: SECTION_IN_WELSH,
  title: "Is the child's birth father still alive? (in Welsh)",
};

const fieldName = 'birthFatherStillAlive';

const values = {
  yes: 'Yes',
  no: 'No',
  unsure: 'Not sure',
};

export const { form, generateContent } = new Radios(enContent, cyContent, fieldName, values);
