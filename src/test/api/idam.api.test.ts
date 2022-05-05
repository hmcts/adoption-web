import axios from 'axios';
import config from 'config';

// const decoded = Buffer.from(process.env.ENDPOINTS as string, 'base64');
// const endpoints = JSON.parse(decoded.toString());

describe('IDAM API', () => {
  it('returns a valid token', async () => {
    const data = new URLSearchParams();
    data.append('client_id', config.get('services.idam.clientID'));
    data.append('client_secret', process.env.IDAM_SECRET as string);
    data.append('redirect_uri', 'http://localhost:3001/oauth2/callback');
    data.append('scope', 'openid profile roles');
    data.append('grant_type', 'password');
    data.append('username', process.env.CITIZEN_USERNAME as string);
    data.append('password', process.env.CITIZEN_PASSWORD as string);
    const response = await axios.post(`${config.get('services.idam.tokenURL')}/o/token`, data);
    const res = response.data;
    expect(!!res.access_token).toBeTruthy();
    expect(!!res.refresh_token).toBeTruthy();
    expect(!!res.id_token).toBeTruthy();
  });

  it('returns a invalid response', async () => {
    const data = new URLSearchParams();
    data.append('client_id', config.get('services.idam.clientID'));
    data.append('client_secret', process.env.IDAM_SECRET as string);
    data.append('redirect_uri', 'http://localhost:3001/oauth2/callback');
    data.append('scope', 'openid profile roles');
    data.append('grant_type', 'invalid_request');
    data.append('username', process.env.CITIZEN_USERNAME as string);
    data.append('password', process.env.CITIZEN_PASSWORD as string);
    expect(await axios.post(`${config.get('services.idam.tokenURL')}/o/token`, data)).toThrow();
  });
});
