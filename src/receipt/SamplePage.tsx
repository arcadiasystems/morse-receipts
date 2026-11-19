import type { ReactNode } from 'react'
import { BADGE_SCRIPT_PROPOSED, DOCS_VERIFY } from '../lib/links'
import { TickIcon } from './icons'
import { ReceiptFrame } from './ReceiptFrame'

/* The receipt itself, in its default state: verified, current revision. A
   static design route. Every id, wallet, digest, date and number on it is
   sample data, and no verification is wired: links that would open a record,
   a comparison or the post go nowhere until the public page ships. */

/** A link the public page will wire up. It stays on this page for now. */
function Pending({ children }: { children: ReactNode }) {
  return <a href="#">{children}</a>
}

const CHECKS: { title: string; text: string; evidence: ReactNode }[] = [
  {
    title: 'The content has not changed',
    text: 'The blob ID is worked out from the content itself. The bytes fetched from Walrus produce the same ID the record points to. One changed character would break the match.',
    evidence: 'walrus blob 0iKeiiQ2xT4nWc9LrBv7Hd3YpUo5Ae1Zs8GkJm7Xp · recomputed from the bytes · match',
  },
  {
    title: 'This is the published version',
    text: 'Revision 3 is the one the publication marks as public. Two earlier revisions exist and are listed below.',
    evidence: 'entry 0x7be4…41c0 · public head = revision 3',
  },
  {
    title: 'The author had the right to publish',
    text: 'The wallet that wrote this revision held a publishing key for Signal & Noise at the time of writing.',
    evidence: (
      <>
        wallet 0x1a2c…9f0e · PublisherCap valid at tx <Pending>D9YfjkA3…9vB</Pending>
      </>
    ),
  },
]

const REVISIONS = [
  {
    number: 3,
    current: true,
    title: 'Correction',
    text: 'Fixed the storage cost figure in section 2.',
    stamp: '12 Nov 2026 · 14:12 UTC · 0x1a2c…9f0e',
    links: ['Compare with 2'],
  },
  {
    number: 2,
    current: false,
    title: 'Edit',
    text: 'Added the section on agent memory.',
    stamp: '9 Oct 2026 · 09:40 UTC · 0x1a2c…9f0e',
    links: ['View', 'Compare with 1'],
  },
  {
    number: 1,
    current: false,
    title: 'First published',
    text: 'Written and signed by an agent wallet.',
    stamp: '8 Oct 2026 · 17:03 UTC · 0x8d41…27aa',
    links: ['View'],
  },
]

const RECORD: { term: string; value: ReactNode }[] = [
  {
    term: 'Publication',
    value: (
      <>
        Signal &amp; Noise
        <br />
        0x69d4c49b…9cf327
      </>
    ),
  },
  { term: 'Entry', value: '0x7be4…41c0' },
  { term: 'Published', value: '12 Nov 2026, 14:12:08 UTC' },
  { term: 'Author wallet', value: '0x1a2c…9f0e' },
  { term: 'Sui transaction', value: <Pending>D9YfjkA3…9vB</Pending> },
  { term: 'Walrus blob', value: <Pending>0iKeiiQ2…m7Xp</Pending> },
  { term: 'Storage paid through', value: '14 Nov 2027' },
]

function SampleNotice() {
  return (
    <div className="sample">
      <div className="wrap">
        Sample receipt. The public receipt page ships in Q4 2026. The same check runs today from the CLI:{' '}
        <a href={DOCS_VERIFY}>verify a post</a>.
      </div>
    </div>
  )
}

export function SamplePage() {
  return (
    <ReceiptFrame notice={<SampleNotice />}>
      <main className="page">
        <div className="wrap">
          <div className="col">
            <section className="verdict" aria-live="polite">
              <div className="seal">
                <TickIcon size={30} />
              </div>
              <div>
                <span className="mono">Receipt · 3 of 3 checks passed</span>
                <h1>This post is what was published.</h1>
                <p>
                  The words you are reading match the record made on 12 Nov 2026 at 14:12 UTC. Nothing has been changed
                  since, by the author, the host, or Morse.
                </p>
              </div>
            </section>

            <section className="post">
              <span className="av">S</span>
              <div>
                <b>Publishing from an AI agent</b>
                <small>Signal &amp; Noise · revision 3 of 3 · 1,840 words</small>
              </div>
              <a className="btn btn-soft sm" href="#">
                Read the post
              </a>
            </section>

            <section className="card" id="checks">
              <h2>
                <span>What was checked</span>
                <span className="chip ok">3 of 3</span>
              </h2>
              {CHECKS.map(({ title, text, evidence }) => (
                <div key={title} className="check">
                  <i>
                    <TickIcon size={15} />
                  </i>
                  <div>
                    <b>{title}</b>
                    <p>{text}</p>
                    <code>{evidence}</code>
                  </div>
                </div>
              ))}
            </section>

            <section className="card" id="history">
              <h2>
                <span>Revision history</span>
                <span>3 revisions · nothing removed</span>
              </h2>
              <ol className="hist">
                {REVISIONS.map(({ number, current, title, text, stamp, links }) => (
                  <li key={number} className={current ? 'cur' : undefined}>
                    <span className="dot">{number}</span>
                    <div>
                      <b>
                        {title}
                        {current && (
                          <>
                            {' '}
                            <span className="chip ultra">Current</span>
                          </>
                        )}
                      </b>
                      <p>{text}</p>
                      <small>{stamp}</small>
                    </div>
                    <div className="lk">
                      {links.map(label => (
                        <Pending key={label}>{label}</Pending>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="self" id="self">
              <div className="hd">
                <b>Do not take our word for it.</b>
                <span>Run the same check yourself. It reads from Sui and Walrus storage nodes directly.</span>
              </div>
              <pre>
                <span className="c"># the record: who, when, which blob</span>
                {'\n'}
                <span className="p">$</span>
                {' morse entry get 0x7be4…41c0\n\n'}
                <span className="c"># the bytes, direct from Walrus nodes</span>
                {'\n'}
                <span className="p">$</span>
                {' morse entry read 0x7be4…41c0'}
              </pre>
            </section>
          </div>

          <aside className="rail">
            <div className="box">
              <h3>The record</h3>
              <dl>
                {RECORD.map(({ term, value }) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="box">
              <h3>Share this receipt</h3>
              <div className="url">
                <span>morsecms.xyz/r/0x7be4…41c0</span>
                <button className="btn btn-ink sm" type="button">
                  Copy
                </button>
              </div>
              <p>Or put the badge next to the post. It re-runs the check each time it loads.</p>
              <span className="badge">
                <i>
                  <TickIcon size={11} />
                </i>
                Verified on Morse <small>rev 3</small>
              </span>
              <div className="embed">{`<script src="${BADGE_SCRIPT_PROPOSED}" data-entry="0x7be4…41c0"></script>`}</div>
            </div>

            <div className="box ink">
              <h3>What this does not prove</h3>
              <ul>
                <li>That the content is true. A receipt proves what was published, not whether it is right.</li>
                <li>Who is behind the wallet. It proves which wallet signed, and that it had publishing rights.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </ReceiptFrame>
  )
}
