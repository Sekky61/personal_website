import { expect, test } from '@playwright/test'

test('renders code samples inside an article page', async ({ page }) => {
  await page.goto('/post/test')

  await expect(page).toHaveTitle(/Testing article \| Majer/)
  await expect(
    page.getByRole('heading', { name: 'Testing article' }),
  ).toBeVisible()

  await expect(page.getByText(/int main\(int argc\) \{\}/)).toBeVisible()
  await expect(page.getByText('mkdir foo')).toBeVisible()
  await expect(page.getByText(/Alt, Tab, cyclenext/)).toBeVisible()
  await expect(page.getByText('Loading code sample...')).toHaveCount(0)
  await expect(page.getByText('Code sample failed to load.')).toHaveCount(0)
})
