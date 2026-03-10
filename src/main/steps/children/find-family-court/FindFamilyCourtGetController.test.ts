const mockGetCourtList = jest.fn();
jest.mock('../../../app/court/court-venues-api', () => ({
  getCourtListFromStaticList: (...args: unknown[]) => mockGetCourtList(...args),
}));

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import FindFamilyCourtGetController from './FindFamilyCourtGetController';
import { generateContent } from './content';

describe('children > find-family-court > FindFamilyCourtGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new FindFamilyCourtGetController(__dirname + '../../common/template', generateContent);
    mockGetCourtList.mockResolvedValue([{ site_name: 'MOCK' }]);
    req = mockRequest({
      session: {
        userCase: {
          placementOrderCourt: 'Chelmsford Family Court',
          findFamilyCourt: 'No',
          familyCourtName: 'Chelmsford Family Court',
          familyCourtEmailId: 'chelmsfordadoptionapplication@justice.gov.uk',
        },
        save: jest.fn(done => done()),
      },
    });
    res = mockResponse();
  });

  test('should call super constructor with correct params and get list of court', async () => {
    await controller.get(req, res);
    expect(!!req.session.courtList).toBeTruthy();
  });
});
