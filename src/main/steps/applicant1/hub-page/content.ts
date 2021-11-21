import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent as jointGenerateContent } from './joint/content';
import { generateContent as columnGenerateContent } from './right-column/content';
import { generateContent as soleGenerateContent } from './sole/content';

const en = ({ isDivorce, userCase, referenceNumber }: CommonContent) => ({
  title: `${userCase?.applicant1FullNameOnCertificate} & ${userCase?.applicant2FullNameOnCertificate}`,
  referenceNumber: `Reference Number: ${referenceNumber}`,
  applicationSubmitted: 'Application submitted',
  response: 'Response',
  conditionalOrderApplication: 'Conditional order application',
  conditionalOrderGranted: 'Conditional order granted',
  finalOrderApplication: 'Final order application',
  applicationEnded: isDivorce ? 'Divorced' : 'Civil partnership ended',
  subHeading1: 'Latest update',
  subHeading2: 'Helpful information',
  line1:
    '<a class="govuk-link" href="https://www.gov.uk/money-property-when-relationship-ends" target="_blank">Find out about dividing money and property</a>',
  whatHappensNext: 'What happens next',
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const referenceNumber = content.userCase?.id?.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  return {
    ...languages[content.language]({ ...content, referenceNumber }),
    ...columnGenerateContent(content),
    ...(content.isJointApplication ? jointGenerateContent(content) : soleGenerateContent(content)),
  };
};
