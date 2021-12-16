import { SummaryListContent } from '../models/summaryListContent';

export const mapSummaryListContent = (values: string[], actionItems: string[], path: string): SummaryListContent => ({
  rows: values.map(v => ({
    key: {
      text: v,
    },
    actions: {
      items: actionItems.map(actionItem => ({
        href: `${path}?remove=${v}`,
        text: actionItem,
        visuallyHiddenText: v,
      })),
    },
  })),
});
