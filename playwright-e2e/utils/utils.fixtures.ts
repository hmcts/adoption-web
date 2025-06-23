import { AxeUtils, IdamUtils } from '@hmcts/playwright-common';

import { CitizenUserUtils } from './citizen-user.utils';

export interface UtilsFixtures {
  idamUtils: IdamUtils;
  citizenUserUtils: CitizenUserUtils;
  axeUtils: AxeUtils;
}

export const utilsFixtures = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, no-empty-pattern
  idamUtils: async ({}, use) => {
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
};
