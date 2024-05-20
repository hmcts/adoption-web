import { test } from '@playwright/test';
import { getAccessToken } from '../helpers/idam-test-api-helpers';

test('check access token', async ({ page }) => {
    await getAccessToken;
    console.log(getAccessToken);
});