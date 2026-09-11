import test from 'node:test'
import assert from 'node:assert/strict'

import { filterProductsByCategory } from '../lib/product-filter.ts'

const products = [
  { slug: 't10-max', category: 'ai-translators' },
  { slug: 't5-max', category: 'ai-translators' },
  { slug: 'c30', category: 'video-call-cameras' },
  { slug: 'c41p', category: 'video-call-cameras' },
]

test('AI Translators category excludes video call cameras', () => {
  assert.deepEqual(
    filterProductsByCategory(products, 'ai-translators').map((product) => product.slug),
    ['t10-max', 't5-max'],
  )
})

test('Video Call Cameras category excludes AI translators', () => {
  assert.deepEqual(
    filterProductsByCategory(products, 'video-call-cameras').map((product) => product.slug),
    ['c30', 'c41p'],
  )
})

test('All Products and unknown categories return the complete catalog', () => {
  assert.deepEqual(
    filterProductsByCategory(products, undefined).map((product) => product.slug),
    ['t10-max', 't5-max', 'c30', 'c41p'],
  )
  assert.deepEqual(
    filterProductsByCategory(products, 'not-a-category').map((product) => product.slug),
    ['t10-max', 't5-max', 'c30', 'c41p'],
  )
})
