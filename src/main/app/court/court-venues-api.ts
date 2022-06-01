import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';

import { CourtVenue, LocationResponse } from './location';

export async function getCourtList(req: AppRequest): Promise<CourtVenue[]> {
  // Family Public Law:	ABA3
  // Adoption:	ABA4
  const familyPublicLawCourtList = await getCourtVenues('ABA3', req.session.user, req.locals.logger);
  const adoptionCourtList = await getCourtVenues('ABA4', req.session.user, req.locals.logger);
  return [...familyPublicLawCourtList, ...adoptionCourtList];
}

export const getCourtVenues = async (
  serviceCode: string,
  userDetails: UserDetails,
  logger: LoggerInstance
): Promise<CourtVenue[]> => {
  try {
    const response: AxiosResponse<LocationResponse> = await axios.get(
      `${config.get('services.postcodeLookup.url')}/refdata/location/court-venues/services`,
      {
        headers: {
          Authorization: 'Bearer ' + userDetails.accessToken,
          ServiceAuthorization: getServiceAuthToken(),
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        params: {
          service_code: serviceCode,
        },
      }
    );

    if (!response.data?.court_venues) {
      return [];
    }

    return response.data.court_venues;
  } catch (err) {
    logger.error(
      `Error occurred while fetching court venues data from ${config.get(
        'services.postcodeLookup.url'
      )} for ${serviceCode}`,
      err
    );
    return [];
  }
};

// import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import { NextFunction, Response } from 'express';
// export const SERVICES_LOCATION_API_PATH = 'services.location_api';
// export const http: AxiosInstance = axios.create({});
//
// /**
//  * Get locations
//  *
//  */
//  export async function getLocationsById(req: AppRequest, res: Response, next: NextFunction) {
//   try {
//     const basePath: string = config.get('services.location_api.url');
//     const serviceCode: string = 'BFA1';
//     const path: string = prepareGetLocationsUrl(basePath, serviceCode);
//     const response = await handleLocationGet(req.session.user, path, req);
//     res.send(response.data.court_venues).status(response.status);
//   } catch (error) {
//     next(error);
//   }
// }

// export function prepareGetLocationsUrl(baseUrl: string, serviceCode: string): string {
//   return `${baseUrl}/refdata/location/court-venues/services?service_code=${serviceCode}`;
// }

// export async function handleLocationGet(userDetails: UserDetails, fullPath: string, req: AppRequest): Promise<AxiosResponse<LocationResponse>> {
//   const response = await http.get<LocationResponse>(fullPath, {
//     headers: {
//       Authorization: 'Bearer ' + userDetails.accessToken,
//       ServiceAuthorization: getServiceAuthToken(),
//       experimental: 'true',
//       Accept: '*/*',
//       'Content-Type': 'application/json',
//     }
//   });
//   return response;
// }
