import { Application } from 'express';
const i18next = require('i18next');

export default function(app: Application): void {

  app.get('/', (req, res) => {
      res.render('home')
  });

  app.get('/make-a-new-claim', (req, res) =>{
    res.render('makenewclaim');
  });

  app.get('/claim', (req, res) =>{
    res.render('claim');
  });

  app.get('*', (req, res, next) => {
    const locale = req.cookies.language;
      if (!locale){
        req.cookies.language = 'cy';
    } else if (req.query && req.query.lng && languages.includes(req.query.lng)) {
      req.cookies.language = req.query.lng;
      i18next.changeLanguage(req.query.lng);
    } else {
      i18next.changeLanguage(req.cookies.language);
    }
  
    next();
  });
}
