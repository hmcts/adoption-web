import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ isDivorce, required }) => ({
  title: isDivorce
    ? 'Do you have your marriage certificate with you?'
    : 'Do you have your civil partnership certificate with you?',
  line1:
    'You’ll be asked to upload a digital photo of the certificate later in this application. You can use your phone to take the picture, if it has a camera.',
  line2: `It must be a photo of the original ${
    isDivorce ? 'marriage certificate' : 'civil partnership certificate'
  } or a certified copy. You can <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">order a certified copy online (opens in a new tab)</a>, if you ${
    isDivorce ? 'got married' : 'formed your civil partnership'
  } in England or Wales.`,
  line3:
    'If the original certificate is not in English, you’ll need to provide a <a href="https://www.gov.uk/certifying-a-document#certifying-a-translation" class="govuk-link">certified translation</a>.',
  yes: `Yes, I have my ${isDivorce ? 'marriage certificate' : 'civil partnership certificate'}`,
  no: `No, I do not have ${isDivorce ? 'marriage certificate' : 'civil partnership certificate'}`,
  errors: {
    hasCertificate: { required },
  },
});

const cy: typeof en = ({ isDivorce, required }) => ({
  title: `A yw eich ${isDivorce ? 'tystysgrif priodas' : 'tystysgrif partneriaeth sifil'} gennych yn awr?`,
  line1:
    "Gofynnir i chi lwytho llun digidol o'r dystysgrif yn ddiweddarach yn y cais hwn. Gallwch ddefnyddio'ch ffôn i dynnu'r llun, os oes ganddo gamera.",
  line2: `Rhaid iddo fod yn llun o'r ${
    isDivorce ? 'dystysgrif priodas' : 'dystysgrif partneriaeth sifil'
  } wreiddiol neu gopi ardystiedig ohoni. <a href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" class="govuk-link" target="_blank">Gallwch archebu copi ardystiedig ar-lein (agor mewn tab newydd)</a>, os wnaethoch chi ${
    isDivorce ? 'briodi' : 'ffurfio eich partneriaeth sifil'
  } yng Nghymru neu Loegr.`,
  line3:
    'Os nad yw\'r dystysgrif wreiddiol yn Saesneg, bydd angen i chi ddarparu <a href="https://www.gov.uk/certifying-a-document#certifying-a-translation" class="govuk-link">cyfieithiad ardystiedig</a>.',
  yes: `Oes, mae gen i fy ${isDivorce ? 'nystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`,
  no: `Na, nid oes gennyf ${isDivorce ? 'dystysgrif priodas' : 'tystysgrif partneriaeth sifil'}`,
  errors: {
    hasCertificate: { required },
  },
});

export const form: FormContent = {
  fields: {
    hasCertificate: {
      type: 'radios',
      classes: 'govuk-radios',
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
