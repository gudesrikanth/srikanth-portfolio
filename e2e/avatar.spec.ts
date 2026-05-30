import { test, expect } from '@playwright/test';

test.describe('Profile photo security', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('image is served via /api/avatar proxy, not GitHub', async ({ page }) => {
    const img = page.getByAltText('Srikanth Gude');
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src!).toContain('/api/avatar');
    expect(src!).not.toContain('avatars.githubusercontent.com');
  });

  test('image has draggable=false', async ({ page }) => {
    const draggable = await page.getByAltText('Srikanth Gude').evaluate(
      (el) => (el as HTMLImageElement).draggable,
    );
    expect(draggable).toBe(false);
  });

  test('right-click context menu is prevented on the avatar wrapper', async ({ page }) => {
    const prevented = await page.getByAltText('Srikanth Gude').evaluate((el) => {
      const wrapper = el.parentElement;
      if (!wrapper) return null;
      const evt = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
      const dispatched = wrapper.dispatchEvent(evt);
      return !dispatched;
    });
    expect(prevented).toBe(true);
  });

  test('dragstart is prevented on the avatar wrapper', async ({ page }) => {
    const prevented = await page.getByAltText('Srikanth Gude').evaluate((el) => {
      const wrapper = el.parentElement;
      if (!wrapper) return null;
      const evt = new Event('dragstart', { bubbles: true, cancelable: true });
      const dispatched = wrapper.dispatchEvent(evt);
      return !dispatched;
    });
    expect(prevented).toBe(true);
  });

  test('Facebook-style shield badge is visible', async ({ page }) => {
    await expect(page.getByLabel('Protected profile photo')).toBeVisible();
  });

  test('GET /api/avatar returns an image with cache headers', async ({ request }) => {
    const res = await request.get('/api/avatar');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/');
    expect(res.headers()['cache-control']).toContain('max-age');
  });

  test('home page source does not leak the GitHub avatar URL', async ({ request }) => {
    const res = await request.get('/');
    const body = await res.text();
    expect(body).not.toContain('avatars.githubusercontent.com');
  });
});
