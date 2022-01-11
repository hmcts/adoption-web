import { Radios } from '../../../steps/common/components/radios';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const enContent = {
  section: SECTION,
  title: "Is the birth father's name on the birth certificate?",
  hint: "Ask the adoption agency or social worker if you're not sure.",
};

const cyContent = {
  section: SECTION_IN_WELSH,
  title: "Is the birth father's name on the birth certificate? (in Welsh)",
  hint: "Ask the adoption agency or social worker if you're not sure. (in Welsh)",
};

const fieldName = 'birthFathersNameOnCertificate';

const values = {
  yes: 'Yes',
  no: 'No',
};

export const { form, generateContent } = new Radios(enContent, cyContent, fieldName, values);
