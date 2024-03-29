import { execSync } from 'child_process';

import * as propertiesVolume from '@hmcts/properties-volume';
import config from 'config';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {
  enableFor(app: Application): void {
    if (!app.locals.developmentMode) {
      propertiesVolume.addTo(config);
      this.setSecret('secrets.adoption.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      this.setSecret('secrets.adoption.idam-secret', 'services.idam.clientSecret');
      this.setSecret('secrets.adoption.idam-system-user-name', 'services.idam.systemUsername');
      this.setSecret('secrets.adoption.idam-system-user-password', 'services.idam.systemPassword');
      this.setSecret('secrets.adoption.redis-access-key', 'session.redis.key');
      this.setSecret('secrets.adoption.redis-access-key', 'session.secret');
      this.setSecret('secrets.adoption.s2s-secret', 'services.authProvider.secret');
      this.setSecret('secrets.adoption.postcode-lookup-token', 'services.postcodeLookup.token');
      this.setSecret('secrets.adoption.adoption-pcq-token', 'services.equalityAndDiversity.tokenKey');
    } else {
      this.setLocalSecret('idam-secret', 'services.idam.clientSecret');
      this.setLocalSecret('s2s-secret', 'services.authProvider.secret');
      this.setLocalSecret('postcode-lookup-token', 'services.postcodeLookup.token');
      this.setLocalSecret('idam-system-user-name', 'services.idam.systemUsername');
      this.setLocalSecret('idam-system-user-password', 'services.idam.systemPassword');
      // this.setLocalSecret('e2e-test-user-password', 'e2e.userTestPassword');
      this.setLocalSecret('adoption-pcq-token', 'services.equalityAndDiversity.tokenKey');
      this.setLocalEndpoints();
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
    const result = execSync(`az keyvault secret show --vault-name adoption-aat -o tsv --query value --name ${secret}`);
    set(config, toPath, result.toString().replace('\n', ''));
  }

  private setLocalEndpoints(): void {
    const result = execSync('az keyvault secret show --vault-name adoption-aat -o tsv --query value --name endpoints');
    const decoded = Buffer.from(result.toString().replace('\n', ''), 'base64');

    const endpoints = JSON.parse(decoded.toString());

    set(config, 'services.authProvider.url', endpoints.s2s);
    set(config, 'services.idam.authorizationURL', endpoints.idamWeb);
    set(config, 'services.idam.tokenURL', endpoints.idamToken);
    // set(config, 'services.case.url', endpoints.ccd);
    set(config, 'services.documentManagement.url', endpoints.dmStore);
    set(config, 'services.feeLookup.url', endpoints.feeRegister);
    set(config, 'services.payments.url', endpoints.payments);
    set(config, 'services.location_api.url', endpoints.location_api);
    set(config, 'services.equalityAndDiversity.url', endpoints.pcq);
    set(config, 'services.cdam.url', endpoints.cdam);
  }
}
