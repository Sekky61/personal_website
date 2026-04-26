import { defineConfig, devices } from '@playwright/test'

const previewPort = 4173
const previewHost = '127.0.0.1'
const baseURL = `http://${previewHost}:${previewPort}`

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: devices['Desktop Chrome'],
    },
  ],
  webServer: {
    command: `bun run build && bun run preview --host ${previewHost} --port ${previewPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
