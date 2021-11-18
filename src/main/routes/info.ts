import * as os from 'os';
import * as express from 'express';

import { infoRequestHandler } from '@hmcts/info-provider';

export default express.Router()
  .get('/info', infoRequestHandler({
    extraBuildInfo: {
      host: os.hostname(),
      name: 'adoption-template',
      uptime: process.uptime()
    },
    info: {
      // TODO: add downstream info endpoints if your app has any
    }
  })
  );