import { FeatureToggles } from './featureToggle';

export class LaunchDarklyValidationService {
  static checkFeatureFlag(flag: string): string {
    let result = '';
    if (FeatureToggles.isEnabled(flag)) {
      result = 'Feature flag is on';
    } else {
      result = 'Feature flag is off';
    }
    return result;
  }
}
