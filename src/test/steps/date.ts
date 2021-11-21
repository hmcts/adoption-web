import { iClick } from './common';

const { I } = inject();

const enterDate = (day: string, month: string, year: string) => {
  iClick('Day');
  I.type(day);
  iClick('Month');
  I.type(month);
  iClick('Year');
  I.type(year);
};

/** Setting the date to the first due to different months having different total number of days **/
Given(/I enter a date (\d+) (?:month|months) ago/, (month: string) => {
  const date = new Date();
  date.setDate(1);
  date.getMonth() - +month === 0 ? date.setMonth(1) : date.setMonth(date.getMonth() - +month);
  enterDate(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString());
});

Given(/I enter a date (\d+) (?:year|years) ahead/, (year: string) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + +year);
  enterDate(date.getDate().toString(), date.getMonth().toString(), date.getFullYear().toString());
});
