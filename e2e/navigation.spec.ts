import { test, expect } from '@playwright/test';

const SECTIONS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
] as const;

test.describe('Navbar — smooth scroll to sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const section of SECTIONS) {
    test(`clicking ${section.label} scrolls into view`, async ({ page }) => {
      await page.getByRole('button', { name: new RegExp(`0\\d\\.\\s*${section.label}`) }).click();
      await expect(page.locator(`#${section.id}`)).toBeInViewport({ ratio: 0.1 });
    });
  }

  test('SG logo scrolls back to hero', async ({ page }) => {
    await page.getByRole('button', { name: /0\d\.\s*Contact/ }).click();
    await expect(page.locator('#contact')).toBeInViewport({ ratio: 0.1 });

    await page.getByRole('button', { name: 'Home' }).click();
    await expect(page.locator('#hero')).toBeInViewport({ ratio: 0.1 });
  });
});
