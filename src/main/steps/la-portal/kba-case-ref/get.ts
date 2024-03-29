import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { Language, generatePageContent } from '../../common/common.content';

@autobind
export default class KBAGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const language = this.getPreferredLanguage(req) as Language;

    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    let userCase = req.session.userCase || {};

    userCase = Object.assign(userCase, req.session.laPortalKba);

    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase,
    });

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
    });
  }
}
