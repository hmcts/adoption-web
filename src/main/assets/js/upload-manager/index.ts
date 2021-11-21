import Uppy from '@uppy/core';
import DropTarget from '@uppy/drop-target';
import FileInput from '@uppy/file-input';
import ProgressBar from '@uppy/progress-bar';
import XHRUpload from '@uppy/xhr-upload';

import { DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById, hidden, qs } from '../selectors';

import { FileUploadEvents } from './FileUploadEvents';
import { UploadedFiles } from './UploadedFiles';
import { updateFileList } from './updateFileList';

import '@uppy/drop-target/src/style.scss';
import '@uppy/progress-bar/src/style.scss';

const initUploadManager = (): void => {
  const url = DOCUMENT_MANAGER;
  const csrfToken = (getById('csrfToken') as HTMLInputElement)?.value;
  const csrfQuery = `?_csrf=${csrfToken}`;
  location.hash = '';

  const chooseFilePhoto = 'Choose a file or take a photo';

  const uppy = new Uppy({
    restrictions: {
      maxFileSize: 10485760,
      maxNumberOfFiles: 5,
      allowedFileTypes: ['image/jpeg', 'image/tiff', 'image/png', 'application/pdf'],
    },
  });

  const uploadedFiles = new UploadedFiles();
  const fileUploadEvents = new FileUploadEvents(uppy);
  updateFileList(uploadedFiles);

  uppy
    .use(FileInput, {
      target: '#upload',
      locale: {
        strings: {
          chooseFiles: chooseFilePhoto,
        },
      },
    })
    .use(DropTarget, { target: document.body })
    .use(ProgressBar, {
      target: '#uploadProgressBar',
      hideAfterFinish: true,
    })
    .use(XHRUpload, { endpoint: `${url}${csrfQuery}`, bundle: true, headers: { accept: 'application/json' } })
    .on('files-added', async () => {
      document.body.style.cursor = 'wait';
      try {
        await fileUploadEvents.onFilesSelected(uppy, uploadedFiles);
        updateFileList(uploadedFiles);
      } finally {
        uppy.reset();
        document.body.style.cursor = 'default';
        getById('uploadGroup')?.focus();
      }
    })
    .on('error', fileUploadEvents.onError);
};

const upload = qs('.upload');
if (upload) {
  upload.classList.remove(hidden);
  initUploadManager();
}
