import { test, expect } from '@playwright/test';

test.describe('Hero section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders name, typewriter role, and stats', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero.getByRole('heading', { name: 'Srikanth Gude' })).toBeVisible();
    await expect(
      hero
        .getByText(/Senior Software Engineer|Cloud-Native Architect|AI & Generative Agents|Microservices Specialist/)
        .first(),
    ).toBeVisible();
    await expect(hero.getByText('Years experience')).toBeVisible();
    await expect(hero.getByText('Cloud platforms')).toBeVisible();
    await expect(hero.getByText('Production services')).toBeVisible();
  });

  test('CTA buttons are visible and clickable', async ({ page }) => {
    const viewWork = page.getByRole('button', { name: /View my work/i });
    const getInTouch = page.getByRole('button', { name: /Get in touch/i });
    await expect(viewWork).toBeVisible();
    await expect(getInTouch).toBeVisible();

    await viewWork.click();
    await expect(page.locator('#projects')).toBeInViewport({ ratio: 0.1 });
  });
});
