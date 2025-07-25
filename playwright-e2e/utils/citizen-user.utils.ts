import { IdamUtils } from '@hmcts/playwright-common';
import { v4 as uuidv4 } from 'uuid';
import { getAccessToken } from '../helpers/idamTestApiHelpers';

type UserInfo = {
  id: string;
  email: string;
  password: string;
  forename: string;
  surname: string;
  sessionFile?: string;
};

export class CitizenUserUtils {
  constructor(private idamUtils: IdamUtils) {}

  async createUser(): Promise<UserInfo> {
    const token = await getAccessToken();
    const password = process.env.IDAM_CITIZEN_USER_PASSWORD as string;
    const uniqueId = uuidv4();

    const email = `TEST_ADOPTION_USER_citizen.${uniqueId}@test.local`;
    const forename = 'fn_' + uniqueId.split('-')[0];
    const surname = 'sn_' + uniqueId.split('-')[1];

    const user = await this.idamUtils.createUser({
      bearerToken: token? token: '',
      password,
      user: {
        email,
        forename,
        surname,
        roleNames: ['citizen'],
      },
    });
    if (process.env.PWDEBUG) {
      console.log(user);
    }

    return {
      id: user.id,
      email: user.email,
      password: user.password,
      forename,
      surname,
    };
  }
}
