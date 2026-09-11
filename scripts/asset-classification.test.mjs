import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyAssetPath } from './asset-classification.mjs'

test('Thumbs.db inside an optimized product folder is excluded as a system file', () => {
  assert.deepEqual(classifyAssetPath('产品图优化/c30/Thumbs.db'), {
    type: 'system-file',
    role: 'windows-thumbnail-cache',
    use: 'excluded',
    classification: 'excluded',
    reason: 'Windows thumbnail cache is not a customer image',
  })
})
