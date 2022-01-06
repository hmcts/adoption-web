const defaultPassword = 'Password12';

module.exports = {
  citizenUserOne: {
    email: 'citizen.automation@mailinator.com',
    password: defaultPassword,
  },

  baseUrl: process.env.ADOP_WEB_URL || 'https://adoption-web.aat.platform.hmcts.net/',

  definition: {
    jurisdiction: 'PUBLICLAW',
    jurisdictionFullDesc: 'Public Law',
    caseType: 'CARE_SUPERVISION_EPO',
    caseTypeFullDesc: 'Care, supervision and EPOs',
  },
};
