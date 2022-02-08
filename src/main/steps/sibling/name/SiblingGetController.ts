import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class SiblingGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const siblings = req.session.userCase.siblings || [];

    let redirect = false;
    if (req.query.add) {
      this.addSibling(req);
      redirect = true;
    } else if (req.query.change) {
      this.changeSibling(req);
      redirect = true;
    } else if (!req.session.userCase.selectedSiblingId) {
      //generate random id for sibling if there are no siblings
      req.session.userCase.selectedSiblingId = siblings[0]?.siblingId || `${Date.now()}`;
    }

    let sibling = siblings.find(item => item.siblingId === req.session.userCase.selectedSiblingId);

    if (!sibling) {
      sibling = {
        siblingId: req.session.userCase.selectedSiblingId!,
      };

      siblings.push(sibling);
    }

    req.session.userCase.siblings = siblings;

    req.session.userCase = await this.save(
      req,
      {
        siblings: req.session.userCase.siblings,
        selectedSiblingId: req.session.userCase.selectedSiblingId,
      },
      this.getEventName(req)
    );

    if (redirect) {
      super.saveSessionAndRedirect(req, res);
    } else {
      req.session.save(err => {
        if (err) {
          throw err;
        }
        super.get(req, res);
      });
    }
  }

  private addSibling(req: AppRequest) {
    req.session.userCase.selectedSiblingId = `${req.query.add}`;
    req.session.userCase.addAnotherSibling = undefined;
    delete req.query.add;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }

  private changeSibling(req: AppRequest) {
    req.session.userCase.selectedSiblingId = `${req.query.change}`;
    this.parseAndSetReturnUrl(req);
    delete req.query.change;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }
}
