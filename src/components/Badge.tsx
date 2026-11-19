import type { ReactNode } from 'react'
import { CheckIcon } from './CheckIcon'

export type BadgeState = 'ok' | 'warn' | 'off' | 'bad'

/* The tick, a clock, a dash and a cross: one glyph per verdict. */
const GLYPH: Record<BadgeState, ReactNode> = {
  ok: <CheckIcon />,
  warn: (
    <svg aria-hidden="true" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  off: (
    <svg aria-hidden="true" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round">
      <path d="M6 12h12" />
    </svg>
  ),
  bad: (
    <svg aria-hidden="true" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
}

interface BadgeProps {
  state: BadgeState
  label: string
  /** The small mono note after the label, e.g. "rev 3". */
  note?: string
}

/** The embed badge as a paper pill, in one of its four designed states. A picture of the badge, not the script. */
export function Badge({ state, label, note }: BadgeProps) {
  return (
    <span className={`bdg ${state}`}>
      <i>{GLYPH[state]}</i>
      {label}
      {note !== undefined && (
        <>
          {' '}
          <small>{note}</small>
        </>
      )}
    </span>
  )
}
