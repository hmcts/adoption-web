import type { UploadedFile } from '../../../app/case/case';
import { getById } from '../selectors';

export class UploadedFiles {
  documents: UploadedFile[];
  storeEl: HTMLInputElement;

  constructor() {
    this.storeEl =
      (getById('applicant1UploadedFiles') as HTMLInputElement) ||
      (getById('applicant2UploadedFiles') as HTMLInputElement);
    this.documents = JSON.parse(this.storeEl?.value || '[]');
  }

  add(documents: UploadedFile[]): void {
    this.documents.push(...documents);
    this.updateStore();
  }

  remove(documentId: string): void {
    const indexToDelete = this.documents.findIndex(f => f.id === documentId);
    if (indexToDelete > -1) {
      this.documents.splice(indexToDelete, 1);
    }
    this.updateStore();
  }

  get length(): number {
    return this.documents.length;
  }

  [Symbol.iterator](): IterableIterator<UploadedFile> {
    return this.documents.values();
  }

  private updateStore() {
    this.storeEl.value = JSON.stringify(this.documents);
  }
}
