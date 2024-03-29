import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { CourtVenue, LocalAuthorityList } from '../../app/court/location';
import { CaseApi, CcdV1Response } from '../case/CaseApi';
import { Case, CaseDate, CaseWithId } from '../case/case';
import { Fee } from '../case/definition';
import { FormError } from '../form/Form';

export interface AppRequest<T = Partial<Case>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
    logger: LoggerInstance;
    api: CaseApi;
  };
  body: T;
}

export interface AppSession extends Session {
  user: UserDetails;
  userCase: CaseWithId;
  eligibility: Eligibility;
  isEligibility?: boolean;
  laPortalKba: LaPortalKBA;
  courtList: CourtVenue[];
  localAuthorityList: LocalAuthorityList[];
  lang: string | undefined;
  errors: FormError[] | undefined;
  addresses: [];
  returnUrl?: string;
  fee?: Fee;
  userCaseList: CcdV1Response[];
}

export interface UserDetails {
  accessToken: string;
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  isSystemUser?: boolean;
  roles: string[];
}

export interface Eligibility {
  multipleChildrenEligible?: string;
  under18Eligible?: string;
  marriedEligible?: string;
  livedUKEligible?: string;
  under21Eligible?: string;
  domicileEligible?: string;
}

// LA Portal Knowledge Based Authentication
export interface LaPortalKBA {
  kbaCaseRef?: string;
  kbaChildName?: string;
  kbaChildrenDateOfBirth?: CaseDate;
  authenticated?: boolean;
}
