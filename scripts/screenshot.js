import { spawn, spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const PORT = process.env.PORT || '4173'
const URL = `http://localhost:${PORT}`
const SCREENSHOT_DIR = 'screenshots'

const waitForServer = async (url, retries = 25) => {
  for (let i = 0; i < retries; i += 1) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch (err) {
      // ignore
    }
    await new Promise((resolve) => setTimeout(resolve, 400))
  }
  throw new Error(`Server not ready at ${url}`)
}

const run = async () => {
  await mkdir(SCREENSHOT_DIR, { recursive: true })

  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' })
  if (build.status !== 0) {
    throw new Error('Build failed; cannot run screenshot.')
  }

  const preview = spawn('npm', ['run', 'preview', '--', '--port', PORT, '--strictPort'], {
    stdio: 'pipe',
  })

  preview.stdout.on('data', (data) => process.stdout.write(data))
  preview.stderr.on('data', (data) => process.stderr.write(data))

  try {
    await waitForServer(URL)

    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
    await page.goto(URL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1000)

    const filePath = `${SCREENSHOT_DIR}/football-fundamentals.png`
    await page.screenshot({ path: filePath, fullPage: true })
    await browser.close()

    const note = `Screenshot saved to ${filePath}`
    await writeFile(`${SCREENSHOT_DIR}/README.txt`, `${note}\n`)
    console.log(note)
  } finally {
    preview.kill('SIGTERM')
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
