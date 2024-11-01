import { Page } from '@playwright/test';

import { LAChildNationalityPage, LAChildSexAtBirthPage } from './local-authority/laBirthCertificateDetailsSection.page';
import {
  LABirthFatherDocumentsPage,
  LABirthFatherLastDateConfirmedAddressPage,
  LABirthFatherLastKnownAddressBranchPage,
  LABirthFatherLastKnownAddressPage,
  LABirthFatherNamePage,
  LABirthFatherNationalityPage,
  LABirthFatherOccupationPage,
  LABirthFatherOnCertficatePage,
  LABirthFatherParentalResponsibilityGrantedPage,
  LABirthFatherParentalResponsibilityPage,
  LABirthFatherStillAliveStatusPage,
} from './local-authority/laBirthFatherCertificateDetailsSection.page';
import {
  LABirthMotherAliveStatusPage,
  LABirthMotherDocumentsPage,
  LABirthMotherLastDateConfirmedAddressPage,
  LABirthMotherLastKnownAddressBranchPage,
  LABirthMotherLastKnownAddressPage,
  LABirthMotherNamePage,
  LABirthMotherNationalityPage,
  LABirthMotherOccupationPage,
} from './local-authority/laBirthMotherCertificateDetailsSection.page';
import { LACheckYourAnswerPage } from './local-authority/laCheckYourAnswer.page';
import { LAChildDetailsPage } from './local-authority/laChildDetailsPage.page';
import LAGettingStartedPage from './local-authority/laGettingStartedPage.page';
import { LAOtherPersonResponsibilityPage } from './local-authority/laOtherPersonSection.page';
import {
  LAPlacementDateOfOrderPage,
  LAPlacementOrderNumberPage,
  LAPlacementOrdersInPlacePage,
} from './local-authority/laPlacementAndCourtsSection.page';
import { LAChildHasOtherSiblingsPage } from './local-authority/laSiblingCourtDetailsSection.page';
import LASignInPage from './local-authority/laSignInPage.page';
import { LAStatementOfTruthPage } from './local-authority/laStatementOfTruth.page';
import { LAUploadDocumentsPage } from './local-authority/laUploadDocuments.page';

export class PageFactory {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLASignInPage(): LASignInPage {
    return new LASignInPage(this.page);
  }

  getLAGettingStartedPage(): LAGettingStartedPage {
    return new LAGettingStartedPage(this.page);
  }

  getLAChildDetailsPage(): LAChildDetailsPage {
    return new LAChildDetailsPage(this.page);
  }

  getLAChildSexAtBirthPage(): LAChildSexAtBirthPage {
    return new LAChildSexAtBirthPage(this.page);
  }

  getLAChildNationalityPage(): LAChildNationalityPage {
    return new LAChildNationalityPage(this.page);
  }

  getLABirthMotherNamePage(): LABirthMotherNamePage {
    return new LABirthMotherNamePage(this.page);
  }

  getLABirthMotherAliveStatusPage(): LABirthMotherAliveStatusPage {
    return new LABirthMotherAliveStatusPage(this.page);
  }

  getLABirthMotherNationalityPage(): LABirthMotherNationalityPage {
    return new LABirthMotherNationalityPage(this.page);
  }

  getLABirthMotherOccupationPage(): LABirthMotherOccupationPage {
    return new LABirthMotherOccupationPage(this.page);
  }

  getLABirthMotherLastKnownAddressBranch(): LABirthMotherLastKnownAddressBranchPage {
    return new LABirthMotherLastKnownAddressBranchPage(this.page);
  }

  getLABirthMotherLastKnownAddress(): LABirthMotherLastKnownAddressPage {
    return new LABirthMotherLastKnownAddressPage(this.page);
  }

  getLABirthMotherLastDateConfirmedAddressPage(): LABirthMotherLastDateConfirmedAddressPage {
    return new LABirthMotherLastDateConfirmedAddressPage(this.page);
  }

  getLABirthMotherDocumentsPage(): LABirthMotherDocumentsPage {
    return new LABirthMotherDocumentsPage(this.page);
  }

  getLABirthFatherOnCertficatePage(): LABirthFatherOnCertficatePage {
    return new LABirthFatherOnCertficatePage(this.page);
  }

  getLABirthFatherNamePage(): LABirthFatherNamePage {
    return new LABirthFatherNamePage(this.page);
  }

  getLABirthFatherStillAliveStatusPage(): LABirthFatherStillAliveStatusPage {
    return new LABirthFatherStillAliveStatusPage(this.page);
  }

  getLABirthFatherParentalResponsibilityPage(): LABirthFatherParentalResponsibilityPage {
    return new LABirthFatherParentalResponsibilityPage(this.page);
  }

  getLABirthFatherParentalResponsibilityGrantedPage(): LABirthFatherParentalResponsibilityGrantedPage {
    return new LABirthFatherParentalResponsibilityGrantedPage(this.page);
  }

  getLABirthFatherNationalityPage(): LABirthFatherNationalityPage {
    return new LABirthFatherNationalityPage(this.page);
  }

  getLABirthFatherOccupationPage(): LABirthFatherOccupationPage {
    return new LABirthFatherOccupationPage(this.page);
  }

  getLABirthFatherLastKnownAddressBranchPage(): LABirthFatherLastKnownAddressBranchPage {
    return new LABirthFatherLastKnownAddressBranchPage(this.page);
  }

  getLABirthFatherKnownAddressPage(): LABirthFatherLastKnownAddressPage {
    return new LABirthFatherLastKnownAddressPage(this.page);
  }

  getLABirthFatherLastDateConfirmedAddressPage(): LABirthFatherLastDateConfirmedAddressPage {
    return new LABirthFatherLastDateConfirmedAddressPage(this.page);
  }

  getLABirthFatherDocumentsPage(): LABirthFatherDocumentsPage {
    return new LABirthFatherDocumentsPage(this.page);
  }

  getLAOtherPersonResponsibilityPage(): LAOtherPersonResponsibilityPage {
    return new LAOtherPersonResponsibilityPage(this.page);
  }

  getLAPlacementOrderNumberPage(): LAPlacementOrderNumberPage {
    return new LAPlacementOrderNumberPage(this.page);
  }

  getLAPlacementDateOfOrderPage(): LAPlacementDateOfOrderPage {
    return new LAPlacementDateOfOrderPage(this.page);
  }

  getLAPlacementOrdersInPlacePage(): LAPlacementOrdersInPlacePage {
    return new LAPlacementOrdersInPlacePage(this.page);
  }

  getLAChildHasOtherSiblingsPage(): LAChildHasOtherSiblingsPage {
    return new LAChildHasOtherSiblingsPage(this.page);
  }

  getLAUploadDocumentsPage(): LAUploadDocumentsPage {
    return new LAUploadDocumentsPage(this.page);
  }

  getLACheckYourAnswerPage(): LACheckYourAnswerPage {
    return new LACheckYourAnswerPage(this.page);
  }

  getLAStatementOfTruthPage(): LAStatementOfTruthPage {
    return new LAStatementOfTruthPage(this.page);
  }
}
