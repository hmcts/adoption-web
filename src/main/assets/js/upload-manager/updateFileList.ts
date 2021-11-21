import { DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById, hidden } from '../selectors';

import type { UploadedFiles } from './UploadedFiles';

const noFilesUploadedEl = getById('noFilesUploaded');
const filesUploadedEl = getById('filesUploaded');
const content = JSON.parse(getById('uploadContent')?.textContent || '{}');

export const updateFileList = (uploadedFiles: UploadedFiles): void => {
  if (noFilesUploadedEl) {
    if (uploadedFiles.length) {
      noFilesUploadedEl.classList.add(hidden);
    } else {
      noFilesUploadedEl.classList.remove(hidden);
    }
  }

  if (filesUploadedEl) {
    filesUploadedEl.innerHTML = '';
    for (const file of uploadedFiles) {
      const filenameEl = document.createElement('li');
      filenameEl.classList.add(
        'uploadedFile',
        'govuk-!-padding-top-2',
        'govuk-!-padding-bottom-3',
        'govuk-section-break',
        'govuk-section-break--visible'
      );
      filenameEl.textContent = file.name;

      if (content.isDraft || content.isAwaitingApplicant2Response) {
        const deleteEl = document.createElement('a');
        deleteEl.classList.add('govuk-link--no-visited-state');
        deleteEl.href = `${DOCUMENT_MANAGER}/delete/${file.id}`;
        deleteEl.textContent = content.delete;
        filenameEl.appendChild(deleteEl);
      }

      filesUploadedEl.appendChild(filenameEl);
    }
  }
};
