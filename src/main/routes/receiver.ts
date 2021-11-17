import * as express from 'express';

import { Paths as AppPaths } from 'app/paths';
import { Paths as LandingPaths } from 'features/landing/paths';
import { ErrorHandling } from 'common/errorHandling';
import Cookies from 'cookies';
import { AuthToken } from 'app/idam/authToken';
import config from 'config';
import { IdamClient } from 'app/idam/idamClient';
import { buildURL } from 'app/utils/callbackBuilder';
import { JwtExtractor } from 'app/idam/jwtExtractor';
import { RoutablePath } from 'common/router/routablePath';
import { hasTokenExpired } from 'app/idam/authorizationMiddleware';
import { OAuthHelper } from 'app/idam/oAuthHelper';
import { trackCustomEvent } from 'app/logging/customEventTracker';
const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('router/receiver');

const sessionCookie = config.get<string>('session.cookieName');
const stateCookieName = 'state';

async function getOAuthAccessToken(req: express.Request, receiver: RoutablePath): Promise<string> {
  if (req.query.state !== OAuthHelper.getStateCookie(req)) {
    trackCustomEvent('State cookie mismatch (citizen)',
      {
        requestValue: req.query.state,
        cookieValue: OAuthHelper.getStateCookie(req)
      });
  }
  const authToken: AuthToken = await IdamClient.exchangeCode(
    `${req.query.code}`,
    buildURL(req, receiver.uri)
  );
  if (authToken) {
    return authToken.accessToken;
  }
  return Promise.reject();
}

async function getAuthToken(req: express.Request,
  receiver: RoutablePath = AppPaths.receiver,
  checkCookie = true): Promise<string> {
  let authenticationToken;
  if (req.query.code) {
    authenticationToken = await getOAuthAccessToken(req, receiver);
  } else if (checkCookie) {
    authenticationToken = JwtExtractor.extract(req);
  }
  return authenticationToken;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function loginErrorHandler(req: express.Request,
  res: express.Response,
  cookies: Cookies,
  next: express.NextFunction,
  err: Error,
  receiver: RoutablePath = AppPaths.receiver) {
  if (hasTokenExpired(err)) {
    cookies.set(sessionCookie);
    logger.debug(`Protected path - expired auth token - access to ${req.path} rejected`);
    return res.redirect(OAuthHelper.forLogin(req, res, receiver));
  }
  cookies.set(stateCookieName, '');
  return next(err);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function retrieveRedirectForLandingPage(req: express.Request, res: express.Response): Promise<string> {
  // const user: User = res.locals.user;
  return LandingPaths.landingPage.uri;
}

function setAuthCookie(cookies: Cookies, authenticationToken: string): void {
  cookies.set(sessionCookie, authenticationToken);
  cookies.set(stateCookieName, '');
}

/* tslint:disable:no-default-export */
export default express.Router()
  .get(AppPaths.receiver.uri,
    ErrorHandling.apply(async (req: express.Request,
      res: express.Response,
      next: express.NextFunction): Promise<void> => {
      const cookies = new Cookies(req, res);
      let user;
      try {
        const authenticationToken = await getAuthToken(req);
        if (authenticationToken) {
          user = await IdamClient.retrieveUserFor(authenticationToken);
          res.locals.isLoggedIn = true;
          res.locals.user = user;
          setAuthCookie(cookies, authenticationToken);
        }
      } catch (err) {
        return loginErrorHandler(req, res, cookies, next, err);
      }

      if (res.locals.isLoggedIn) {
        res.redirect(await retrieveRedirectForLandingPage(req, res));
      } else {
        if (res.locals.code) {
          trackCustomEvent('Authentication token undefined (jwt defined)',
            { requestValue: req.query.state });
        }
        res.redirect(OAuthHelper.forLogin(req, res));
      }
    }));
