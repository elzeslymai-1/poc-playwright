import { test, expect } from '../fixtures/pageFixtures'
import { SignUpPage } from '../pageObject/signupObject';
import signUpTestData from '../testData/signUpTestData';

const BASE_URL = process.env.BASE_URL || ''


test.describe('Test Execution - Sign up page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/sign-up/`)
    });
    
    
    test('Check display of sign up page', async ({ signUpPage }) => {
    
        await signUpPage.checkTitle('Sign up - Plane');
        await signUpPage.checkPageHeader('Sign up');
    
    });
    
     test('get error message when input invaid email format', async ({ signUpPage }) => {
    
        //check when input invaid email format and display error message
        await signUpPage.inputEmail(signUpTestData.account.invalidformatemail)
        await signUpPage.clickBody();

        //get message error
        await signUpPage.checkErrorMessageInvalidEmailFormat('Email is invalid');

    
     });
    
     test('clear data in the email field', async ({ signUpPage }) => {
    
        //input and clear data
        await signUpPage.inputEmail(signUpTestData.account.validemail);
        await signUpPage.checkClearButtonVisible();
        await signUpPage.clickClearButton();
    
        //check that the email field is empty
        await signUpPage.checkInputEmailEmpty();
    
     });
    
     test('refresh the page', async ({ signUpPage }) => {
       
        //input email
        await signUpPage.inputEmail(signUpTestData.account.validemail);
       
        //Refresh the page and check the email field is empty
        await signUpPage.reloadPage();
        await signUpPage.checkInputEmailEmpty();
    
     });


     test('check continue button is disabled', async ({ signUpPage }) => {
    
        //input email
        await signUpPage.inputEmail(signUpTestData.account.invalidformatemail);
        
        //check that the button Continue is disabled
        await signUpPage.checkContinueButtonToBeDisabled();
    
     });
    
     test('check continue button is enabled', async ({ signUpPage }) => {
    
        
        //input email
        await signUpPage.inputEmail(signUpTestData.account.validemail);
        
        //check that the button Continue is enabled
        await signUpPage.checkContinueButtonToBeEnabled();
    
     });
    
     test('display input Unique code', async ({ signUpPage }) => {
    
        //Input valid email format
        await signUpPage.inputEmail(signUpTestData.account.validemail);
        await signUpPage.clickContinue();

        //Visible Unique code field
        await signUpPage.checkOtpInputVisible();
    
     });
    
     test('get message error when input invalid Unique code', async ({ signUpPage }) => {
    
        //Input valid email format
        await signUpPage.inputEmail(signUpTestData.account.validemail);
        await signUpPage.clickContinue();

        //Input invalid Unique code
        await signUpPage.checkOtpInputVisible();
        await signUpPage.inputOtp(signUpTestData.account.otp);

        //Click continue button
        await signUpPage.clickContinue();

        //get message error
        await signUpPage.checkErrorMessage('Invalid magic code. Please try again.');

     });


})





