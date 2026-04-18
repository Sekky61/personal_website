import { expect, test } from '@playwright/test'

test('renders MDX content on the about page', async ({ page }) => {
  await page.goto('/about')

  await expect(page).toHaveTitle(/About me \| Majer/)
  await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible()
  await expect(page.locator('h2 a[href="#education"]')).toBeVisible()
  await expect(
    page.getByText(/I am a programmer who enjoys web technologies/),
  ).toBeVisible()
  await expect(page.locator('strong')).toContainText([
    'Zig',
    'Rust',
    'TypeScript',
    'React',
  ])
  await expect(page.getByText('Show copied source')).toHaveCount(0)
})

test.describe('about page without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('renders strong tags from prerendered MDX HTML', async ({ page }) => {
    await page.goto('/about')

    await expect(page.getByRole('heading', { name: 'About me' })).toBeVisible()
    await expect(page.locator('strong', { hasText: 'Zig' })).toBeVisible()
    await expect(page.locator('strong', { hasText: 'TypeScript' })).toBeVisible()
  })
})
