import axios, { AxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';
import qs from 'qs';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
/**
 * Function to get an access token from the IDAM service
 * @returns {Promise<string | null>} The access token if successful, otherwise null
 */

export async function getAccessToken(): Promise<string | null> {
  try {
    const data = {
      grant_type: 'client_credentials',
      client_id: 'adoption-web',
      client_secret: process.env.IDAM_SECRET,
      scope: 'profile roles',
    };

    const options: AxiosRequestConfig = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),

      url: process.env.IDAM_TOKEN_URL as string,
    };

    const response = await axios.post(options.url!, options.data, options);
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
}

/**
 * Function to create a citizen user
 * @param {string} token The access token
 */
export async function createCitizenUser(token: string): Promise<{ email: string; password: string; id: string }> {
  if (!process.env.IDAM_CITIZEN_USER_PASSWORD) {
    throw new Error('PASSWORD environment variable is not defined');
  }
  const uniqueId = uuidv4();
  const id = uniqueId;
  const password = process.env.IDAM_CITIZEN_USER_PASSWORD as string;
  const email = `TEST_ADOPTION_USER_citizen-user.${uniqueId}@test.local`;

  console.log('Token:', token);
  const userCreationOptions: AxiosRequestConfig = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({
      password,
      user: {
        id,
        email,
        forename: 'fn_' + uniqueId.split('-')[0],
        surname: 'sn_' + uniqueId.split('-')[1],
        roleNames: ['citizen'],
      },
    }),
    url: process.env.IDAM_TESTING_SUPPORT_USERS_URL,
  };

  try {
    const response = await axios.post(userCreationOptions.url!, userCreationOptions.data, userCreationOptions);
    console.log('User created:', response.data);
    return { email, password, id: response.data.id };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user, could be that you are not connected to the VPN');
  }
}

/**
 * Function to delete a citizen user
 * @param {string} token The access token
 * @param {string} id The id of the user to be deleted
 * @returns {Promise<void>}
 */
export async function deleteCitizenUser(token: string, id: string): Promise<void> {
  const userDeletionOptions: AxiosRequestConfig = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    url: `${process.env.IDAM_TESTING_SUPPORT_USERS_URL}/${id}` as string,
  };

  try {
    await axios(userDeletionOptions);
    console.info('Deleted user', id);
  } catch (error) {
    console.error('Error deleting user', id, error.response ? error.response.data : error.message);
    throw new Error(`Failed to delete user with ID ${id}`);
  }
}
