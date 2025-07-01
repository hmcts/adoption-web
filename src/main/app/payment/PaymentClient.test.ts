import { PaymentClient } from './PaymentClient';

jest.useFakeTimers();

describe('PaymentClient.getCompletedPayment', () => {
  let client: PaymentClient;
  let mockGet: jest.SpyInstance;

  beforeEach(() => {
    client = new PaymentClient({ userCase: {}, user: { accessToken: '' } } as any, 'http://return-url');
    mockGet = jest.spyOn(client, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns payment immediately if status is not Initiated or undefined', async () => {
    mockGet.mockResolvedValueOnce({ status: 'Success' } as any);

    const result = await client.getCompletedPayment('ref', 'caseId');
    expect(result).toEqual({ status: 'Success' });
    expect(mockGet).toHaveBeenCalledTimes(1);
  });

  it('retries until payment is not Initiated', async () => {
    mockGet
      .mockResolvedValueOnce({ status: 'Initiated' } as any)
      .mockResolvedValueOnce({ status: 'Success' } as any);

    const promise = client.getCompletedPayment('ref', 'caseId');
    // Fast-forward timers for setTimeout
    await jest.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual({ status: 'Success' });
    expect(mockGet).toHaveBeenCalledTimes(2);
  });

  it('returns undefined after maxRetries if payment remains Initiated', async () => {
    mockGet.mockResolvedValue({ status: 'Initiated' } as any);

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
