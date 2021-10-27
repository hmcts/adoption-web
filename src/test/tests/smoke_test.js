const config = require('../e2e/config');
const moment = require('moment');

Feature('Smoke tests @smoke-tests');

Scenario('Sign in as local authority and create a case', async ({I, caseListPage}) => {


  await I.goToPage(config.baseUrl);
  const caseName = `Smoke test case (${moment().format('YYYY-MM-DD HH:MM')})`;
  const caseId = await I.logInAndCreateCase(config.legalProfessionalUserOne, caseName);
  I.navigateToCaseList();
});
