const i18next = require('i18next');
import express from "express";
import config from "config";

const languages: string[] = config.get('languages');

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.query?.locale && languages.includes(`${req.query.locale}`)) {
    res.cookie('locale', req.query.locale);
    i18next.changeLanguage(req.query.locale);
  } else {
    const locale = req.cookies.locale || 'en';
    res.cookie('locale', locale);
    i18next.changeLanguage(req.cookies.language);
  }
  next();
};
