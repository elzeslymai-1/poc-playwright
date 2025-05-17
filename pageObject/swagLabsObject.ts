import { Page, Locator, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || ''

export class SwagLabsPage {
    private page: Page;
    private usernameInput: Locator
    private passwordInput: Locator
    private errorMessage: Locator
    private pageHeader: Locator
    private loginButton: Locator
    private closeErrorMessage: Locator
    private burgerMenuButton: Locator
    private logoutButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[id="user-name"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.errorMessage = page.locator('h3[data-test="error"]');
        this.pageHeader = page.locator('.login_logo');
        this.loginButton = page.locator('#login-button');
        this.closeErrorMessage = page.locator('button[data-test="error-button"]');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');

    }
    
    async gotoSignInPage() {
        await this.page.goto(`${BASE_URL}`);
    }

    async reloadPage() {
        await this.page.reload();
    }

    async checkPageHeader(expectedText: string) {
        await expect(this.pageHeader).toHaveText(expectedText);

    }

    async checkErrorMessage(expectedText: string) {
        await expect(this.errorMessage).toHaveText(expectedText);
    }

    async checkLoginButtonToBeEnabled() {
        await expect(this.loginButton).toBeEnabled();
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async clickBurgerMenuButton() {
        await this.burgerMenuButton.click();
    }

    async clickLogoutButton() {
        await this.logoutButton.click();
    }

    async checkCloseErrorMessageButtonToBeVisible() {
        await expect(this.closeErrorMessage).toBeVisible();
    }

    async clickCloseErrorMessageButton() {
        await this.closeErrorMessage.click();
    }

    async checkUsernameInputToBeVisible() {
        await expect(this.usernameInput).toBeVisible();
    }

    async checkPasswordInputToBeVisible() {
        await expect(this.passwordInput).toBeVisible();
    }

    async inputUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async inputPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async signinSucess(username: string, password: string) {
        await this.inputUsername(username);
        await this.clickLoginButton();
        await this.inputPassword(password);
        await this.clickLoginButton();
        await this.page.waitForLoadState();
        await expect(this.page).toHaveURL(`${BASE_URL}inventory.html`);
    }

    async signinFailed(invalidusername: string, invalidpassword: string) {
        await this.inputUsername(invalidusername);
        await this.clickLoginButton();
        await this.inputPassword(invalidpassword);
        await this.clickLoginButton();
        await this.page.waitForLoadState();
    }

    async signoutSuccess(username: string, password: string) {
        await this.inputUsername(username);
        await this.inputPassword(password);
        await this.clickLoginButton();
        await this.page.waitForLoadState();
        await expect(this.page).toHaveURL(`${BASE_URL}inventory.html`);
        await this.clickBurgerMenuButton();
        await this.clickLogoutButton();
        await expect(this.page).toHaveURL(`${BASE_URL}`);
            
    }

}