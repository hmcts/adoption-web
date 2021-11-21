import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CITIZEN_UPDATE, JurisdictionConnections, YesOrNo } from '../case/definition';
import { FormContent } from '../form/Form';

import { JurisdictionPostController } from './JurisdictionPostController';
import { addConnection } from './connections';

jest.mock('./connections');
const addConnectionMock = addConnection as jest.Mock<JurisdictionConnections[]>;

describe('JurisdictionPostController', () => {
  test('Should add connections field and call trigger PATCH', async () => {
    addConnectionMock.mockReturnValue([JurisdictionConnections.APP_1_APP_2_RESIDENT]);

    const body = {
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
    };
    const bodyWithConnection = {
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
    };
    const mockFormContent = {
      fields: {
        applicant2LifeBasedInEnglandAndWales: {},
        applicant1LifeBasedInEnglandAndWales: {},
      },
    } as unknown as FormContent;

    const jurisdictionController = new JurisdictionPostController(mockFormContent.fields);
    const expectedUserCase = {
      id: '1234',
      applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
      applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
      connections: ['A'],
    };

    const req = mockRequest({ body });
    (req.locals.api.triggerEvent as jest.Mock).mockResolvedValueOnce(expectedUserCase);
    const res = mockResponse();
    await jurisdictionController.post(req, res);

    expect(addConnectionMock).toBeCalled();
    expect(req.body.connections).toEqual([JurisdictionConnections.APP_1_APP_2_RESIDENT]);
    expect(req.locals.api.triggerEvent).toHaveBeenCalledWith('1234', bodyWithConnection, CITIZEN_UPDATE);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.userCase).toEqual(expectedUserCase);
  });
});
