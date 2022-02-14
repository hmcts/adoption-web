import autobind from 'autobind-decorator';
import config from 'config';
import type { Response } from 'express';
import { v4 as generateUuid } from 'uuid';

import { UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { CaseWithId } from '../case/case';
import { CITIZEN_UPDATE, DivorceDocument, ListValue, State } from '../case/definition';
import type { AppRequest, UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementClient } from './DocumentManagementClient';

@autobind
export class DocumentManagerController {
  private getDocumentManagementClient(user: UserDetails) {
    return new DocumentManagementClient(config.get('services.documentManagement.url'), getServiceAuthToken(), user);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    if (
      ![State.Draft, State.AwaitingApplicant1Response, State.AwaitingClarification].includes(req.session.userCase.state)
    ) {
      throw new Error(
        'Cannot upload new documents as case is not in Draft or AwaitingApplicant1Response or AwaitingClarification state'
      );
    }
    // if (req.session.userCase.state !== State.AwaitingApplicant2Response) {
    //   throw new Error('Cannot upload new documents as case is not in AwaitingApplicant2Response state');
    // }

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

    const newUploads: ListValue<Partial<DivorceDocument> | null>[] = filesCreated.map(file => ({
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
      (req.session.userCase[documentsUploadedKey] as ListValue<Partial<DivorceDocument> | null>[]) ?? [];

    if (
      ![State.Draft, State.AwaitingApplicant1Response, State.AwaitingClarification].includes(req.session.userCase.state)
    ) {
      throw new Error(
        'Cannot delete documents as case is not in Draft, AwaitingApplicant1Response or AwaitingClarification state'
      );
    }
    if (req.session.userCase.state !== State.AwaitingApplicant2Response) {
      throw new Error('Cannot delete documents as case is not in AwaitingApplicant2Response state');
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
}
