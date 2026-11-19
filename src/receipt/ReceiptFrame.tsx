import type { ReactNode } from 'react'
import { TraceMark } from '../base/TraceMark'
import { DOCS_VERIFY, HOME, HOME_PROOF } from '../lib/links'

interface ReceiptFrameProps {
  /** A band between the top bar and the page, such as the sample notice. */
  notice?: ReactNode
  children: ReactNode
}

/**
 * The top bar and footer of the receipt routes. These pages are light on
 * purpose: the site is the dark room, the receipt a reader opens is the paper.
 * They use src/receipt/receipt.css only, and load no script.
 */
export function ReceiptFrame({ notice, children }: ReceiptFrameProps) {
  return (
    <>
      <header className="top">
        <div className="wrap">
          <a className="brand" href={HOME} aria-label="Morse Receipts">
            <TraceMark size={26} stroke="#2B3BE0" />
            <span className="wm">
              <span>morse</span>
              <em>receipts</em>
            </span>
          </a>
          <div className="r">
            <a className="hide" href={HOME_PROOF}>
              What a receipt proves
            </a>
            <a className="hide" href={DOCS_VERIFY}>
              Docs
            </a>
            <span className="chip plan">No account needed</span>
          </div>
        </div>
      </header>
      {notice}
      {children}
      <footer className="foot">
        <div className="wrap">
          <span>Checked in your browser against Sui and Walrus. Morse servers are not in the path.</span>
          <span>
            <a href={HOME}>Morse Receipts</a> &nbsp;·&nbsp; <span className="sig">-- --- .-. ... .</span>
          </span>
        </div>
      </footer>
    </>
  )
}
