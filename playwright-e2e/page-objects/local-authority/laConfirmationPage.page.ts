import { urlConfig } from '../../utils/urls';

export class LAConfirmationPage {
  readonly pageURL: string;

  constructor() {
    this.pageURL = `${urlConfig.citizenFrontendBaseUrl}/la-portal/confirmation`;
  }
}
