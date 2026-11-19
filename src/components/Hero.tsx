import { Fragment } from 'react'
import { ButtonLink } from '../base/ButtonLink'
import { morseLetters } from '../base/morse'
import { StatusLabel } from '../base/StatusLabel'
import { TraceMark } from '../base/TraceMark'
import { MORSE, MORSE_AGENTS, MORSE_PRESS, SAMPLE_RECEIPT } from '../lib/links'
import { CheckIcon } from './CheckIcon'

/* Sample data, labelled "Sample" on the strip under the receipt. */
const RECORD = [
  { label: 'Published', value: '12 Nov 2026, 14:12 UTC' },
  { label: 'By wallet', value: '0x1a2c…9f0e' },
  { label: 'Record on Sui', value: 'D9YfjkA3…9vB' },
  { label: 'Bytes on Walrus', value: '0iKeiiQ2…m7Xp' },
]

const CHECKS = [
  'These are the words that were published',
  'This is the version marked public',
  'The author had the right to publish it',
]

/** MORSE as a barcode: a dot is a thin bar, a dash a thick one, with a gap after each letter. */
function MorseBarcode() {
  return (
    <span className="mbar" aria-hidden="true">
      {morseLetters('MORSE').map((symbols, letterIndex) => (
        <Fragment key={letterIndex}>
          {symbols.map((symbol, symbolIndex) => (
            <i key={symbolIndex} className={symbol === 'dash' ? 'd' : undefined} />
          ))}
          <i className="s" />
        </Fragment>
      ))}
    </span>
  )
}

/** The paper receipt that feeds out of the slot, with its torn lower edge. */
function Receipt() {
  return (
    <div className="paper rcpt">
      <div className="rcpt__hd">
        <span className="m">
          <TraceMark size={18} stroke="#121418" />
          RECEIPT
        </span>
        <span className="m">3 OF 3 CHECKS</span>
      </div>
      <div className="rule" />
      <h3>What moved on Sui overnight</h3>
      <p className="by">Mempool Mornings · revision 3, a correction</p>
      <div className="rule" />
      <ul className="kvp">
        {RECORD.map(({ label, value }) => (
          <li key={label}>
            <span>{label}</span>
            <i />
            <b>{value}</b>
          </li>
        ))}
      </ul>
      <div className="rule" />
      <ul className="cks">
        {CHECKS.map(check => (
          <li key={check}>
            <span className="bx">
              <CheckIcon />
            </span>
            {check}
          </li>
        ))}
      </ul>
      <div className="rule" />
      <div className="rcpt__ft">
        <MorseBarcode />
        <span className="m">
          NO ACCOUNT
          <br />
          NEEDED TO CHECK
        </span>
      </div>
    </div>
  )
}

/** The glass strip under the receipt: who is in the path of the check, and who is not. */
function PathStrip() {
  return (
    <div className="path">
      <div className="path__hd">
        <span>THE CHECK · WHO IS IN THE PATH</span>
        <span className="pill sample">Sample</span>
      </div>
      <ul>
        <li>
          <span aria-hidden="true">✓</span>
          <div>
            <b>Sui</b>
            <small>the record</small>
          </div>
        </li>
        <li>
          <span aria-hidden="true">✓</span>
          <div>
            <b>Walrus</b>
            <small>the bytes</small>
          </div>
        </li>
        <li className="out">
          <span aria-hidden="true">✕</span>
          <div>
            <b>Morse servers</b>
            <small>not in the path</small>
          </div>
        </li>
      </ul>
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <span className="glow a" />
      <span className="glow b" />
      <div className="wrap hero__grid">
        <div className="hero__l">
          <StatusLabel cells={['CHECK LIVE', 'FROM THE CLI', 'PUBLIC PAGE Q4 2026']} word="RECEIPTS" />
          <h1 className="thin">
            Publish once.
            <br />
            Hand anyone the&nbsp;<em className="tp">receipt.</em>
          </h1>
          <p className="sub">
            A receipt is a link anyone can open to check a post: that these are the words that were published, when,
            and by whom. No account, and no need to trust the publisher, the host, or us.
          </p>
          {/* The primary action. The sample is a static page today; point SAMPLE_RECEIPT at a live receipt the day the public page ships. */}
          <div className="hero__cta">
            <ButtonLink variant="acc" label="See a sample receipt" href={SAMPLE_RECEIPT} leaves cta="primary" />
            <ButtonLink variant="ghost" label="Run the check today · CLI" href="#today" cta="secondary" />
          </div>
          <p className="hero__fine">
            Anything published through the{' '}
            <a href={MORSE} data-link="morse">
              Morse kit
            </a>
            ,{' '}
            <a href={MORSE_PRESS} data-link="morse-press">
              Morse Press
            </a>{' '}
            or a{' '}
            <a href={MORSE_AGENTS} data-link="morse-agents">
              Morse agent
            </a>{' '}
            already has one.
          </p>
        </div>
        <div
          className="stage"
          role="group"
          aria-label="A sample receipt: three checks passed, read from Sui and Walrus, with Morse's servers not in the path"
        >
          <div className="unit">
            <div className="slot">
              <span>
                <i aria-hidden="true" />
                CHECKED IN YOUR BROWSER
              </span>
              <span>SUI · WALRUS</span>
            </div>
            {/* The torn edge is a mask, which would clip a shadow on the paper, so the glow and shadow sit on .feed. */}
            <div className="feed">
              <Receipt />
            </div>
          </div>
          <PathStrip />
        </div>
      </div>
    </section>
  )
}
