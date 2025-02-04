import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://app.plane.so/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Log in - Plane");
});

