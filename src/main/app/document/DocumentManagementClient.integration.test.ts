import nock from 'nock';

import { UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementClient, UploadedFiles } from './DocumentManagementClient';

describe('DocumentManagementClient', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates documents', async () => {
    nock('http://localhost')
      .post('/cases/documents')
      .reply(200, { documents: ['a-document'] });

    const client = new DocumentManagementClient('http://localhost', 'abcd', {
      id: 'userId',
      accessToken: 'userAccessToken',
    } as unknown as UserDetails);

    const actual = await client.create({
      files: [{ buffer: '123', originalname: 'a-new-file' }] as unknown as UploadedFiles,
      classification: Classification.Private,
    });

    expect(actual).toEqual(['a-document']);
  });

  it('returns empty array when there are no files', async () => {
    nock('http://localhost').post('/cases/documents').reply(200, { documents: null });

    const client = new DocumentManagementClient('http://localhost', 'abcd', {
      id: 'userId',
      accessToken: 'userAccessToken',
    } as unknown as UserDetails);

    const actual = await client.create({
      files: [{ buffer: '123', originalname: 'a-new-file' }] as unknown as UploadedFiles,
      classification: Classification.Private,
    });

    expect(actual).toEqual([]);
  });

  it('deletes documents', async () => {
    nock('http://localhost').delete('/cases/documents/docId').query({ permanent: 'true' }).reply(200, 'MOCKED-OK');

    const client = new DocumentManagementClient('http://localhost', 'abcd', {
      id: 'userId',
      accessToken: 'userAccessToken',
    } as unknown as UserDetails);

    const actual = await client.delete({ documentFileId: 'docId' });

    expect(actual.data).toEqual('MOCKED-OK');
  });
});
