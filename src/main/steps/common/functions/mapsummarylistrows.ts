export const mapSummaryListRows = (values: string[], actionItems: string[]): Record<string, unknown> => ({
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
