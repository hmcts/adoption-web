import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';
import { HOW_DO_YOU_WANT_TO_APPLY, SAVE_AND_SIGN_OUT } from '../../urls';

const en = ({ partner }: CommonContent) => ({
  title: 'You need to get their email address',
  line1: `You need your ${partner}’s email address so they can join this online joint application. You should <a href="${SAVE_AND_SIGN_OUT}">save and sign out</a> and return when you have it.`,
  line2:
    'If you know you will not be able to get their email address and you want to do a joint application, then you need to apply using the <a href="https://www.gov.uk/government/publications/form-d8-application-for-a-divorce-dissolution-or-to-apply-for-a-judicial-separation-order">paper application form</a>.',
  line3: `If you know you will not be able to get their email address and you want to apply online, then you need to <a href="${HOW_DO_YOU_WANT_TO_APPLY}">apply as a sole applicant</a>.`,
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: 'Rydych angen eu cyfeiriad e-bost',
  line1: `Rydych angen cyfeiriad e-bost eich ${partner} er mwyn iddynt allu ymuno â'r cais ar y cyd hwn ar-lein. Dylech <a href="${SAVE_AND_SIGN_OUT}">gadw eich cais ac allgofnodi</a> a dychwelyd ato pan fydd gennych.`,
  line2:
    'Os ydych yn gwybod na fyddwch yn gallu cael eu cyfeiriad e-bost a\'ch bod eisiau gwneud cais ar y cyd, bydd rhaid ichi wneud cais gan ddefnyddio\'r <a href="https://www.gov.uk/government/publications/form-d8-application-for-a-divorce-dissolution-or-to-apply-for-a-judicial-separation-order">ffurflen gais bapur</a>.',
  line3: `Os ydych yn gwybod na fyddwch yn gallu cael eu cyfeiriad e-bost a'ch bod eisiau gwneud cais ar-lein, rhaid ichi wneud cais fel <a href="${HOW_DO_YOU_WANT_TO_APPLY}">ceisydd unigol</a>.`,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
