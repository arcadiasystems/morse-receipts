/* Every URL the site links to. The design files use relative links
   (index.html, agents.html, press.html, receipt-sample.html); these are the
   real addresses they map to. */

/** The landing: Morse, the kit. */
export const MORSE = 'https://www.morsecms.xyz/'
export const MORSE_AGENTS = 'https://agents.morsecms.xyz/'
export const MORSE_PRESS = 'https://press.morsecms.xyz/'
export const UPLOADER_APP = 'https://uploader.morsecms.xyz'

export const DOCS = 'https://docs.morsecms.xyz/'
export const DOCS_VERIFY = 'https://docs.morsecms.xyz/verify-a-post.html'
export const GITHUB = 'https://github.com/arcadiasystems/morse-dcms'

/* Routes on this site, as clean URLs with no trailing slash (see vercel.json). */
export const HOME = '/'
export const HOME_PROOF = '/#proof'
/** The receipt itself, as a static design route with sample data. Point the
    primary action at a live receipt the day the public page ships. */
export const SAMPLE_RECEIPT = '/sample'
/** All eight answers a receipt can give. An internal design sheet, not indexed. */
export const RECEIPT_STATES = '/states'

/* Shown as text only, never loaded and never linked: the script address is a
   proposal and no file exists there. */
export const BADGE_SCRIPT_PROPOSED = 'https://receipts.morsecms.xyz/badge.js'
