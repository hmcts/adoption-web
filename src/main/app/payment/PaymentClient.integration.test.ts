import config from 'config';
import nock from 'nock';

import { mockLogger } from '../../../test/unit/mocks/hmcts/nodejs-logging';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';

import { PaymentClient } from './PaymentClient';

jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');

const mockedConfig = config as unknown as { get: jest.Mock };
const mockGetServiceAuthToken = getServiceAuthToken as unknown as jest.Mock;

describe('PaymentClient', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates payments', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');

    nock('http://mock-service-url')
      .post('/card-payments')
      .reply(200, { mockPayment: 'data', _links: { next_url: { href: 'http://example.com/pay' } } });

    const req = mockRequest({
      userCase: {
        id: '1234',
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeAmount: 1234, FeeCode: 'mock fee code', FeeVersion: 'mock fee version' } }],
        },
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.create();

    expect(actual).toEqual({
      mockPayment: 'data',
      _links: {
        next_url: {
          href: 'http://example.com/pay',
        },
      },
    });
  });

  it('throws an error and logs if the response does not contain a redirect URL', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');

    nock('http://mock-service-url').post('/card-payments').reply(200, { mockPayment: 'data, but missing _links' });

    const req = mockRequest({
      session: { lang: 'en' },
      userCase: {
        id: '1234',
        applicationFeeOrderSummary: {
          Fees: [{ value: { FeeAmount: 12345, FeeCode: 'mock fee code', FeeVersion: 'mock fee version' } }],
        },
      },
    });

    const client = new PaymentClient(req.session, 'http://return-url');

    await expect(() => client.create()).rejects.toThrow('Error creating payment');

    expect(mockLogger.error).toBeCalledWith('PaymentClient: Error creating payment for caseId=1234', {
      mockPayment: 'data, but missing _links',
    });
  });

  it('gets payment data', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');

    nock('http://mock-service-url').get('/card-payments/1234').reply(200, { mockPayment: 'data' });

    const req = mockRequest();
    const client = new PaymentClient(req.session, 'http://return-url');

    const actual = await client.get('1234', 'case-ref');

    expect(actual).toEqual({ mockPayment: 'data' });
  });

  it('logs errors if it fails to fetch data', async () => {
    mockedConfig.get.mockReturnValueOnce('http://mock-service-url');
    mockGetServiceAuthToken.mockReturnValueOnce('mock-server-auth-token');

    nock('http://mock-service-url').get('/card-payments/1234').reply(500, { some: 'error' });

    const req = mockRequest();
    const client = new PaymentClient(req.session, 'http://return-url');

    await client.get('1234', '4321');

    expect(mockLogger.error).toBeCalledWith(
      'PaymentClient.get: Error fetching payment (reference 1234) for caseId=4321',
      undefined
    );
  });
});
