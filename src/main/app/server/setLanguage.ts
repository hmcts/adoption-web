const router = require('express').Router();
const i18next = require('i18next');
const cookieParser = require ('cookie-parser');
const languages = require('config').languages;

router.get('*', (req, res, next) => {
    if (!req.cookies.language){
      req.cookies.language = 'en';
  } else if (req.query && req.query.lng && languages.includes(req.query.lng)) {
    req.cookies.language = req.query.lng;
    i18next.changeLanguage(req.query.lng);
  } else {
    i18next.changeLanguage(req.cookies.language);
  }

  next();
});

module.exports = router;
