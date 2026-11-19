import type { ReactNode } from 'react'
import { HOME_PROOF } from '../lib/links'
import { ClockIcon, CrossIcon, DashIcon, LockIcon, QuestionIcon, TickIcon } from './icons'
import { ReceiptFrame } from './ReceiptFrame'

/* Every answer a receipt can give, on one sheet. An internal design page:
   static, not indexed, and nothing on it is wired. State 04 is drawn so the
   page has a place for it; Morse has no hide or retract action, so it is
   labelled "In design, not shipped" and must not be built before the protocol
   has that action. */

interface StateAction {
  label: string
  kind: 'ink' | 'soft'
  /** Where the button goes. Without one it stays on this page until the public page ships. */
  href?: string
}

interface ReceiptState {
  number: string
  name: string
  /** Whether it can ship with the page, works today from the CLI, or waits on the protocol. */
  ships: { label: string; chip: 'ultra' | 'ok' | 'warn' }
  tone?: 'warn' | 'bad' | 'mute' | 'gate'
  icon: ReactNode
  status: string
  verdict: string
  /** The sentence under the verdict. The checking state shows a skeleton in its place. */
  text?: string
  actions?: StateAction[]
  why: string
}

const WITH_PAGE = { label: 'Ships with the page', chip: 'ultra' } as const

const STATES: ReceiptState[] = [
  {
    number: '01',
    name: 'Verified, current',
    ships: WITH_PAGE,
    icon: <TickIcon size={24} />,
    status: '3 of 3 checks passed',
    verdict: 'This post is what was published.',
    text: 'The words match the record made on 12 Nov 2026 at 14:12 UTC. Nothing has been changed since.',
    why: 'The default. Plain sentence first, evidence second. The headline never uses protocol jargon.',
  },
  {
    number: '02',
    name: 'Verified, but an earlier revision',
    ships: WITH_PAGE,
    tone: 'warn',
    icon: <ClockIcon size={24} />,
    status: '3 of 3 checks passed · revision 2 of 3',
    verdict: 'This is an earlier version.',
    text: 'It is exactly what was published on 9 Oct 2026. The author has published a newer revision since.',
    actions: [
      { label: 'See the current version', kind: 'ink' },
      { label: 'Compare 2 and 3', kind: 'soft' },
    ],
    why: 'A link to an old revision still verifies. The page says so and points to the current one, so a correction is never mistaken for tampering.',
  },
  {
    number: '03',
    name: 'Does not match',
    ships: WITH_PAGE,
    tone: 'bad',
    icon: <CrossIcon size={24} />,
    status: '1 of 3 checks failed',
    verdict: 'This does not match the record.',
    text: 'The content served at this address is different from what was published. Do not rely on this copy.',
    actions: [
      { label: 'Read the recorded version', kind: 'ink' },
      { label: 'What failed', kind: 'soft' },
    ],
    why: 'The one state that must be loud. It offers the recorded bytes straight from Walrus, and names the failing check below.',
  },
  {
    number: '04',
    name: 'Replaced or hidden by the publisher',
    ships: { label: 'In design, not shipped', chip: 'warn' },
    tone: 'mute',
    icon: <DashIcon size={24} />,
    status: 'Record intact · content hidden',
    verdict: 'The publisher has hidden this post.',
    text: 'It was published on 8 Oct 2026 and hidden on 2 Nov 2026. The record of both actions is public. The content is no longer served here.',
    actions: [{ label: 'See the record', kind: 'soft' }],
    why: 'Morse has no hide or retract action yet. This state is drawn so the page has a place for it when it ships. Do not build it before the protocol does.',
  },
  {
    number: '05',
    name: 'Storage has lapsed',
    ships: WITH_PAGE,
    tone: 'mute',
    icon: <ClockIcon size={24} />,
    status: 'Record intact · content unavailable',
    verdict: 'The record stands. The content is offline.',
    text: 'Storage for this post ran out on 14 Nov 2027. Anyone holding a copy can store it again, and it will verify against this same record.',
    actions: [
      { label: 'Restore from a copy', kind: 'ink' },
      { label: 'See the record', kind: 'soft' },
    ],
    why: 'Walrus storage is a paid lease, not forever. The receipt tells the truth about that. Because the blob ID comes from the content, a restored copy is provably the same post.',
  },
  {
    number: '06',
    name: 'Encrypted, members only',
    ships: { label: 'Works today from the CLI', chip: 'ok' },
    tone: 'gate',
    icon: <LockIcon size={24} />,
    status: '2 of 2 public checks passed',
    verdict: 'Published and unchanged. Encrypted.',
    text: 'The record is public and the encrypted content matches it. Reading the post needs access from the publisher.',
    actions: [{ label: 'Connect to check access', kind: 'ink' }],
    why: 'Draft and gated content is encrypted with Seal. The receipt proves it exists and has not changed without revealing it. Published public revisions are always public.',
  },
  {
    number: '07',
    name: 'Checking',
    ships: WITH_PAGE,
    tone: 'mute',
    icon: <ClockIcon size={24} />,
    status: 'Checking · 1 of 3',
    verdict: 'Checking the record…',
    why: 'Checks resolve one at a time and tick in order: record from Sui, bytes from Walrus, publishing right. Target: all three inside two seconds.',
  },
  {
    number: '08',
    name: 'No record found',
    ships: WITH_PAGE,
    tone: 'mute',
    icon: <QuestionIcon size={24} />,
    status: 'Nothing to check',
    verdict: 'No Morse record at this address.',
    text: 'The link may be mistyped, or the post was never published through Morse. No record is not the same as a failed check.',
    actions: [{ label: 'What a receipt proves', kind: 'soft', href: HOME_PROOF }],
    why: 'Kept visually quiet on purpose, so a typo is never read as "tampered".',
  },
]

