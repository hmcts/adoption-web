import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);

      this.setSecret('secrets.adoption-kv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.adoption-kv.redis-access-key', 'session.redis.key');
      this.setSecret('secrets.adoption-kv.redis-access-key', 'session.secret');
      this.setSecret('secrets.adoption-kv.idam-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.adoption-kv.frontend-secret', 'services.authProvider.secret');
      this.setSecret('secrets.adoption-kv.os-places-token', 'services.postcodeLookup.token');
      this.setSecret('secrets.adoption-kv.idam-systemupdate-username', 'services.idam.systemUsername');
      this.setSecret('secrets.adoption-kv.idam-systemupdate-password', 'services.idam.systemPassword');
      this.setSecret('secrets.adoption-kv.pcq-token-key', 'services.equalityAndDiversity.tokenKey');
    } else {
      this.setLocalSecret('idam-secret', 'services.idam.clientSecret');
      // this.setLocalSecret('frontend-secret', 'services.authProvider.secret');
      // this.setLocalSecret('os-places-token', 'services.postcodeLookup.token');
      // this.setLocalSecret('idam-systemupdate-username', 'services.idam.systemUsername');
      // this.setLocalSecret('idam-systemupdate-password', 'services.idam.systemPassword');
      // this.setLocalSecret('e2e-test-user-password', 'e2e.userTestPassword');
      // this.setLocalSecret('pcq-token-key', 'services.equalityAndDiversity.tokenKey');
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
  private setLocalSecret(secret: string, toPath: string): void {
    const result = execSync(
      'az keyvault secret show --vault-name adoption-kv-aat -o tsv --query value --name ' + secret
    );

    set(config, toPath, result.toString().replace('\n', ''));
  }
}
