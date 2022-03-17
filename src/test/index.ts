'use strict';

const axios = require('axios');

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getMeDogs = endpoint => {
  const url = endpoint.url;

  return axios
    .request({
      method: 'GET',
      baseURL: url,
      url: '/dogs',
      headers: { Accept: 'application/json' },
    })
    .then(response => response.data);
};

export const getMeCats = endpoint => {
  const url = endpoint.url;

  return axios
    .request({
      method: 'GET',
      baseURL: url,
      url: '/cats?catId[]=2&catId[]=3',
      headers: { Accept: 'application/json' },
    })
    .then(response => response.data);
};

/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
