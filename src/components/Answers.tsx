import { ButtonLink } from '../base/ButtonLink'
import { SectionHead } from '../base/SectionHead'
import { RECEIPT_STATES } from '../lib/links'

const TICKETS = [
  {
    verdict: 'ok',
    label: '3 of 3 passed',
    title: 'This post is what was published.',
    text: 'Nothing has changed since the record was made.',
  },
  {
    verdict: 'warn',
    label: '3 of 3 · revision 2 of 3',
    title: 'This is an earlier version.',
    text: 'Exactly what was published then. A newer revision exists, and the receipt links to it.',
  },
  {
    verdict: 'bad',
    label: '1 of 3 failed',
    title: 'This does not match the record.',
    text: 'The content at this address differs from what was published. The receipt offers the recorded version.',
  },
  {
    verdict: 'off',
    label: 'Record intact',
    title: 'The record stands. The content is offline.',
    text: 'Storage ran out. Anyone holding a copy can store it again and it verifies against the same record.',
  },
]

/** Four paper tickets hanging from a rail, then the block on taking a post down. */
export function Answers() {
  return (
    <section className="sec flush" id="answers">
      <div className="wrap">
        <SectionHead
          label="Every answer"
          title={
            <>
              A receipt can also say <em className="no">no.</em>
            </>
          }
          lead="A check that only ever says yes is a badge. These are four of the eight answers a receipt can give, each one a sentence, not a status code."
        />
        <div className="railbox">
          <div className="tix">
            {/* Each ticket's shadow sits on .tkt, because the torn edge on .paper is a mask. */}
            {TICKETS.map(({ verdict, label, title, text }) => (
              <article key={verdict} className={`tkt ${verdict}`}>
                <div className="paper">
                  <span className="tkt__v">
                    <i />
                    {label}
                  </span>
                  <b>{title}</b>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="btnrow" style={{ marginTop: 44 }}>
          <ButtonLink variant="ghost" label="See all eight answers" href={RECEIPT_STATES} leaves cta="all-answers" />
        </div>
        <div className="glass down">
          <div>
            <h3>When a post has to come down.</h3>
            <span className="pill dash">Hide or replace: in design</span>
          </div>
          <div>
            <p>
              Morse does not pretend the words were never written, and it does not promise they stay forever. Proof and
              the live page are two different things.
            </p>
            <p>
              Today a correction is a new revision and the earlier one stays readable. An action that hides or replaces
              the live view, shows a visible retracted state and keeps the receipt is in design. Until it ships, the
              honest offer is correction, not disappearance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
