/* eslint-disable @stylistic/padding-line-between-statements */
import { AxeBuilder } from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test.describe('The Home Page', () => {
	test('Title', async ({ page }) => {
		const TITLE = page.getByRole('heading', {
			name: '⚡ Vite React Best Practices Template (by Codely) ⚛️',
		});
		await expect(TITLE).toBeVisible();
	});

	test('Change theme', async ({ page }) => {
		const BUTTON_THEME = page.getByRole('button', { name: 'Change Theme' });
		await BUTTON_THEME.click();
		const BODY_TAG = page.locator('body');
		await expect(BODY_TAG).toHaveClass('dark');
	});

	test.describe('Accessibility', () => {
		test('Should not have any automatically detectable accessibility issues', async ({
			page,
		}) => {
			const ACCESSIBILITY_SCAN_RESULTS = await new AxeBuilder({
				page,
			}).analyze();

			expect(ACCESSIBILITY_SCAN_RESULTS.violations).toHaveLength(0);
		});
	});
});
