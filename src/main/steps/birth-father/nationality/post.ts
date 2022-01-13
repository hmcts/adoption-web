import autobind from 'autobind-decorator';

import { FieldPrefix } from '../../../app/case/case';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import NationalityPostControllerBase from '../../../app/nationality/NationalityPostController';

@autobind
export default class NationalityPostController extends NationalityPostControllerBase {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields, FieldPrefix.BIRTH_FATHER);
  }
}
