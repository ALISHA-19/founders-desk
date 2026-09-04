# Documentation

Everything written about this project, in reading order.

| # | Document | Read it when |
|---|---|---|
| 01 | [Requirements](01-requirements.md) | You want to know what was asked for and whether it was delivered. Every requirement across the engagement, traced to what implements it. |
| 02 | [QA report](02-qa-report.md) | You want the acceptance criteria, the defects found in testing, and what was deliberately left open. |
| 03 | [Technical handoff](03-technical-handoff.md) | **You are about to change the code.** Architecture, the colour rule, state model, the two-file build, and the production checklist. |
| 04 | [Photography](04-photography.md) | You are adding or replacing images. Filenames, specs, and the consent constraints — read the launch warning before putting a face on this page. |
| 05 | [Analytics](05-analytics.md) | You are wiring a measurement provider, or deciding what to optimise. Full event list and the funnels worth building. |

---

## If you only read one thing

The page is a **prototype with no backend.** `FD_CONFIG.endpoint` is `null`, so the
booking modal, enquiry form and webinar registration all validate, show success, and
send nothing to anyone. Anyone who books a call on the live site is waiting forever.

Everything else is detail. That is the thing that will embarrass you.

## Quick reference

```bash
node scripts/server.mjs          # local preview on :4300
node scripts/build-standalone.mjs # src/founders-desk.html → index.html
node scripts/inline-images.mjs    # /img → base64, for the sandbox build only
```

**Edit `src/founders-desk.html`.** `index.html` is generated and will be overwritten.

## Document status

These describe the build as deployed. Two things date fastest and should be re-checked
before you trust them:

- **Programme structure** (duration, phases, deliverables) is *proposed*, never
  confirmed by the business.
- **Proof content** (founder stories, mentor profiles, video) is illustrative
  placeholder, not real customers.

An older technical handoff exists outside this repo describing the pre-revamp page.
It is stale — the design system, colour scheme, section structure and build pipeline
have all changed since. Use 03 instead.
