import { Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
    }

    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }
}