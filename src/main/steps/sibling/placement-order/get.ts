import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class SiblingPlacementOrderGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    let redirect = false;
    if (req.query.change) {
      this.changeSiblingPlacementOrder(req);
      redirect = true;
    } else if (req.query.remove) {
      this.removeSiblingPlacementOrder(req);
      redirect = true;
    }

    const siblings = req.session.userCase.siblings;
    req.session.userCase.siblings = siblings;

    req.session.userCase = await this.save(
      req,
      {
        siblings: req.session.userCase.siblings,
        selectedSiblingId: req.session.userCase.selectedSiblingId,
      },
      this.getEventName(req)
    );

    const callback = redirect ? undefined : () => super.get(req, res);

    super.saveSessionAndRedirect(req, res, callback);
  }

  private changeSiblingPlacementOrder(req: AppRequest) {
    const siblingId = `${req.query.change}`;
    req.session.userCase.selectedSiblingId = siblingId;
    this.parseAndSetReturnUrl(req);
    delete req.query.change;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }

  private removeSiblingPlacementOrder(req: AppRequest) {
    const siblingId = `${req.query.remove}`;
    req.session.userCase.selectedSiblingId = siblingId;
    delete req.query.remove;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }
}
