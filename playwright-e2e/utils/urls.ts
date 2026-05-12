import dotenv from 'dotenv';

dotenv.config();

// aat, demo, perftest, ithc
const env = process.env.ENVIRONMENT || 'aat';

interface UrlConfig {
  [key: string]: string;
}

export const urlConfig: UrlConfig = {
  citizenStartUrl:
    process.env.TEST_URL + '/eligibility/start' || `https://adoption-web.${env}.platform.hmcts.net/eligibility/start`,
  laPortalUrl:
    process.env.TEST_URL + '/la-portal/kba-case-ref/' ||
    `https://adoption-web.${env}.platform.hmcts.net/la-portal/kba-case-ref/`,
  citizenFrontendBaseUrl: process.env.TEST_URL || `https://adoption-web.${env}.platform.hmcts.net`,
};
