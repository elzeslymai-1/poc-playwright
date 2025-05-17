import { test as base } from '@playwright/test';
import { SwaglabSignInPage } from '../pageObject/signObjectSwaglab';    

interface MyFixtures {
    swaglabSignInPage: SwaglabSignInPage
    
}

export const test = base.extend<MyFixtures>({
    swaglabSignInPage: async ({ page }, use) => {
        const swaglabSignInPage = new SwaglabSignInPage(page);
        await use(swaglabSignInPage);
    }
});

export { expect } from '@playwright/test';