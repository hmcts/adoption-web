export const validFeeLookup200Response = {
  data: {
    fee_amount: 1234,
    code: 'MOCK_CODE',
    description: 'MOCK_DESCRIPTION',
    version: 'MOCK_VERSION',
  },
};

export const emptyFeeLookup200Response = {};

export const invalidFeeLookup400Response = {
  error: {
    statuscode: 400,
    message: 'Requested jurisdiction was invalid',
  },
};

export const invalidFeeLookupKey401Response = {
  fault: {
    faultstring: 'Invalid ApiKey',
    detail: {
      errorcode: 'oauth.v2.InvalidApiKey',
    },
  },
};
