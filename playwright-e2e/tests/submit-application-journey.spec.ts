import { test } from '@playwright/test';
import { createCitizenUser, getAccessToken} from '../helpers/idam-test-api-helpers';

test('check access token', async ({ page }) => {
    await getAccessToken;
    console.log(getAccessToken);
});

test('create citizen', async ({ page }) => {
    await createCitizenUser;
    //console.log(createCitizenUser);
});