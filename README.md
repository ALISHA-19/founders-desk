# Founder's Desk

**Live site → https://alisha-19.github.io/founders-desk/**

A lead-generation landing page for a two-programme founder support business, built for
early-stage founders across Bharat (tier 1, 2 and 3 India).

- **Build** — 1:1 Mentorship + On-Ground Support, for founders still deciding what to make
- **Sell** — Sales Support for Founders, for founders who have something to sell but too few buyers

The page's core job is forcing an early, explicit self-selection between those two tracks
and carrying that choice through to a booked call. Everything in the interaction layer
serves that; treat it as the load-bearing requirement in any rewrite.

---

## ⚠️ Status: prototype, not production

Read this before sending the link to anyone who might act on it.

| | |
|---|---|
| **No backend** | `FD_CONFIG.endpoint` is `null`. The booking modal, enquiry form and webinar registration all validate and show a success state, but **no lead reaches a human.** Anyone who books a call will be waiting forever. |
| **Proof is illustrative** | Founder stories, mentor profiles, the video and the WhatsApp thread are placeholders showing the intended design. They are not real customers, and the page says so in three places. |
| **Programme structure is proposed** | The 12-week cadence, phases and deliverables were never confirmed by the business. They are labelled "proposed" wherever they appear. |
| **WhatsApp is not wired** | Entry points route to the form. There is no real WhatsApp Business number yet — do not add a placeholder `wa.me` link. |

---

## Running it locally

```bash
node scripts/server.mjs
```

Then open http://localhost:4300. No dependencies, no build step required to view.

## Making changes

`src/founders-desk.html` is the source of truth. `index.html` is generated — never edit it
directly, your changes will be overwritten.

```bash
# 1. edit src/founders-desk.html
# 2. rebuild the deployable page
node scripts/build-standalone.mjs
# 3. ship it
git add -A && git commit -m "..." && git push
```

GitHub Pages rebuilds in about a minute.

### Why two HTML files

`src/founders-desk.html` is written for a sandbox that blocks external image files, so photos
are embedded there as base64 `data:` URIs. A self-hosted page must not do that — half a
megabyte of base64 in the HTML defeats browser caching. `scripts/build-standalone.mjs` wraps the
source in a proper `<head>`/`<body>`, points images back at real files in `/img`, and drops
`<img>` tags whose file doesn't exist so the live page makes no dead requests.

## Adding photographs

Every person and scene on the page is an inline SVG illustration sitting in a swap-slot.
Drop a correctly-named file into `/img` and the photograph takes over automatically — no
markup change. Remove the file and the illustration returns. See [DOCS/04-photography.md](DOCS/04-photography.md)
for filenames, aspect ratios and the shot list.

```bash
# after adding or replacing a file in /img
node scripts/inline-images.mjs      # only needed for the sandbox build
node scripts/build-standalone.mjs
```

**Currently live:** illustrated portraits plus one real workshop photograph. Stock portraits
were deliberately removed before deploying — see [DOCS/04-photography.md](DOCS/04-photography.md) for why.

---

## What's on the page

| Section | Notes |
|---|---|
| Hero banner | Animated gradient, layered UI cards, counters |
| Trust bar | Structural facts, not invented metrics |
| Pain / agitation | Three symptoms a founder recognises |
| **Track-finder quiz** | 3 questions → recommends Build or Sell, pre-fills the form |
| Programme fork | The load-bearing self-selection |
| How it works | Per-track tabs |
| Programme detail | Facts strip, 3-phase timeline, deliverables, explicit "not for you if" |
| Comparison table | The two tracks side by side |
| On-ground band | In-person support |
| **Cost-of-waiting calculator** | Three sliders, live output — the visitor's own arithmetic |
| Why us | Six differentiators |
| Bharat | City map, tier coverage |
| Proof | Video lightbox, WhatsApp thread, story carousel, mentor cards |
| **Free masterclass** | Low-commitment funnel rung, two-field registration |
| Pricing | Free first call, anchored — no invented figures |
| FAQ | Eight questions |
| Lead form | Full enquiry capture |
| **Booking modal** | Slot picker, reachable from every CTA |

### Design system

One rule, applied everywhere: **indigo** is the brand and the Build track, **teal** marks
the Sell track and appears only inside track-specific components, and **amber means action** —
every primary CTA is amber and nothing else ever is.

### Accessibility

Skip link, single `h1`, semantic landmarks, `role="radiogroup"` with arrow-key support on
every option group, `aria-describedby` on all inputs, `role="alert"` / `role="status"` live
regions, focus management on submit and in both modals, full `prefers-reduced-motion`
handling. All measured colour pairs pass WCAG AA.

---

## Before this goes to real traffic

- [ ] Build a submission endpoint and set `FD_CONFIG.endpoint`
- [ ] Staff the "one working day" reply target, or soften the copy — it's promised in seven places
- [ ] Replace proof placeholders with named, consented founders, or ship those sections empty
- [ ] Confirm the programme structure, or keep it labelled "proposed"
- [ ] Decide WhatsApp: real Business number, or keep form-only
- [ ] Rate limiting (a honeypot is already in place) and a privacy policy page
- [ ] DPDP: retention policy for the phone numbers you collect
- [ ] Confirm the mentor-capacity claim stays true

## Documentation

Full docs live in **[DOCS/](DOCS/)** — start with [DOCS/README.md](DOCS/README.md).

| | |
|---|---|
| [01 · Requirements](DOCS/01-requirements.md) | What was asked for, traced to what delivers it |
| [02 · QA report](DOCS/02-qa-report.md) | Acceptance criteria, defects found, what's left open |
| [03 · Technical handoff](DOCS/03-technical-handoff.md) | **Read before changing code.** Architecture, state model, build pipeline |
| [04 · Photography](DOCS/04-photography.md) | Image specs, swap-slots, and the consent rules |
| [05 · Analytics](DOCS/05-analytics.md) | Event list and the funnels worth building |

## Repo structure

```
├── index.html               generated — do not edit
├── README.md                this file
├── src/
│   └── founders-desk.html   source of truth (sandbox build, images inlined)
├── scripts/
│   ├── build-standalone.mjs src/founders-desk.html → index.html
│   ├── inline-images.mjs    /img → base64, for the sandbox build only
│   └── server.mjs           zero-dependency local preview on :4300
├── img/                     photographs, dropped into swap-slots
└── DOCS/                    requirements, QA, handoff, photography, analytics
```

`index.html` and `img/` must stay at the repo root — GitHub Pages serves from there.
