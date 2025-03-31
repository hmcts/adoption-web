import dotenv from 'dotenv';

dotenv.config();

// aat, demo, perftest, ithc
const env = process.env.ENVIRONMENT || 'aat';

interface UrlConfig {
  [key: string]: string;
}

export const urlConfig: UrlConfig = {
  idamUrl: process.env.AAT_IDAM_URL || `https://idam-api.${env}.platform.hmcts.net`,
  citizenStartUrl: process.env.CIT_BASE_URL || `https://adoption-web.${env}.platform.hmcts.net/eligibility/start`,
  citizenSignInUrl:
    process.env.CIT_SIGNIN_URL ||
    `https://idam-web-public.${env}.platform.hmcts.net/login?client_id=adoption-web&response_type=code&redirect_uri=https://adoption-web.${env}.platform.hmcts.net/receiver`,
  laPortalUrl: process.env.LA_BASE_URL || `https://adoption-web.${env}.platform.hmcts.net/la-portal/kba-case-ref/`,
  citizenFrontendBaseUrl: process.env.TEST_URL || `https://adoption-web.${env}.platform.hmcts.net/`,
};
