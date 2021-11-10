import * as express from 'express';

import { Paths as AppPaths } from 'paths';

/* tslint:disable:no-default-export */
export default express.Router()
  .get('/', function (req, res) {
    res.redirect(AppPaths.receiver.uri);
  });
