# Founder's Desk — UI revamp & QA report

**Date:** 4 September 2026
**Artifact:** https://claude.ai/code/artifact/80f50e85-378b-4912-9585-05b78a160b14
**Files:** `founders-desk.html` (artifact source) · `index.html` (standalone, hostable) · `build-standalone.mjs` (regenerates `index.html`)
**Method:** rendered in a real browser at 1280×900 and 375×812; interactions driven programmatically; contrast computed from the live token values.

No formal AC document existed, so acceptance criteria below are derived from the original brief and the technical handoff. Anything I could not verify is marked as such rather than claimed.

---

## A. Business requirements (from the brief)

| # | Criterion | Result | Evidence |
|---|---|---|---|
| B1 | Page captures inquiries | **Pass** | `#leadForm` validates, serialises a typed payload, shows loading → success/error, and fires `form_submit` |
| B2 | Both programmes highlighted | **Pass** | Fork section 01 gives each equal visual weight; each also gets a full detail block in section 03 |
| B3 | Presented in the simplest possible way | **Pass** | One decision ("pick the one that sounds like you"), phrased as symptoms rather than product names |
| B4 | Not confusing to the customer | **Pass** | Cross-links let a founder correct a wrong choice; a "Not sure" path exists; choosing a track re-syncs How-it-works and pre-fills the form |
| B5 | Target market is Bharat tier 1/2/3 | **Pass** | Section 05 + tier chips + a city map naming eight tier-2/3 towns; sample stories set in Kolhapur, Indore, Hubballi |
| B6 | Aimed at early-stage founders/startups | **Pass** | Hero, qualifiers and FAQ all written for pre-product and pre-traction founders |
| B7 | Social proof / testimonials | **Pass (as sample content)** | Three founder stories, three mentor profiles, a WhatsApp thread — all explicitly labelled illustrative |
| B8 | Embedded video with play option | **Pass** | Video card → lightbox with a real YouTube iframe; degrades to an explanatory panel where iframes are blocked |

---

## B. Design / presentation

| # | Criterion | Result | Note |
|---|---|---|---|
| D1 | Looks professional, not naive | **Pass** | Clip-art SVGs replaced; layered HTML hero, elevation system, refined type scale (Fraunces/Inter/IBM Plex Mono) |
| D2 | Aligned to the business | **Pass** | Warm paper + deep-green identity retained; build-green / sell-amber still carry programme meaning only |
| D3 | Responsive | **Pass** | No horizontal overflow at 375 px; sticky mobile CTA with matching body padding; 4 named breakpoints |
| D4 | Consistent visual system | **Pass** | All colour now flows from tokens — no stale literals remain |

---

## C. Technical / accessibility

| # | Criterion | Result | Evidence |
|---|---|---|---|
| T1 | Form fields submit real data | **Pass** | Every input has a `name`; payload also serialised explicitly in JS |
| T2 | Qualifier values stable across copy edits | **Pass** | Values read from `data-value` (`idea_stage`, `not_yet`…), never `textContent` |
| T3 | Option groups are accessible | **Pass** | Three `role="radiogroup"`s with `aria-checked`, roving tabindex and arrow-key support |
| T4 | Errors announced and associated | **Pass** | `aria-describedby` on every control; `role="alert"` on the failure banner |
| T5 | Focus managed after submit | **Pass** | Focus moves to `#successPanel` (`role="status"`) — verified `document.activeElement` |
| T6 | Loading / error / retry states | **Pass** | `aria-busy` spinner; retry re-sends the preserved payload |
| T7 | Spam protection | **Partial** | Honeypot present; rate limiting needs the backend |
| T8 | Consent capture (DPDP) | **Partial** | Required consent checkbox with purpose statement; privacy-policy page and retention policy still to be written |
| T9 | Analytics instrumented | **Pass** | All 11 planned events fire into `window.dataLayer`, including `fork_view` and `form_start` |
| T10 | Keyboard + landmarks | **Pass** | Skip link, single `h1`, nav/main/footer, `aria-expanded` on menu and FAQ, Escape closes the lightbox |
| T11 | Colour contrast AA | **Pass** | All 15 measured pairs ≥ 4.5:1 after two fixes (below) |
| T12 | No console errors | **Pass** | Clean on load and through all interactions |

---

## D. Defects found and fixed during QA

| # | Severity | Defect | Fix |
|---|---|---|---|
| 1 | **High** | `.stamp h3` leaked into the white fork cards — both programme titles rendered near-white on white, effectively invisible | Added a `.card-surface` opt-out for light surfaces inside dark bands |
| 2 | **High** | Both How-it-works panels rendered at once; `.steps{display:grid}` beat the `hidden` attribute | Added an explicit `[hidden]{display:none!important}` rather than relying on the publish-time reset |
| 3 | **Medium** | Video caption was an inline `<span>`, so it collapsed under the absolutely-positioned SVG | Made it a block and converted its children to styled spans (also valid inside `<button>`) |
| 4 | **Medium** | Mobile menu CTA was invisible — `.mobile-menu a` overrode `.btn-ink`'s colour | Scoped the rule to `a:not(.btn)` |
| 5 | **Medium** | Fork card title cramped beside its glyph at phone widths | Glyph stacks above the title below 560 px |
| 6 | **Medium** | Gold eyebrow on paper measured 3.71:1 — fails AA at 11 px | Darkened `--gold-2` to `#7F5E10` (5.23:1) |
| 7 | **Medium** | Input placeholder measured 2.82:1 | Darkened to `#7D6F57` (4.90:1) |
| 8 | **Low** | Submit config was trapped in closure constants, untestable and awkward to wire | Exposed as `window.FD_CONFIG {endpoint, forceFail, debug}` |

Also cleared from the previous build: stale colour literals in the nav and programme tags, hardcoded button hexes, the dead `.fork-bar` markup, the unused `--shadow` token, the leftover mobile border rule, and the cross-SVG `filter="url(#inkStamp)"` dependency (both hand-coded illustrations were replaced).

**Section-number drift is now structurally impossible** — numbers appear once per section, in the eyebrow only. The duplicate ghost numeral is gone.

---

## E. Known limitations — deliberately out of scope for a mockup

These are not defects; they need decisions or infrastructure that don't exist yet.

1. **No backend.** `FD_CONFIG.endpoint` is `null`, so submission resolves after a simulated delay. Set the endpoint and it POSTs for real.
2. **WhatsApp routes to the form**, not to `wa.me` — there is still no real Business number. Do not add a placeholder one.
3. **Proof content is illustrative.** Stories, mentors, video and the message thread are labelled sample content in three places: a pill on the section header, a note beneath it, and the footer. Replace with named, consented people or ship the section empty.
4. **The video ID is a placeholder** and the artifact sandbox blocks iframes — hence the fallback panel. On normal hosting it plays inline.
5. **"One working day" is still an operational promise with no staffing behind it.** Either resource it or soften the wording.
6. **Programme scope is still unconfirmed** — the chips remain labelled "Proposed".
7. **Pricing is structural, not numeric.** The band explains *how* pricing works and commits to a free first call; it invents no figures.

---

## F. Open questions for the business

Unchanged from the handoff, and still blocking a real launch: actual programme scope; what "on-ground support where available" means by city and frequency; who staffs inbound and the real response time; where an `unsure` lead is triaged; and whether any consented founder or named mentor exists to fill the proof slots at launch.
