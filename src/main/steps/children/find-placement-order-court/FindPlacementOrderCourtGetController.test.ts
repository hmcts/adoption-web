import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import FindPlacementOrderCourtGetController from './FindPlacementOrderCourtGetController';
import { generateContent } from './content';

const mockGetCourtList = jest.fn();

describe('children > find-placement-order-court > FindPlacementOrderCourtGetController', () => {
  let controller;
  let req;
  let res;

  beforeEach(() => {
    controller = new FindPlacementOrderCourtGetController(__dirname + '../../common/template', generateContent);
    mockGetCourtList.mockReturnValue([{ site_name: 'MOCK' }]);
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