function State({ number, name, ships, tone, icon, status, verdict, text, actions, why }: ReceiptState) {
  return (
    <div className="state">
      <div className="cap">
        <b>{number}</b>
        {name}
        <span className={`chip ${ships.chip}`}>{ships.label}</span>
      </div>
      <section className={tone === undefined ? 'verdict' : `verdict ${tone}`}>
        <div className="seal">{icon}</div>
        <div>
          <span className="mono">{status}</span>
          <h1>{verdict}</h1>
          {text === undefined ? (
            <div className="skel">
              <i style={{ width: '92%' }} />
              <i style={{ width: '64%' }} />
            </div>
          ) : (
            <p>{text}</p>
          )}
          {actions !== undefined && (
            <div className="acts">
              {actions.map(({ label, kind, href = '#' }) => (
                <a key={label} className={`btn btn-${kind} sm`} href={href}>
                  {label}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      <p className="why">{why}</p>
    </div>
  )
}

export function StatesPage() {
  return (
    <ReceiptFrame>
      <main className="sheet">
        <div className="wrap">
          <div>
            <span className="mono">Receipt page · states</span>
            <h1 style={{ marginTop: 10 }}>Every answer a receipt can give.</h1>
            <p className="lead">
              One page, eight verdicts. Each is a plain sentence a reader can act on, followed by the evidence. The chip
              beside each state says whether it can ship with the page, works today from the CLI, or waits on the
              protocol.
            </p>
          </div>
          <div className="sgrid">
            {STATES.map(state => (
              <State key={state.number} {...state} />
            ))}
          </div>
          <div>
            <span className="mono">Embed badge</span>
            <p className="lead" style={{ fontSize: 15, margin: '8px 0 14px' }}>
              One line of script next to any post. It re-runs the check on load and links to the receipt.
            </p>
            <div className="badges">
              <span className="badge">
                <i>
                  <TickIcon size={11} />
                </i>
                Verified on Morse <small>rev 3</small>
              </span>
              <span className="badge warn">
                <i>
                  <ClockIcon size={11} />
                </i>
                Earlier version <small>rev 2 of 3</small>
              </span>
              <span className="badge mute">
                <i>
                  <DashIcon size={11} />
                </i>
                Content offline <small>record intact</small>
              </span>
              <span className="badge" style={{ borderColor: 'var(--bad-line)' }}>
                <i style={{ background: 'var(--bad)' }}>
                  <CrossIcon size={11} />
                </i>
                Does not match the record
              </span>
            </div>
          </div>
        </div>
      </main>
    </ReceiptFrame>
  )
}
