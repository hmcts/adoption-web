import { Checkbox } from '../../main/app/case/case';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition';
import { jointApplicant1CompleteCase } from '../functional/fixtures/jointApplicant1CompleteCase';

import { iSetTheUsersCaseTo } from './common';

Given('I am reviewing an application for divorce created by my wife', async () => {
  iSetTheUsersCaseTo({
    ...jointApplicant1CompleteCase,
    applicationType: ApplicationType.JOINT_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.FEMALE,
    sameSex: Checkbox.Unchecked,
    applicant1ScreenHasUnionBroken: YesOrNo.YES,
  });
});

Given('I am reviewing an application for divorce created by my husband', async () => {
  iSetTheUsersCaseTo({
    ...jointApplicant1CompleteCase,
    applicationType: ApplicationType.JOINT_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.MALE,
    sameSex: Checkbox.Unchecked,
    applicant1ScreenHasUnionBroken: YesOrNo.YES,
  });
});

Given('I am reviewing an application for dissolution of my civil partnership', async () => {
  iSetTheUsersCaseTo({
    ...jointApplicant1CompleteCase,
    applicationType: ApplicationType.JOINT_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
    gender: Gender.MALE,
    sameSex: Checkbox.Checked,
    applicant1ScreenHasUnionBroken: YesOrNo.YES,
  });
});
