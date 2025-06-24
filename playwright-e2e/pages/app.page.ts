import { faker } from '@faker-js/faker';
import { type Page } from '@playwright/test';

import AdoptionAgency from './adoptionAgency.page.ts';
import AddApplicants from './applicantsDetails.page.ts';
import BasePage from './basePage.page.ts';
import ChildDetails from './childDetails.page.ts';
import ContactDetails from './contactDetails.page.ts';
import DateChildMoved from './dateChildMoved.page.ts';
import ExtraSupport from './extraSupport.page.ts';
import FamilyCourt from './familyCourtDetails.page.ts';
import NumberOfApplicants from './numberOfApplicants.page.ts';
import Pcq from './pcq.page.ts';
import ReviewSubmit from './reviewSubmit.page.ts';
import SignIn from './signInPage.page.ts';
import Tasklist from './taskList.page.ts';

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

  async childMoveIn(): Promise<void> {
    await this.tasklist.dateChildMovedIn.click();
    await this.dateChildMoved.dateChildMovedInToday();
    await this.basePage.clickSaveAndContinue();
  }

  async applicantOneNameCreate(): Promise<{ appOneFirstName: string; appOneLastName: string; appOneFullname: string }> {
    const appOneFirstName = faker.person.firstName();
    const appOneLastName = faker.person.lastName();
    const appOneFullname = appOneFirstName + ' ' + appOneLastName;

    return { appOneFirstName, appOneLastName, appOneFullname };
  }

  async childNameCreate(): Promise<{
    prevChildFirstName: string;
    prevChildLastName: string;
    newChildFirstName: string;
    newChildLastName: string;
  }> {
    const prevChildFirstName = faker.person.firstName();
    const prevChildLastName = faker.person.lastName();
    const newChildFirstName = faker.person.firstName();
    const newChildLastName = faker.person.lastName();
    return { prevChildFirstName, prevChildLastName, newChildFirstName, newChildLastName };
  }

  async fillChildDetails(
    prevChildFirstName: string,
    prevChildLastName: string,
    newChildFirstName: string,
    newChildLastName: string
  ): Promise<void> {
    await this.tasklist.childsDetails.click();
    await this.basePage.fillFirstLastName(prevChildFirstName, prevChildLastName);
    await this.basePage.clickSaveAndContinue();

    // Child's details after adoption
    await this.basePage.fillFirstLastName(newChildFirstName, newChildLastName);
    await this.basePage.clickSaveAndContinue();
    await this.childDetails.childsDob();
    await this.basePage.clickSaveAndContinue();
  }

  async fillSocialWorkerLocation1(socialWorkLocation1: string): Promise<void> {
    await this.tasklist.adoptionAgency.click();
    await this.adoptionAgency.childsChildSocialWorkerDetails(socialWorkLocation1);
    await this.basePage.saveAndContinue.click();
    await this.adoptionAgency.childsYourSocialWorkerDetails(socialWorkLocation1);
    await this.basePage.saveAndContinue.click();
    await this.adoptionAgency.anotherAdoptionAgencyNo();
    await this.basePage.saveAndContinue.click();
  }

  async fillFamilyCourtLocation(familyCourtLocation: string): Promise<void> {
    await this.tasklist.familyCourtDetails.click();
    await this.basePage.selectLocation(familyCourtLocation);
    await this.basePage.clickSaveAndContinue();
    await this.familyCourt.sameCourtYes();
    await this.basePage.clickSaveAndContinue();
  }
  // function used to fill applicant details
  async fillPersonalDetails(): Promise<void> {
    await this.basePage.clickSaveAndContinue();
    await this.addApplicants.otherNamesSelectNo();
    await this.basePage.clickSaveAndContinue();
    await this.addApplicants.dob();
    await this.basePage.clickSaveAndContinue();
    await this.addApplicants.addOccupationFirst();
    await this.basePage.clickSaveAndContinue();
    await this.extraSupport.noSupportNeeded();
    await this.basePage.clickSaveAndContinue();
  }

  async fillContactDetails(postcode1: string, telephone1: string): Promise<void> {
    await this.basePage.postcodeFindAddress(postcode1, '0');
    await this.basePage.clickSaveAndContinue();
    await this.contactDetails.fillContactDetails('test@local.com', telephone1);
    await this.basePage.clickSaveAndContinue();
    await this.contactDetails.englishLang.check();
    await this.basePage.clickSaveAndContinue();
  }
}
