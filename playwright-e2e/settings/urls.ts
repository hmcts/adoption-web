// aat, demo, perftest, ithc
const env = process.env.ENVIRONMENT || "aat";

interface UrlConfig {
  [key: string]: string;
}

export const urlConfig: UrlConfig = {
  idamUrl: process.env.AAT_IDAM_URL || `https://idam-api.${env}.platform.hmcts.net`,
  citizenStartUrl: process.env.CIT_BASE_URL || `https://adoption-web.${env}.platform.hmcts.net/eligibility/start`,
  laPortalUrl: process.env.LA_BASE_URL|| `https://adoption-web.${env}.platform.hmcts.net/la-portal/kba-case-ref/`
  // You can add other URLs as needed
};