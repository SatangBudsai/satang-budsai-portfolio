import { defineConfig, devices } from '@playwright/test'

const port = 3131

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:${port}`, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm exec next start -p ${port}`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false
  }
})
