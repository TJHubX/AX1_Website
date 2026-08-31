import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/', '/system', '/capital', '/deployment', '/trust', '/founder',
  '/privacy', '/cookies', '/terms', '/disclaimer', '/legal', '/accessibility',
];

for (const route of routes) {
  test(`${route} loads directly with its complete document structure`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      route === '/' ? 'https://ax1.capital/' : `https://ax1.capital${route}`,
    );
  });
}

test('unknown routes return an actual 404 document', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page is not available.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

test('primary navigation works on the first click', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'System', exact: true }).first().click();
  await expect(page).toHaveURL(/\/system$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('the enquiry modal opens, traps the workflow, and closes with Escape', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const trigger = page.getByRole('button', { name: /Contact Axis One/i });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test('representative pages have no serious automated accessibility violations', async ({ page }) => {
  const failures: string[] = [];
  for (const route of ['/', '/trust', '/privacy']) {
    await page.goto(route, { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    for (const violation of results.violations.filter((item) => ['serious', 'critical'].includes(item.impact || ''))) {
      for (const node of violation.nodes) {
        failures.push(`${route} ${violation.id} ${node.target.join(' ')}: ${node.any[0]?.message ?? violation.help}`);
      }
    }
  }
  expect(failures.join('\n')).toBe('');
});

test.describe('mobile layout', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  for (const route of ['/', '/system', '/capital', '/deployment', '/trust', '/founder']) {
    test(`${route} has no horizontal page overflow`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
      await expect(page.getByRole('button', { name: /Menu/i })).toBeVisible();
    });
  }

  test('the mobile enquiry modal remains inside the viewport', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Contact Axis One/i }).click();
    const box = await page.getByRole('dialog').boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.width).toBeLessThanOrEqual(390);
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.height).toBeLessThanOrEqual(844);
  });
});
