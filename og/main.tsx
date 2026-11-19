import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/tokens.css'
import '../src/styles/base.css'
import '../src/styles/receipts.css'
import './card.css'
import './object.css'
import { TraceMark } from '../src/base/TraceMark'
import { ReceiptStage } from '../src/components/Hero'
import { Card } from './Card'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Card
      product="receipts"
      Mark={TraceMark}
      headline={
        <>
          Publish once.
          <br />
          Hand anyone the
          <br />
          <em className="tp">receipt.</em>
        </>
      }
      tagline="A link anyone can open to check a post."
      domain="receipts.morsecms.xyz"
    >
      <ReceiptStage />
      <span className="pill sample og__sample">Sample</span>
    </Card>
  </StrictMode>,
)
