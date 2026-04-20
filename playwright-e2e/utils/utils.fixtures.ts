import { AxeUtils, IdamUtils } from '@hmcts/playwright-common';

import { CaseHelperUtils } from './case-helper.utils';
import { CitizenUserUtils } from './citizen-user.utils';
import { urlConfig } from './urls';
export interface UtilsFixtures {
  idamUtils: IdamUtils;
  citizenUserUtils: CitizenUserUtils;
  axeUtils: AxeUtils;
  caseHelperUtils: CaseHelperUtils;
}

export const utilsFixtures = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,no-empty-pattern
  idamUtils: async ({}, use) => {
    process.env.IDAM_WEB_URL = urlConfig.idam_web_url;
    process.env.IDAM_TESTING_SUPPORT_URL = urlConfig.idam_testing_url;
    process.env.IDAM_S2S_URL = urlConfig.service_auth_url;
    await use(new IdamUtils());
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  citizenUserUtils: async ({ idamUtils }, use) => {
    await use(new CitizenUserUtils(idamUtils));
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  axeUtils: async ({ page }, use) => {
    await use(new AxeUtils(page));
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  caseHelperUtils: async ({ idamUtils }, use) => {
    const caseType = 'A58';
   // const serviceToken = process.env.S2S_TOKEN;

    // if (!serviceToken) {
    //   throw new Error('Missing ACCESS_TOKEN or SERVICE_TOKEN in environment');
    // }

    const helper = new CaseHelperUtils(caseType, idamUtils);
    await use(helper);
  },
};
