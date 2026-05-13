/* eslint no-console: 0 */
import { spawnSync } from 'child_process';
import path from 'path';

import config from 'config';
import git from 'git-rev-sync';

if (process.env.PACT_TAG === 'master') {
  console.log('Publishing Pact contract');

  const certPath = path.resolve(__dirname, './ca-bundle.crt');
  console.log('cert path = ' + certPath);
  process.env.SSL_CERT_FILE = certPath;

  const pactDir = path.resolve(process.cwd(), config.get<string>('services.pact.pactDirectory'));
  const brokerUrl = config.get<string>('services.pact.url');
  const version = git.short();
  const tag = config.get<string>('services.pact.tag');

  // Publish via the pact-broker CLI shipped with @pact-foundation/pact-cli
  const pactBrokerBin = require.resolve('@pact-foundation/pact-cli/bin/pact-broker.js');
  const result = spawnSync(
    process.execPath,
    [
      pactBrokerBin,
      'publish',
      pactDir,
      '--broker-base-url',
      brokerUrl,
      '--consumer-app-version',
      version,
      '--tag',
      tag,
    ],
    { stdio: 'inherit' }
  );

  if (result.error) {
    console.log('Pact contract publishing failed: ', result.error);
  } else {
    console.log('Pact contract publishing complete!');
  }
} else {
  console.log('Not publishing Pact contract on non-master branch');
}
