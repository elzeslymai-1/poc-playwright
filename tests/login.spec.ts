import { test, expect } from '@playwright/test';
import { execPath } from 'process';

test('test login ', async ({ page }) => {
await page.goto('https://app.plane.so/');

await expect(page.locator('.text-3xl.font-bold.text-onboarding-text-100')).toHaveText('Log in or sign up');




});

