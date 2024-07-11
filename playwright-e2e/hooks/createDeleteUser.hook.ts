import { createCitizenUser, deleteCitizenUser, getAccessToken } from '../helpers/idamTestApiHelpers';

export async function setupUser(page) {
  const token = await getAccessToken();
  if (token) {
    const { email, password, id } = await createCitizenUser(token);
    return { email, password, id };
  } else {
    console.error('Failed to retrieve bearer token. User creation skipped.');
    return null;
  }
}

export async function teardownUser(page, userId) {
  const token = await getAccessToken();
  if (token) {
    try {
      await deleteCitizenUser(token, userId);
      // console.info(`User with ID: ${userId} deleted request has been sent successfully, please allow 24 hrs.`);
    } catch (error) {
      // console.error(`Failed to delete user with ID: ${userId}`, error);
    }
  } else {
    console.error('Failed to retrieve bearer token. User deletion skipped.');
  }
}
