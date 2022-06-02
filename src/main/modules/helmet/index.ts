import * as express from 'express';
import { Express, RequestHandler } from 'express';
import helmet = require('helmet');

export interface HelmetConfig {
  referrerPolicy: string;
}

const googleAnalyticsDomain = '*.google-analytics.com';
const tagManager = ['*.googletagmanager.com', 'https://tagmanager.google.com'];
const self = "'self'";

/**
 * Module that enables helmet in the application
 */
export class Helmet {
  constructor(public config: HelmetConfig) {}

  public enableFor(app: Express): void {
    // include default helmet functions
    app.use(helmet() as RequestHandler);

    this.setContentSecurityPolicy(app);
    this.setReferrerPolicy(app, this.config.referrerPolicy);
  }

  private setContentSecurityPolicy(app: express.Express): void {
    const scriptSrc = [
      self,
      ...tagManager,
      googleAnalyticsDomain,
      "'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU='",
      "'sha256-gpnWB3ld/ux/M3KURJluvKNOUQ82MPOtzVeCtqK7gmE='",
      "'sha256-ZjdUCAt//TDpVjTXX+6bDfZNwte/RfSYJDgtfQtaoXs='",
      "'sha256-FooZGzfstFw/L3iO1nVNFoGLxWpFKFVsOpewkb3rIaU='",
    ];

    const connectSrc = [self, googleAnalyticsDomain];
    const imgSrc = [
      self,
      ...tagManager,
      googleAnalyticsDomain,
      'data:',
      'https://ssl.gstatic.com',
      'https://www.gstatic.com',
    ];
    if (app.locals.developmentMode) {
      scriptSrc.push("'unsafe-eval'");
    }

    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          connectSrc,
          defaultSrc: ["'none'"],
          fontSrc: [self, 'data:'],
          imgSrc,
          objectSrc: [self],
          scriptSrc,
          styleSrc: [self, ...tagManager, "'unsafe-inline'", 'https://fonts.googleapis.com'],
        },
      }) as RequestHandler
    );
  }

  private setReferrerPolicy(app: express.Express, policy: string): void {
    if (!policy) {
      throw new Error('Referrer policy configuration is required');
    }

    app.use(helmet.referrerPolicy({ policy }) as RequestHandler);
  }
}
