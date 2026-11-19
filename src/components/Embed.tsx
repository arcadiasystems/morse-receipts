import { BADGE_SCRIPT_PROPOSED } from '../lib/links'
import { Badge } from './Badge'

/* The script line, shown as text. It is broken over three lines so it never
   wraps or scrolls on a phone. The address is a proposal: nothing is loaded. */
const SCRIPT_LINES = ['<script', `  src="${BADGE_SCRIPT_PROPOSED}"`, '  data-entry="0x7be4…41c0"></script>']

/** The four badge states as paper pills, beside a glass mock of a post carrying one. */
export function Embed() {
  return (
    <section className="sec flush" id="embed">
      <div className="wrap two">
        <div className="emb__l">
          <span className="lab">Embed</span>
          <h2 className="thin">
            One line <em>next to any post.</em>
          </h2>
          <span className="pill dash">With the public page, Q4 2026</span>
          <p className="lead">
            Put the badge beside a headline, a byline or a correction note. It runs the check again every time the page
            loads and links to the full receipt, so the proof travels with the post.
          </p>
          <div className="bdgs" role="group" aria-label="The four badge states">
            <Badge state="ok" label="Verified on Morse" note="rev 3" />
            <Badge state="warn" label="Earlier version" note="rev 2 of 3" />
            <Badge state="off" label="Content offline" note="record intact" />
            <Badge state="bad" label="Does not match the record" />
          </div>
          <p className="fine" style={{ marginTop: 0 }}>
            The script address is a proposal. Four badge states are designed; the page decides which one to show.
          </p>
        </div>
        <div className="glass mock">
          <div className="mock__bar">
            <span>YOUR SITE · A POST</span>
            <span className="pill sample">Sample</span>
          </div>
          <div className="mock__body">
            <small>MEMPOOL MORNINGS</small>
            <b>What moved on Sui overnight</b>
            <div className="byline">
              <span>12 Nov 2026 · a correction</span>
              <Badge state="ok" label="Verified on Morse" note="rev 3" />
            </div>
            <span className="skel" aria-hidden="true" />
            <span className="skel" aria-hidden="true" />
            <span className="skel s" aria-hidden="true" />
          </div>
          <pre>
            <span className="c">{'<!-- the one line that puts it there -->'}</span>
            {`\n${SCRIPT_LINES.join('\n')}`}
          </pre>
        </div>
      </div>
    </section>
  )
}
