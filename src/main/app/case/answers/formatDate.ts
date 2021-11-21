import dayjs from 'dayjs';

import { isDateInputInvalid } from '../../form/validation';
import type { CaseDate } from '../case';

export const getFormattedDate = (date: CaseDate | undefined): string | false =>
  date && !isDateInputInvalid(date) ? dayjs(Object.values(date).join('-')).format('D MMMM YYYY') : false;
