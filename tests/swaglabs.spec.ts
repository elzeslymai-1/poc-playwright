import { test, expect } from '../fixtures/pageFixtures'
import swagLabsTestData from '../testData/swagLabsTestData'

const BASE_URL = process.env.BASE_URL || ''

test.describe('Test Execution - Swag Labs Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}`)
      });

    test('Display PageHeader', async ({ swagLabsPage }) => {
        await swagLabsPage.checkPageHeader('Swag Labs');
    });

    test('Visible username and password input', async ({ swagLabsPage }) => {
        
        //username visible
        await swagLabsPage.checkUsernameInputToBeVisible();
        //password visible
        await swagLabsPage.checkPasswordInputToBeVisible();
    });

    test('Empty username and password field and Click Login button', async ({ swagLabsPage }) => {
        
        //click log in button
        await swagLabsPage.clickLoginButton();

        //get error message
        await swagLabsPage.checkErrorMessage('Epic sadface: Username is required')
    });

    test('Empty username field and Click Login button', async ({ swagLabsPage }) => {
        
        //input password 
        await swagLabsPage.inputPassword(swagLabsTestData.account.password);
       
        //click log in button
        await swagLabsPage.clickLoginButton();

        //get error message
        await swagLabsPage.checkErrorMessage('Epic sadface: Username is required')
    });

    test('Empty password field and Click Login button', async ({ swagLabsPage }) => {
        
        //input password 
        await swagLabsPage.inputUsername(swagLabsTestData.account.username);
       
        //click log in button
        await swagLabsPage.clickLoginButton();

        //get error message
        await swagLabsPage.checkErrorMessage('Epic sadface: Password is required')
    });

    test('Input invalid username and password', async ({ swagLabsPage }) => {
        
        //inpu invalid username and password 
        // await swagLabsPage.inputUsername(swagLabsTestData.account.invalidusername);
        // await swagLabsPage.inputPassword(swagLabsTestData.account.invalidpassword);
        await swagLabsPage.signinFailed(swagLabsTestData.account.invalidusername, swagLabsTestData.account.invalidpassword);


        //click log in button
        await swagLabsPage.clickLoginButton();

        //get error message
        await swagLabsPage.checkErrorMessage('Epic sadface: Username and password do not match any user in this service')
    });

    test('Login success', async ({ page, swagLabsPage }) => {
        
        //Input valid username or password
        await swagLabsPage.signinSucess(swagLabsTestData.account.username, swagLabsTestData.account.password);

        //Expect URL
        await expect(page).toHaveURL(`${BASE_URL}inventory.html`)
    
    });

    test('Login locked out user case', async ({ page, swagLabsPage }) => {
        
        //Input valid username or password
        await swagLabsPage.signinSucess(swagLabsTestData.account.lockedoutuser, swagLabsTestData.account.password);

        //get error message
        await swagLabsPage.checkErrorMessage('Epic sadface: Sorry, this user has been locked out.')
   
    });

    test('Login problem user case', async ({ page, swagLabsPage }) => {
        
        //Input valid username or password
        await swagLabsPage.signinSucess(swagLabsTestData.account.problemuser, swagLabsTestData.account.password);

        //Expect URL
        await expect(page).toHaveURL(`${BASE_URL}inventory.html`)
    
    });

    test('Login performance glitch user case', async ({ page, swagLabsPage }) => {
        
        //Input valid username or password
        await swagLabsPage.signinSucess(swagLabsTestData.account.performanceuser, swagLabsTestData.account.password);

        //Expect URL
        await expect(page).toHaveURL(`${BASE_URL}inventory.html`)
    
    });

    test('Login error user case', async ({ page, swagLabsPage }) => {
        
        //Input valid username or password
        await swagLabsPage.signinSucess(swagLabsTestData.account.erroruser, swagLabsTestData.account.password);

        //Expect URL
        await expect(page).toHaveURL(`${BASE_URL}inventory.html`)
    
    });

    test('Login visual user case', async ({ swagLabsPage }) => {
        
        //Input valid username or password
        await swagLabsPage.signinSucess(swagLabsTestData.account.visualuser, swagLabsTestData.account.password);

    });

    test('Logout case', async ({ swagLabsPage }) => {
        
        //logout
        await swagLabsPage.signoutSuccess(swagLabsTestData.account.username, swagLabsTestData.account.password);
    
    });
    

});