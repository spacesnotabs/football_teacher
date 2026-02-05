import { useMemo, useState } from 'react'
import './App.css'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

const lessons = [
  {
    id: 'basics',
    title: 'Basics of the Game',
    intro:
      'Football is about winning territory: move the ball 10 yards in four downs, then keep going until you score.',
    levels: {
      Beginner: [
        {
          title: 'Downs & Distance',
          short:
            'You have 4 plays (downs) to gain 10 yards. Get 10 and you earn a new set of downs.',
          deep:
            '“3rd & 7” means it’s the third down and 7 yards remain. Teams usually pass on long yardage and run on short yardage, but good play-calling keeps the defense guessing.',
        },
        {
          title: 'Scoring',
          short:
            'Touchdown (6), Extra Point (1), Two-Point Conversion (2), Field Goal (3), Safety (2).',
          deep:
            'After a TD, the try is a single play. The defense can also score on a try if they return the ball.',
        },
        {
          title: 'Line of Scrimmage',
          short: 'An invisible line where the ball starts each play. Offense and defense line up on opposite sides.',
          deep:
            'Most penalties relate to movement relative to the line of scrimmage: false start, offside, neutral zone infraction.',
        },
      ],
      Intermediate: [
        {
          title: 'Field Position & Clock',
          short:
            'Coaches trade risk for field position. A punt might be smarter than a risky 4th down.',
          deep:
            'Late-game strategy changes: timeouts, spikes, and sidelines become critical; defenses switch to “prevent.”',
        },
        {
          title: 'Personnel Groups',
          short:
            'Numbers like 11 or 12 describe skill players: RBs then TEs. “11” = 1 RB, 1 TE, 3 WRs.',
          deep:
            'Defenses answer with matching packages (nickel, dime) to add DBs against multiple receivers.',
        },
        {
          title: 'Run vs Pass Balance',
          short:
            'Runs keep the offense on schedule. Passes create big gains but add risk (sacks, turnovers).',
          deep:
            'Play-action uses run looks to freeze linebackers and open passing lanes behind them.',
        },
      ],
      Advanced: [
        {
          title: 'Pre-Snap Reads',
          short:
            'Quarterbacks identify coverage and blitz clues before the snap.',
          deep:
            'Safeties’ depth and leverage can hint Cover 2 vs Cover 3. Motion can reveal man vs zone.',
        },
        {
          title: 'Situational Football',
          short:
            'Third down, red zone, two-minute drill—each changes the playbook and decision-making.',
          deep:
            'The red zone shrinks vertical space, so spacing and timing routes become more important.',
        },
        {
          title: 'Risk Management',
          short:
            'Coaches weigh win probability vs field position, time, and score.',
          deep:
            'Modern analytics often favor 4th-down aggression when the expected value is high.',
        },
      ],
    },
  },
  {
    id: 'positions',
    title: 'Positions & Responsibilities',
    intro:
      'Every position has a job. Learn the core roles, then explore how they fit together.',
    levels: {
      Beginner: [
        {
          title: 'Offense',
          short: 'QB leads, RBs run, WRs & TEs catch, OL block.',
          deep:
            'The center snaps the ball. Guards and tackles form a pocket or open run lanes. Receivers align based on the play design.',
        },
        {
          title: 'Defense',
          short: 'DLs control the line, LBs read/run, DBs cover passes.',
          deep:
            'Defenses try to force long-yardage situations and create turnovers.',
        },
        {
          title: 'Special Teams',
          short: 'Kickoffs, punts, field goals, and returns.',
          deep:
            'A single special-teams play can flip field position or swing momentum.',
        },
      ],
      Intermediate: [
        {
          title: 'QB & Protection',
          short: 'The QB reads coverage and delivers the ball; protection keeps them upright.',
          deep:
            'Protections can slide, man-block, or use the RB/TE to pick up blitzers.',
        },
        {
          title: 'Linebacker Reads',
          short: 'LBs read the backfield: run fits first, then pass drops.',
          deep:
            'Good linebackers can “fit” the run while still getting depth in zone coverage.',
        },
        {
          title: 'DB Techniques',
          short: 'Man coverage mirrors receivers; zone guards space and eyes the QB.',
          deep:
            'Cornerbacks use leverage (inside/outside) to funnel routes into help.',
        },
      ],
      Advanced: [
        {
          title: 'Route Trees',
          short: 'Receivers use precise stems and breaks to create separation.',
          deep:
            'Timing routes like outs, comebacks, and digs depend on the QB’s drop depth.',
        },
        {
          title: 'Pass Rush Lanes',
          short: 'Rushers attack with technique while keeping the QB contained.',
          deep:
            'Edge rushers bend the corner; interior rushers collapse the pocket.',
        },
        {
          title: 'Specialists',
          short: 'Kickers, punters, long snappers—tiny details, huge impact.',
          deep:
            'Directional kicking and hang time are strategic tools to limit returns.',
        },
      ],
    },
  },
  {
    id: 'schemes',
    title: 'Schemes & Coverages',
    intro:
      'Schemes are the chess of football—structure plus rules for each player.',
    levels: {
      Beginner: [
        {
          title: 'Offensive Formations',
          short: 'Under center, shotgun, singleback, trips, bunch.',
          deep:
            'Formations reveal spacing: shotgun gives the QB time to scan, trips overloads a side.',
        },
        {
          title: 'Defensive Fronts',
          short: '4-3 and 3-4 describe the number of DLs and LBs.',
          deep:
            'A 4-3 has four linemen and three linebackers. A 3-4 trades a lineman for a linebacker.',
        },
        {
          title: 'Coverage Types',
          short: 'Man coverage follows players. Zone coverage defends space.',
          deep:
            'Cover 2 = two deep safeties. Cover 3 = three deep defenders.',
        },
      ],
      Intermediate: [
        {
          title: 'Run Concepts',
          short: 'Inside zone, outside zone, power, counter.',
          deep:
            'Zone runs flow horizontally; power runs pull blockers to create a new gap.',
        },
        {
          title: 'Pass Concepts',
          short: 'Slants, curls, floods, mesh, four verticals.',
          deep:
            'A flood sends three routes to one side to stretch a zone vertically.',
        },
        {
          title: 'Pressure',
          short: 'Blitzes add rushers; stunts twist rush lanes.',
          deep:
            'Simulated pressure shows blitz then drops rushers, confusing protections.',
        },
      ],
      Advanced: [
        {
          title: 'Coverage Rotations',
          short: 'Safeties rotate after the snap to disguise coverage.',
          deep:
            'Cover 2 pre-snap can spin into Cover 3 or Cover 1 based on the call.',
        },
        {
          title: 'Option Routes',
          short: 'Receivers adjust routes based on leverage and coverage.',
          deep:
            'Slot receivers read the defender’s hips: break out if inside leverage, break in if outside.',
        },
        {
          title: 'Game Planning',
          short: 'Coaches attack tendencies and stress weak matchups.',
          deep:
            'Scripted opening drives probe the defense to gather data.',
        },
      ],
    },
  },
]

