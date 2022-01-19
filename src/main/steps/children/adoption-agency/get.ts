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
    }
    //else if (req.query.change) {
    //   req.session.userCase.selectedPlacementOrderId = `${req.query.change}`;
    //   delete req.query.change;
    //   req.url = req.url.substring(0, req.url.indexOf('?'));
    //   redirect = true;
    // } else if (req.query.remove) {
    //   adopAgencyOrLAs = adopAgencyOrLAs.filter(item => item.placementOrderId !== `${req.query.remove}`);
    //   req.session.userCase.selectedPlacementOrderId = adopAgencyOrLAs[0].placementOrderId;
    //   req.session.userCase.addAnotherPlacementOrder = undefined;
    //   delete req.query.remove;
    //   req.url = req.url.substring(0, req.url.indexOf('?'));
    //   redirect = true;
    // }
    else if (
      !req.session.userCase.selectedAdoptionAgencyId ||
      req.session.userCase.selectedAdoptionAgencyId === 'undefined'
    ) {
      //generate random id for adoption agency if there are no adoption agency
      req.session.userCase.selectedAdoptionAgencyId = adopAgencyOrLAs[0]?.adopAgencyOrLaId || `${Date.now()}`;
      console.log('req.query.add: 40 ' + req.session.userCase.selectedAdoptionAgencyId);
    }

    let adopAgency = adopAgencyOrLAs.find(
      item => item.adopAgencyOrLaId === req.session.userCase.selectedAdoptionAgencyId
    );

    console.log('req.query.add: 48 ' + JSON.stringify(adopAgency));

    if (!adopAgency) {
      adopAgency = {
        adopAgencyOrLaId: req.session.userCase.selectedAdoptionAgencyId,
      };

      console.log('req.query.add: 55 ' + JSON.stringify(adopAgency));

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
