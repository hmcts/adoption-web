import { YesOrNo } from '../../../app/case/definition';
import { Radios } from '../../common/components/radios';
import { SECTION, SECTION_IN_WELSH } from '../constants';

const enContent = {
  section: SECTION,
  label: "Is the birth father's name on the birth certificate?",
  hint: "Ask the adoption agency or social worker if you're not sure.",
};

const cyContent = {
  section: SECTION_IN_WELSH,
  label: 'A yw enw’r tad biolegol ar y dystysgrif geni?',
  hint: 'Gofynnwch i’r asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr.',
};

const fieldName = 'birthFatherNameOnCertificate';

const values = [
  { key: 'yes', value: YesOrNo.YES },
  { key: 'no', value: YesOrNo.NO },
];

export const { form, generateContent } = new Radios({
  enContent,
  cyContent,
  fieldName,
  values,
  label: 'label',
  hint: 'hint',
});
