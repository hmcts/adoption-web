import { createCitizenUser, deleteCitizenUser, getAccessToken } from '../helpers/idamTestApiHelpers';

export async function setupUser(): Promise<{ email: string; password: string; id: string }> {
  try {
    const token = await getAccessToken();
    if (!token) {
      const errorMessage = 'Failed to retrieve bearer token. User creation skipped.';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const user = await createCitizenUser(token);
    const { email, password, id } = user;

    return { email, password, id };
  } catch (error) {
    console.error('Error during user setup:', error);
    throw error;
  }
}

export async function teardownUser(userId: string): Promise<void> {
  const token = await getAccessToken();
  if (token) {
    try {
      await deleteCitizenUser(token, userId);
      console.info(`User with ID: ${userId} deleted request has been sent successfully, please allow 24 hrs.`);
    } catch (error) {
      console.error(`Failed to delete user with ID: ${userId}`, error);
    }
  } else {
    console.error('Failed to retrieve bearer token. User deletion skipped.');
  }
}
