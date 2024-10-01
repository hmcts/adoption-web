import App from '../pages/app.page';

export async function citizenAdoptionSignInWithNoPartner(
  app: App,
  userEmail: string,
  userPassword: string,
  locator: string
): Promise<void> {
  await app.signIn.signIn(userEmail, userPassword);
  await app.numberOfApplicants.numberOfApplication(locator);
  await app.numberOfApplicants.fillNotSpouseOrCivilPartnerDetails('Text to be randomly generated');

  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionSignInWithPartner(
  app: App,
  userEmail: string,
  userPassword: string,
  locator: string
): Promise<void> {
  await app.signIn.signIn(userEmail, userPassword);
  await app.numberOfApplicants.numberOfApplication(locator);
  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionDateChildMovedIn(app: App): Promise<void> {
  await app.tasklist.dateChildMovedIn.click();
  await app.dateChildMoved.dateChildMovedInToday();
  await app.basePage.clickSaveAndContinue();
}

export async function citzenAdoptionChildDetailsBeforeAdoption(
  app: App,
  firstname: string,
  lastName: string
): Promise<void> {
  await app.tasklist.childsDetails.click();
  await app.basePage.fillFirstLastName(firstname, lastName);
  await app.basePage.clickSaveAndContinue(); // an error could be occuring here
}

export async function citizenAdoptionChildDetailsAfterAdoption(
  app: App,
  childFirstName: string,
  childLastName: string
): Promise<void> {
  await app.basePage.fillFirstLastName(childFirstName, childLastName);
  await app.basePage.clickSaveAndContinue();
  await app.childDetails.childsDob();
  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionSocialWorkDetails(app: App): Promise<void> {
  await app.tasklist.adoptionAgency.click();
  await app.adoptionAgency.childsChildSocialWorkerDetails('Sandwell Metropolitan Council');
  await app.basePage.saveAndContinue.click();
  await app.adoptionAgency.childsYourSocialWorkerDetails('Sandwell Metropolitan Council');
  await app.basePage.saveAndContinue.click();
  await app.adoptionAgency.anotherAdoptionAgencyNo();
  await app.basePage.saveAndContinue.click();
}

export async function citizenAdoptionFamilyCourtDetails(app: App): Promise<void> {
  await app.tasklist.familyCourtDetails.click();
  await app.basePage.selectLocation('Leicester County Court');
  await app.basePage.clickSaveAndContinue();
  await app.familyCourt.sameCourtYes();
  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionApplicantPersonalDetails(app: App): Promise<void> {
  await app.tasklist.firstApplicantPersonalDetails.click();
  await app.basePage.clickSaveAndContinue();
  await app.addApplicants.otherNamesSelectNo();
  await app.basePage.clickSaveAndContinue();
  await app.addApplicants.dob();
  await app.basePage.clickSaveAndContinue();
  await app.addApplicants.addOccupationFirst();
  await app.basePage.clickSaveAndContinue();
  await app.extraSupport.noSupportNeeded();
  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionApplicantContactDetails(app: App): Promise<void> {
  await app.tasklist.firstApplicantContactDetails.click();
  await app.basePage.postcodeFindAddress('BN26 6AL', '0');
  await app.basePage.clickSaveAndContinue();
  await app.contactDetails.fillContactDetails('1234567890@domain.com', '0800800800');
  await app.basePage.clickSaveAndContinue();
  await app.contactDetails.englishLang.check();
  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionSecondApplicantPersonalDetails(
  app: App,
  firstname: string,
  lastName: string
): Promise<void> {
  await app.tasklist.secondApplicantPersonalDetails.click();
  await app.basePage.fillFirstLastName(firstname, lastName);
  await app.basePage.clickSaveAndContinue();
  await app.addApplicants.otherNamesNo.check();
  await app.basePage.clickSaveAndContinue();
  await app.addApplicants.dob();
  await app.basePage.clickSaveAndContinue();
  await app.addApplicants.addOccupationSecond();
  await app.basePage.clickSaveAndContinue();
  await app.extraSupport.noSupportNeeded();
  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionSecondApplicantContactDetails(app: App): Promise<void> {
  await app.tasklist.secondApplicantContactDetails.click();
  await app.page.getByLabel('Yes').check(); //do you live at the same address?
  await app.basePage.clickSaveAndContinue();
  await app.contactDetails.fillContactDetails('abcdefg@domain.com', '0800800800');
  await app.basePage.clickSaveAndContinue();
  await app.contactDetails.englishLang.check();
  await app.basePage.clickSaveAndContinue();
}

export async function citizenAdoptionSubmitApplication(
  app: App,
  appOneFullname: string,
  appTwoFullname: string
): Promise<void> {
  await app.tasklist.reviewAndSubmit.click();
  await app.pcq.noPcqAnswers();
  await app.reviewSubmit.reviewAnswers('notSpouseOrCivilPartner');
  await app.basePage.clickSaveAndContinue();
  await app.reviewSubmit.statementOfTruthTwo(appOneFullname, appTwoFullname);
  await app.reviewSubmit.fillCardDetails(appOneFullname, 'abcdefg@domain.com', 'BN26 6AL');
}
