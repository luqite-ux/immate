import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

const required = [
  'app/products/page.tsx',
  'app/products/[slug]/page.tsx',
  'app/applications/page.tsx',
  'app/about/page.tsx',
  'app/faq/page.tsx',
  'app/news/page.tsx',
  'app/news/[slug]/page.tsx',
  'app/contact/page.tsx',
]

test('required customer-site route templates exist', () => {
  assert.deepEqual(required.filter((file) => !existsSync(file)), [])
})
