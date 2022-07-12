const { I } = inject();

When('I click to change the answer to {string}', questionText => {
  I.click(`//a/*[contains(text(), '${questionText}')]/..`);
});
