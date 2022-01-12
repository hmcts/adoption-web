module.exports = {
  citizenUserOne: {
    email: 'citizen.automation@mailinator.com',
    password: 'Adoption12',
  },

  baseUrl: process.env.ADOP_WEB_URL || 'https://adoption-web-pr-86.service.core-compute-preview.internal/',

  definition: {
    jurisdiction: 'PUBLICLAW',
    jurisdictionFullDesc: 'Public Law',
    caseType: 'CARE_SUPERVISION_EPO',
    caseTypeFullDesc: 'Care, supervision and EPOs',
  },
};
