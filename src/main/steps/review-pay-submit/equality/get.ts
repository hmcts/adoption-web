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
    const url = config.get('services.equalityAndDiversity.url');
    console.log(config);
    if (!req.session.userCase.pcqId && tokenKey && url) {
      const path: string = config.get('services.equalityAndDiversity.path');
      const health = `${url}/health`;
      try {
        const response: AxiosResponse<StatusResponse> = await axios.get(health);

        if (response.data.status && response.data.status === 'UP') {
          req.session.userCase.pcqId = uuid();
          logger.info(`PCQ service: ${health} is UP, PCQ ID: ${req.session.userCase.pcqId}`);
        } else {
          logger.error(`PCQ service: ${health} is down`);
          return res.redirect(CHECK_ANSWERS_URL);
        }
      } catch (err) {
        logger.error(`Could not connect to PCQ service: ${health}`, err.message);
        return res.redirect(CHECK_ANSWERS_URL);
      }
      const protocol = req.app.locals.developmentMode ? 'http://' : '';
      const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';

      const params = {
        serviceId: 'ADOPTION',
        actor: 'APPLICANT',
        pcqId: req.session.userCase.pcqId,
        partyId: req.session.user.email,
        returnUrl: `${protocol}${res.locals.host}${port}${CHECK_ANSWERS_URL}`,
        language: req.session.lang || 'en',
        ccdCaseId: req.session.userCase.id,
      };

      logger.info(`PCQ service return URL: ${params.returnUrl}`);

      params['token'] = createToken(params, tokenKey);
      params.partyId = encodeURIComponent(params.partyId);

      try {
        req.session.userCase = await req.locals.api.triggerEvent(
          req.session.userCase.id,
          { pcqId: req.session.userCase.pcqId },
          CITIZEN_UPDATE
        );
      } catch (err) {
        req.locals.logger.error('Error updating PCQ ID for Applicant', err);
        return res.redirect(CHECK_ANSWERS_URL);
      }
      const qs = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

      req.session.save(err => {
        if (err) {
          req.locals.logger.error('Error', err);
          throw err;
        }
        logger.info(`PCQ service redirect URL: ${url}${path}?${qs}`);
        res.redirect(`${url}${path}?${qs}`);
      });
    } else {
      res.redirect(CHECK_ANSWERS_URL);
      logger.info('User already attempted for PCQ: ', req.session.userCase.pcqId);
    }
  }
}

export interface StatusResponse {
  status: 'UP' | 'DOWN' | undefined;
}
