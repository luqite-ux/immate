import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8')

test('public legal owner is the confirmed Shenzhen Sailan entity', async () => {
  const files = await Promise.all([
    read('lib/site.ts'),
    read('app/layout.tsx'),
    read('app/about/page.tsx'),
    read('app/contact/page.tsx'),
    read('app/news/page.tsx'),
    read('app/page.tsx'),
    read('scripts/seed-immate.mjs'),
  ])
  const source = files.join('\n')
  assert.match(source, /Shenzhen Sailan Technology Co\., Ltd\./)
  assert.doesNotMatch(source, /Shenzhen Cylan Technology Co\., Ltd\./)
  assert.doesNotMatch(source, /Cylan Technology Co\., Ltd\. or Shenzhen Sailan/)
})

test('contact reads the product query and passes it to the inquiry form', async () => {
  const source = await read('app/contact/page.tsx')
  assert.match(source, /searchParams:\s*Promise<\{\s*product\?:\s*string/)
  assert.match(source, /presetProductSlug=\{product\}/)
})

test('inquiry form preserves product context and collects buyer qualification fields', async () => {
  const source = await read('components/inquiry-form.tsx')
  assert.match(source, /value=\{p\.slug\}/)
  assert.match(source, /Inquiry type/)
  assert.match(source, /name="inquiryType"/)
  assert.match(source, /name="quantity"/)
  assert.match(source, /name="targetDate"/)
  assert.match(source, /Product:\s*\$\{productLabel/)
  assert.match(source, /Inquiry type:\s*\$\{inquiryType/)
  assert.match(source, /Estimated quantity:\s*\$\{quantity/)
  assert.match(source, /Target date:\s*\$\{targetDate/)
})

test('products page renders both buyer comparison groups without changing Events', async () => {
  const products = await read('app/products/page.tsx')
  const events = await read('app/events/page.tsx')
  assert.match(products, /T10 MAX vs T5 MAX/)
  assert.match(products, /C30 vs C41P/)
  assert.match(products, /Buyer comparison/)
  assert.match(events, /globalEvents\.map/)
  assert.doesNotMatch(events, /accordion|collapsed|details/i)
})
