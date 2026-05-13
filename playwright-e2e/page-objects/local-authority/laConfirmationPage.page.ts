import { urlConfig } from '../../utils/urls';

export class LAConfirmationPage {
  readonly pageURL: string;

  constructor() {
    this.pageURL = urlConfig.laPortalUrl + '/confirmation';
  }
}
