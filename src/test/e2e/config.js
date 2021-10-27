const defaultPassword = 'Password12';

module.exports = {
  legalProfessionalUserOne: {
    email: 'kurt@swansea.gov.uk',
    password: defaultPassword,
  },

  baseUrl: process.env.URL || 'https://manage-case.aat.platform.hmcts.net/cases',

  definition: {
    jurisdiction: 'PUBLICLAW',
    jurisdictionFullDesc: 'Public Law',
    caseType: 'CARE_SUPERVISION_EPO',
    caseTypeFullDesc: 'Care, supervision and EPOs',
  },
};
