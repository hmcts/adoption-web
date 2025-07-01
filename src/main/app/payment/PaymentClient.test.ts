import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { Case } from '../case/case';
import { AppRequest } from '../controller/AppRequest';

import { PaymentClient } from './PaymentClient';

jest.useFakeTimers();

describe('PaymentClient.getCompletedPayment', () => {
  let client: PaymentClient;
  let req: AppRequest<Partial<Case>>;
  let mockGet: jest.SpyInstance;

  beforeEach(() => {
    req = mockRequest();
    client = new PaymentClient(req.session, 'http://return-url');
    mockGet = jest.spyOn(client, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns payment immediately if status is not Initiated or undefined', async () => {
    mockGet.mockResolvedValueOnce({ status: 'Success' });

    const result = await client.getCompletedPayment('ref', 'caseId');
    expect(result).toEqual({ status: 'Success' });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('retries until payment is not Initiated', async () => {
    mockGet.mockResolvedValueOnce({ status: 'Initiated' }).mockResolvedValueOnce({ status: 'Success' });

    const promise = client.getCompletedPayment('ref', 'caseId');
    // Fast-forward timers for setTimeout
    await jest.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual({ status: 'Success' });
    expect(mockGet).toHaveBeenCalledTimes(2);
  });

  it('returns undefined after maxRetries if payment remains Initiated', async () => {
    mockGet.mockResolvedValue({ status: 'Initiated' });

    const promise = client.getCompletedPayment('ref', 'caseId', 2);
    await jest.runAllTimersAsync();
    const result = await promise;

    expect(result).toBeUndefined();
    expect(mockGet).toHaveBeenCalledTimes(3); // initial + 2 retries
  });

  it('handles get throwing errors gracefully', async () => {
    mockGet.mockRejectedValueOnce(new Error('network error'));

    const promise = client.getCompletedPayment('ref', 'caseId', 0);
    await jest.runAllTimersAsync();
    const result = await promise;

    expect(result).toBeUndefined();
    expect(mockGet).toHaveBeenCalledTimes(1);
  });
});
