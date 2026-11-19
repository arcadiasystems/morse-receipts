import { Fragment } from 'react'
import { SectionHead } from '../base/SectionHead'

type TerminalLine = { comment: string } | { command: string } | { continued: string } | { blank: true }

/* The two commands a reader runs. Checked against @arcadiasystems/morse-cli
   0.14.0 with `morse <command> --help` and run on Testnet on 19 Nov 2026.
   No line is longer than 40 characters, so the terminal never wraps or
   scrolls on a phone: keep it that way when a command changes. */
const TERMINAL: TerminalLine[] = [
  { comment: '# install once' },
  { command: 'npm i -g @arcadiasystems/morse-cli' },
  { blank: true },
  { comment: '# the record: who published it, when,' },
  { comment: '# and which blob' },
  { command: 'morse --network mainnet entry get \\' },
  { continued: '  <entry-id> -P <publication-id> \\' },
  { continued: '  -C <collection>' },
  { blank: true },
  { comment: '# the content, fetched from Walrus' },
  { comment: '# storage nodes and checked against' },
  { comment: '# that blob, no aggregator between' },
  { command: 'morse --network mainnet entry read \\' },
  { continued: '  <entry-id> -P <publication-id> \\' },
  { continued: '  -C <collection>' },
]

function Line({ line }: { line: TerminalLine }) {
  if ('comment' in line) return <span className="c">{line.comment}</span>
  if ('command' in line) {
    return (
      <>
        <span className="p">$</span> {line.command}
      </>
    )
  }
  if ('continued' in line) return line.continued
  return null
}

const JOBS = [
  {
    job: 'The check',
    today: 'From the CLI, on any entry',
    next: 'A public page anyone can open',
    when: 'Q4 2026',
  },
  {
    job: 'Sharing it',
    today: 'Send the two commands',
    next: 'A link and an embed badge',
    when: 'Q4 2026',
  },
  {
    job: 'Taking a post down',
    today: 'Correct it with a new revision',
    next: 'Hide or replace, receipt kept',
    when: 'in design',
  },
]

/** The terminal with the verified commands, beside three jobs each split into today and next. */
export function Today() {
  return (
    <section className="sec flush" id="today">
      <div className="wrap">
        <SectionHead
          label="Check today"
          title={
            <>
              The check works now. <em>The page is next.</em>
            </>
          }
          lead="The same three checks run from the command line today, on mainnet and testnet. The public page turns them into a link."
        />
        <div className="two">
          <div className="glass tty">
            <div className="tty__bar">
              <b>CLI</b>
              <span>CLI 0.14 · checked 19 Nov 2026</span>
            </div>
            <pre>
              {TERMINAL.map((line, index) => (
                <Fragment key={index}>
                  {index > 0 && '\n'}
                  <Line line={line} />
                </Fragment>
              ))}
            </pre>
          </div>
          <div>
            <ul className="tn">
              {JOBS.map(({ job, today, next, when }) => (
                <li key={job}>
                  <b>{job}</b>
                  <div className="pair">
                    <div className="cell now">
                      <small>Today · shipped</small>
                      {today}
                    </div>
                    <div className="cell next">
                      <small>Next · {when}</small>
                      {next}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="fine">
              Commands and flags checked against morse-cli 0.14.0. Reading through Walrus storage nodes verifies the
              content on your machine; the optional aggregator route is faster and does not.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
