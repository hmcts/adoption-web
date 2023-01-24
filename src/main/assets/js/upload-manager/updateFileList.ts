import { DOCUMENT_MANAGER, LA_DOCUMENT_MANAGER } from '../../../steps/urls';
import { getById, hidden } from '../selectors';

import type { UploadedFiles } from './UploadedFiles';

const noFilesUploadedEl = getById('noFilesUploaded');
const filesUploadedEl = getById('filesUploaded');
const content = JSON.parse(getById('uploadContent')?.textContent || '{}');

export const updateFileList = (uploadedFiles: UploadedFiles): void => {
  const isLaPortal = location.href.includes('la-portal');
  const url = isLaPortal ? LA_DOCUMENT_MANAGER : DOCUMENT_MANAGER;
  if (noFilesUploadedEl) {
    if (uploadedFiles.length) {
      noFilesUploadedEl.classList.add(hidden);
    } else {
      noFilesUploadedEl.classList.remove(hidden);
    }
  }

  if (filesUploadedEl) {
    filesUploadedEl.innerHTML = '';
    let i = 0;

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

      if (content.isAmendableStates || content.isClarificationAmendableState || isLaPortal) {
        const deleteEl = document.createElement('a');
        deleteEl.classList.add('govuk-link');
        deleteEl.classList.add('govuk-link--no-visited-state');
        deleteEl.href = `${url}/delete/${i++}`;
        deleteEl.textContent = content.delete;
        filenameEl.appendChild(deleteEl);
      }

      filesUploadedEl.appendChild(filenameEl);
    }
  }
};
