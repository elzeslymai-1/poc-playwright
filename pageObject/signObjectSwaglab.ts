import { Page, Locator, expect } from '@playwright/test';

const BASE_URLSL = process.env.BASE_URLSL || ''

export class SwaglabSignInPage {
    private page: Page;
    private logo: Locator
    private errorMessage: Locator
    private userInput: Locator
    private passwordInput: Locator
    private loginButton: Locator
    private placeholderuser: Locator
    private placeholderPassword: Locator

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('div.login_logo');
        this.userInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('[data-test="login-button"]')
        this.errorMessage = page.locator('[data-test="error"]')
        this.placeholderuser = page.locator('#user-name')
        this.placeholderPassword = page.locator('#password')
    }



    async inputuser(username: string) {
        await this.userInput.fill(username);
    }
    async inputPassword(password: string) {
        await this.passwordInput.fill(password);
    }
    async signinswaglab(username: string, password: string) {
        await this.inputuser(username);
        await this.inputPassword(password);
        await this.clicklogin();
        await this.page.waitForLoadState();
    }
    async clicklogin() {
        await this.loginButton.click();
    }
    async checkErrorMessage(expectedText: string) {
        await expect(this.errorMessage).toHaveText(expectedText);
    }
    async checkloginButtonToBeEnabled() {
        await expect(this.loginButton).toBeEnabled();
    }
    async gotoSignInPage() {
        await this.page.goto(`${BASE_URLSL}`);
    }

    async checklogo(expectedText: string) {
        await expect(this.logo).toHaveText(expectedText);
    }

    async checkplaceholderuser() {
        await expect(this.placeholderuser).toBeVisible();
    }
    async checkplaceholderPasssword() {
        await expect(this.placeholderPassword).toBeVisible();
    } 

}