import { test } from '../fixtures/fixtures';

test.describe('Create case', () => {
  let userInfo: { email: string; password: string };

  test.beforeEach(async ({ citizenUserUtils }) => {
    userInfo = await citizenUserUtils.createUser();
  });

  test('create citizen case', async ({ caseHelperUtils }) => {
    const data = {
      applicant1FirstName: 'Mary',
      applicant1LastName: 'Jane',
      applicant1Email: userInfo.email,
    };

    const res = await caseHelperUtils.createCase('CITIZEN_CREATE', data);
    console.log(res);
  });
});
