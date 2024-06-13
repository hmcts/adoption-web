import { type Page } from '@playwright/test';
import BasePage from './basePage.page';
import SignIn from './signInPage.page';
import NumberOfApplicants from './numberOfApplicants.page';
import ChildDetails from './childDetails.page';
import Tasklist from './taskList.page';
import DateChildMoved from './dateChildMoved.page';
import AdoptionAgency from './adoptionAgency.page';
import FamilyCourt from './familyCourtDetails.page';
import AddApplicants from './applicantsDetails.page';
import ExtraSupport from './extraSupport.page';
import ContactDetails from './contactDetails.page';
import ReviewSubmit from './reviewSubmit.page';
import Pcq from './pcq.page';

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
  readonly pcq: Pcq;

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
    this.pcq = new Pcq(page);
  }
}
