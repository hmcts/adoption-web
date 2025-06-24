import { AxeUtils, IdamUtils } from '@hmcts/playwright-common';

import { CitizenUserUtils } from './citizen-user.utils.ts';

export interface UtilsFixtures {
  idamUtils: IdamUtils;
  citizenUserUtils: CitizenUserUtils;
  axeUtils: AxeUtils;
}

export const utilsFixtures = {
  // eslint-disable-next-line no-empty-pattern
  idamUtils: async ({}, use) => {
    await use(new IdamUtils());
  },
  citizenUserUtils: async ({ idamUtils }, use) => {
    await use(new CitizenUserUtils(idamUtils));
  },
  axeUtils: async ({ page }, use) => {
    await use(new AxeUtils(page));
  },
};
