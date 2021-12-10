export const mapSummaryListRows = (values: string[], actionItems: string[]): Record<string, unknown> => ({
  rows: values.map(v => ({
    value: {
      text: v,
    },
    actions: {
      items: actionItems.map(actionItem => ({
        href: '#',
        text: actionItem,
      })),
    },
  })),
});
