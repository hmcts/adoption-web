/* eslint-disable import/order */
import axios from 'axios';
import config from 'config';

jest.retryTimes(20);
jest.setTimeout(5000);

const decoded = Buffer.from(process.env.ENDPOINTS as string, 'base64');
const endpoints = JSON.parse(decoded.toString());

const servicesToCheck = [
  { name: 'Adoption Web', url: process.env.TEST_URL },
  { name: 'IDAM Web', url: endpoints.idamWeb },
  { name: 'IDAM API', url: endpoints.idamToken },
  { name: 'Auth Provider', url: endpoints.s2s },
  { name: 'CCD Data Store', url: endpoints.ccd },
  { name: 'Fee Lookup', url: endpoints.feeRegister },
  { name: 'Document Management', url: endpoints.dmStore },
  { name: 'Payment API', url: endpoints.payments },
  { name: 'PCQ', url: endpoints.pcq },
  {
    name: 'Postcode Lookup',
    url: config.get('services.postcodeLookup.url'),
    healthEndpoint: '/search/places/v1',
    externalService: true,
  },
];

const checkService = async (url: string) => {
  const response = await axios.get(url);
  if (response.status !== 200 || response.data?.status !== 'UP') {
    throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
  }
};

const checkExternalService = async (url: string) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
  }
};

describe.each(servicesToCheck)(
  '$name should return 200 status UP',
  ({ name, url, healthEndpoint, externalService }) => {
    const parsedUrl = new URL(healthEndpoint || '/health', url as string).toString();

    test(`${name}: ${parsedUrl}`, async () => {
      let checkServiceHealth;
      if (externalService) {
        checkServiceHealth = checkExternalService;
      } else {
        checkServiceHealth = checkService;
      }
      await expect(checkServiceHealth(parsedUrl)).resolves.not.toThrow();
    });
  }
);
