import { AxeUtils, IdamUtils } from '@hmcts/playwright-common';
import { CitizenUserUtils } from './citizen-user.utils';
import { CaseHelperUtils } from './case-helper.utils';
import { urlConfig } from './urls';
export interface UtilsFixtures {
  idamUtils: IdamUtils;
  citizenUserUtils: CitizenUserUtils;
  axeUtils: AxeUtils;
  caseHelperUtils: CaseHelperUtils;
}

export const utilsFixtures = {
  idamUtils: async ({}, use) => {
    process.env.IDAM_WEB_URL = urlConfig.idam_web_url;
    process.env.IDAM_TESTING_SUPPORT_URL = urlConfig.idam_testing_url;
    process.env.IDAM_S2S_URL = urlConfig.service_auth_url;
    await use(new IdamUtils());
  },
  citizenUserUtils: async ({ idamUtils }, use) => {
    await use(new CitizenUserUtils(idamUtils));
  },
  axeUtils: async ({ page }, use) => {
    await use(new AxeUtils(page));
  },
  caseHelperUtils: async ({ request }, use) => {
    const caseType = 'A58';
    const accessToken = process.env.CREATE_CASE_TOKEN;
    const serviceToken = process.env.S2S_TOKEN;

    if (!accessToken || !serviceToken) {
      throw new Error('Missing ACCESS_TOKEN or SERVICE_TOKEN in environment');
    }

    const helper = new CaseHelperUtils(caseType, accessToken, serviceToken);
    await use(helper);
  },
};
