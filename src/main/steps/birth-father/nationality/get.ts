import autobind from 'autobind-decorator';

import CheckboxesGetController from '../../../steps/common/components/checkboxes/get';
import { FLOW, NATIONALITIES, NATIONALITY } from '../constants';

import { generateContent } from './content';

@autobind
export default class NationalityGetController extends CheckboxesGetController {
  constructor() {
    super(__dirname + '/../../common/template', generateContent, FLOW, NATIONALITY, NATIONALITIES);
  }
}
