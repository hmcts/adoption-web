import autobind from 'autobind-decorator';

import { FieldPrefix } from '../../../app/case/case';
import OtherNamesPostControllerBase from '../../../app/controller/other-names/OtherNamesPostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';

@autobind
export default class OtherNamesPostController extends OtherNamesPostControllerBase {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields, FieldPrefix.APPLICANT1);
  }
}
