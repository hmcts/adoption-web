import autobind from 'autobind-decorator';

import { FieldPrefix } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import NationalityGetControllerBase from '../../../app/nationality/NationalityGetController';

@autobind
export default class NationalityGetController extends NationalityGetControllerBase {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content, FieldPrefix.APPLICANT2);
  }
}
