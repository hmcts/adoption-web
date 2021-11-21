import config from 'config';
import dayjs from 'dayjs';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { generateContent as columnGenerateContent } from '../hub-page/right-column/content';

const en = ({ isDivorce, marriage, civilPartnership, partner, userCase }: CommonContent) => ({
  title: `How to proceed with ${isDivorce ? 'your divorce' : 'ending your civil partnership'}`,
  line1: `The court usually needs to hear from both parties in a ${
    isDivorce ? marriage : civilPartnership
  } before it can
   ${
     isDivorce ? 'grant a divorce' : 'end a civil partnership'
   }. It’s therefore important that your ${partner} responds to your application.`,
  line2: `The simplest way to proceed is for you to contact your ${partner} and ask them to respond, if it’s safe to do so.
  They can still respond, even though the deadline has passed.`,
  line3:
    'If they still do not respond then you can choose one of the following options to progress your application, depending on your situation.',
  anotherEmailAddress: `I have another email address or postal address for my ${partner}`,
  emailButNotPostal: 'I have their email address but not their postal address',
  needToSearchForAddress: `I need to search government records for my ${partner}'s postal address`,
  alternativeService: `${config.get('fees.alternativeService')}`,
  searchForAddress: `${config.get('fees.searchForAddress')}`,
  courtBailiffService: `${config.get('fees.courtBailiffService')}`,
  deemedService: `${config.get('fees.deemedService')}`,
  dispensedService: `${config.get('fees.dispensedService')}`,
  thinkPartnerChoosingNotToRespond: `I think my ${partner} is receiving the application but is choosing not to respond`,
  evidencePartnerNotResponded: `I have evidence that my ${partner} has received the application, but will not or cannot respond`,
  triedEveryWayToDeliver: "I've tried every possible way of delivering the application",
  dueDate: `${dayjs(userCase?.issueDate).add(28, 'day').format('D MMMM YYYY')}`,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    ...columnGenerateContent(content),
    form,
  };
};
