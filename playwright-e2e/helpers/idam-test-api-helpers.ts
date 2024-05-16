import axios from 'axios';
import qs from 'qs';

export async function getAccessToken() {
    try {
        const data = {
            grant_type: 'client_credentials',
            client_id: 'adoption-web',
            client_secret: 'fM6td7W^pnKX@**V',
            scope: 'profile roles'
        };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: 'https://idam-web-public.aat.platform.hmcts.net/o/token',
          };

          axios(options)
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    } catch (error) {
        console.error('Error fetching access token:', error);
        return null;
    }
}
getAccessToken();