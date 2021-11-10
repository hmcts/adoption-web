import * as appInsights from 'applicationinsights';
const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('customEventTracker');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function trackCustomEvent (eventName: string, trackingProperties: {}) {
  try {
    if (appInsights.defaultClient) {
      appInsights.defaultClient.trackEvent({
        name: eventName,
        properties: trackingProperties
      });
    }
  } catch (err) {
    logger.error(err.stack);
  }
}
