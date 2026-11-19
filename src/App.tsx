import { FinalBand } from './base/FinalBand'
import { Footer } from './base/Footer'
import { Nav } from './base/Nav'
import { TraceMark } from './base/TraceMark'
import { Answers } from './components/Answers'
import { Embed } from './components/Embed'
import { Hero } from './components/Hero'
import { Proof } from './components/Proof'
import { Today } from './components/Today'
import { Who } from './components/Who'
import { Why } from './components/Why'
import { DOCS, GITHUB, MORSE, MORSE_AGENTS, MORSE_PRESS, RECEIPT_STATES, SAMPLE_RECEIPT, UPLOADER_APP } from './lib/links'

const NAV_LINKS = [
  { label: 'What it proves', href: '#proof' },
  { label: 'Every answer', href: '#answers' },
  { label: 'Embed', href: '#embed' },
  { label: "Who it's for", href: '#who' },
  { label: 'Check today', href: '#today' },
]

const FOOTER_LINKS = [
  { label: 'Morse kit', href: MORSE, link: 'morse' },
  { label: 'Agents', href: MORSE_AGENTS, link: 'morse-agents' },
  { label: 'Press', href: MORSE_PRESS, link: 'morse-press' },
  { label: 'Uploader', href: UPLOADER_APP, link: 'morse-uploader' },
  { label: 'Sample receipt', href: SAMPLE_RECEIPT, cta: 'footer-sample' },
  { label: 'All eight answers', href: RECEIPT_STATES },
  { label: 'Docs', href: DOCS },
  { label: 'GitHub', href: GITHUB },
]

export default function App() {
  return (
    <>
      <Nav
        product="Receipts"
        Mark={TraceMark}
        links={NAV_LINKS}
        morseHref={MORSE}
        action={{ label: 'Sample receipt', href: SAMPLE_RECEIPT, leaves: true, cta: 'nav-sample' }}
      />
      <main>
        <Hero />
        <Why />
        <Proof />
        <Answers />
        <Embed />
        <Who />
        <Today />
        <FinalBand
          Mark={TraceMark}
          headline={
            <>
              Publish once.
              <br />
              Keep every <em className="tp">revision.</em>
            </>
          }
          primary={{ label: 'See a sample receipt', href: SAMPLE_RECEIPT, leaves: true, cta: 'final-primary' }}
          secondary={{ label: 'Run the check today', href: '#today', cta: 'final-secondary' }}
        />
      </main>
      <Footer
        product="Receipts"
        Mark={TraceMark}
        links={FOOTER_LINKS}
        line="Morse Receipts: proof of what was published. Part of Morse, built by Arcadia Systems with a grant from the Walrus Foundation. © 2026 · Open source, MIT licence"
      />
    </>
  )
}
