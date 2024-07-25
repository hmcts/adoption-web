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
import Pcq from './pcq.page';
import ReviewSubmit from './reviewSubmit.page';
import SignIn from './signInPage.page';
import Tasklist from './taskList.page';
import { faker } from '@faker-js/faker';

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

  async childMoveIn(): Promise<void>{
    await this.tasklist.dateChildMovedIn.click();
    await this.dateChildMoved.dateChildMovedInToday();
    await this.basePage.clickSaveAndContinue();
  }

  async applicantOneNameCreate(): Promise<void>{
    const appOneFirstName = faker.person.firstName();
    const appOneLastName = faker.person.lastName();
    const appOneFullname = appOneFirstName + ' ' + appOneLastName;
  }

  async childNameCreate(): Promise<{prevChildFirstName: string, prevChildLastName: string, newChildFirstName: string, newChildLastName: string}> {
    const prevChildFirstName = faker.person.firstName();
    const prevChildLastName = faker.person.lastName();
    const newChildFirstName = faker.person.firstName();
    const newChildLastName = faker.person.lastName();

    return { prevChildFirstName, prevChildLastName, newChildFirstName, newChildLastName };
  }

  async fillChildDetails(prevChildFirstName, prevChildLastName, newChildFirstName, newChildLastName): Promise<void>{
    
    await this.tasklist.childsDetails.click();
    await this.basePage.fillFirstLastName(prevChildFirstName, prevChildLastName);
    await this.basePage.clickSaveAndContinue();

    // Child's details after adoption
    await this.basePage.fillFirstLastName(newChildFirstName, newChildLastName);
    await this.basePage.clickSaveAndContinue();
    await this.childDetails.childsDob();
    await this.basePage.clickSaveAndContinue();
  }


  async fillSocialWorkerLocation1(socialWorkLocation1){
    await this.tasklist.adoptionAgency.click();
    await this.adoptionAgency.childsChildSocialWorkerDetails(socialWorkLocation1);
    await this.basePage.saveAndContinue.click();
    await this.adoptionAgency.childsYourSocialWorkerDetails(socialWorkLocation1);
    await this..basePage.saveAndContinue.click();
    await this.adoptionAgency.anotherAdoptionAgencyNo();
    await this.basePage.saveAndContinue.click();
  }

  async fillFamilyCourtLocation(familyCourtLocation){
    await this.tasklist.familyCourtDetails.click();
    await this.basePage.selectLocation(familyCourtLocation);
    await this.basePage.clickSaveAndContinue();
    await this.familyCourt.sameCourtYes();
    await this.basePage.clickSaveAndContinue();
}
}