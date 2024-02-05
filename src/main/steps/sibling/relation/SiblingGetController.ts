import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

@autobind
export default class SiblingGetController extends GetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    let dirty = false;

    // req.session.userCase.siblings is initialised as an empty array
    const siblings = req.session.userCase.siblings ?? [];

    let redirect = false;
    if (req.query.add) {
      this.addSibling(req);
      redirect = true;
      dirty = true;
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
      dirty = true;
    }

    req.session.userCase.siblings = siblings;

    if (dirty) {
      req.session.userCase = await this.save(
        req,
        {
          siblings: req.session.userCase.siblings,
          selectedSiblingId: req.session.userCase.selectedSiblingId,
        },
        this.getEventName(req)
      );
    }
    const changeSibling = req.session.userCase?.siblings?.find(
      item => item.siblingId === req.session.userCase.selectedSiblingId
    );
    req.session.userCase.selectedSiblingOtherPlacementOrderType = changeSibling?.siblingPlacementOtherType;

    const callback = redirect
      ? undefined
      : () => {
          super.get(req, res).catch(error => {
            throw error;
          });
        };

    super.saveSessionAndRedirect(req, res, callback);
  }

  private addSibling(req: AppRequest) {
    req.session.userCase.selectedSiblingId = `${req.query.add}`;
    req.session.userCase.addAnotherSibling = undefined;
    delete req.query.add;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }

  private changeSibling(req: AppRequest) {
    req.session.userCase.selectedSiblingId = `${req.query.change}`;
    const changeSibling = req.session.userCase?.siblings?.find(
      item => item.siblingId === req.session.userCase.selectedSiblingId
    );
    req.session.userCase.selectedSiblingRelation = changeSibling?.siblingRelation;
    req.session.userCase.selectedSiblingPoType = changeSibling?.siblingPoType;
    this.parseAndSetReturnUrl(req);
    delete req.query.change;
    req.url = req.url.substring(0, req.url.indexOf('?'));
  }
}
