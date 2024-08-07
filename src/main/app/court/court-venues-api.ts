import axios, { AxiosResponse } from 'axios';
import config from 'config';
import Logger, { LoggerInstance } from 'winston';

import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';

import { CourtVenue, LocationResponse } from './location';

export async function getCourtListFromStaticList(): Promise<CourtVenue[]> {
  // Adoption:	ABA4
  const adoptionCourtList = await getCourtVenues();
  return [...adoptionCourtList];
}

export async function getCourtListFromAPI(req: AppRequest): Promise<CourtVenue[]> {
  // Adoption:	ABA4
  const adoptionCourtList = await getCourtVenuesFromAPI(
    `${config.get('services.adoptionCourt.code')}`,
    req.session.user,
    req.locals.logger
  );

  return [...adoptionCourtList];
}

/* This is used to get all the court list refdata API call.
Commenting it out for now to fetch the list from static data */

export const getCourtVenuesFromAPI = async (
  serviceCode: string,
  userDetails: UserDetails,
  logger: LoggerInstance
): Promise<CourtVenue[]> => {
  Logger.error('services.location_api.url: ' + config.get('services.location_api.url'));

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
      )} for ${serviceCode}`
      // err
    );
    return [];
  }
};

// This is used to get all the court list through a static list
export const getCourtVenues = async (): Promise<CourtVenue[]> => {
  Logger.error('services.location_api.url: ' + config.get('services.location_api.url'));
  const courtVenueList: CourtVenue[] = [];
  for (const [key, value] of Object.entries(config.get('adoption.family-court') as object)) {
    const courtVenue: CourtVenue = {
      epimms_id: key,
      site_name: value as string,
      is_case_management_location: '',
      venue_name: '',
    };
    courtVenueList.push(courtVenue);
  }
  return courtVenueList;
};
