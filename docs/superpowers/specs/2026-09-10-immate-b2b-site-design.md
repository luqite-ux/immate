# IM Mate / IM Cam B2B Site Design

## Outcome

Create a new English-first B2B product site for Shenzhen Cylan Technology Co. facts without inventing an unverified legal English name. The site presents four supplied device models, supports backend-managed products/news/settings, and is delivered through the Huanqiu multi-tenant stack.

## Architecture

Use an independent Next.js 16 repository. Server components query tenant-scoped Supabase data with locale fallback; client components handle filtering, galleries, forms, CAPTCHA refresh, and interaction. Images are uploaded to the tenant R2 prefix. `/admin` proxies to the shared Huanqiu admin while authentication stays in the customer site Route Handler.

## Visual system

Use the three customer banners as the hero foundation, with real HTML copy and CTA overlays. The system is bright white and cool blue with restrained dark interface surfaces. Product photography remains complete on clean light stages. Motion is limited to 3–4 purposeful scenes, includes 390px behavior and `prefers-reduced-motion` fallback.

## Content and safety

The four authoritative products are T10 MAX, T5 MAX, C30, and C41P. News starts empty. Company facts come from the supplied workbook and verified public reference site. Warranty/guarantee claims, unverified production claims, prices, ratings, and invented certifications are forbidden.

## Delivery

Provision a new tenant in admin group 2, initialize all site settings and translation profile, upload assets to R2, seed multilingual JSONB fields, configure per-form CAPTCHA, publish to the company GitHub account and Vercel team, then verify platform Production. Missing formal domain and legal English company name are scoped to domain identity completion.

