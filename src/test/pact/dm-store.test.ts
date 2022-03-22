import FormData from 'form-data';

import { Classification, DocumentManagementClient } from '../../main/app/document/DocumentManagementClient';

const { pactWith } = require('jest-pact');
jest.spyOn(FormData.prototype, 'getBoundary').mockImplementation(() => '-----------------mock-boundry');

pactWith(
  {
    consumer: 'adoption-web',
    provider: 'dm-store',
  },
  provider => {
    let documentManagementClient;
    const userDetails = {
      accessToken: 'mock-user-access-token',
      id: '123456',
      email: 'user@hmcts.net',
      givenName: 'Firstname',
      familyName: 'Surname',
    };

    beforeEach(() => {
      documentManagementClient = new DocumentManagementClient(
        provider.mockService.baseUrl,
        'mock-service-auth-token',
        userDetails
      );
    });

    describe('dm-store create API', () => {
      const DOCUMENTS_DATA = [
        {
          size: 10,
          mimeType: 'application/pdf',
          originalDocumentName: 'mock_file_name.pdf',
          modifiedOn: 'Tue Mar 22 2022 09:44:56 GMT+0000',
          createdOn: 'Tue Mar 22 2022 09:44:56 GMT+0000',
          classification: 'PUBLIC',
          _links: {
            self: {
              href: 'http://link/self',
            },
            binary: {
              href: 'http://link/binary',
            },
            thumbnail: {
              href: 'http://link/thumbnail',
            },
          },
        },
      ];

      const createDocumentSuccessResponse = {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          _embedded: {
            documents: DOCUMENTS_DATA,
          },
        },
      };

      const createDocumentRequest = {
        uponReceiving: 'a request to create document',
        withRequest: {
          method: 'POST',
          path: '/documents',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'user-id': '123456',
          },
          body: '-------------------mock-boundry\r\nContent-Disposition: form-data; name="classification"\r\n\r\nPUBLIC\r\n-------------------mock-boundry\r\nContent-Disposition: form-data; name="files"; filename="mock_file_name.pdf"\r\nContent-Type: application/pdf\r\n\r\n\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\r\n-------------------mock-boundry--\r\n',
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to create document in dm-store',
          ...createDocumentRequest,
          willRespondWith: createDocumentSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a successful body', async () => {
        const files = [
          {
            fieldname: 'file1',
            originalname: 'mock_file_name.pdf',
            encoding: 'UTF-8',
            mimetype: 'application/pdf',
            size: 5,
            destination: '.',
            filename: 'mock_file_name.pdf',
            path: '.',
            buffer: Buffer.alloc(10, 1),
          },
        ];
        const res = await documentManagementClient.create({ files, classification: Classification.Public });
        expect(res).toEqual(DOCUMENTS_DATA);
      });
    });

    describe('dm-store get API', () => {
      const DOCUMENTS_DATA = Buffer.from([
        123, 34, 116, 121, 112, 101, 34, 58, 34, 66, 117, 102, 102, 101, 114, 34, 44, 34, 100, 97, 116, 97, 34, 58, 91,
        49, 44, 49, 44, 49, 44, 49, 44, 49, 44, 49, 44, 49, 44, 49, 44, 49, 44, 49, 93, 125,
      ]);

      const getDocumentSuccessResponse = {
        status: 200,
        body: Buffer.alloc(10, 1),
      };

      const getDocumentRequest = {
        uponReceiving: 'a request to get document',
        withRequest: {
          method: 'GET',
          path: '/some/document.pdf',
          responseType: 'arraybuffer',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'user-id': '123456',
            'user-roles': 'caseworker-adoption',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to get document from dm-store',
          ...getDocumentRequest,
          willRespondWith: getDocumentSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a document data in arraybuffer format', async () => {
        const res = await documentManagementClient.get({ url: '/some/document.pdf' });
        expect(res.data).toEqual(DOCUMENTS_DATA);
      });
    });

    describe('dm-store delete API', () => {
      const deleteDocumentSuccessResponse = {
        status: 200,
      };

      const deleteDocumentRequest = {
        uponReceiving: 'a request to delete document',
        withRequest: {
          method: 'DELETE',
          path: '/some/document.pdf',
          headers: {
            'user-id': '123456',
          },
        },
      };

      beforeEach(() => {
        const interaction = {
          state: 'adoption-web makes request to delete document from dm-store',
          ...deleteDocumentRequest,
          willRespondWith: deleteDocumentSuccessResponse,
        };
        return provider.addInteraction(interaction);
      });

      it('returns a successful response code', async () => {
        const res = await documentManagementClient.delete({ url: '/some/document.pdf' });
        expect(res.status).toEqual(200);
      });
    });
  }
);
