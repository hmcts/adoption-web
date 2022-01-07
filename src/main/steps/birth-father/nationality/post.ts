import autobind from 'autobind-decorator';

import { FormFieldsFn } from '../../../app/form/Form';
import CheckboxesPostController from '../../../steps/common/components/checkboxes/post';
import { FLOW, NATIONALITIES, NATIONALITY } from '../constants';

import { form } from './content';

@autobind
export default class NationalityPostController extends CheckboxesPostController {
  constructor() {
    super(form.fields as FormFieldsFn, FLOW, NATIONALITY, NATIONALITIES);
  }
}
