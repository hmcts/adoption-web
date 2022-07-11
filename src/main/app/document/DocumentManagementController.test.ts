import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { PAY_YOUR_FEE, UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { CITIZEN_UPDATE, DocumentType, State } from '../case/definition';

import { DocumentManagerController } from './DocumentManagementController';

const { mockCreate, mockDelete, mockGet } = require('./DocumentManagementClient');

jest.mock('../document/DocumentManagementClient');

describe('DocumentManagerController', () => {
  const documentManagerController = new DocumentManagerController();

  beforeEach(() => {
    mockCreate.mockClear();
    mockDelete.mockClear();
    mockGet.mockClear();
  });

  describe('Uploading files', () => {
    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
      },
    ])('handles file uploads - %o', async ({ state, uploadFields }) => {
      const req = mockRequest({
        userCase: {
          state,
          [uploadFields.field1]: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];
      req.headers.accept = 'application/json';

      (mockCreate as jest.Mock).mockReturnValue([
        {
          originalDocumentName: 'uploaded-file.jpg',
          _links: {
            self: { href: 'https://link-self-processed-doc' },
            binary: { href: 'https://link-binary-processed-doc' },
          },
        },
      ]);

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({
        state,
        [uploadFields.field2]: ['an-existing-doc', 'uploaded-file.jpg'],
      });

      await documentManagerController.post(req, res);

      expect(mockCreate).toHaveBeenCalledWith({
        classification: 'PUBLIC',
        files: [{ originalname: 'uploaded-file.jpg' }],
      });

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          [uploadFields.field1]: [
            {
              id: expect.any(String),
              value: {
                documentComment: 'Uploaded by applicant',
                documentFileName: 'uploaded-file.jpg',
                documentLink: {
                  document_binary_url: 'https://link-binary-processed-doc',
                  document_filename: 'uploaded-file.jpg',
                  document_url: 'https://link-self-processed-doc',
                },
              },
            },
            'an-existing-doc',
          ],
        },
        CITIZEN_UPDATE
      );

      expect(res.json).toHaveBeenCalledWith([
        {
          id: expect.any(String),
          name: 'uploaded-file.jpg',
        },
      ]);
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])(
      "redirects if browser doesn't accept JSON/has JavaScript disabled - %o",
      async ({ state, uploadFields, redirectUrl }) => {
        const req = mockRequest({
          userCase: {
            state,
            [uploadFields.field1]: ['an-existing-doc'],
          },
        });
        const res = mockResponse();
        req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];

        (mockCreate as jest.Mock).mockReturnValue([
          {
            originalDocumentName: 'uploaded-file.jpg',
            _links: {
              self: { href: 'https://link-self-processed-doc' },
              binary: { href: 'https://link-binary-processed-doc' },
            },
          },
        ]);

        (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({
          state,
          [uploadFields.field2]: ['an-existing-doc', 'uploaded-file.jpg'],
        });

        await documentManagerController.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it("uploading throws an error if the case isn't in a Draft state as applicant 1", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];

      await expect(() => documentManagerController.post(req, res)).rejects.toThrow(
        'Cannot upload new documents as case is not in Draft state'
      );
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
      },
    ])('throws an error if no files were uploaded - %o', async ({ state }) => {
      const req = mockRequest({
        userCase: {
          state,
        },
      });
      req.headers.accept = 'application/json';
      req.files = [] as unknown as Express.Multer.File[];
      const res = mockResponse();

      await expect(() => documentManagerController.post(req, res)).rejects.toThrow('No files were uploaded');

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])('redirects if no files were uploaded & JavaScript is disabled - %o', async ({ state, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
        },
      });
      const res = mockResponse();

      await documentManagerController.post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])('redirects if deleting & JavaScript is disabled - %o', async ({ state, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
        },
      });
      const res = mockResponse();

      req.params = { index: '0' };

      await documentManagerController.delete(req, res);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('Deleting files', () => {
    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])('deletes an existing file - %o', async ({ state, uploadFields, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
          [uploadFields.field1]: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
        appLocals: {
          api: { triggerEvent: jest.fn() },
        },
      });
      req.params = { index: '1' };
      req.headers.accept = 'application/json';
      const res = mockResponse();

      const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
      mockApiTriggerEvent.mockResolvedValue({ state, [uploadFields.field2]: ['an-existing-doc'] });

      await documentManagerController.delete(req, res);

      expect(mockApiTriggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          [uploadFields.field1]: [
            {
              id: '1',
              value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } },
            },
            {
              id: '2',
              value: null,
            },
            {
              id: '3',
              value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } },
            },
          ],
        },
        CITIZEN_UPDATE
      );

      expect(mockDelete).toHaveBeenCalledWith({ url: 'object-of-doc-to-delete' });
      //expect(mockDelete).toHaveBeenCalledAfter(mockApiTriggerEvent);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'applicant1DocumentsUploaded',
          field2: 'applicant1UploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])(
      "redirects if browser doesn't accept JSON/has JavaScript disabled - %o",
      async ({ state, uploadFields, redirectUrl }) => {
        const req = mockRequest({
          //isApplicant2,
          userCase: {
            state,
            [uploadFields.field1]: [
              { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
              { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
              { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            ],
          },
          appLocals: {
            api: { triggerEvent: jest.fn() },
          },
        });
        req.params = { id: '2' };
        const res = mockResponse();

        const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
        mockApiTriggerEvent.mockResolvedValue({ state, [uploadFields.field2]: ['an-existing-doc'] });

        await documentManagerController.delete(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])("redirects if file to deletes doesn't exist - %o", async ({ state, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
          applicant1DocumentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
      });
      req.params = { id: '2' };
      req.headers.accept = 'application/json';
      const res = mockResponse();

      await documentManagerController.delete(req, res);

      expect(mockDelete).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
    });

    it("deleting throws an error if the case isn't in a Draft state", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
      });
      req.params = { id: '1' };
      const res = mockResponse();

      await expect(() => documentManagerController.delete(req, res)).rejects.toThrow(
        'Cannot delete documents as case is not in Draft state'
      );
    });
  });

  describe('Uploading LA files', () => {
    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'laDocumentsUploaded',
          field2: 'laUploadedFiles',
        },
      },
    ])('handles file uploads - %o', async ({ state, uploadFields }) => {
      const req = mockRequest({
        userCase: {
          state,
          [uploadFields.field1]: ['an-existing-doc'],
        },
      });
      const res = mockResponse();
      req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];
      req.headers.accept = 'application/json';

      (mockCreate as jest.Mock).mockReturnValue([
        {
          originalDocumentName: 'uploaded-file.jpg',
          _links: {
            self: { href: 'https://link-self-processed-doc' },
            binary: { href: 'https://link-binary-processed-doc' },
          },
        },
      ]);

      (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({
        state,
        [uploadFields.field2]: ['an-existing-doc', 'uploaded-file.jpg'],
      });

      await documentManagerController.postLa(req, res);

      expect(mockCreate).toHaveBeenCalledWith({
        classification: 'PUBLIC',
        files: [{ originalname: 'uploaded-file.jpg' }],
      });

      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          [uploadFields.field1]: [
            {
              id: expect.any(String),
              value: {
                documentComment: 'Uploaded by LA',
                documentFileName: 'uploaded-file.jpg',
                documentLink: {
                  document_binary_url: 'https://link-binary-processed-doc',
                  document_filename: 'uploaded-file.jpg',
                  document_url: 'https://link-self-processed-doc',
                },
              },
            },
            'an-existing-doc',
          ],
        },
        CITIZEN_UPDATE
      );

      expect(res.json).toHaveBeenCalledWith([
        {
          id: expect.any(String),
          name: 'uploaded-file.jpg',
        },
      ]);
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'laDocumentsUploaded',
          field2: 'laUploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])(
      "redirects if browser doesn't accept JSON/has JavaScript disabled - %o",
      async ({ state, uploadFields, redirectUrl }) => {
        const req = mockRequest({
          userCase: {
            state,
            [uploadFields.field1]: ['an-existing-doc'],
          },
        });
        const res = mockResponse();
        req.files = [{ originalname: 'uploaded-file.jpg' }] as unknown as Express.Multer.File[];

        (mockCreate as jest.Mock).mockReturnValue([
          {
            originalDocumentName: 'uploaded-file.jpg',
            _links: {
              self: { href: 'https://link-self-processed-doc' },
              binary: { href: 'https://link-binary-processed-doc' },
            },
          },
        ]);

        (req.locals.api.triggerEvent as jest.Mock).mockReturnValue({
          state,
          [uploadFields.field2]: ['an-existing-doc', 'uploaded-file.jpg'],
        });

        await documentManagerController.postLa(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
      },
    ])('throws an error if no files were uploaded - %o', async ({ state }) => {
      const req = mockRequest({
        userCase: {
          state,
        },
      });
      req.headers.accept = 'application/json';
      req.files = [] as unknown as Express.Multer.File[];
      const res = mockResponse();

      await expect(() => documentManagerController.postLa(req, res)).rejects.toThrow('No files were uploaded');

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])('redirects if no files were uploaded & JavaScript is disabled - %o', async ({ state, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
        },
      });
      const res = mockResponse();

      await documentManagerController.postLa(req, res);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])('redirects if deleting & JavaScript is disabled - %o', async ({ state, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
        },
      });
      const res = mockResponse();

      req.params = { index: '0' };

      await documentManagerController.deleteLa(req, res);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);

      expect(mockCreate).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('Deleting La files', () => {
    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'laDocumentsUploaded',
          field2: 'laUploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])('deletes an existing file - %o', async ({ state, uploadFields, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
          [uploadFields.field1]: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
        appLocals: {
          api: { triggerEvent: jest.fn() },
        },
      });
      req.params = { index: '1' };
      req.headers.accept = 'application/json';
      const res = mockResponse();

      const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
      mockApiTriggerEvent.mockResolvedValue({ state, [uploadFields.field2]: ['an-existing-doc'] });

      await documentManagerController.deleteLa(req, res);

      expect(mockApiTriggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          [uploadFields.field1]: [
            {
              id: '1',
              value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } },
            },
            {
              id: '2',
              value: null,
            },
            {
              id: '3',
              value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } },
            },
          ],
        },
        CITIZEN_UPDATE
      );

      expect(mockDelete).toHaveBeenCalledWith({ url: 'object-of-doc-to-delete' });
      //expect(mockDelete).toHaveBeenCalledAfter(mockApiTriggerEvent);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
    });

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        uploadFields: {
          field1: 'laDocumentsUploaded',
          field2: 'laUploadedFiles',
        },
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])(
      "redirects if browser doesn't accept JSON/has JavaScript disabled - %o",
      async ({ state, uploadFields, redirectUrl }) => {
        const req = mockRequest({
          //isApplicant2,
          userCase: {
            state,
            [uploadFields.field1]: [
              { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
              { id: '2', value: { documentLink: { document_url: 'object-of-doc-to-delete' } } },
              { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            ],
          },
          appLocals: {
            api: { triggerEvent: jest.fn() },
          },
        });
        req.params = { id: '2' };
        const res = mockResponse();

        const mockApiTriggerEvent = req.locals.api.triggerEvent as jest.Mock;
        mockApiTriggerEvent.mockResolvedValue({ state, [uploadFields.field2]: ['an-existing-doc'] });

        await documentManagerController.deleteLa(req, res);

        expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
      }
    );

    it.each([
      {
        isApplicant2: false,
        state: State.Draft,
        redirectUrl: UPLOAD_YOUR_DOCUMENTS,
      },
    ])("redirects if file to deletes doesn't exist - %o", async ({ state, redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state,
          laDocumentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-delete' } } },
          ],
        },
      });
      req.params = { id: '2' };
      req.headers.accept = 'application/json';
      const res = mockResponse();

      await documentManagerController.deleteLa(req, res);

      expect(mockDelete).not.toHaveBeenCalled();
      expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
    });
  });

  describe('fetch file', () => {
    it.each([
      {
        state: State.Submitted,
        documentsGenerated: {
          field1: 'documentsGenerated',
        },
        redirectUrl: PAY_YOUR_FEE,
      },
    ])('fetch an existing file - %o', async ({ state, documentsGenerated }) => {
      const req = mockRequest({
        userCase: {
          state,
          [documentsGenerated.field1]: [
            { id: '1', value: { documentLink: { document_binary_url: 'object-of-doc-not-to-fetch' } } },
            {
              id: '2',
              value: {
                documentLink: { document_binary_url: 'object-of-doc-to-fetch' },
                documentType: DocumentType.APPLICATION_SUMMARY + 'En',
              },
            },
            { id: '3', value: { documentLink: { document_binary_url: 'object-of-doc-not-to-fetch' } } },
          ],
        },
      });

      req.headers.accept = 'application/pdf';
      const res = mockResponse();

      await documentManagerController.get(req, res);

      expect(mockGet).toHaveBeenCalledWith({ url: 'object-of-doc-to-fetch' });
    });

    it.each([
      {
        state: State.Submitted,
        generatedFields: {
          field1: 'documentsGenerated',
        },
        redirectUrl: PAY_YOUR_FEE,
      },
    ])("redirects if browser doesn't accept JSON/has JavaScript disabled - %o", async ({ redirectUrl }) => {
      const req = mockRequest({
        userCase: {
          state: State.Submitted,
          applicant1DocumentsUploaded: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
          ],
        },
      });
      const res = mockResponse();

      await documentManagerController.get(req, res);

      expect(res.redirect).toHaveBeenCalledWith(redirectUrl);
    });

    it("fetch throws an error if the case isn't in a Submitted state", async () => {
      const req = mockRequest({
        userCase: {
          state: State.Draft,
          documentsGenerated: [
            { id: '1', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
            { id: '3', value: { documentLink: { document_url: 'object-of-doc-not-to-fetch' } } },
          ],
        },
      });
      const res = mockResponse();

      await expect(() => documentManagerController.get(req, res)).rejects.toThrow(
        'Cannot display document as the application is not in submitted state'
      );
    });
  });
});
