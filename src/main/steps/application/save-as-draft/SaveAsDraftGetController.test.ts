import moment from 'moment';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as caseApi from '../../../app/case/CaseApi';

import SaveAsDraftGetController from './SaveAsDraftGetController';
import { generateContent } from './content';

const getCaseApiMock = jest.spyOn(caseApi, 'getCaseApi');

describe('application > save-as-draft > SaveAsDraftGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new SaveAsDraftGetController(__dirname + '../../common/template', generateContent);
    req = mockRequest({
      session: {
        userCase: { canPaymentIgnored: false },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();

    (getCaseApiMock as jest.Mock).mockReturnValue({
      getCases: jest.fn().mockResolvedValue([]),
    });
  });

  test('should not set canPaymentIgnored when no submitted cases found today', async () => {
    await controller.get(req, res);
    expect(req.session.userCase.canPaymentIgnored).toBeFalsy();
    expect(res.render).toHaveBeenCalled();
  });

  test('should set canPaymentIgnored when a submitted case is found today', async () => {
    (getCaseApiMock as jest.Mock).mockReturnValue({
      getCases: jest.fn().mockResolvedValue([
        {
          id: '1234',
          state: 'Submitted',
          case_data: { dateSubmitted: moment(new Date()).format('YYYY-MM-DD') },
        },
      ]),
    });

    await controller.get(req, res);
    expect(req.session.userCase.canPaymentIgnored).toBe(true);
    expect(res.render).toHaveBeenCalled();
  });

  test('should log error and still render when getCases rejects', async () => {
    (getCaseApiMock as jest.Mock).mockReturnValue({
      getCases: jest.fn().mockRejectedValue(new Error('API failure')),
    });

    await controller.get(req, res);
    expect(req.locals.logger.error).toHaveBeenCalledWith('API failure');
    expect(res.render).toHaveBeenCalled();
  });
});
