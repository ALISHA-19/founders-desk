# Analytics specification

Every event funnels through one function in `src/founders-desk.html`:

```js
function track(event, props){
  (window.dataLayer = window.dataLayer || []).push({ event, ...props });
}
```

It currently pushes to `window.dataLayer` and nothing else. Swap the body for GA4,
Segment, PostHog or Mixpanel — call sites do not change. Append `?debug=1` to the URL
to log every event to the console.

---

## The number that matters

**Fork click-through and quiz completion.** Together they prove the page's core bet —
that a founder can correctly self-identify which programme they need. If that fails,
nothing downstream is worth optimising. Instrument these first.

---

## Events

### Page and section

| Event | Fires when | Properties |
|---|---|---|
| `page_view` | Load | `path`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign` |
| `section_view` | A key section enters the viewport (once each) | `section` — one of `fork`, `programmes`, `webinar`, `calculator`, `proof`, `faq`, `lead-form` |

### Track selection

| Event | Fires when | Properties |
|---|---|---|
| `quiz_view` | Quiz scrolls into view | — |
| `quiz_answer` | Any quiz option chosen | `step` (1–3), `choice` (`build`/`sell`) |
| `quiz_complete` | Third answer given | `result`, `build_points` |
| `quiz_restart` | "Retake" clicked | — |
| `fork_select` | Fork card CTA clicked | `program`, `source` |
| `fork_crosslink_click` | A "better fit" correction link | `from`, `to` |
| `hiw_toggle` | How-it-works track switched | `track` |

`fork_crosslink_click` is worth watching closely — a high rate means the fork copy is
sending people to the wrong card in the first place.

### Engagement

| Event | Fires when | Properties |
|---|---|---|
| `calculator_use` | First slider interaction | — |
| `story_view` | Carousel advanced manually | `index`, `manual` |
| `video_play` | Founder video opened | `id` |
| `faq_open` | An FAQ expands | `question` |
| `photo_loaded` | A real photograph replaces an illustration | `slot` |

### Conversion — webinar (low commitment)

| Event | Fires when | Properties |
|---|---|---|
| `webinar_register` | Registration succeeds | `session` |
| `webinar_validation_error` | Submit blocked by validation | `count` |
| `webinar_error` | Submission failed | — |

### Conversion — booking (high commitment)

| Event | Fires when | Properties |
|---|---|---|
| `booking_open` | Modal opened | `source` — which CTA (nav, hero, quiz_result, fork_build, calculator, …) |
| `booking_slot_select` | Day or time chosen | `part`, `value` |
| `booking_confirm` | Booking succeeds | `program`, `slot` |
| `booking_validation_error` | Submit blocked | `count` |
| `booking_error` | Submission failed | — |

`booking_open.source` is the most actionable property on the page — it tells you which
of the 17 CTAs actually earns clicks, and which are decoration.

### Conversion — enquiry form

| Event | Fires when | Properties |
|---|---|---|
| `form_start` | First field focused | `program` |
| `form_validation_error` | Each failing field on submit | `field` |
| `form_submit` | Submission succeeds | `program`, `qualifier`, `city` |
| `form_submit_error` | Submission failed | `program` |

---

## Funnels worth building

**Primary:** `page_view` → `section_view{fork}` → `fork_select` or `quiz_complete` →
`booking_open` → `booking_confirm`

**Low-commitment:** `page_view` → `section_view{webinar}` → `webinar_register`, then
whether those numbers later appear in `booking_open`

**Diagnostic:** `booking_open` → `booking_validation_error` → drop-off. A high
validation-error rate before abandonment means a field is fighting people; `count`
tells you how many at once.

## Notes

- No PII beyond what the visitor typed is emitted. `form_submit` carries `city` but
  never name or phone — keep it that way when you wire a real provider.
- Section and quiz view events fire once per page load, not per scroll.
- Nothing fires on page unload, so bounce timing needs the provider's own handling.
