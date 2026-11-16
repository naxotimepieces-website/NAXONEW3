# CLAUDE.md — Naxo Timepieces website

Context for Claude Code. Read this first; it replaces the outdated deploy-for-beginners `README.md`.
This repo is PUBLIC — never add personal, financial, or private business details here or in commits.

## What this is
Marketing + enquiry site for Naxo Timepieces, a Singapore neo-vintage watch dealer (1950s–1990s pieces; also trades as "The Retro Factory" at pop-ups). Live at naxotimepieces.com. There is no checkout: sales happen via WhatsApp / Instagram / Telegram DMs and an enquiry form. Owner/editor: Serendipity ("Seren"), who gives direct, specific feedback.

## Stack and deploy
- Next.js 14 (app router), React 18, plain inline styles (no Tailwind). Fonts: Playfair Display + Cormorant Garamond via `app/globals.css`.
- Repo: `naxotimepieces-website/NAXONEW3`, branch `main`. Vercel auto-deploys every push to `main` (~1–2 min). No staging branch — what you push goes live.
- Before pushing: `npm install && npm run build` must succeed (a single JSX typo breaks the whole site). Don't commit `package-lock.json`, `node_modules`, or `.next` (no `.gitignore` exists; delete them before committing).
- Commit straight to `main` for requested edits; keep commits small and descriptive.

## Architecture (important)
- `app/page.js` renders one component: `components/NaxoApp.jsx` (~1,000 lines). **All pages, data, and components live in that file.** No router: `navigate(page)` in `NaxoApp` swaps pages with a fade. Pages map: `home, shop, about, journal, events, contact, howitworks, servicing`.
- Search by function name (line numbers drift): `HomePage`, `ShopPage` (includes the product drawer), `AboutPage`, `JournalPage`, `EventsPage`, `HowItWorksPage`, `ContactPage`, `ServicingPage`, `Nav`, `Footer`, `MarqueeBanner`, `GalleryScroll`, `Reveal`, `Counter`, `PageHero`, `GoldButton`.
- Data at the top of the file: `BRAND` (colors), `WATCHES`, `ARTICLES`, `MILESTONES`. Events data is inline inside `EventsPage` (`upcoming` / `past` arrays, newest first). FAQs inside `ServicingPage`/`HowItWorksPage`.
- Responsiveness is done in JS, not CSS media queries: `const m = useIsMobile()` (breakpoint 768px) at the top of every component, then `m ? mobileValue : desktopValue` inside inline styles. Any component using `m` must call the hook itself (past builds failed with "m is not defined").
- Header: marquee banner + nav sit in ONE `position:fixed; top:0; zIndex:100` wrapper (~34px + ~68px ≈ 102px). Page content is padded to clear it. The product-drawer close button is `position:fixed` at `top:112` on mobile for this reason.
- Marquee speed is in `app/globals.css` (`.marquee-track`: 13s desktop, 9s under 768px). Keyframes live there, not inline.
- Contact form posts to Formspree (`https://formspree.io/f/xaqlrrwa`). WhatsApp number/links are hardcoded wa.me URLs with pre-filled messages.
- Floating WhatsApp widget is `zIndex:90`; product drawer backdrop/panel are 200/201; close button 210.

