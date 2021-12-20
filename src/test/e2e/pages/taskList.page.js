const config = require('../config');
const { I } = inject();

module.exports = {
  firstApplicant: {
    personalDetailsLink: '#applicant1-personal-details',
  },
  secondApplicant: {
    contactDetailsLink: 'a[href="/applicant2/same-address"]',
  },

  async goToTaskListPage() {
    await I.goToPage(config.baseUrl + 'task-list');
  },
  async selectTaskNameFromTaskList(taskName) {
    await I.click(taskName);
  },

  async selectOtherApplicantContactDetails() {
    await I.click(this.secondApplicant.contactDetailsLink);
  },

  async selectFirstApplicantPersonalDetails() {
    await I.click(this.firstApplicant.personalDetailsLink);
  },
};
