import { Checkbox } from '../../main/app/case/case';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition';

import { iSetTheUsersCaseTo } from './common';

const { I } = inject();

Given("I've completed enough questions correctly to get to the check your answers page", async () => {
  iSetTheUsersCaseTo({
    applicationType: ApplicationType.SOLE_APPLICATION,
    applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
    certificateInEnglish: YesOrNo.NO,
    hasCertificate: YesOrNo.YES,
    applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.MALE,
    inTheUk: YesOrNo.NO,
    applicant1ScreenHasUnionBroken: YesOrNo.YES,
    certifiedTranslation: YesOrNo.YES,
    applicant1HelpPayingNeeded: YesOrNo.YES,
    ceremonyCountry: 'Mozambique',
    'relationshipDate-day': 31,
    'relationshipDate-month': 12,
    'relationshipDate-year': 1999,
    sameSex: Checkbox.Unchecked,
    ceremonyPlace: 'Maputo',
  });
});

Given(
  "I've completed enough questions correctly to get to the check your answers page as a joint applicant",
  async () => {
    iSetTheUsersCaseTo({
      applicationType: ApplicationType.JOINT_APPLICATION,
      applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
      certificateInEnglish: YesOrNo.NO,
      hasCertificate: YesOrNo.YES,
      applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
      divorceOrDissolution: DivorceOrDissolution.DIVORCE,
      gender: Gender.MALE,
      inTheUk: YesOrNo.NO,
      applicant1ScreenHasUnionBroken: YesOrNo.YES,
      certifiedTranslation: YesOrNo.YES,
      applicant1HelpPayingNeeded: YesOrNo.YES,
      ceremonyCountry: 'Mozambique',
      'relationshipDate-day': 31,
      'relationshipDate-month': 12,
      'relationshipDate-year': 1999,
      sameSex: Checkbox.Unchecked,
      ceremonyPlace: 'Maputo',
    });
  }
);

When('I click to change the answer to {string}', questionText => {
  I.click(`//a/*[contains(text(), '${questionText}')]/..`);
});
