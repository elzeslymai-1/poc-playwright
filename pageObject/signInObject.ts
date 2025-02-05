import { Page, Locator, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || ''

export class SignInPage {
    private page: Page;
    private emailInput: Locator
    private passwordInput: Locator
    private continueButton: Locator
    private pageHeader: Locator
    private errorMessage: Locator

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[id="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true })
        this.pageHeader = page.locator('.text-3xl.font-bold.text-onboarding-text-100');
        this.errorMessage = page.locator('div.w-full.text-sm.font-medium.text-custom-primary-100')
    }

    async gotoSignInPage() {
        await this.page.goto(`${BASE_URL}/sign-in/`);
    }

    async checkPageHeader(expectedText: string) {
        await expect(this.pageHeader).toHaveText(expectedText);
    }

    async checkTitle(expectedText: string) {
        await expect(this.page).toHaveTitle(expectedText);
    }

    async checkContinueButtonToBeDisabled() {
        await expect(this.continueButton).toBeDisabled();
    }

    async checkContinueButtonToBeEnabled() {
        await expect(this.continueButton).toBeEnabled();
    }

    async checkPasswordInputVisible() {
        await expect(this.passwordInput).toBeVisible();
    }

    async checkErrorMessage(expectedText: string) {
        await expect(this.errorMessage).toHaveText(expectedText);
    }

    async inputEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async inputPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async signin(email: string, password: string) {
        await this.inputEmail(email);
        await this.clickContinue();
        await this.inputPassword(password);
        await this.clickContinue();
        await this.page.waitForLoadState();
    }
}