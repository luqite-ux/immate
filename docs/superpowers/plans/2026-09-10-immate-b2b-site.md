# IM Mate / IM Cam B2B Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Follow the Huanqiu customer-site delivery controller in the current session; this project explicitly forbids subagents.

**Goal:** Deliver the new IM Mate / IM Cam English B2B site through platform Production, terminal audit, workbench records, and gated cleanup.

**Architecture:** Independent Next.js 16 site with tenant-scoped Supabase/R2, shared admin proxy, server-issued atomic CAPTCHA, locale-aware data access, and v0-derived visual templates. Two browser evidence gates separate template review from full-content review.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS, Supabase, Cloudflare R2, Vercel, v0.

**Spec:** `docs/superpowers/specs/2026-09-10-immate-b2b-site-design.md`

## Global Constraints

- Preserve customer facts and supplied product imagery.
- Never publish warranty or guarantee language.
- Use admin group `2`, multilingual JSONB, and English-first settings.
- Every inquiry form has a unique CAPTCHA scope and server-side atomic consumption.
- GitHub owner is `luqite-ux`; Vercel team is `team_v0pxRIIzSUGJleUTRNSz6GS4`.
- Do not bind a domain until pre-domain UI language audit passes.

## Execution sequence

- [ ] Complete intake ledger, product coverage, representative asset pack, and case references.
- [ ] Create and verify the motion plan; generate v0 with real attachments and download source archive.
- [ ] Implement the template, build locally, and obtain desktop/390px template visual PASS.
- [ ] Provision tenant/R2/backend/admin/CAPTCHA/i18n/SEO and reconcile all four products.
- [ ] Obtain desktop/390px full-content visual PASS.
- [ ] Push company GitHub main, deploy Vercel Production, verify routes/backend/CAPTCHA/test cleanup and language audit.
- [ ] If formal identity remains missing, enter `domain_identity_pending`; otherwise bind Cloudflare/Vercel and rerun formal-domain audit.
- [ ] After explicit cleanup approval, delete v0 and local project, update daily summary/workbench, and finalize task title.

