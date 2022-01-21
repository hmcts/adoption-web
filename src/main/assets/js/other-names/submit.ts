import { getById } from '../selectors';

const addAnotherName = getById('addAnotherName') as HTMLDetailsElement | null;
const addAnotherNameHidden = getById('addAnotherNameHidden') as HTMLInputElement | null;

if (addAnotherName && addAnotherNameHidden) {
  addAnotherName.onclick = async function () {
    // set hidden value in form data so that can be passed to server
    addAnotherNameHidden.value = !addAnotherName.open ? 'true' : '';
  };
}