const positionGroups = {
  offense: [
    { name: 'QB', role: 'Field general: reads defense, calls signals, throws or hands off.' },
    { name: 'RB', role: 'Runs the ball, blocks, and catches out of the backfield.' },
    { name: 'WR', role: 'Runs routes to catch passes and stretch the defense.' },
    { name: 'TE', role: 'Hybrid: blocks like a lineman, catches like a receiver.' },
    { name: 'OL', role: 'Centers, guards, tackles—protect the QB and open run lanes.' },
  ],
  defense: [
    { name: 'DT/NT', role: 'Interior linemen who clog running lanes and push the pocket.' },
    { name: 'DE', role: 'Edge rushers who contain runs and pressure the QB.' },
    { name: 'LB', role: 'Versatile defenders: stop the run, drop in coverage, blitz.' },
    { name: 'CB', role: 'Cover wide receivers and defend passes on the outside.' },
    { name: 'S', role: 'Safeties defend deep passes and support the run.' },
  ],
  special: [
    { name: 'K', role: 'Kicks field goals, extra points, and kickoffs.' },
    { name: 'P', role: 'Punts on 4th down to flip field position.' },
    { name: 'LS', role: 'Long snapper for punts and field goals.' },
    { name: 'KR/PR', role: 'Kick/punt returner—tries to gain big yardage on returns.' },
    { name: 'Gunners', role: 'Sprint downfield to tackle returners quickly.' },
  ],
}

