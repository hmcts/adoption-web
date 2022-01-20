import autobind from 'autobind-decorator';

import { FieldPrefix } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import OtherNamesGetControllerBase from '../../../app/controller/other-names/OtherNamesGetController';

@autobind
export default class OtherNamesGetController extends OtherNamesGetControllerBase {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content, FieldPrefix.APPLICANT1);
  }
}
