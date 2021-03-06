import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { PAY_YOUR_FEE, UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import {
  AdoptionDocument,
  CITIZEN_UPDATE,
  DocumentType,
  LanguagePreference,
  ListValue,
  State,
} from '../case/definition';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.cdam.url'), getServiceAuthToken(), user);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    if (![State.Draft].includes(req.session.userCase.state)) {
      throw new Error('Cannot upload new documents as case is not in Draft state');
    }

    if (!req.files?.length) {
      if (req.headers.accept?.includes('application/json')) {
        throw new Error('No files were uploaded');
      } else {
        return res.redirect(UPLOAD_YOUR_DOCUMENTS);
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
        documentComment: 'Uploaded by applicant',
        documentFileName: file.originalDocumentName,
        documentLink: {
          document_url: file._links.self.href,
          document_filename: file.originalDocumentName,
          document_binary_url: file._links.binary.href,
        },
      },
    }));

    const documentsKey = 'applicant1DocumentsUploaded';
    const updatedDocumentsUploaded = newUploads.concat(req.session.userCase[documentsKey] || []);

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsKey]: updatedDocumentsUploaded },
      CITIZEN_UPDATE
    );

    req.session.save(() => {
      if (req.headers.accept?.includes('application/json')) {
        res.json(newUploads.map(file => ({ id: file.id, name: file.value?.documentFileName })));
      } else {
        res.redirect(UPLOAD_YOUR_DOCUMENTS);
      }
    });
  }

  public async delete(req: AppRequest<Partial<CaseWithId>>, res: Response): Promise<void> {
    const documentsUploadedKey = 'applicant1DocumentsUploaded';
    const documentsUploaded =
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<AdoptionDocument> | null>[]) ?? [];

    if (![State.Draft].includes(req.session.userCase.state)) {
      throw new Error('Cannot delete documents as case is not in Draft state');
    }

    const documentIndexToDelete = parseInt(req.params.index, 10);
    const documentToDelete = documentsUploaded[documentIndexToDelete];
    if (!documentToDelete?.value?.documentLink?.document_url) {
      return res.redirect(UPLOAD_YOUR_DOCUMENTS);
    }
    const documentUrlToDelete = documentToDelete.value.documentLink.document_url;

    documentsUploaded[documentIndexToDelete].value = null;

    req.session.userCase = await req.locals.api.triggerEvent(
      req.session.userCase.id,
      { [documentsUploadedKey]: documentsUploaded },
      CITIZEN_UPDATE
    );

    const documentManagementClient = this.getDocumentManagementClient(req.session.user);
    await documentManagementClient.delete({ url: documentUrlToDelete });

    req.session.save(err => {
      if (err) {
        throw err;
      }
      return res.redirect(UPLOAD_YOUR_DOCUMENTS);
    });
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
}
