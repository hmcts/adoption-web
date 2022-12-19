import { Logger } from '@hmcts/nodejs-logging';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

import { getCourtEmailId } from './util';
const logger = Logger.getLogger('FindFamilyCourtPostController');

@autobind
export default class FindFamilyCourtPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);
    const findFamilyCourtName = req.body.autoCompleteData ? req.body.autoCompleteData + '' : '';
    const findFamilyCourt = req.session.userCase.findFamilyCourt;

    const isFilledFamilyCourt = isFieldFilledIn(findFamilyCourtName);

    if (findFamilyCourt === YesOrNo.NO && !!isFilledFamilyCourt) {
      if (req.session.errors.filter(e => e.propertyName === 'familyCourtName').length === 0) {
        req.session.errors.push({ propertyName: 'familyCourtName', errorType: isFilledFamilyCourt });
      }
    }

    if (req.session.errors.length > 0) {
      this.redirect(req, res);
      return;
    }

    this.filterErrorsForSaveAsDraft(req);

    const familyCourtName =
      findFamilyCourt === YesOrNo.YES
        ? req.session.userCase?.placementOrderCourt
        : req.session.userCase.familyCourtName;
    const familyCourtEmailId = getCourtEmailId(familyCourtName as string);
    logger.info(`CaseId: ${req.session.userCase.hyphenatedCaseRef} has familyCourtEmailId: ${familyCourtEmailId}`);

    req.session.userCase = await this.save(
      req,
      {
        findFamilyCourt,
        familyCourtName,
        familyCourtEmailId,
      },
      this.getEventName(req)
    );
    super.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
  }
}
