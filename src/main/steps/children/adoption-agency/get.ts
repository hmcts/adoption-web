import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class AdoptionAgencyGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const adopAgencyOrLAs = req.session.userCase.adopAgencyOrLAs || [];

    let redirect = false;
    if (req.query.add) {
      console.log('req.query.add 14: ' + req.query.add);
      req.session.userCase.selectedAdoptionAgencyId = `${req.query.add}`;
      req.session.userCase.hasAnotherAdopAgencyOrLA = undefined;
      delete req.query.add;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      redirect = true;
    } else if (req.query.change) {
      req.session.userCase.selectedAdoptionAgencyId = `${req.query.change}`;
      delete req.query.change;
      req.url = req.url.substring(0, req.url.indexOf('?'));
      redirect = true;
    } else if (
      !req.session.userCase.selectedAdoptionAgencyId ||
      req.session.userCase.selectedAdoptionAgencyId === 'undefined'
    ) {
      //generate random id for adoption agency if there are no adoption agency
      req.session.userCase.selectedAdoptionAgencyId = adopAgencyOrLAs[0]?.adopAgencyOrLaId || `${Date.now()}`;
    }
    console.log('get 38 ' + req.session.userCase.selectedAdoptionAgencyId);
    let adopAgency = adopAgencyOrLAs.find(
      item => item.adopAgencyOrLaId === req.session.userCase.selectedAdoptionAgencyId
    );

    if (!adopAgency) {
      adopAgency = {
        adopAgencyOrLaId: req.session.userCase.selectedAdoptionAgencyId,
      };

      adopAgencyOrLAs.push(adopAgency);
    }

    req.session.userCase.adopAgencyOrLAs = adopAgencyOrLAs;

    try {
      req.session.userCase = await this.save(
        req,
        {
          adopAgencyOrLAs: req.session.userCase.adopAgencyOrLAs,
          selectedAdoptionAgencyId: req.session.userCase.selectedAdoptionAgencyId,
        },
        this.getEventName(req)
      );
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      //req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }

      if (redirect) {
        res.redirect(req.url);
      } else {
        super.get(req, res);
      }
    });
  }
}
