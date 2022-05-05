/* eslint-disable import/order */
import axios from 'axios';

describe('fees-register API', () => {
  const EXPECTED_RESPONSE = {
    code: 'FEE0310',
    description: 'Application/permission to apply for adoption',
    version: 2,
    fee_amount: 183,
  };

  it('returns an adoption application fee', async () => {
    const response = await axios.get(
      'http://fees-register-api-aat.service.core-compute-aat.internal/fees-register/fees/lookup',
      {
        headers: {
          accept: 'application/json',
        },
        params: {
          application_type: 'all',
          channel: 'default',
          event: 'issue',
          jurisdiction1: 'family',
          jurisdiction2: 'family court',
          keyword: 'ApplyAdoption',
          service: 'adoption',
        },
      }
    );
    expect(response.data).toEqual(EXPECTED_RESPONSE);
  });
});
