import axios from 'axios';
import moment from 'moment';
import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';

import { CaseApi, getCaseApi } from './CaseApi';
import { Adoption, CITIZEN_ADD_PAYMENT, CITIZEN_UPDATE, PaymentStatus, State } from './definition';

jest.mock('axios');

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: 'something',
  roles: ['adoption-citizen-user'],
};

describe('CaseApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  let mockLogger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

  let api; // = new CaseApi(mockedAxios, mockLogger);
  beforeEach(() => {
    mockLogger = {
      error: jest.fn().mockImplementation((message: string) => message),
      info: jest.fn().mockImplementation((message: string) => message),
    } as unknown as LoggerInstance;

    // api = new CaseApi(mockedAxios, userDetails, mockLogger);
    api = new CaseApi(mockedAxios, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const serviceType = Adoption.ADOPTION;

  test('Should throw error when case could not be retrieved', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be retrieved.');
  });

  test('Should create a case if one is not found', async () => {
    // mockedAxios.get.mockResolvedValueOnce({
    //   data: [],
    // });
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [] },
    });
    const results = {
      data: {
        id: '1234',
        state: State.Draft,
        data: {},
      },
    };
    mockedAxios.post.mockResolvedValueOnce(results);
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual({
      id: '1234',
      state: State.Draft,
      status: State.Draft,
    });
  });

  test('Should throw error when case could not be created', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { cases: [] },
    });
    // mockedAxios.get.mockResolvedValueOnce({
    //   data: [],
    // });
    mockedAxios.get.mockResolvedValueOnce({ data: { token: '123' } });
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      request: 'mock request',
    });

    await expect(api.getOrCreateCase(serviceType, userDetails)).rejects.toThrow('Case could not be created.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST https://example.com');
  });

  test('Should log an error if more than one cases are found in Draft', async () => {
    const mockCase = {
      id: '1',
      state: State.Draft,
      case_data: {
        hyphenatedCaseRef: '1234-5678-9101-1121',
      },
    };

    mockedAxios.post.mockResolvedValue({
      data: { cases: [mockCase, mockCase, mockCase] },
    });

    await api.getOrCreateCase(serviceType, userDetails);

    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining(
        'More than one case that has not been Submitted or LaSubmitted found for user. caseIds: 1234567891011121, 1234567891011121, 1234567891011121'
      )
    );
  });

  test('Should not throw an error if more than one cases are found with only one in Draft state', async () => {
    const mockCase = {
      id: '1',
      state: State.Draft,
      case_data: {},
    };

    const mockCaseLaSubmitted = {
      id: '2',
      state: State.LaSubmitted,
      case_data: {},
    };

    const mockCaseSubmitted = {
      id: '3',
      state: State.Submitted,
      case_data: {},
    };
    // mockedAxios.get.mockResolvedValue({
    //   data: [mockCase, mockCase, mockCase],
    // });
    mockedAxios.post.mockResolvedValue({
      data: { cases: [mockCase, mockCaseLaSubmitted, mockCaseSubmitted] },
    });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase).toStrictEqual({
      id: '1',
      state: State.Draft,
    });
  });

  test('Should retrieve the most recently submitted case if two Submitted cases found', async () => {
    const firstMockCase = {
      id: '1',
      state: State.LaSubmitted,
      created_date: moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm:ss'),
      case_data: {
        dateSubmitted: moment().format('YYYY-MM-DD'),
      },
    };
    const secondMockCase = {
      id: '2',
      state: State.Submitted,
      created_date: moment().set({ hour: 15, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm:ss'),
      case_data: {
        dateSubmitted: moment().format('YYYY-MM-DD'),
      },
    };

    mockedAxios.post.mockResolvedValue({
      data: { cases: [firstMockCase, secondMockCase] },
    });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase.id).toBe('2');
    expect(userCase.state).toBe(State.Submitted);
  });

  test('Should retrieve the most oldest created case if two non-Submitted cases found', async () => {
    const firstMockCase = {
      id: '1',
      state: State.AwaitingPayment,
      created_date: moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm:ss'),
      case_data: {},
    };
    const secondMockCase = {
      id: '2',
      state: State.Draft,
      created_date: moment().set({ hour: 14, minute: 0, second: 0, millisecond: 0 }).format('YYYY-MM-DD HH:mm:ss'),
      case_data: {},
    };

    mockedAxios.post.mockResolvedValue({
      data: { cases: [firstMockCase, secondMockCase] },
    });

    const userCase = await api.getOrCreateCase(serviceType, userDetails);

    expect(userCase.id).toBe('1');
    expect(userCase.state).toBe(State.AwaitingPayment);
  });

  test('Should update case', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValue({
      data: { data: { id: '1234' } },
    });
    const caseData = {};
    await api.triggerEvent('1234', caseData, CITIZEN_UPDATE);

    const expectedRequest = {
      data: caseData,
      event: { id: CITIZEN_UPDATE },
      event_token: '123',
    };

    expect(mockedAxios.post).toBeCalledWith('/cases/1234/events', expectedRequest);
  });

  test('Should throw error when case could not be updated', async () => {
    mockedAxios.post.mockRejectedValue({
      config: { method: 'POST', url: 'https://example.com' },
      response: { status: 500, data: 'mock error' },
    });

    await expect(api.triggerEvent('not found', {}, CITIZEN_UPDATE)).rejects.toThrow('Case could not be updated.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST https://example.com 500');
    expect(mockLogger.info).toHaveBeenCalledWith('Response: ', 'mock error');
  });

  test('Should update case when adding payment', async () => {
    mockedAxios.get.mockResolvedValue({ data: { token: '123' } });
    mockedAxios.post.mockResolvedValue({
      data: { data: { id: '1234' } },
    });

    const payments = [
      {
        id: 'MOCK_ID',
        value: {
          created: 'MOCK_CREATED_DATE',
          updated: 'MOCK_UPDATED_DATE',
          feeCode: 'MOCK_FEE_CODE',
          amount: 100,
          status: PaymentStatus.SUCCESS,
          channel: 'MOCK_CHANNEL',
          reference: 'MOCK_REFERENCE',
          transactionId: 'MOCK_TRANSACTION_ID',
        },
      },
    ];

    await api.addPayment('1234', payments);

    const caseData = { applicationPayments: payments };
    const expectedRequest = {
      data: caseData,
      event: { id: CITIZEN_ADD_PAYMENT },
      event_token: '123',
    };

    expect(mockedAxios.post).toBeCalledWith('/cases/1234/events', expectedRequest);
  });

  test('Should return case for caseId passed', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        id: '1234',
        state: State.Draft,
        data: {},
      },
    });

    const userCase = await api.getCaseById('1234');
    expect(userCase).toStrictEqual({ id: '1234', state: 'Draft', status: 'Draft' });
  });

  test('Should throw error when case could not be fetched', async () => {
    mockedAxios.get.mockRejectedValue({
      config: { method: 'GET', url: 'https://example.com' },
      request: 'mock request',
    });

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET https://example.com');
  });

  test('Should return case roles for userId and caseId passed', async () => {
    mockedAxios.get.mockResolvedValue({
      data: {
        case_users: [
          {
            case_id: '1624351572550045',
            user_id: '372ff9c1-9930-46d9-8bd2-88dd26ba2475',
            case_role: '[APPLICANTTWO]',
          },
        ],
      },
    });

    const userCase = await api.getCaseUserRoles('1234123412341234', userDetails.id);
    expect(userCase).toStrictEqual({
      case_users: [
        {
          case_id: '1624351572550045',
          user_id: '372ff9c1-9930-46d9-8bd2-88dd26ba2475',
          case_role: '[APPLICANTTWO]',
        },
      ],
    });
  });

  test('Should throw error when case roles could not be fetched', async () => {
    mockedAxios.get.mockRejectedValue({
      config: { method: 'GET', url: 'https://example.com/case-users' },
      request: 'mock request',
    });

    await expect(api.getCaseUserRoles('1234123412341234', userDetails.id)).rejects.toThrow(
      'Case roles could not be fetched.'
    );

    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET https://example.com/case-users');
  });

  test('Should catch all errors', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Error',
    });

    await expect(api.getCaseById('1234')).rejects.toThrow('Case could not be retrieved.');

    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'Error');
  });

  describe('checkOldPCQIDExists', () => {
    test('Should return PCQ ID if past case has one', async () => {
      const ccdResponse = [
        {
          id: '1234',
          state: State.Submitted,
          case_data: {
            pcqId: 'oldPcqId',
          },
        },
      ];

      await expect(api.checkOldPCQIDExists(ccdResponse)).resolves.toBe('oldPcqId');
    });

    test('Should return undefined if no past cases have pcqIds', async () => {
      const ccdResponse = [
        {
          id: '1234',
          state: State.Draft,
          case_data: {},
        },
      ];

      await expect(api.checkOldPCQIDExists(ccdResponse)).resolves.toBe(undefined);
    });

    test('Should return undefined if no past cases', async () => {
      const ccdResponse = undefined;

      await expect(api.checkOldPCQIDExists(ccdResponse)).resolves.toBe(undefined);
    });
  });
});

describe('getCaseApi', () => {
  test('should create a CaseApi', () => {
    expect(getCaseApi(userDetails, {} as never)).toBeInstanceOf(CaseApi);
  });
});
