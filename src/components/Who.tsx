import type { ReactNode } from 'react'
import { Arrow } from '../base/Arrow'
import { SectionHead } from '../base/SectionHead'
import { MORSE_AGENTS, MORSE_PRESS, SAMPLE_RECEIPT } from '../lib/links'

interface Ask {
  number: string
  who: string
  question: string
  answer: string
  href: string
  /** Where the row goes. A sibling product's name carries its own colour. */
  go: ReactNode
  cta?: string
  link?: string
}

const ASKS: Ask[] = [
  {
    number: '01',
    who: 'Newsrooms and research',
    question: 'Did you change that after it went out?',
    answer: 'Every revision with its time, checked by the reader. A correction you can show, not just claim.',
    href: SAMPLE_RECEIPT,
    go: 'Sample receipt',
    cta: 'who-sample',
  },
  {
    number: '02',
    who: 'Agents and the people who run them',
    question: 'What did the agent actually publish?',
    answer:
      'A digest for every write, under publishing rights you can revoke. See Morse Agents, or Morse Press if you would rather not write code.',
    href: MORSE_AGENTS,
    go: (
      <>
        Morse <em className="a">Agents</em>
      </>
    ),
    link: 'morse-agents',
  },
  {
    number: '03',
    who: 'Members-only publishing',
    question: 'Prove it exists without showing it.',
    answer: 'A receipt for an encrypted post proves it was stored and has not changed, and reveals nothing else.',
    href: MORSE_PRESS,
    go: (
      <>
        Morse <em className="p">Press</em>
      </>
    ),
    link: 'morse-press',
  },
]

/** Three rows, each led by the question that person is asked. Each row is a link. */
export function Who() {
  return (
    <section className="sec flush" id="who">
      <div className="wrap">
        <SectionHead
          label="Who it's for"
          title={
            <>
              Who needs one,
              <br />
              <em>and the moment they need it.</em>
            </>
          }
        />
        <div className="asks">
          {ASKS.map(({ number, who, question, answer, href, go, cta, link }) => (
            <a key={number} className="ask" href={href} data-cta={cta} data-link={link}>
              <span className="n">{number}</span>
              <span className="who">{who}</span>
              <div>
                <q>{question}</q>
                <p>{answer}</p>
              </div>
              <span className="go">
                {go} <Arrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
