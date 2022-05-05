import axios from 'axios';
import config from 'config';

describe('IDAM API', () => {
  it('returns a valid token', async () => {
    const data = new URLSearchParams();
    console.log(config.get('e2e.userTestPassword'));
    console.log(process.env.IDAM_SECRET as string);
    console.log(process.env.CITIZEN_PASSWORD as string);

    data.append('client_id', config.get('services.idam.clientID'));
    data.append('client_secret', process.env.IDAM_SECRET as string);
    data.append('redirect_uri', 'http://localhost:3001/oauth2/callback');
    data.append('scope', 'openid profile roles');
    data.append('grant_type', 'password');
    data.append('username', 'test_user_adoption@mailinator.com');
    data.append('password', process.env.CITIZEN_PASSWORD as string);
    const response = await axios.post('https://idam-api.aat.platform.hmcts.net/o/token', data);
    const res = response.data;
    expect(!!res.access_token).toBeTruthy();
    expect(!!res.refresh_token).toBeTruthy();
    expect(!!res.id_token).toBeTruthy();
  });
});
