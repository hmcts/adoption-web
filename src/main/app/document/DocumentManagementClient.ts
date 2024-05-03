import { Logger } from '@hmcts/nodejs-logging';
import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import FormData from 'form-data';

import { CASE_TYPE, JURISDICTION, UserRole } from '../../app/case/definition';
import type { UserDetails } from '../controller/AppRequest';

const logger = Logger.getLogger('DocumentManagementClient');

export class DocumentManagementClient {
  client: AxiosInstance;
  serviceToken: string;
  userToken: string;

  constructor(baseURL: string, authToken: string, private readonly user: UserDetails) {
    this.serviceToken = authToken;
    this.userToken = `Bearer ${user.accessToken}`;

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

  async delete({ url }: { url: string }): Promise<AxiosResponse> {
    logger.info(`service header is ${this.serviceToken}, usertoken is ${this.userToken}`);
    return this.client.delete(url, { headers: { 'user-id': this.user.id } });
  }

  async get({ url }: { url: string }): Promise<AxiosResponse> {
    return this.client.get(url, {
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
