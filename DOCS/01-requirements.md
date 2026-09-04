# Founder's Desk — requirements plan & traceability

Every requirement stated across this engagement, in one list, each traceable to what
delivers it. Status is filled in only after the browser check passes.

Legend: ☐ not started · ◐ in progress · ☑ delivered & verified

---

## 1. Original brief

| # | Requirement | Delivered by | Status |
|---|---|---|---|
| R1 | Landing page that captures inquiries | Lead form + booking modal + webinar registration | ☑ |
| R2 | Both programmes highlighted | Fork section, deep programme sections, comparison table | ☑ |
| R3 | Simplest possible presentation, not confusing | Quiz → fork → detail; one decision at a time | ☑ |
| R4 | Target Bharat tier 1/2/3 | Bharat section, city map, tier chips, sample cities | ☑ |
| R5 | Early-stage founders/startups | Copy, qualifiers, FAQ throughout | ☑ |
| R6 | Social proof / testimonials | Carousel, mentor cards, WhatsApp thread | ☑ |
| R7 | Embedded YouTube video with play option | Video card → lightbox iframe + graceful fallback | ☑ |

## 2. "Naive UI" round

| # | Requirement | Delivered by | Status |
|---|---|---|---|
| R8 | Revamp the UI, look professional | Full redesign, elevation system, type scale | ☑ |
| R9 | Align to the task given | Sections mapped to brief; proof filled | ☑ |
| R10 | QA against AC, due diligence | `QA-Report.md`, browser-verified | ☑ |

## 3. Conversion round

| # | Requirement | Delivered by | Status |
|---|---|---|---|
| R11 | Top banner image | Full-bleed hero banner | ☑ (upgraded in R23) |
| R12 | Interactive features | Quiz, calculator, carousel, booking modal, tabs, accordion | ☑ |
| R13 | Marketing psychology | Agitation → micro-commitment → loss aversion → anchoring → reciprocity | ☑ |
| R14 | Influence toward purchase | Single dominant CTA, laddered commitment | ☑ |
| R15 | "Book a call" mandatory | 16 booking CTAs; amber reserved exclusively for booking | ☑ |
| R16 | Animations | Reveals, counters, marquee, floats, transitions (all reduced-motion safe) | ☑ |
| R17 | Visual hooks / catchy | Hero gradient banner, quiz, calculator, ticker | ☑ |
| R18 | Uniform colour scheme, edtech-appropriate | Indigo brand / teal track / amber action — one rule | ☑ |
| R19 | Honest scarcity (limited slots per mentor) | 4 placements + FAQ; contradicting copy corrected | ☑ |

## 4. Current round — depth, funnel, visuals

| # | Requirement | Delivered by | Status |
|---|---|---|---|
| R20 | **Programme detail is too thin** | Deep programme sections: cadence, duration, phase-by-phase breakdown, concrete deliverables, explicit not-for | ☑ |
| R21 | **No webinar / client-acquisition funnel** | Free live masterclass section: topic, schedule, host, agenda, low-friction registration | ☑ |
| R22 | **Lower-commitment capture** | Webinar registration (name + WhatsApp only) as the top-of-funnel rung below "book a call" | ☑ |
| R23 | **No images anywhere** | Illustrated visual system: mentor portraits, scene illustrations, programme phase art, webinar art — each a documented photo swap-slot | ☑ |
| R24 | **Crisp for an entrepreneur audience** | Tightened copy, clearer hierarchy, scannable structure | ☑ |
| R25 | **Deliberate placement + CTA hierarchy** | Two-rung funnel: webinar (low commitment) → call (high commitment), consistently placed | ☑ |
| R26 | **Design elements considered** | Section rhythm, illustration language, consistent component system | ☑ |
| R27 | Requirements plan exists and is met | This document + verification pass | ☑ |

---

## Image strategy (R23)

**Constraint.** The published artifact runs under a CSP that blocks every external
image, iframe and media request. No CDN, no stock library, no hotlinked URL. There is
also no image-generation tool in this environment, so photographs cannot be produced
here.

**Approach.** Every visual is an inline SVG illustration, which renders in the artifact
*and* when self-hosted. Each one sits in a marked swap-slot so a real photograph
replaces it with a one-line change.

**Shot list** — what to photograph or commission to replace the illustrations:

| Slot | Illustration today | Replace with |
|---|---|---|
| Hero side panel | Product/console composition | Founder mid-session, or mentor and founder at a table |
| Mentor cards (×3) | Illustrated portraits | Real headshots, consented, named |
| Story carousel (×3) | Illustrated portraits | Real founder photos, consented |
| Webinar host | Illustrated portrait | Host headshot |
| On-ground band | Illustrated visit scene | Photo of an actual on-ground visit |
| Programme phases | Illustrated phase icons | Keep illustrated — these are diagrammatic, not evidentiary |

Swapping is `<span class="ph">…inline svg…</span>` → `<img src="/img/<name>.jpg" alt="…">`.
Alt text is already written on every slot.

---

## Standing constraints

1. **No fabricated proof.** Founder stories, mentor profiles, the video and the message
   thread are illustrative and labelled as such in three places. Replace with named,
   consented people or ship those sections empty.
2. **No fake urgency.** No countdown timers, no "N places left" counters, no invented
   enrolment numbers. Mentor capacity is stated as a structural fact because the
   business confirmed it is one.
3. **Programme structure is proposed.** Cadence, duration and phase content below were
   never confirmed by the business — they are labelled "proposed" wherever they appear
   and must be confirmed or corrected before launch.
4. **No backend.** `FD_CONFIG.endpoint` is `null`; submissions simulate. Set it to POST
   for real.
