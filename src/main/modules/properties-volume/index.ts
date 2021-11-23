import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);
      // this.setSecret('secrets.adoption-kv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.adoption-kv.idam-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.adoption-kv.idam-system-user-name', 'services.idam.systemUsername');
      this.setSecret('secrets.adoption-kv.idam-system-user-password', 'services.idam.systemPassword');
      this.setSecret('secrets.adoption-kv.redis-access-key', 'session.redis.key');
      this.setSecret('secrets.adoption-kv.redis-access-key', 'session.secret');
      this.setSecret('secrets.s2s.microservicekey-adoption-web', 'services.authProvider.secret');
    } else {
      this.setLocalSecret('idam-secret', 'services.idam.clientSecret');
      this.setLocalSecret('microservicekey-adoption-web', 'services.authProvider.secret', 's2s-aat');
      // this.setLocalSecret('idam-systemupdate-username', 'services.idam.systemUsername');
      // this.setLocalSecret('idam-systemupdate-password', 'services.idam.systemPassword');
      // this.setLocalSecret('e2e-test-user-password', 'e2e.userTestPassword');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

  /**
   * Load a secret from the AAT vault using azure cli
   */
  private setLocalSecret(secret: string, toPath: string, vaultName = 'adoption-kv-aat'): void {
    const result = execSync(`az keyvault secret show --vault-name ${vaultName} -o tsv --query value --name ${secret}`);

    set(config, toPath, result.toString().replace('\n', ''));
  }
}