## Editing recipes
**Add a watch:** drop photos in `public/` (convention `watch-N-brand-model.jpeg`, ~1300px; source photos are only ~1–1.5 MP so don't promise print-size use), then append an object to `WATCHES` (copy an existing one): `id, brand, model, era, price:0, priceRange, style, condition, movement, case_size, case_material, dial, strap, tag, desc, img:"/watch-N-....jpeg", sold`. Keep `price:0` — the site deliberately shows "Enquire" instead of prices (`priceRange` stays in data but is NOT displayed). Mark sold with `sold:true` (shows under the "Sold" filter, drawer offers "source a similar piece").
- New brand or style? Also update the hardcoded `BRANDS` / `STYLES` filter arrays in `ShopPage` and the category buttons in `HomePage` ("Recently Acquired"). Home shows `WATCHES.slice(0,9)`.
- Image handling is already robust: grid thumbnails are squares cropped `center 20%` (biased to the top so watch faces stay in frame); the drawer shows the full photo at natural aspect ratio (no cropping). Don't revert drawer images to `cover`.
- The drawer panel shrink-wraps (`maxHeight:100vh`, no `bottom:0`) — don't force it to full height or the blank gap under "Enquire Now" returns.

**Events:** edit `upcoming` / `past` in `EventsPage`; move finished events into `past` (newest first, with a one-line recap). The marquee text is in `MarqueeBanner`.

## Brand + design principles (from the owner)
- Palette constants in `BRAND`: navy `#1a2744`, gold `#c9a84c`, cream `#f5f0e8`, warmWhite `#faf8f4`, deepNavy `#0f1a30`, stone `#8a8172`. Logo: `public/naxo-logo-white.png` (transparent PNG, used as-is). **Never recolor the logo with CSS filters** — it previously rendered as a solid rectangle. Footer brand logos use `filter: brightness(0) invert(1)` (they are transparent PNGs).
- Owner has a strong visual sensibility and will reject anything that reads as generic or AI-generated (starfields, ornate gold frames, dead-centre symmetry, cliché copy). Prefer editorial restraint, asymmetry, clean typography, specific/real copy.
- Be honest and critical when asked for feedback; don't just validate.
- Naxo main brand = refined/editorial; The Retro Factory (pop-ups) = looser, more playful. Don't let the registers bleed.
- Never reveal sourcing channels in site copy (a reference was removed from the About story). Be careful with factual claims on the site (stats counters, "years", sold counts) — confirm with the owner before changing numbers.

## Current state / known good
- Fair-prices copy says "ask us what a watch costs" because the site deliberately doesn't show prices (don't claim "transparent price ranges upfront").
- Mobile fixes done: product-drawer close button always visible; shop cards on mobile are image on top + separate text panel (no overlay); drawer image no longer cropped; no blank gap under Enquire Now.
- Home hero background is `public/hero-watches.jpeg` (darkened with `brightness(0.35) sepia(0.2)` overlay).
- Footer has the "Brands We Carry" logo strip on every page.

## Open recommendations (agreed as worth doing, not yet done — ask before starting)
1. ~~Replace emoji icons~~ — DONE: all emoji/glyph icons now use the `Icon` component (stroke SVG set in the `ICONS` object near the top of `NaxoApp.jsx`; add new icons there, 24px grid). Don't reintroduce emojis or ✦ glyphs.
2. ~~Headline/founder copy rewrite~~ — DONE (plain sentence-case section headings; gold italic is used only on the word "actually" in the home hero; About story rewritten). Still template-y and worth a pass: the small all-caps "eyebrow" label above nearly every heading, and the About pull-quote attributed to "The Founders" (owner should supply a real quote).
3. Owner to confirm stats counters (watches sold, pop-ups, brands, collectors) are accurate.
4. Decide deliberately whether the navy/gold "heritage luxury" look fits a young, community-driven pop-up brand; any identity shift is a design conversation, not a unilateral change.
5. Consider reducing the uniform sepia filter on watch photos so the real photography shows.
6. Chinese/Mandarin toggle (deferred, needs translations); Google Analytics (needs the owner's account first; add a cookie notice only if analytics/ads are added).

## Gotchas learned the hard way
- Bulk `sed` replacements on this file have orphaned JSX props before — prefer targeted edits and always run the build.
- Don't put React hooks inside `.map()` loops (FAQ open state is lifted to component level).
- Inline `<style>` blocks inside the component load too late for some animations — keep keyframes in `globals.css`.
- Sandbox/network notes: outbound HTTPS is allowlisted; `pip` needs `--break-system-packages`.
