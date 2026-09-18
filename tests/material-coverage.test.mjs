import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('about page uses supplied company facts and does not invent a founding year', async () => {
  const source = await read('app/about/page.tsx')
  assert.doesNotMatch(source, /since 2005/i)
  assert.match(source, /21-person team/i)
  assert.match(source, /80%/)
  assert.match(source, /150 countries/i)
  assert.match(source, /1\.6 million/i)
})

test('company evidence photos are published on About and represented on the homepage', async () => {
  const about = await read('app/about/page.tsx')
  const home = await read('app/page.tsx')
  const assets = [
    'cylan-rd-manufacturing.jpg',
    'cylan-exhibition-video-camera.jpg',
    'cylan-exhibition-ai-translator.jpg',
  ]

  for (const asset of assets) {
    await assert.doesNotReject(read(`public/images/company/${asset}`), `missing company image: ${asset}`)
    assert.match(about, new RegExp(asset.replace('.', '\\.')))
  }
  assert.match(home, /cylan-rd-manufacturing\.jpg/)
  assert.match(about, /R&amp;D and product team/)
  assert.match(about, /Manufacturing and assembly/)
  assert.match(about, /Global exhibitions and customer connections/)
})

test('FAQ preserves every usable supplied buyer answer and excludes the forbidden warranty row', async () => {
  const source = await read('app/faq/page.tsx')
  for (const expected of [
    'tiered pricing',
    'bulk discounts',
    'raw-material costs or exchange rates',
    'one to two days',
    'seven to fifteen days',
    'expedited production',
    'production progress updates',
    'third-party inspection',
  ]) assert.match(source, new RegExp(expected, 'i'))
  assert.doesNotMatch(source, /warrant(?:y|ies)|guarantee(?:d)?/i)
})

test('seed keeps the customer-supplied product descriptions, specifications and MOQ', async () => {
  const source = await read('scripts/seed-immate.mjs')
  for (const expected of [
    '0.5-second',
    '96%+',
    '35+ languages',
    '273.58 × 96.5 × 213.48 mm',
    '1.08 kg',
    '100 pieces',
    '2.8-inch',
    '4.3-inch',
    '1080p',
    '2.4 GHz Wi-Fi',
  ]) assert.ok(source.includes(expected), `missing supplied product fact: ${expected}`)
})

test('product detail visibly renders supplied specifications and buyer-use information', async () => {
  const page = await read('app/products/[slug]/page.tsx')
  assert.match(page, /Specifications/)
  assert.match(page, /p\.specs/)
  assert.match(page, /Product highlights/)
})

test('reseeding content preserves existing R2 product covers and galleries', async () => {
  const source = await read('scripts/seed-immate.mjs')
  assert.match(source, /existing\.image_url/)
  assert.match(source, /existing\.extra_data/)
  assert.match(source, /r2\.dev/)
})
