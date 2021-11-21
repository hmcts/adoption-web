import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import type { CommonContent } from '../../common/common.content';

const en = ({ required }: CommonContent) => ({
  title: 'Were you both last habitually resident in England or Wales and does one of you still live here?',
  line1:
    'For this to apply to you, England or Wales must be where you were both last habitually resident at the same time (but not necessarily as a couple) and one of you must still live here.',
  readMore: 'Read more about habitual residence',
  line2: "If your life is mainly based in England or Wales then you’re what is legally known as 'habitually resident'.",
  line3:
    'This may include working, owning property, having children in school, and your main family life taking place in England or Wales.',
  line4:
    'These examples aren’t a complete list of what makes up habitual residence, and just because some of them apply to you doesn’t mean you’re habitually resident. If you’re not sure, you should get legal advice.',
  errors: {
    bothLastHabituallyResident: {
      required,
    },
  },
});

const cy = ({ required }: CommonContent) => ({
  title:
    "A oedd y ddau ohonoch yn preswylio'n arferol ddiwethaf yng Nghymru neu Loegr ac a yw un ohonoch yn dal i fyw yma?",
  line1:
    "Er mwyn i hyn fod yn berthnasol i chi, rhaid i Gymru neu Loegr fod lle'r oedd y ddau ohonoch yn preswylio'n arferol ddiwethaf ar yr un pryd (ond nid fel cwpl o reidrwydd) ac mae'n rhaid i un ohonoch barhau i fyw yma.",
  readMore: 'Darllenwch fwy am breswylfa arferol',
  line2:
    "Os yw eich bywyd yn bennaf yng Nghymru neu Loegr, yna rydych yn yr hyn a elwir yn gyfreithiol yn 'preswylio'n arferol'.",
  line3:
    'Gall hyn gynnwys gweithio, bod yn berchen ar eiddo, bod â phlant yn yr ysgol, a bod eich prif fywyd teuluol yng Nghymru neu Loegr.',
  line4:
    'Nid yw’r enghreifftiau hyn yn rhestr gynhwysfawr o amgylchiadau sy’n esiamplau o breswylio’n arferol, ac er y gallai rhai ohonynt fod yn berthnasol ichi, nid yw hynny o reidrwydd yn golygu eich bod yn preswylio’n arferol yn rhywle. Dylech gael cyngor cyfreithiol os ydych yn ansicr ynghylch hyn.',
  errors: {
    bothLastHabituallyResident: {
      required,
    },
  },
});

export const form: FormContent = {
  fields: {
    bothLastHabituallyResident: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
