import { SummaryListContent } from '../models/summaryListContent';

export const mapSummaryListContent = (values: string[], actionItems: string[]): SummaryListContent => ({
  rows: values.map(v => ({
    key: {
      text: v,
    },
    actions: {
      items: actionItems.map(actionItem => ({
        href: `/applicant1/other-names?remove=${v}`,
        text: actionItem,
        visuallyHiddenText: v,
      })),
    },
  })),
});