const plays = [
  {
    id: 'slant-flat',
    name: 'Slant / Flat (Quick Pass)',
    type: 'Pass',
    description:
      'A fast concept: one receiver slants inside while another runs to the flat. The QB reads the defender’s leverage.',
    routes: [
      { id: 'wr1', label: 'WR', start: [15, 40], end: [35, 30], color: '#ffcf33', dashed: true },
      { id: 'wr2', label: 'WR', start: [15, 20], end: [30, 20], color: '#ffcf33', dashed: true },
      { id: 'rb', label: 'RB', start: [25, 30], end: [25, 15], color: '#ff6b6b', dashed: true },
      { id: 'qb', label: 'QB', start: [20, 30], end: [22, 30], color: '#4dabf7', dashed: false },
    ],
  },
  {
    id: 'inside-zone',
    name: 'Inside Zone (Run)',
    type: 'Run',
    description:
      'The line steps in unison to create a crease. The RB presses the gap then cuts upfield.',
    routes: [
      { id: 'rb', label: 'RB', start: [25, 30], end: [45, 30], color: '#ff6b6b', dashed: false },
      { id: 'qb', label: 'QB', start: [20, 30], end: [22, 30], color: '#4dabf7', dashed: false },
    ],
  },
  {
    id: 'flood',
    name: 'Flood (Three-Level)',
    type: 'Pass',
    description:
      'Three receivers flood one side at different depths to stretch zone coverage.',
    routes: [
      { id: 'wr1', label: 'WR', start: [15, 45], end: [55, 55], color: '#ffcf33', dashed: true },
      { id: 'wr2', label: 'WR', start: [15, 38], end: [45, 42], color: '#ffcf33', dashed: true },
      { id: 'te', label: 'TE', start: [18, 32], end: [35, 30], color: '#ffcf33', dashed: true },
      { id: 'rb', label: 'RB', start: [25, 25], end: [30, 18], color: '#ff6b6b', dashed: true },
      { id: 'qb', label: 'QB', start: [20, 30], end: [23, 30], color: '#4dabf7', dashed: false },
    ],
  },
]

const glossary = [
  {
    term: 'Blitz',
    short: 'Defensive players rush the QB to create pressure.',
    deep: 'A blitz sends extra rushers, reducing coverage but speeding up the QB’s decision.',
  },
  {
    term: 'Gap',
    short: 'The space between offensive linemen.',
    deep: 'Run plays are designed to hit specific gaps (A, B, C) based on alignment.',
  },
  {
    term: 'Nickel',
    short: 'A defense with five defensive backs.',
    deep: 'Nickel packages help cover extra receivers while sacrificing some run defense.',
  },
  {
    term: 'Play-Action',
    short: 'QB fakes a handoff to influence defenders.',
    deep: 'It slows linebackers and safeties, creating windows for deeper passes.',
  },
  {
    term: 'Red Zone',
    short: 'The area inside the opponent’s 20-yard line.',
    deep: 'Shorter field means tighter windows; defenses crowd the end zone.',
  },
]

function DepthToggle({ level, onChange }) {
  return (
    <div className="depth-toggle" role="group" aria-label="Choose depth">
      {LEVELS.map((lvl) => (
        <button
          key={lvl}
          className={level === lvl ? 'active' : ''}
          onClick={() => onChange(lvl)}
        >
          {lvl}
        </button>
      ))}
    </div>
  )
}

function LessonCards({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="lesson-grid">
      {items.map((item, index) => (
        <article key={item.title} className="lesson-card">
          <header>
            <h3>{item.title}</h3>
            <p>{item.short}</p>
          </header>
          <button
            className="linkish"
            onClick={() => setOpen(open === index ? null : index)}
          >
            {open === index ? 'Show less' : 'Go deeper'}
          </button>
          {open === index && <p className="deep">{item.deep}</p>}
        </article>
      ))}
    </div>
  )
}

