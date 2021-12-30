export const validFeeLookup200Response = {
  data: { MOCK_KEY: 'MOCK_VALUE' },
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
