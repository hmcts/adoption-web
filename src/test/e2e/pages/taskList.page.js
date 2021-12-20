const config = require('../config');
const { I } = inject();

module.exports = {
  secondApplicant: {
    contactDetailsLink: 'a[href="/applicant2/same-address"]',
    childrenPlacementOrderLink: 'a[id$="children-placement-order"]',
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

  async selectChildPlacementOrderDetails() {
    await I.click(this.secondApplicant.childrenPlacementOrderLink);
  },
};
