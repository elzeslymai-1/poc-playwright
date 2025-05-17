import { test, expect } from '../fixtures/pageFixturesSwaglab';
import signInTestDataSwaglab from  '../testData/siglntestdataSwaglab.ts';

const BASE_URLSL = process.env.BASE_URLSL || ''

test.describe('Test Execution - Login swagelab page', () => {

    test.beforeEach(async ({ swaglabSignInPage }) => {
        await swaglabSignInPage.gotoSignInPage()
    })

    test('Login Sucess', async ({ page, swaglabSignInPage }) => {
        // Input user password form env
        await swaglabSignInPage.signinswaglab(signInTestDataSwaglab.account.username, signInTestDataSwaglab.account.password);

        // Expect a URL "to contain" a substring.
        await expect(page).toHaveURL(`${BASE_URLSL}inventory.html`);
    })

    test('login with invalid password', async ({ swaglabSignInPage }) => {
        // Input user password form env
        await swaglabSignInPage.signinswaglab(signInTestDataSwaglab.account.username, 'invalid');

        // Expect   error message .
        await swaglabSignInPage.checkErrorMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('vetify login no input  data ', async ({ swaglabSignInPage }) => {
        //  click login button
        await swaglabSignInPage.clicklogin();

        // Expect   error message .
        await swaglabSignInPage.checkErrorMessage('Epic sadface: Username is required');
    })

    test('vetify login  with  username', async ({ swaglabSignInPage }) => {
        // Input user form env
        await swaglabSignInPage.signinswaglab(signInTestDataSwaglab.account.username, '');

        // Expect   error message .
        await swaglabSignInPage.checkErrorMessage('Epic sadface: Password is required');
    })

    test('vetify login  with  Password ', async ({ swaglabSignInPage }) => {
        // Input password form env
        await swaglabSignInPage.signinswaglab('', signInTestDataSwaglab.account.password);

        // Expect   error message .
        await swaglabSignInPage.checkErrorMessage('Epic sadface: Username is required');
    })

    test('vetify  button login page ', async ({ swaglabSignInPage }) => {
        // check button
        await swaglabSignInPage.checkloginButtonToBeEnabled();
    })

    test('vetify login page ', async ({ swaglabSignInPage }) => {
        // Expect logo page
        await swaglabSignInPage.checklogo('Swag Labs');

        //check placeholder  user name
        await swaglabSignInPage.checkplaceholderuser();

         //check placeholder  Password
         await swaglabSignInPage.checkplaceholderPasssword();      
    })
    test('login locked  user', async ({ swaglabSignInPage }) => {
        // Input user password form env
        await swaglabSignInPage.signinswaglab(signInTestDataSwaglab.account.userlock, signInTestDataSwaglab.account.password);

        // Expect   error message .
        await swaglabSignInPage.checkErrorMessage('Epic sadface: Sorry, this user has been locked out.');

    })
                   
    

});
