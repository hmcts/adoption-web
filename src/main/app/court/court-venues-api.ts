import axios, { AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';

import { CourtVenue, LocationResponse } from './location';

export async function getCourtList(req: AppRequest): Promise<CourtVenue[]> {
  // Family Public Law:	ABA3
  // Adoption:	ABA4
  const familyPublicLawCourtList = await getCourtVenues(
    `${config.get('services.familyPublicLawCourt.code')}`,
    req.session.user,
    req.locals.logger
  );
  const adoptionCourtList = await getCourtVenues(
    `${config.get('services.adoptionCourt.code')}`,
    req.session.user,
    req.locals.logger
  );
  return [...familyPublicLawCourtList, ...adoptionCourtList];
}

export const getCourtVenues = async (
  serviceCode: string,
  userDetails: UserDetails,
  logger: LoggerInstance
): Promise<CourtVenue[]> => {
  try {
    const response: AxiosResponse<LocationResponse> = await axios.get(
      `${config.get('services.location_api.url')}/refdata/location/court-venues/services`,
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
        'services.location_api.url'
      )} for ${serviceCode}`,
      err
    );
    return [];
  }
};