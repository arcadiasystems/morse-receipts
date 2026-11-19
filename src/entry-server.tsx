import { StrictMode, type ReactNode } from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import App from './App.tsx'
import { NotFound } from './NotFound.tsx'
import { SamplePage } from './receipt/SamplePage.tsx'
import { StatesPage } from './receipt/StatesPage.tsx'

/** The dark site is hydrated by src/main.tsx, so it renders with hydration markers. */
function hydratable(node: ReactNode): string {
  return renderToString(<StrictMode>{node}</StrictMode>)
}

/**
 * Every page of the site, rendered to HTML. Called by the prerender plugins
 * in vite.config.ts, which map each HTML file to one of these names. The two
 * receipt routes and the 404 page are static: no script is loaded on them, so
 * they render as plain markup.
 */
export const pages = {
  site: () => hydratable(<App />),
  sample: () => renderToStaticMarkup(<SamplePage />),
  states: () => renderToStaticMarkup(<StatesPage />),
  notFound: () => renderToStaticMarkup(<NotFound />),
}
