# IM Mate / IM Cam Motion Plan

## Context and differentiation

The product language is bright, precise consumer electronics: dual-screen translation and human-centered video connection. Recent customer combinations leaned on industrial signal traces, laboratory wells, layered manufacturing, or material masks. This plan instead uses a two-way conversation motif and focus-ring handoff, avoiding another industrial process animation.

## Candidate scoring

| Candidate | Source | Industry fit | Hierarchy | Conversion | Difference | Desktop/mobile | Performance | Reduced motion | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| MOT-IMMATE-01 two-way hero handoff | customer banners + CSS/Motion | 4 | 4 | 4 | 4 | 4 | 4 | 4 | Adopt |
| MOT-IMMATE-02 conversation-line reveal | customer product semantics + SVG/CSS | 4 | 4 | 3 | 4 | 4 | 4 | 4 | Adopt |
| MOT-IMMATE-03 bounded device-card stagger | Motion viewport pattern | 4 | 4 | 4 | 3 | 4 | 4 | 4 | Adopt |
| MOT-IMMATE-04 control feedback | CSS transition | 4 | 3 | 4 | 3 | 4 | 4 | 4 | Adopt |
| EXT-IMMATE-01 CSS view timelines | MDN scroll-driven animations | 3 | 3 | 2 | 4 | 3 | 4 | 4 | Reject for primary flow; progressive enhancement complexity gives little benefit for a four-product catalog |
| EXT-IMMATE-02 View Transition API gallery morph | MDN View Transition API | 3 | 3 | 3 | 4 | 3 | 3 | 3 | Reject for launch; browser/version variance and focus semantics outweigh benefit |
| EXT-IMMATE-03 prefers-reduced-motion | MDN media feature | 4 | 4 | 4 | 3 | 4 | 4 | 4 | Adopt as mandatory accessibility mechanism |

## Selected scenes

### MOT-IMMATE-01 — Two-way hero handoff (narrative)

- Location: homepage hero carousel using all three supplied 1920×800 banners.
- Effect: hero copy enters from the left while a short cool-blue focus line resolves toward the product; manual slide changes use a 260ms crossfade, never a long parallax.
- Reason: connects the two-way conversation promise to the real device without obscuring the supplied image.
- Desktop: preserve the banner's negative space and product focal point.
- 390px: disable line travel, use a static gradient-safe crop and 180ms opacity transition.
- Reduced motion: no auto-advance or travel; current slide and controls remain fully visible.

### MOT-IMMATE-02 — Conversation-line reveal (industry feature)

- Location: applications and “How it connects” sequence.
- Effect: a short bidirectional line joins two semantic endpoints once when visible; steps remain ordinary ordered content.
- Reason: product-specific communication metaphor, distinct from recent industrial traces.
- Desktop: 520ms line draw with 80ms endpoint emphasis.
- 390px: vertical line, no lateral translation.
- Reduced motion / failure: line renders complete and all text is visible without JavaScript.

### MOT-IMMATE-03 — Bounded device-card stagger (content)

- Location: every repeated product, application, advantage, FAQ, certification and news-card collection.
- Effect: each card fades from 16–22px below over 480–560ms, 70ms stagger capped at 280ms; filtered/new cards animate once.
- Desktop and 390px: same coverage, mobile displacement reduced to 10px.
- Reduced motion / failure: no hiding or displacement; cards are immediately visible.

### MOT-IMMATE-04 — Crisp control feedback (interaction)

- Location: nav, carousel controls, product cards, CTA, form controls and accordion.
- Effect: hover/focus changes border and shadow with max 4px lift; CTA arrow moves 3px; press returns to zero.
- Touch: visible pressed/focus state, no hover-dependent information.
- Reduced motion: color/border feedback remains, transforms disabled.

## Readiness gates

- Scene count: 4.
- External candidates: 3.
- Desktop readiness: PASS — each scene has location, duration and fail-safe content behavior.
- 390px readiness: PASS — reduced displacement, vertical connection path and hero safe crop specified.
- Reduced-motion readiness: PASS — non-essential motion and auto-advance disabled while all content remains visible.
- Verification later: normal JS, blocked motion script, disabled JS and reduced-motion checks on Home, Products, product detail, About, News and Contact.

