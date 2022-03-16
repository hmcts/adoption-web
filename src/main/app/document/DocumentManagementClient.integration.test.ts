import axios, { AxiosInstance } from 'axios';

import { UserDetails } from '../controller/AppRequest';

import { Classification, DocumentManagementClient, UploadedFiles } from './DocumentManagementClient';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('DocumentManagementClient', () => {
  it('creates documents', async () => {
    const mockPost = jest.fn().mockResolvedValue({ data: { _embedded: { documents: ['a-document'] } } });
    mockedAxios.create.mockReturnValueOnce({ post: mockPost } as unknown as AxiosInstance);

    const client = new DocumentManagementClient('http://localhost', 'abcd', {
      id: 'userId',
      accessToken: 'userAccessToken',
    } as unknown as UserDetails);

    const actual = await client.create({
      files: [{ buffer: '123', originalname: 'a-new-file' }] as unknown as UploadedFiles,
      classification: Classification.Private,
    });

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost',
      headers: { Authorization: 'Bearer userAccessToken', ServiceAuthorization: 'abcd' },
    });

    expect(mockPost.mock.calls[0][0]).toEqual('/documents');
    expect(mockPost.mock.calls[0][1]._streams[3]).toContain('filename="a-new-file"');
    expect(mockPost.mock.calls[0][1]._streams[1]).toEqual('PRIVATE');
    expect(mockPost.mock.calls[0][2].headers['user-id']).toEqual('userId');
    expect(actual).toEqual(['a-document']);
  });

  it('deletes documents', async () => {
    const mockDelete = jest.fn().mockResolvedValue({ data: 'MOCKED-OK' });
    mockedAxios.create.mockReturnValueOnce({ delete: mockDelete } as unknown as AxiosInstance);

    const client = new DocumentManagementClient('http://localhost', 'abcd', {
      id: 'userId',
      accessToken: 'userAccessToken',
    } as unknown as UserDetails);

    const actual = await client.delete({ url: 'http://localhost/doc' });

    expect(mockDelete.mock.calls[0][0]).toEqual('http://localhost/doc');
    expect(mockDelete.mock.calls[0][1].headers['user-id']).toEqual('userId');
    expect(actual).toEqual({ data: 'MOCKED-OK' });
  });
});
