import { Locator, Page } from '@playwright/test';

export default class Banner {
    readonly bannerTitle: Locator;
    readonly bannerText: Locator;

    constructor(page: Page) {
        this.bannerTitle = page.getByRole('heading', { name: 'Important', exact: true });
        this.bannerText = page.getByText('Scheduled maintenance');
    }
}