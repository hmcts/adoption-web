import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import { TranslationFn } from '../../../app/controller/GetController';
import type { CommonContent } from '../../common/common.content';

dayjs.extend(advancedFormat);

const en = ({ partner, userCase }: CommonContent) => ({
  title: `Your answers have been sent to your ${partner} to review`,
  sentTo: `Your answers have been sent to your ${partner} at the following email address:`,
  theyShouldReviewBy: 'They should review them and provide some of their own information by',
  reviewDate: userCase?.dueDate || dayjs().add(2, 'weeks').format('MMMM Do YYYY'),
  line3:
    'You will receive a notification when they have reviewed. If they do not review then you will be told what you can do to progress the application.',
});

const cy = ({ partner, userCase }: CommonContent) => ({
  title: `Mae eich atebion wedi'u hanfon at eich ${partner} i'w hadolygu`,
  sentTo: `Mae eich atebion wedi'u hanfon at eich ${partner} i'r cyfeiriad e-bost canlynol:`,
  theyShouldReviewBy: 'Dylent eu hadolygu a darparu eu gwybodaeth eu hunain erbyn',
  reviewDate: userCase?.dueDate || dayjs().add(2, 'weeks').format('MMMM Do YYYY'),
  line3:
    "Fe gewch hysbysiad i'w gadarnhau. Os na fyddant yn adolygu'r atebion yna ddywedir wrthych beth y gallwch ei wneud i symud y cais yn ei flaen.",
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => languages[content.language](content);
