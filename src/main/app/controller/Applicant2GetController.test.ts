import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { HOME_URL } from '../../steps/urls';

import { Applicant2GetController } from './Applicant2GetController';

describe('Applicant2GetController', () => {
  it("redirects back to the home page if they're logged in as applicant 1", () => {
    const controller = new Applicant2GetController('page', jest.fn());

    const req = mockRequest();
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
  });

  it("continues with the normal GetController if they're logged in as applicant 2", () => {
    const controller = new Applicant2GetController('page', jest.fn());

    const req = mockRequest({ session: { isApplicant2: true } });
    const res = mockResponse();
    controller.get(req, res);

    expect(res.redirect).not.toHaveBeenCalled();
  });
});
