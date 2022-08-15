import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { LA_PORTAL_UPLOAD_YOUR_DOCUMENTS, PAY_YOUR_FEE, UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import {
  AdoptionDocument,
  CITIZEN_UPDATE,
  DocumentType,
  LanguagePreference,
  ListValue,
  SYSTEM_USER_UPDATE,
  State,
} from '../case/definition';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.cdam.url'), getServiceAuthToken(), user);
  }

  public async post(req: AppRequest, res: Response, documentInput?: DocumentInput): Promise<void> {
    if (![State.Draft].includes(req.session.userCase.state) && (!documentInput || !documentInput.skipDraftCheck)) {
      throw new Error('Cannot upload new documents as case is not in Draft state');
    }

    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else {
        return res.redirect(documentInput ? documentInput.documentRedirectUrl : UPLOAD_YOUR_DOCUMENTS);
      }
    }

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);

    const filesCreated = await documentManagementClient.create({
      files: req.files,
      classification: Classification.Public,
    });

    const newUploads: ListValue<Partial<AdoptionDocument> | null>[] = filesCreated.map(file => ({
      id: generateUuid(),
      value: {
        documentComment: documentInput ? documentInput.documentComment : 'Uploaded by applicant',
        documentFileName: file.originalDocumentName,
        documentLink: {
          document_url: file._links.self.href,
          document_filename: file.originalDocumentName,
          document_binary_url: file._links.binary.href,
        },
      },
    }));

    const documentsKey = documentInput ? documentInput.documentsUploadedKey : 'applicant1DocumentsUploaded';
    const updatedDocumentsUploaded = newUploads.concat(req.session.userCase[documentsKey] || []);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsKey]: updatedDocumentsUploaded },
      this.getEventName(req)
    );

    req.session.save(() => {
      if (req.headers.accept?.includes('application/json')) {
        res.json(newUploads.map(file => ({ id: file.id, name: file.value?.documentFileName })));
      } else {
        res.redirect(documentInput ? documentInput.documentRedirectUrl : UPLOAD_YOUR_DOCUMENTS);
      }
    });
  }

  public async delete(
    req: AppRequest<Partial<CaseWithId>>,
    res: Response,
    documentInput?: DocumentInput
  ): Promise<void> {
    const documentsUploadedKey = documentInput ? documentInput.documentsUploadedKey : 'applicant1DocumentsUploaded';
    const documentsUploaded =
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<AdoptionDocument> | null>[]) ?? [];

    if (![State.Draft].includes(req.session.userCase.state) && (!documentInput || !documentInput.skipDraftCheck)) {
      throw new Error('Cannot delete documents as case is not in Draft state');
    }

    const documentIndexToDelete = parseInt(req.params.index, 10);
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (!documentToDelete?.value?.documentLink?.document_url) {
      return res.redirect(documentInput ? documentInput.documentRedirectUrl : UPLOAD_YOUR_DOCUMENTS);
    }
    const documentUrlToDelete = documentToDelete.value.documentLink.document_url;

    documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsUploadedKey]: documentsUploaded },
      this.getEventName(req)
    );

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    await documentManagementClient.delete({ url: documentUrlToDelete });

    req.session.save(err => {
      if (err) {
        throw err;
      }
      return res.redirect(documentInput ? documentInput.documentRedirectUrl : UPLOAD_YOUR_DOCUMENTS);
    });
  }

  public async postLa(req: AppRequest, res: Response): Promise<void> {
    const documentInput = {
      documentsUploadedKey: 'laDocumentsUploaded',
      documentComment: 'Uploaded by LA',
      documentRedirectUrl: LA_PORTAL_UPLOAD_YOUR_DOCUMENTS,
      skipDraftCheck: true,
    };
    await this.post(req, res, documentInput);
  }

  public async deleteLa(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const documentInput = {
      documentsUploadedKey: 'laDocumentsUploaded',
      documentComment: 'Uploaded by LA',
      documentRedirectUrl: LA_PORTAL_UPLOAD_YOUR_DOCUMENTS,
      skipDraftCheck: true,
    };
    await this.delete(req, res, documentInput);
  }

  public async get(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const documentsGeneratedKey = 'documentsGenerated';
    const languagePreference =
      req.session.userCase['applicant1LanguagePreference'] === LanguagePreference.WELSH ? 'Cy' : 'En';

    const documentsGenerated =
      (req.session.userCase[documentsGeneratedKey] as ListValue<Partial<AdoptionDocument> | null>[]) ?? [];
    if (![State.Submitted].includes(req.session.userCase.state)) {
      throw new Error('Cannot display document as the application is not in submitted state');
    }

    let documentToGet;

    if (!!documentsGenerated && documentsGenerated.length > 0) {
      const applicationSummaryDocuments = documentsGenerated
        .map(item => item.value)
        .filter(element => element?.documentType === DocumentType.APPLICATION_SUMMARY + languagePreference);

      if (applicationSummaryDocuments !== null && applicationSummaryDocuments.length > 0) {
        documentToGet = applicationSummaryDocuments[0]?.documentLink?.document_binary_url;
      }
    }

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    const generatedDocument = await documentManagementClient.get({ url: documentToGet });

    req.session.save(err => {
      if (err) {
        throw err;
      } else if (generatedDocument) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=A58.pdf');
        return res.end(generatedDocument.data);
      }
      return res.redirect(PAY_YOUR_FEE);
    });
  }

  protected getEventName(req: AppRequest): string {
    if (req.session.user?.isSystemUser) {
      return SYSTEM_USER_UPDATE;
    }
    return CITIZEN_UPDATE;
  }
}

export interface DocumentInput {
  documentsUploadedKey: string;
  documentComment: string;
  skipDraftCheck: boolean;
  documentRedirectUrl: string;
}
