import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import FormData from 'form-data';

import { CASE_TYPE, JURISDICTION, UserRole } from '../../app/case/definition';
import type { UserDetails } from '../controller/AppRequest';

export class DocumentManagementClient {
  client: AxiosInstance;

  constructor(baseURL: string, authToken: string, private readonly user: UserDetails) {
    this.client = Axios.create({
      baseURL,
      maxBodyLength: 20971520,
      maxContentLength: 20971520,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        ServiceAuthorization: authToken,
      },
    });
  }

  async create({
    files,
    classification,
  }: {
    files: UploadedFiles;
    classification: Classification;
  }): Promise<DocumentManagementFile[]> {
    const formData = new FormData();
    formData.append('classification', classification);
    formData.append('caseTypeId', CASE_TYPE);
    formData.append('jurisdictionId', JURISDICTION);

    for (const [, file] of Object.entries(files)) {
      formData.append('files', file.buffer, file.originalname);
    }
    const response: AxiosResponse<DocumentManagementResponse> = await this.client.post('/cases/documents', formData, {
      headers: { ...formData.getHeaders() },
    });

    return response.data?.documents || [];
  }

  async delete({ documentFileId }: { documentFileId: string }): Promise<AxiosResponse> {
    return this.client.delete(`/cases/documents/${documentFileId}?permanent=true`, {
      headers: { 'user-id': this.user.id }
    });
  }

  async get({ documentFileId }: { documentFileId: string }): Promise<AxiosResponse> {
    return this.client.get(`/cases/documents/${documentFileId}/binary`, {
      responseType: 'arraybuffer',
      headers: { 'user-id': this.user.id, 'user-roles': UserRole.ADOPTION_GENERIC },
    });
  }
}

interface DocumentManagementResponse {
  documents: DocumentManagementFile[];
}

export interface DocumentManagementFile {
  size: number;
  mimeType: string;
  originalDocumentName: string;
  modifiedOn: string;
  createdOn: string;
  createdBy: string;
  hashToken: string;
  lastModifiedBy: string;
  classification: Classification;
  _links: {
    self: {
      href: string;
    };
    binary: {
      href: string;
    };
    thumbnail: {
      href: string;
    };
  };
}

export type UploadedFiles =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[];

export enum Classification {
  Private = 'PRIVATE',
  Restricted = 'RESTRICTED',
  Public = 'PUBLIC',
}
