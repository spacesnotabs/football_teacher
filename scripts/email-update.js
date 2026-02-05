import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const args = process.argv.slice(2)
const getArg = (name) => {
  const idx = args.indexOf(name)
  return idx !== -1 ? args[idx + 1] : null
}

const to = getArg('--to') || process.env.EMAIL_TO
const subject = getArg('--subject') || 'Football Fundamentals Lab — Progress Update'

if (!to) {
  console.error('Missing --to <email> (or set EMAIL_TO env var).')
  process.exit(1)
}

const screenshotPath = 'screenshots/football-fundamentals.png'
const body = `Hi Chris,\n\nHere’s the latest update on the Football Fundamentals Lab. I’ve attached the newest screenshot.\n\nHighlights:\n- Interactive learning tabs with depth levels\n- Animated play visualizer\n- Position groups + glossary\n\nMore updates soon.\n\n— Computron\n`

const argsList = [
  'gmail',
  'send',
  '--account',
  'theagentcomputron@gmail.com',
  '--to',
  to,
  '--subject',
  subject,
  '--body-file',
  '-',
]

if (existsSync(screenshotPath)) {
  argsList.push('--attach', screenshotPath)
}

const result = spawnSync('gog', argsList, {
  input: body,
  stdio: ['pipe', 'inherit', 'inherit'],
})

process.exit(result.status || 0)
