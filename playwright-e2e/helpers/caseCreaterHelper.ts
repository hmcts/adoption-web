// import axios, { AxiosResponse } from 'axios';
// import * as dotenv from 'dotenv';
// import qs from 'qs';

// import { urlConfig } from '../utils/urls';

// dotenv.config();

// export const getAccessToken = async ({ user }: { user: any }): Promise<AxiosResponse<unknown> | undefined> => {
//   try {
//     const axiosConfig = {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     };
//     const url = `${urlConfig.idamUrl}/loginUser?usernme=${user.email}&password=${user.password}`;
//     return await axios.post(url, qs.stringify(axiosConfig));
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log(error.status);
//       console.log(error.response);
//     } else {
//       console.error(error);
//     }
//   }
// };

// export async function createCitzenCase(): Promise<void> {

// }

// export async function createLACase(): Promise<void> {

// }
