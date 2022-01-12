module.exports = {
  citizenUserOne: {
    email: process.env.CITIZEN_USERNAME,
    password: process.env.CITIZEN_PASSWORD,
  },

  baseUrl: process.env.ADOP_WEB_URL || 'https://adoption-web-staging.service.core-compute-aat.internal/',

  definition: {
    jurisdiction: 'PUBLICLAW',
    jurisdictionFullDesc: 'Public Law',
    caseType: 'CARE_SUPERVISION_EPO',
    caseTypeFullDesc: 'Care, supervision and EPOs',
  },
};
