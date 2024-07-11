import { type Page } from '@playwright/test';

import AdoptionAgency from './adoptionAgency.page';
import AddApplicants from './applicantsDetails.page';
import BasePage from './basePage.page';
import ChildDetails from './childDetails.page';
import ContactDetails from './contactDetails.page';
import DateChildMoved from './dateChildMoved.page';
import ExtraSupport from './extraSupport.page';
import FamilyCourt from './familyCourtDetails.page';
import NumberOfApplicants from './numberOfApplicants.page';
import ReviewSubmit from './reviewSubmit.page';
import SignIn from './signInPage.page';
import Tasklist from './taskList.page';

export default class App {
  readonly page: Page;
  readonly basePage: BasePage;
  readonly signIn: SignIn;
  readonly numberOfApplicants: NumberOfApplicants;
  readonly childDetails: ChildDetails;
  readonly tasklist: Tasklist;
  readonly dateChildMoved: DateChildMoved;
  readonly adoptionAgency: AdoptionAgency;
  readonly familyCourt: FamilyCourt;
  readonly addApplicants: AddApplicants;
  readonly extraSupport: ExtraSupport;
  readonly contactDetails: ContactDetails;
  readonly reviewSubmit: ReviewSubmit;

  constructor(page: Page) {
    this.page = page;
    this.basePage = new BasePage(page);
    this.signIn = new SignIn(page);
    this.numberOfApplicants = new NumberOfApplicants(page);
    this.childDetails = new ChildDetails(page);
    this.tasklist = new Tasklist(page);
    this.dateChildMoved = new DateChildMoved(page);
    this.adoptionAgency = new AdoptionAgency(page);
    this.familyCourt = new FamilyCourt(page);
    this.addApplicants = new AddApplicants(page);
    this.extraSupport = new ExtraSupport(page);
    this.contactDetails = new ContactDetails(page);
    this.reviewSubmit = new ReviewSubmit(page);
  }
}
