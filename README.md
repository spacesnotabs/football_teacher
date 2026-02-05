# Football Fundamentals Lab

An interactive, animated web app to learn American football from the basics up through schemes and terminology.

## Features
- Guided learning tabs (Basics, Positions, Schemes)
- Depth toggle: Beginner → Intermediate → Advanced
- Animated play visualizer (run and pass concepts)
- Position group cards + quick glossary

## Getting Started

```bash
npm install
npm run dev
```

Open: http://localhost:5173

## Tests

```bash
npm run test:run
```

## Screenshot + Email Updates

1) Build a screenshot:
```bash
npm run screenshot
```

2) Email the latest screenshot:
```bash
node scripts/email-update.js --to you@example.com
```

Notes:
- Screenshot is saved to `screenshots/football-fundamentals.png`
- Email uses `gog` with the `theagentcomputron@gmail.com` account

## Project Structure

```
src/
  App.jsx        Main UI
  App.css        Styles
  App.test.jsx   Basic UI tests
scripts/
  screenshot.js  Generates a full-page screenshot
  email-update.js  Sends progress email + attaches screenshot
```

## Sources & Inspiration
- NFL Football Operations (rules, formations)
- Under Armour playbooks (positions, scoring)
- Wikipedia (general reference)
