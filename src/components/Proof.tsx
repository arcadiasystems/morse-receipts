import type { ReactNode } from 'react'
import { ButtonLink } from '../base/ButtonLink'
import { SectionHead } from '../base/SectionHead'
import { useTabs } from '../base/useTabs'
import { SAMPLE_RECEIPT } from '../lib/links'
import { CheckIcon } from './CheckIcon'

/* The sample blob ID, one character per cell. */
const BLOB_CELLS = [...'0iKeiiQ2…m7Xp']

/** Check 01: the recorded and the recomputed blob ID as two rows of cells, joined one to one. */
function BlobComparison() {
  return (
    <>
      <div className="cmp__r">
        <span>RECORD ON SUI</span>
        <div className="cells">
          {BLOB_CELLS.map((character, index) => (
            <b key={index}>{character}</b>
          ))}
        </div>
      </div>
      <div className="cmp__eq" aria-hidden="true">
        <i>
          {BLOB_CELLS.map((_, index) => (
            <u key={index} />
          ))}
        </i>
      </div>
      <div className="cmp__r">
        <span>RECOMPUTED HERE</span>
        <div className="cells hit">
          {BLOB_CELLS.map((character, index) => (
            <b key={index}>{character}</b>
          ))}
        </div>
      </div>
    </>
  )
}

/** Check 02: three revisions on a line, the third marked public. */
function RevisionLine() {
  return (
    <div className="revs">
      <div className="rev">
        <i />
        <b>revision 1</b>
        <span>Still readable</span>
      </div>
      <div className="rev">
        <i />
        <b>revision 2</b>
        <span>Still readable</span>
      </div>
      <div className="rev pub">
        <i />
        <b>revision 3</b>
        <span>Marked public</span>
      </div>
    </div>
  )
}

/** Check 03: wallet, publishing rights, publication, as a chain. */
function RightsChain() {
  return (
    <div className="chain">
      <div className="node">
        <span>Wallet</span>
        <b>0x1a2c…9f0e</b>
      </div>
      <i aria-hidden="true">→</i>
      <div className="node hit">
        <span>Publishing rights</span>
        <b>active at write</b>
      </div>
      <i aria-hidden="true">→</i>
      <div className="node">
        <span>Publication</span>
        <b>Mempool Mornings</b>
      </div>
    </div>
  )
}

interface Check {
  number: string
  line: string
  verdict: string
  diagram: ReactNode
  explanation: string
  evidence: string
}

const CHECKS: Check[] = [
  {
    number: '01',
    line: 'These are the words that were published.',
    verdict: 'Match',
    diagram: <BlobComparison />,
    explanation:
      'The content you are reading produces the same Walrus blob ID the record points to. Change one character and the check fails.',
    evidence: 'blob 0iKeiiQ2…m7Xp · recomputed from the content · match',
  },
  {
    number: '02',
    line: 'This is the version marked public.',
    verdict: 'Public',
    diagram: <RevisionLine />,
    explanation:
      'Every edit adds a revision with its time. Earlier revisions stay readable, so a correction shows what it replaced.',
    evidence: 'revision 3 of 3 · public',
  },
  {
    number: '03',
    line: 'The author had the right to publish it.',
    verdict: 'Active at write',
    diagram: <RightsChain />,
    explanation:
      'The wallet that wrote this revision held publishing rights for the publication at that moment. Rights are granted and revoked on Sui.',
    evidence: '0x1a2c…9f0e · rights active at write',
  },
]

/** The paper slip with the three lines as tabs, and the glass panel with the selected line's evidence. */
export function Proof() {
  const { selected, tabProps, panelProps } = useTabs(CHECKS.length)

  return (
    <section className="sec" id="proof">
      <div className="wrap">
        <SectionHead
          label="What it proves"
          title={
            <>
              Three lines <em>on every receipt.</em>
            </>
          }
          lead="Each one is a plain sentence a reader can act on, with the evidence under it. The check runs in the reader's browser against Sui and Walrus. Morse's servers are not in the path."
        />
        <div className="proof">
          {/* The slip is torn top and bottom by a mask, so its glow and shadow sit on .pshadow. */}
          <div className="pshadow">
            <div className="paper both slip" role="tablist" aria-label="The three checks" aria-orientation="vertical">
              <div className="slip__hd">
                <span className="m">Morse receipt</span>
                <span className="m">Sample</span>
              </div>
              {CHECKS.map(({ number, line }, index) => (
                <button key={number} className={index === selected ? 'ckb is-on' : 'ckb'} type="button" {...tabProps(index)}>
                  <span className="n">{number}</span>
                  <b>{line}</b>
                  <span className="tk">
                    <CheckIcon />
                  </span>
                </button>
              ))}
              <div className="slip__res">
                <span className="m">Result</span>
                <b>3 of 3 · verified</b>
              </div>
            </div>
          </div>
          {CHECKS.map(({ number, verdict, diagram, explanation, evidence }, index) => (
            <div key={number} className="glass ev" {...panelProps(index)}>
              <div className="ev__top">
                <span className="lab">Check {number} · the evidence</span>
                <span className="pill ok">{verdict}</span>
              </div>
              <div className="viz">{diagram}</div>
              <p>{explanation}</p>
              <div className="ev__line">{evidence}</div>
            </div>
          ))}
        </div>
        <div className="not">
          <div>
            <b>What it does not prove.</b>
            <p>
              That the content is true, or who is behind the wallet. A receipt shows what was published, not whether it
              is right.
            </p>
          </div>
          <ButtonLink variant="ghost" label="Open the sample receipt" href={SAMPLE_RECEIPT} leaves cta="proof-sample" />
        </div>
      </div>
    </section>
  )
}
