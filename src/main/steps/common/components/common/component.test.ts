/* eslint-disable jest/expect-expect */
import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesNoNotsure } from '../../../../app/case/definition';
import { CommonContent } from '../../common.content';
import { Radios } from '../radios';

const fieldName = 'birthFatherNameOnCertificate';

const enContent = {
  section: 'Section',
  label: "Is the birth father's name on the birth certificate?",
  hint: "Ask the adoption agency or social worker if you're not sure.",
  yes: 'Yes',
  no: 'No',
  unsure: 'Not sure',
  continue: 'Save and continue',
  saveAsDraft: 'Save as draft',
};

const cyContent = {
  section: 'Rhan hon',
  label: 'A yw enw’r tad biolegol ar y dystysgrif geni?',
  hint: 'Gofynnwch i’r asiantaeth fabwysiadu neu’ch gweithiwr cymdeithasol os nad ydych yn siŵr.',
  yes: 'Ydy',
  no: 'Nac ydy',
  unsure: 'Ddim yn siŵr',
  continue: 'Arbed a pharhau',
  saveAsDraft: 'Cadw a drafftio',
};

const values = [
  { key: 'yes', value: YesNoNotsure.YES },
  { key: 'no', value: YesNoNotsure.NO },
  { key: 'unsure', value: YesNoNotsure.NOT_SURE },
];

const { generateContent } = new Radios({
  enContent,
  cyContent,
  fieldName,
  values,
  label: 'label',
  hint: 'hint',
});

describe('steps > common > component', () => {
  it('should return correct English content', () => {
    languageAssertions('en', enContent, () => generateContent({ language: 'en' } as CommonContent));
  });

  it('should return correct Welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ language: 'cy' } as CommonContent));
  });
});
