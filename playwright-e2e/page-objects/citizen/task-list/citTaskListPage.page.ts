import { Locator } from "@playwright/test";
import BasePage from "../../../pages/basePage.page";

export class CITTaskListPage extends BasePage {
  readonly applyToAdoptAChildHeading: Locator;

  // first group
  readonly addApplicationDetailsGroup: Locator;

  readonly numberOfApplicantsGroup: Locator;
  readonly numnberOfApplicantsLink: Locator;
  readonly numberOfApplicantsStatus: Locator;

  readonly dateChildMovedInGroup: Locator;
  readonly dateChildMovedInLink: Locator;
  readonly dateChildMovedInStatus: Locator;

  readonly childDetailsGroup: Locator;
  readonly childDetailsLink: Locator;
  readonly childDetailsStatus: Locator;

  readonly adptionAgencyGroup: Locator;
  readonly adoptionAgencyLink: Locator;
  readonly adoptionAgencyStatus: Locator;

  readonly familyCourtGroup: Locator;
  readonly familyCourtLink: Locator;
  readonly familyCourtStatus: Locator;

  // second group
  readonly addApplicantsDetailsGroup: Locator;

  readonly firstApplicantGroup: Locator;

  readonly firstApplicantPersonalDetailsGroup: Locator;
  readonly firstApplicantPersonalDetailsLink: Locator;
  readonly firstApplicantPersonalDetialsStatus: Locator;

  readonly firstApplicantContactDetailsGroup: Locator;
  readonly firstApplicantContactDetailsLink: Locator;
  readonly firstApplicantDetailsStatus: Locator;

  readonly secondApplicantGroup: Locator;

  readonly secondApplicantPersonalDetailsGroup: Locator;
  readonly secondApplicantPersonalDetailsLink: Locator;
  readonly secondApplicantPersonalDetialsStatus: Locator;

  readonly secondApplicantContactDetailsGroup: Locator;
  readonly secondApplicantContactDetailsLink: Locator;
  readonly secondApplicantDetailsStatus: Locator;

  readonly reviewAndSubmitGroup: Locator;
}
