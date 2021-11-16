
import * as propertiesVolume from '@hmcts/properties-volume';
import { Application } from 'express';
import { get, set } from 'lodash';

const config = require('config');
export class PropertiesVolume {

  enableFor(server: Application): void {
    if (server.locals.ENV !== 'development') {
      const result = propertiesVolume.addTo({});
      console.log(result);
      const result2 = set(config, 'secrets.adoption-kv', { ...get(config, 'secrets.adoption-kv'), ...((result.secrets || {})['adoption-kv'] || {}) });
      console.log(config.secrets);
      console.log(result2);
      this.setSecret('secrets.adoption-kv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

}
