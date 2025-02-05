import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test('vetify  loginpage ', async ({ page }) => {

    // gotopage
    await page.goto('https://app.plane.so/');
    await expect(page).toHaveURL('https://app.plane.so/');
    //  vetify Text
    const loginTitle = page.locator('.text-3xl.font-bold.text-onboarding-text-100');
    await expect(loginTitle).toHaveText('Log in or sign up');
    //check PlacePlaceholder input email
    const emailfield = page.getByPlaceholder('name@company.com');
    await expect(emailfield).toBeVisible();
    // check button disable
    const buttoncontinue = page.getByRole('button', { name: 'Continue', exact: true })
    await expect(buttoncontinue).toBeDisabled();

});

test('login  sucess   ', async ({ page }) => {

    // gotopage
    await page.goto('https://app.plane.so/');
    //  input email
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('nonthawat.k@finstable.co.th');
    // click button
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    // check url
    await expect(page).toHaveURL('https://app.plane.so/');
    // input Password
    await page.getByRole('textbox', { name: 'Enter password' }).fill('Bae#17831');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    // ckerk url
    await expect(page).toHaveURL('https://app.plane.so/finstable/');
});

test('login  email not in system   ', async ({ page }) => {

    // gotopage
    await page.goto('https://app.plane.so/');
    //  input email 
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('nonthawat@f.com');
    // check button
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL('https://app.plane.so/');
    //  check placeholder Unique code
    const emailfield = page.getByPlaceholder('gets-sets-flys');
    await expect(emailfield).toBeVisible();
    // check text email
    const Textsentemail = page.locator('.flex.items-center.gap-1.font-medium.text-green-700');
    await expect(Textsentemail).toHaveText('Paste the code sent to your email');
});

test('Email is invalid format  ', async ({ page }) => {
    // gotopage
    await page.goto('https://app.plane.so/');
    //  input email
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('nonthawat@.com');
    // check button disable
    const ButTonConTinue = page.getByRole('button', { name: 'Continue', exact: true })
    await expect(ButTonConTinue).toBeDisabled();

});

test('login fail password inv   ', async ({ page }) => {

    // gotopage
    await page.goto('https://app.plane.so/');
    //  vetify button
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('nonthawat.k@finstable.co.th');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    // recheck url
    await expect(page).toHaveURL('https://app.plane.so/');
    // input Password
    await page.getByRole('textbox', { name: 'Enter password' }).fill('Bae#178318888');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    //  vetify  Text error
    const LoginFail = page.locator('div.w-full.text-sm.font-medium.text-custom-primary-100');
    await expect(LoginFail).toHaveText('Authentication failed. Please try again.');

});