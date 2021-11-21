import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CHECK_ANSWERS_URL } from '../../urls';

import PCQGetController from './get';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PCQGetController', () => {
  const controller = new PCQGetController();

  test('Should redirect to PCQ', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const redirectMock = jest.fn();
    res.redirect = redirectMock;

    mockedAxios.get.mockResolvedValue({
      data: {
        status: 'UP',
      },
    });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce({ applicant1PcqId: 'UUID' });

    await controller.get(req, res);

    expect(redirectMock.mock.calls[0][0]).toContain('/service-endpoint');
  });

  test('Should redirect to Check Your Answers if PCQ Health is DOWN', async () => {
    const req = mockRequest();
    const res = mockResponse();

    mockedAxios.get.mockResolvedValue(
      Promise.resolve({
        data: {
          status: 'DOWN',
        },
      })
    );

    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CHECK_ANSWERS_URL);
  });

  test('Should redirect to Check Your Answers if applicant1PcqId is already populated', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.applicant1PcqId = '1234';

    await controller.get(req, res);

    expect(res.redirect).toBeCalledWith(CHECK_ANSWERS_URL);
  });
});
