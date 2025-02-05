import { test, expect } from '../fixtures/pageFixtures'
import signInTestData from '../testData/signInTestData';

const BASE_URL = process.env.BASE_URL || ''

test.describe('Test Execution - Sign in page', () => {

  test.beforeEach(async ({ signInPage }) => {
    await signInPage.gotoSignInPage()
  })

  test('Should access to sign in page', async ({ signInPage }) => {
    // Expect a title "to contain" a substring.
    await signInPage.checkTitle('Log in - Plane');

    // Expect a title "to contain" a substring.
    await signInPage.checkPageHeader('Log in or sign up');
  })

  test('Continue button should be disable', async ({ signInPage }) => {
    // Expect a Continue button to be disabled
    await signInPage.checkContinueButtonToBeDisabled()
  })

  test('Continue button should be enable', async ({ signInPage }) => {
    // Input email
    await signInPage.inputEmail(signInTestData.account.email);

    // Expect a Continue button to be enabled
    await signInPage.checkContinueButtonToBeEnabled()
  })

  test('Password input should be visible', async ({ signInPage }) => {
    // Input email
    await signInPage.inputEmail(signInTestData.account.email);

    // Click continue button
    await signInPage.clickContinue();

    // Expect a password input to be visible
    await signInPage.checkPasswordInputVisible()
  })

  test('Should be able to Sign in', async ({ page, signInPage }) => {
    // Input email
    await signInPage.signin(signInTestData.account.email, signInTestData.account.password);

    // Expect a URL "to contain" a substring.
    await expect(page).toHaveURL(`${BASE_URL}/finstable/`);
  })

  test('Shold displayed an error message when input invalid password', async ({ signInPage }) => {
    // Input email
    await signInPage.signin(signInTestData.account.email, 'wrong password');

    // Expect a title "to contain" a substring.
    await signInPage.checkErrorMessage('Authentication failed. Please try again.');
  })

})

