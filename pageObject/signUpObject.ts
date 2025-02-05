import { Page, Locator, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || ''

export class SignUpPage {
    private page: Page;
    private emailInput: Locator
    private continueButton: Locator
    private otpInput: Locator
    private pageHeader: Locator
    private errorMessage: Locator

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('input[id="email"]');
        this.otpInput = page.locator('input[name="code"]');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true })
        this.pageHeader = page.locator('.text-3xl.font-bold.text-onboarding-text-100');
        this.errorMessage = page.locator('div.w-full.text-sm.font-medium.text-custom-primary-100')
    }

    async gotoSignUpPage() {
        await this.page.goto(`${BASE_URL}/sign-up/`);
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

    async checkOtpInputVisible() {
        await expect(this.otpInput).toBeVisible();
    }

    async checkErrorMessage(expectedText: string) {
        await expect(this.errorMessage).toHaveText(expectedText);
    }

    async inputEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async inputOtp(otp: string) {
        await this.otpInput.fill(otp);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}