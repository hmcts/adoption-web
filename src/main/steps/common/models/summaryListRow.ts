export type ActionItem = {
  href?: string;
  text: string;
  visuallyHiddenText?: string;
};

export type SummaryListRow = {
  key?: string;
  value: string;
  actions: ActionItem[];
};
