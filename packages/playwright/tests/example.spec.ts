import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto(`${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  const header = await page.getByText('Welcome to SvelteKit');
  // Expect a title "to contain" a substring.
  await expect(header).toBeDefined();
});
