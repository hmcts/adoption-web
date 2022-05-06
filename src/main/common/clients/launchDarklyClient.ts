import config from 'config';
import * as ld from 'ldclient-node';

import { UserDetails as User } from '../../app/controller/AppRequest';

const sdkKey: string = config.get<string>('secrets.adoption.launchDarkly-sdk-key');
const ldConfig = {
  offline: config.get<boolean>('launchDarkly.offline'),
};

export class LaunchDarklyClient {
  private static client: ld.LDClient;

  constructor() {
    LaunchDarklyClient.initClient();
  }

  static initClient(): void {
    if (!LaunchDarklyClient.client) {
      LaunchDarklyClient.client = ld.init(sdkKey, ldConfig);
    }
  }

  async userVariation(
    user: User,
    roles: string[],
    featureKey: string,
    offlineDefault: string
  ): Promise<ld.LDFlagValue> {
    const ldUser: ld.LDUser = {
      key: user.id,
      custom: {
        roles,
      },
    };
    return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
  }

  async serviceVariation(featureKey: string, offlineDefault: string): Promise<ld.LDFlagValue> {
    const roles: string[] = [];
    const ldUser: ld.LDUser = {
      key: 'test-adoption-frontend',
      custom: {
        roles,
      },
    };
    return LaunchDarklyClient.client.variation(featureKey, ldUser, offlineDefault);
  }
}
