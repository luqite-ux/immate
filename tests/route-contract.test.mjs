import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

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

test('product detail renders the backend gallery rather than only a static cover', async () => {
  const db = await readFile('lib/products-db.ts', 'utf8')
  const page = await readFile('app/products/[slug]/page.tsx', 'utf8')
  assert.match(db, /gallery/)
  assert.match(page, /p\.gallery/)
})
