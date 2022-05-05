/* eslint-disable import/order */
import axios from 'axios';
import config from 'config';

describe('Post code lookup API', () => {
  it('address details', async () => {
    const response = await axios.get(process.env.FEE_LOOKUP_URL, {
      headers: {
        accept: 'application/json',
      },
      params: {
        key: config.get('services.postcodeLookup.token'),
        lr: 'EN',
        postcode: 'SW1A 1AB',
      },
    });
    expect(!!response.data).toBeTruthy();
  });
});
