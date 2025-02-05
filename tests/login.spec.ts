import { test, expect } from '../fixtures/pageFixtures'
import { SignInPage } from '../pageObject/signinObject';
import signInTestData from '../testData/signInTestData';

const BASE_URL = process.env.BASE_URL || ''

test.describe('Test Execution - log in page', () => {

    test.beforeEach(async ({ signInPage }) => {
        await signInPage.gotoSignInPage()
    })

    test('vetify  loginpage ', async ({ signInPage }) => {
        // Expect a title "to contain" a substring.
        await signInPage.checkTitle('Log in - Plane');

        // Expect a title "to contain" a substring.
        await signInPage.checkloginTitle('Log in or sign up');

        //check PlacePlaceholder input email
        await signInPage.checkEmailPlaceholder();

        // Expect a Continue button to be disabled
        await signInPage.checkContinueButtonToBeDisabled();

    });

    test('vetify input  Email is invalid format  ', async ({ signInPage }) => {
        // Input email fail
        await signInPage.inputEmail('neebee@.com');

        // Expect a Continue button to be disabled
        await signInPage.checkContinueButtonToBeDisabled();


    });

    test('vetify input  Email is valid format  ', async ({ signInPage }) => {
        // Input email fail
        await signInPage.inputEmail('newbeet@hotmail.com');

        // Expect a Continue button to be disabled
        await signInPage.checkContinueButtonToBeEnabled();


    });

    test('login fail password invail  ', async ({ signInPage }) => {
        // Input email , password fail
        await signInPage.signinPasswordfail(signInTestData.account.email, signInTestData.account.passwordfail);

        // Expect a title "to contain" a substring.
        await signInPage.checkErrorMessage('Authentication failed. Please try again.');

    });

    test('login  sucess   ', async ({ page, signInPage }) => {
        // Input email
        await signInPage.signin(signInTestData.account.email, signInTestData.account.password);

        // Expect a URL "to contain" a substring.
        await expect(page).toHaveURL(`${BASE_URL}finstable/`);
    });

});