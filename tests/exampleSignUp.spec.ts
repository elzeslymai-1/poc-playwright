import { test, expect } from '../fixtures/pageFixtures'
import signUpTestData from '../testData/signUpTestData';

const BASE_URL = process.env.BASE_URL || ''

test.describe('Test Execution - Sign up page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/sign-up/`)
  })

  test('Should access to sign up page', async ({ signUpPage }) => {
    // Expect a title "to contain" a substring.
    await signUpPage.checkTitle('Sign up - Plane');

    // Expect a header "to contain" a substring.
    await signUpPage.checkPageHeader('Sign up');
  })

  test('Continue button should be disable', async ({ signUpPage }) => {
    // Expect a Continue button to be disabled
    await signUpPage.checkContinueButtonToBeDisabled()
  })

  test('Continue button should be enable', async ({ signUpPage }) => {
    // Input email
    await signUpPage.inputEmail(signUpTestData.account.email);

    // Expect a Continue button to be enabled
    await signUpPage.checkContinueButtonToBeEnabled()
  })

  test('OTP input should be visible', async ({ signUpPage }) => {
    // Input email
    await signUpPage.inputEmail(signUpTestData.account.email);

    // Click continue button
    await signUpPage.clickContinue();

    // Expect a OTP input to be visible
    await signUpPage.checkOtpInputVisible()
  })

  test.skip('Should display an error message when input invalid OTP', async ({ page, signUpPage }) => {
    // Input email
    await signUpPage.inputEmail('test123456@test.com');

    // Click continue button
    await signUpPage.clickContinue();

    // Input OTP
    await signUpPage.inputOtp(signUpTestData.account.otp);

    // Click continue button
    await signUpPage.clickContinue();

    await page.waitForTimeout(5000)

    // Expect a error message "to contain" a substring.
    await signUpPage.checkErrorMessage('Invalid magic code. Please try again.');
  })
})

