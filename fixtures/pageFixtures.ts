import { test as base } from '@playwright/test';
import { SignInPage } from "../pageObject/signinObject";
import { SignUpPage } from '../pageObject/signupObject';

interface MyFixtures {
    signInPage: SignInPage
    signUpPage: SignUpPage
}

export const test = base.extend<MyFixtures>({
    signInPage: async ({ page }, use) => {
        const signInPage = new SignInPage(page);
        await use(signInPage);
    },
    signUpPage: async ({ page }, use) => {
        const signUpPage = new SignUpPage(page);
        await use(signUpPage);
    }
});

export { expect } from '@playwright/test';