function PlayVisualizer() {
  const [playId, setPlayId] = useState(plays[0].id)
  const [playKey, setPlayKey] = useState(0)
  const play = useMemo(() => plays.find((p) => p.id === playId), [playId])

  return (
    <section className="play-section">
      <div className="play-header">
        <div>
          <h3>Animated Play Lab</h3>
          <p>{play.description}</p>
        </div>
        <div className="play-controls">
          <select value={playId} onChange={(e) => setPlayId(e.target.value)}>
            {plays.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <button onClick={() => setPlayKey((k) => k + 1)}>Run Play</button>
        </div>
      </div>
      <div className="play-canvas">
        <svg viewBox="0 0 100 60" aria-label="Football play animation" key={playKey}>
          <rect x="0" y="0" width="100" height="60" rx="4" className="field" />
          <line x1="30" y1="0" x2="30" y2="60" className="los" />
          {[10, 20, 40, 50].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="60" className="yard-line" />
          ))}
          {play.routes.map((route) => (
            <g key={route.id}>
              <line
                x1={route.start[0]}
                y1={route.start[1]}
                x2={route.end[0]}
                y2={route.end[1]}
                className={`route ${route.dashed ? 'dashed' : ''}`}
                stroke={route.color}
              />
              <circle cx={route.start[0]} cy={route.start[1]} r="2.5" fill={route.color}>
                <animate attributeName="cx" from={route.start[0]} to={route.end[0]} dur="2s" fill="freeze" />
                <animate attributeName="cy" from={route.start[1]} to={route.end[1]} dur="2s" fill="freeze" />
              </circle>
              <text x={route.start[0] + 2.5} y={route.start[1] - 2.5} className="player-label">
                {route.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}

function PositionsBoard() {
  const [group, setGroup] = useState('offense')
  return (
    <section className="positions">
      <div className="positions-header">
        <h3>Position Groups</h3>
        <div className="pill-row">
          {Object.keys(positionGroups).map((key) => (
            <button key={key} className={group === key ? 'active' : ''} onClick={() => setGroup(key)}>
              {key}
            </button>
          ))}
        </div>
      </div>
      <div className="position-grid">
        {positionGroups[group].map((pos) => (
          <div key={pos.name} className="position-card">
            <h4>{pos.name}</h4>
            <p>{pos.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Glossary() {
  const [open, setOpen] = useState(null)
  return (
    <section className="glossary">
      <h3>Quick Glossary</h3>
      <div className="glossary-grid">
        {glossary.map((item, index) => (
          <article key={item.term}>
            <button onClick={() => setOpen(open === index ? null : index)}>
              <span>{item.term}</span>
              <span className="muted">{open === index ? '−' : '+'}</span>
            </button>
            <p>{item.short}</p>
            {open === index && <p className="deep">{item.deep}</p>}
          </article>
        ))}
      </div>
    </section>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState(lessons[0].id)
  const [level, setLevel] = useState('Beginner')
  const lesson = useMemo(() => lessons.find((l) => l.id === activeTab), [activeTab])

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">Football Fundamentals Lab</p>
          <h1>Learn the game fast. Go deep when you&apos;re ready.</h1>
          <p className="lead">
            Interactive lessons, animated plays, and a clear path from basics to advanced football concepts.
          </p>
          <div className="hero-actions">
            <button onClick={() => setActiveTab('basics')}>Start with the Basics</button>
            <button className="ghost" onClick={() => setActiveTab('schemes')}>
              Explore Schemes
            </button>
          </div>
        </div>
        <div className="hero-card">
          <h3>How to use this</h3>
          <ul>
            <li>Pick a topic tab</li>
            <li>Choose your depth</li>
            <li>Tap “Go deeper” for details</li>
            <li>Run an animation to see it in action</li>
          </ul>
        </div>
      </header>

      <nav className="tabs" aria-label="Lesson tabs">
        {lessons.map((l) => (
          <button
            key={l.id}
            className={activeTab === l.id ? 'active' : ''}
            onClick={() => setActiveTab(l.id)}
          >
            {l.title}
          </button>
        ))}
      </nav>

      <section className="lesson-section">
        <div className="lesson-header">
          <div>
            <h2>{lesson.title}</h2>
            <p>{lesson.intro}</p>
          </div>
          <DepthToggle level={level} onChange={setLevel} />
        </div>
        <LessonCards items={lesson.levels[level]} />
      </section>

      <PlayVisualizer />
      <PositionsBoard />
      <Glossary />

      <footer className="footer">
        <div>
          <h4>Sources & Inspiration</h4>
          <p>
            NFL Football Operations, Under Armour playbooks, and general reference coverage from Wikipedia.
          </p>
        </div>
        <p className="muted">Built for Chris by Computron 😼</p>
      </footer>
    </div>
  )
}

export default App
