import { expect, test } from '@playwright/test'

test('renders the landing page', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Majer/)
  await expect(page.getByText("Hi, I'm Michal.")).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Latest posts' })).toBeVisible()
})
