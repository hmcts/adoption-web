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
    if (!req.session.userCase.applicant1PcqId) {
      const url = config.get('services.equalityAndDiversity.url');
      const path: string = config.get('services.equalityAndDiversity.path');
      const health = `${url}/health`;

      try {
        const response: AxiosResponse<StatusResponse> = await axios.get(health);
        if (response.data.status && response.data.status === 'UP') {
          req.session.userCase.applicant1PcqId = uuid();
        } else {
          return res.redirect(CHECK_ANSWERS_URL);
        }
      } catch (err) {
        logger.error('Could not connect to PCQ: ', err.message);
        return res.redirect(CHECK_ANSWERS_URL);
      }

      const protocol = req.app.locals.developmentMode ? 'http://' : '';
      const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';

      const params = {
        serviceId: 'NEW_DIVORCE_LAW',
        actor: 'APPLICANT1',
        pcqId: req.session.userCase.applicant1PcqId,
        partyId: req.session.user.email,
        returnUrl: `${protocol}${res.locals.host}${port}${CHECK_ANSWERS_URL}`,
        language: req.session.lang || 'en',
      };

      params['token'] = createToken(params);
      params.partyId = encodeURIComponent(params.partyId);

      try {
        req.session.userCase = await req.locals.api.triggerEvent(
          req.session.userCase.id,
          { applicant1PcqId: req.session.userCase.applicant1PcqId },
          CITIZEN_UPDATE
        );
      } catch (err) {
        req.locals.logger.error('Error updating PCQ ID for Applicant 1', err);
        res.redirect(CHECK_ANSWERS_URL);
      }

      const qs = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(`${url}${path}?${qs}`);
      });
    } else {
      res.redirect(CHECK_ANSWERS_URL);
    }
  }
}

export interface StatusResponse {
  status: 'UP' | 'DOWN' | undefined;
}
