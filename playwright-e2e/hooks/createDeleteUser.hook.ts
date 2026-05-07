import { createCitizenUser, deleteCitizenUser, getAccessToken } from '../helpers/idamTestApiHelpers';

export async function setupUser(): Promise<{ email: string; password: string; id: string }> {
  try {
    const token = await getAccessToken();
    if (!token) {
      const errorMessage = 'Failed to retrieve bearer token. User creation skipped.';
      // eslint-disable-next-line no-console
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const user = await createCitizenUser(token);
    const { email, password, id } = user;

    return { email, password, id };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error during user setup:', error);
    throw error;
  }
}

export async function teardownUser(userId: string): Promise<void> {
  const token = await getAccessToken();
  if (token) {
    try {
      await deleteCitizenUser(token, userId);
      // eslint-disable-next-line no-console
      console.info(`User with ID: ${userId} deleted request has been sent successfully, please allow 24 hrs.`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Failed to delete user with ID: ${userId}`, error);
    }
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed to retrieve bearer token. User deletion skipped.');
  }
}
