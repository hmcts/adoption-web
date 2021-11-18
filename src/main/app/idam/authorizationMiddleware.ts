import * as express from 'express';
import config from 'config';
import * as HttpStatus from 'http-status-codes';
import Cookies from 'cookies';

import { JwtExtractor } from './jwtExtractor';
import { IdamClient } from './idamClient';
import { User } from './user';
const { Logger } = require('@hmcts/nodejs-logging');

const sessionCookieName = config.get<string>('session.cookieName');

const logger = Logger.getLogger('middleware/authorization');

/**
 * IDAM doesn't tell us what is wrong
 * But most likely if we get 401 or 403 then the user's token has expired
 * So make them login again
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
export function hasTokenExpired(err: any) {
  return (err.statusCode === HttpStatus.FORBIDDEN || err.statusCode === HttpStatus.UNAUTHORIZED);
}

export class AuthorizationMiddleware {

  static requestHandler(requiredRoles: string[], accessDeniedCallback: (req: express.Request, res: express.Response) => void, unprotectedPaths: string[] = []): express.RequestHandler {
    function isPathUnprotected(path: string): boolean {
      return unprotectedPaths.some((unprotectedPath: string) => unprotectedPath === path);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const jwt: string = JwtExtractor.extract(req);

      if (isPathUnprotected(req.path)) {
        logger.debug(`Unprotected path - access to ${req.path} granted`);
        return next();
      }

      if (!jwt) {
        logger.debug(`Protected path - no JWT - access to ${req.path} rejected`);
        return accessDeniedCallback(req, res);
      } else {
        IdamClient
          .retrieveUserFor(jwt)
          .then((user: User) => {
            if (!user.isInRoles(...requiredRoles)) {
              logger.error(`Protected path - valid JWT but user not in ${requiredRoles} roles - redirecting to access denied page`);
              return accessDeniedCallback(req, res);
            } else {
              res.locals.isLoggedIn = true;
              // setting isFirstContactPath = true to remove the signout and the My Account link in the 'first-contact/claim-summary' page
              if (req.url === '/first-contact/claim-summary') {
                res.locals.isFirstContactPath = true;
              } else {
                res.locals.isFirstContactPath = false;
              }
              res.locals.user = user;
              logger.debug(`Protected path - valid JWT & role - access to ${req.path} granted`);
              return next();
            }
          })
          .catch((err) => {
            if (hasTokenExpired(err)) {
              const cookies = new Cookies(req, res);
              cookies.set(sessionCookieName, '');
              logger.debug(`Protected path - invalid JWT - access to ${req.path} rejected`);
              return accessDeniedCallback(req, res);
            }
            return next(err);
          });
      }
    };
  }
}
