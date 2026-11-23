import { expect, test } from '@playwright/test'

test('portfolio survives hydration and client navigation', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/portfolio')
  await expect(page.getByRole('heading', { name: 'Professional work' })).toBeVisible()

  await page.getByRole('link', { name: 'About me', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'About me', exact: true })).toBeVisible()
  await page.getByRole('link', { name: 'Portfolio', exact: true }).click()

  await expect(page.getByRole('heading', { name: 'Professional work' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Personal projects' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'RISC-V simulator' })).toBeVisible()
  expect(errors).toEqual([])
})
