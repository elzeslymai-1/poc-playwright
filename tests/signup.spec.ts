import { test, expect } from '@playwright/test';
import { time } from 'console';
import exp from 'constants';



test('Check display of sign up page', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');
    await expect(page).toHaveURL('https://app.plane.so/sign-up/');

    //check that the sign up text is visible
    const signUpText = page.locator('h3.text-3xl.font-bold.text-onboarding-text-100');
    await expect(signUpText).toBeVisible();
    await expect(signUpText).toHaveText('Sign up');

});

 test('check when input invaid email format', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');

    //check that the email field is visible
    const emailField = page.locator('#email');

    //check when input invaid email format and display error message
    await emailField.fill('test');
    await page.click('body');
    const errorMessage = page.locator('p.flex.items-center.gap-1.text-xs.text-red-600', { hasText: 'Email is invalid' });
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Email is invalid');
    await emailField.click();

 });

 test('check display of clear button when input data in the email field', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');

    //check that the email field is visible
    const emailField = page.locator('#email');

    //check when input data in the email field and display clear button
    await emailField.fill('test@company');
    const clearButton = page.locator('svg.lucide-circle-x');
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    //check that the email field is empty
    await expect(emailField).toBeEmpty();

 });

 test('check display of sign up page when input data and refresh the page', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');
   
    //Input data in the email field
    const emailField = page.locator('#email');
    await emailField.fill('test@company');
   
    //Refresh the page
    await page.reload();

    //check that in to the sign up page
    await expect(page).toHaveURL('https://app.plane.so/sign-up/');

    //check that the email field is empty
    await expect(emailField).toBeEmpty();


 });

 test('check action of continue button when input valid email format', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');

    //check that the email field is visible
    const emailField = page.locator('#email');

    //check when input valid email format
    await emailField.fill('testsignup1@e-record.com');
    
    //check that the button Continue is enabled
    const continueButton = page.locator('button[type="submit"].text-white.bg-custom-primary-100');
    await expect(continueButton).toBeVisible();
    await expect(continueButton).toBeEnabled();

 });

 test('check display unique code', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');

    //Input valid email format
    const emailField = page.locator('#email');
    await emailField.fill('testsignup1@e-record.com');
    
     //click on continue button
    const continueButton = page.locator('button[type="submit"].text-white.bg-custom-primary-100');
    await continueButton.click();


    //check that label Unique code after click on continue button is visible
    const uniqueCodeInput = page.locator('input[name="code"]');
    await expect(uniqueCodeInput).toBeVisible();
    // await expect(uniqueCodeInput).toHaveAttribute('placeholder', 'Unique code');

 });

 test('check display message error when input invalid Unique code', async ({ page }) => {

    //goto the sign up page
    await page.goto('https://app.plane.so/sign-up/');


    //check that the email field is visible
    const emailField = page.locator('#email');
    await emailField.fill('testsignup1@e-record.com');
    
    //check that the button Continue is enabled
    const continueButton = page.locator('button[type="submit"].text-white.bg-custom-primary-100');
    await continueButton.click();

    //check Unique code field is visible
    const uniqueCodeField = page.locator('input[name="code"]');
    await uniqueCodeField.fill('gqmh-rsid-pzkx');

    //check that the button Continue is enabled
    const continueButton2 = page.locator('button[type="submit"].text-white.bg-custom-primary-100');
    await continueButton2.click();
    
    //get message error when input invalid Unique code
    const messageError = page.locator('.w-full.text-sm.font-medium.text-custom-primary-100', {hasText: 'Invalid magic code. Please try again.'});
    await expect(messageError).toBeVisible();
    await expect(messageError).toHaveText('Invalid magic code. Please try again.');
 });




