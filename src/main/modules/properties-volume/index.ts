import config from 'config';
import * as propertiesVolume from '@hmcts/properties-volume';
import { Application } from 'express';
import { get, set } from 'lodash';

export class PropertiesVolume {

  enableFor(server: Application): void {
    if (server.locals.ENV !== 'development') {
      const result = propertiesVolume.addTo({});
      console.log(result);
      this.setSecret('secrets.adoption-kv.AppInsightsInstrumentationKey', 'appInsights.instrumentationKey');
      
    }
  }

  private setSecret(fromPath: string, toPath: string): void {
    if (config.has(fromPath)) {
      set(config, toPath, get(config, fromPath));
    }
  }

}
