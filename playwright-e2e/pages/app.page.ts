import { type Page } from '@playwright/test';
import BasePage from '../pages/base-page';
import SignIn from '../pages/sign-in.page';
import NumberOfApplicants from '../pages/number-of-applicants.page';
import ChildDetails from '../pages/child-details.page';
import Tasklist from '../pages/task-list.page';
import DateChildMoved from '../pages/date-child-moved.page';
import AdoptionAgency from '../pages/adoption-agency-and-social-worker.page';
import FamilyCourt from '../pages/family-court-details.page';
import AddApplicants from '../pages/applicants-details.page';

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
  }
}
