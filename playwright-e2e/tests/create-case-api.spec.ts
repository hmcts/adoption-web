import { test } from '../fixtures/fixtures';

test.describe('Create case', () => {
  let userInfo: { id: string; email: string; password: string };

  test.beforeEach(async ({ citizenUserUtils }) => {
    userInfo = await citizenUserUtils.createUser();
  });

  test('create citizen case', async ({ caseHelperUtils }) => {
    console.log(userInfo.email);

    const caseRef = await caseHelperUtils.createCase(userInfo.id, userInfo.email, userInfo.password, {
      applicant1FirstName: 'John',
      applicant1LastName: 'Doe',
      applicant1Email: 'john.doe@example.com',
    });
    expect(caseRef).toBeDefined();
    console.log(`Case created with reference: ${caseRef}`);
  });
});
