import accessibleAutocomplete from 'accessible-autocomplete';

import { qs } from './selectors';

const accessible = qs('#location-picker');

const instantiateAutocomplete = () => {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    name: 'autoCompleteData',
    selectElement: document.querySelector('#location-picker'),
  });
};

if (accessible) {
  instantiateAutocomplete();
}
