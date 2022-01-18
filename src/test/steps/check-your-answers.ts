import { ApplicationType, YesOrNo } from '../../main/app/case/definition';

import { iSetTheUsersCaseTo } from './common';

const { I } = inject();

Given("I've completed enough questions correctly to get to the check your answers page", async () => {
  iSetTheUsersCaseTo({
    applicationType: ApplicationType.SOLE_APPLICATION,
    applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
    applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
    applicant1HelpPayingNeeded: YesOrNo.YES,
  });
});

Given(
  "I've completed enough questions correctly to get to the check your answers page as a joint applicant",
  async () => {
    iSetTheUsersCaseTo({
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
      applicant1HelpPayingNeeded: YesOrNo.YES,
    });
  }
);

When('I click to change the answer to {string}', questionText => {
  I.click(`//a/*[contains(text(), '${questionText}')]/..`);
});
