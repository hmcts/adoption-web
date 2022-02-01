import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';

import { CITIZEN_UPDATE } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { CHECK_ANSWERS_URL } from '../../urls';

import { createToken } from './createToken';

const logger = Logger.getLogger('PCQGetController');

@autobind
export default class PCQGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const tokenKey: string = config.get('services.equalityAndDiversity.tokenKey');
    //console.log("index.ts 20 services.equalityAndDiversity.tokenKey: "+tokenKey);

    const url = config.get('services.equalityAndDiversity.url');
    //console.log("index.ts 23 services.equalityAndDiversity.url: "+url);

    if (!req.session.userCase.pcqId && tokenKey && url) {
      const path: string = config.get('services.equalityAndDiversity.path');
      //console.log("index.ts 27 services.equalityAndDiversity.path: "+path);

      const health = `${url}/health`;

      try {
        const response: AxiosResponse<StatusResponse> = await axios.get(health);
        //console.log("index.ts 34 health status: "+response.data.status);

        if (response.data.status && response.data.status === 'UP') {
          req.session.userCase.pcqId = uuid();
          logger.info('PCQ ID: ', req.session.userCase.pcqId);
          //console.log("index.ts 35 pcqid:"+req.session.userCase.pcqId );
        } else {
          return res.redirect(CHECK_ANSWERS_URL);
        }
      } catch (err) {
        logger.error('Could not connect to PCQ: ', err.message);
        return res.redirect(CHECK_ANSWERS_URL);
      }

      const protocol = req.app.locals.developmentMode ? 'http://' : '';
      const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
      //console.log("index.ts 47 protocol: "+protocol+" port: "+port );

      const params = {
        serviceId: 'ADOPTION',
        actor: 'APPLICANT',
        pcqId: req.session.userCase.pcqId,
        partyId: req.session.user.email,
        returnUrl: `${protocol}${res.locals.host}${port}${CHECK_ANSWERS_URL}`,
        language: req.session.lang || 'en',
        ccdCaseId: req.session.userCase.id,
      };

      //console.log("index.ts 59 object: "+JSON.stringify(params) );
      params['token'] = createToken(params, tokenKey);
      params.partyId = encodeURIComponent(params.partyId);
      //console.log("index.ts 66 object: "+JSON.stringify(params) +CITIZEN_UPDATE);

      try {
        req.session.userCase = await req.locals.api.triggerEvent(
          req.session.userCase.id,
          { pcqId: req.session.userCase.pcqId },
          CITIZEN_UPDATE
        );
      } catch (err) {
        req.locals.logger.error('Error updating PCQ ID for Applicant', err);
        //console.log("get.ts 78: url: "+err);
        return res.redirect(CHECK_ANSWERS_URL);
      }
      //url='http://pcq.aat.platform.hmcts.net';
      const qs = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

      req.session.save(err => {
        if (err) {
          //console.log("get.ts 87: error: "+err);
          throw err;
        }
        //console.log("get.ts 89: url: "+`${url}${path}?${qs}`);
        res.redirect(`${url}${path}?${qs}`);
      });
    } else {
      //console.log("get.ts 93: url: "+CHECK_ANSWERS_URL+"case id: "+req.session.userCase.id+"pcq id: "+req.session.userCase.pcqId);
      res.redirect(CHECK_ANSWERS_URL);
    }
  }
}

export interface StatusResponse {
  status: 'UP' | 'DOWN' | undefined;
}
