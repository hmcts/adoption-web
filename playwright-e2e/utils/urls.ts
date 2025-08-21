import dotenv from 'dotenv';

dotenv.config();

// aat, demo, perftest, ithc
const env = process.env.ENVIRONMENT || 'aat';

interface UrlConfig {
  [key: string]: string;
}

export const urlConfig: UrlConfig = {
  idamUrl: process.env.AAT_IDAM_URL || `https://idam-api.aat.platform.hmcts.net`,
  citizenStartUrl: process.env.CIT_BASE_URL || `https://adoption-web.aat.platform.hmcts.net/eligibility/start`,
  citizenSignInUrl:
    process.env.CIT_SIGNIN_URL ||
    `https://idam-web-public.aat.platform.hmcts.net/login?client_id=adoption-web&response_type=code&redirect_uri=https://adoption-web.aat.platform.hmcts.net/receiver`,
  laPortalUrl: process.env.LA_BASE_URL || `https://adoption-web.aat.platform.hmcts.net/la-portal/kba-case-ref/`,
  citizenFrontendBaseUrl: process.env.TEST_URL || `https://adoption-web.aat.platform.hmcts.net`,
  idam_web_url: process.env.IDAM_WEB_URL || `https://idam-web-public.aat.platform.hmcts.net`,
  idam_testing_url:
    process.env.IDAM_TESTING_SUPPORT_URL || `https://idam-testing-support-api.aat.platform.hmcts.net`,
  service_auth_url:
    process.env.IDAM_S2S_URL ||
    `http://rpe-service-auth-provider-aat.service.core-compute-aat.internal/testing-support/lease`,
  ccd_data_api_url: process.env.CCD_DATA_STORE_URL || `http://ccd-data-store-api-aat.service.core-compute-aat.internal`,
};
