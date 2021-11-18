import * as applicationInsights from 'applicationinsights';
const config = require('config');

export const enable = (): void => {
  const iKey = config.get('appInsights.instrumentationKey');
  applicationInsights.setup(iKey).setAutoCollectConsole(true, true)
    .setDistributedTracingMode(applicationInsights.DistributedTracingModes.AI_AND_W3C)
    .setSendLiveMetrics(true);
  applicationInsights
    .defaultClient
    .context
    .tags[applicationInsights.defaultClient.context.keys.cloudRole] = config.get('appInsights.roleName');
  applicationInsights.start();
};

