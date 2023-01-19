import { AdditionalNationality, OtherName } from '../../../app/case/definition';
import { SummaryListContent } from '../models/summaryListContent';

export const mapSummaryListContent = (
  values: (AdditionalNationality | OtherName)[],
  actionItems: string[],
  path: string
): SummaryListContent => ({
  rows: values.map(v => {
    const text = 'country' in v ? `${v.country}` : `${v.firstNames} ${v.lastNames}`;
    const id = `${v.id}`;
    return {
      key: {
        text,
      },
      actions: {
        items: actionItems.map(actionItem => ({
          href: `${path}?remove=${id}`,
          text: actionItem,
          visuallyHiddenText: text,
        })),
      },
    };
  }),
});
