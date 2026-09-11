import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

test('homepage uses all supplied banners and complete narrative sections', async () => {
  const source = `${await readFile('app/page.tsx', 'utf8')}\n${await readFile('components/hero-carousel.tsx', 'utf8')}`
  for (const expected of ['hero-livingroom-camera.jpg', 'hero-car-translator.jpg', 'hero-factory-line.jpg', 'Applications', 'FAQ', 'News']) {
    assert.match(source, new RegExp(expected.replace('.', '\\.')))
  }
})

test('mobile captcha row can shrink without clipping the answer field', async () => {
  const source = await readFile('components/captcha-field.tsx', 'utf8')
  assert.match(source, /min-w-0/)
  assert.match(source, /flex-1/)
})

test('footer normalizes legal-owner punctuation before the copyright period', async () => {
  const source = await readFile('components/site-footer.tsx', 'utf8')
  assert.ok(source.includes('siteConfig.legalName.replace(/[\\s\\.，,;；:：!！?？]+$/, "")'))
})

test('template has progressive-enhancement reveal motion and no simulated inquiry success', async () => {
  const reveal = await readFile('components/reveal.tsx', 'utf8')
  const form = await readFile('components/inquiry-form.tsx', 'utf8')
  assert.match(reveal, /IntersectionObserver/)
  assert.match(reveal, /prefers-reduced-motion/)
  assert.doesNotMatch(form, /captured your submission locally|setSubmitted|Inquiry received/)
})
