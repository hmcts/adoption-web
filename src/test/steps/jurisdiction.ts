import { Checkbox } from '../../main/app/case/case';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition';

import { iSetTheUsersCaseTo } from './common';

Given("I've completed all questions correctly to get to the jurisdiction section", async () => {
  iSetTheUsersCaseTo({
    applicationType: ApplicationType.SOLE_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.MALE,
    hasCertificate: YesOrNo.YES,
    applicant1HelpPayingNeeded: YesOrNo.NO,
    inTheUk: YesOrNo.YES,
    'relationshipDate-day': 31,
    'relationshipDate-month': 12,
    'relationshipDate-year': 1999,
    sameSex: Checkbox.Unchecked,
    applicant1ScreenHasUnionBroken: YesOrNo.YES,
    applicant1FirstNames: 'Functional',
    applicant1LastNames: 'Tests',
    applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
    applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
  });
});
