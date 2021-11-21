import { getById, hidden } from '../selectors';

export const showError = (id: string): void => {
  getById('addressErrorSummary')?.classList.remove(hidden);
  getById(id)?.classList.remove(hidden);
};

export const hideErrors = (): void => {
  ['errorPostCodeRequired', 'errorPostCodeInvalid', 'errorAddressNotSelected', 'addressErrorSummary'].forEach(el => {
    getById(el)?.classList.add(hidden);
  });
};
