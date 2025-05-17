import { test as base } from '@playwright/test';
import { SignInPage } from "../pageObject/signinObject";
import { SignUpPage } from '../pageObject/signupObject';
import { SwagLabsPage } from '../pageObject/swagLabsObject';

interface MyFixtures {
    signInPage: SignInPage
    signUpPage: SignUpPage
    swagLabsPage: SwagLabsPage
}

export const test = base.extend<MyFixtures>({
    signInPage: async ({ page }, use) => {
        const signInPage = new SignInPage(page);
        await use(signInPage);
    },
    signUpPage: async ({ page }, use) => {
        const signUpPage = new SignUpPage(page);
        await use(signUpPage);
    },

    swagLabsPage: async ({ page }, use) => {
        const swagLabsPage = new SwagLabsPage(page);
        await use(swagLabsPage);
    }
});

export { expect } from '@playwright/test';