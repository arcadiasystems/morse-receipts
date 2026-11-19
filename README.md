# Morse Receipts

The product site for **Morse Receipts**, at
[receipts.morsecms.xyz](https://receipts.morsecms.xyz): proof of what was
published, when, and by whom. A receipt is a link anyone can open to check a
post. The check runs from the Morse CLI today; the public page, the link and
the embed badge are planned for Q4 2026.

One of three sibling sites that share one dark base:
Morse Receipts (paper), [Morse Agents](https://agents.morsecms.xyz) (lime) and
[Morse Press](https://press.morsecms.xyz) (vermilion).

## Routes

| Route | What it is |
|---|---|
| `/` | The site: eight sections, dark, prerendered and then hydrated |
| `/sample` | The receipt itself with sample data and its sample notice band. Light, static, no script |
| `/states` | All eight answers a receipt can give, a design sheet. Light, static, no script, `noindex` |
| anything else | `404.html`, served with a 404 status |

The two receipt routes are static design routes. No verification is wired, and
state 04 (hidden or replaced) is labelled "In design, not shipped": do not
build it before the protocol has that action.
`https://receipts.morsecms.xyz/badge.js` is a proposed address shown as sample
text. The file does not exist and nothing loads it.

## Develop

```sh
npm install
npm run dev      # vite dev server, every route prerendered on request
npm run build    # tsc + production build, prerendered to static HTML in dist/
npm run lint     # eslint
```

Stack: Vite + React 19 + TypeScript (strict), plain CSS, no runtime dependency
beyond React. Same toolchain as `arcadiasystems/morse-landing`.

## Structure

| Path | What lives there |
|---|---|
| `src/styles/base.css` | The shared dark base. Identical in the three sites |
| `src/styles/tokens.css` | This site's `:root` tokens: the Paper palette |
| `src/styles/receipts.css` | This site's own objects: the receipt, the stamps, the slip, the tickets, the badges |
| `src/base/` | The React pieces the base implies (nav, status label, footer, final band, FAQ, band, tabs). Identical in the three sites |
| `src/components/` | One component per section of the page |
| `src/receipt/` | The two light receipt routes and their own stylesheet, `receipt.css` |
| `src/lib/links.ts` | Every URL the site links to |
| `vite.config.ts` | The build, and the plugin that prerenders each page |

`src/styles/base.css` and `src/base/` are written here and copied verbatim
into morse-agents and morse-press. Change them here, then copy them again, so
the three never drift. `base.css` opens with the token contract each site
fills in.

## Design handover

The design is `receipts.html` with `receipt-sample.html`,
`receipt-states.html` and `receipt.css` in the `morse-sites-v4` design
package, described in its `HANDOVER.md` (section "Morse Receipts") and
`HANDOVER-landing.md`. The package is kept by the owner and is not committed
here. Class names in the code are the ones the handover uses, so it stays a
usable map: `.stage`, `.unit`, `.slot`, `.feed`, `.rcpt`, `.mbar`, `.path`,
`.claims`, `.stamp`, `.slip`, `.ckb`, `.ev`, `.viz`, `.railbox`, `.tix`,
`.tkt`, `.down`, `.bdg`, `.mock`, `.asks`, `.ask`, `.tty`, `.tn`.

## Hosting

Deployed by Vercel from this repository: production from `main`, a preview
for every pull request, custom domain `receipts.morsecms.xyz`. `vercel.json`
holds everything the deployment needs, so the project needs no dashboard
configuration:

- Framework preset `vite`, install `npm ci`, build `npm run build`, output `dist`.
- Clean URLs with no trailing slash: `/sample` and `/states` serve
  `sample/index.html` and `states/index.html`; `/sample/` and
  `/sample/index.html` redirect to `/sample`.
- Unknown paths get `404.html` with a 404 status.
- Files under `/assets/` are fingerprinted by the build and cached for a year.
  Everything else, HTML included, is revalidated on every request.

## Measurement

No analytics or tracking script is loaded; choosing a tool is the owner's
call. The elements to measure carry stable attributes.

`data-cta`, actions on this site:

| Value | Element |
|---|---|
| `primary` | Hero, "See a sample receipt". The site's primary event: opens of the sample receipt |
| `secondary` | Hero, "Run the check today · CLI" |
| `nav-sample` | Nav, "Sample receipt" |
| `proof-sample` | What it proves, "Open the sample receipt" |
| `all-answers` | Every answer, "See all eight answers" |
| `who-sample` | Who it's for, row 01 |
| `final-primary`, `final-secondary` | The final band's two buttons |
| `footer-sample` | Footer, "Sample receipt" |

`data-link`, links to the sibling sites:

| Value | Where |
|---|---|
| `morse` | Nav "Morse ↗", the line under the hero buttons, footer |
| `morse-agents` | The line under the hero buttons, Who it's for row 02, footer |
| `morse-press` | The line under the hero buttons, Who it's for row 03, footer |
| `morse-uploader` | Footer |

## Licence

MIT. See [LICENSE](LICENSE).
