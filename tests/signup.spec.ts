import { test, expect } from '@playwright/test';
import exp from 'constants';

test('sign up', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');
    await expect(page).toHaveURL('https://app.plane.so/sign-up/');

    //check that the sign up button is visible
    await expect(page.locator('text=Sign up')).toBeVisible();
    
    const emailfield = page.getByPlaceholder('name@company.com');
    await expect(emailfield).toBeVisible();

});