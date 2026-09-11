import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { readdir, readFile, stat, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { classifyAssetPath } from './asset-classification.mjs'

const require = createRequire('D:\\Cursor\\Grand\\huanqiu-admin\\package.json')
const sharp = require('sharp')

const sourceRoot = 'Y:\\客户资料1\\1487-赛蓝科技对接群'
const outputRoot = 'D:\\Cursor\\Grand\\immate\\.codex-delivery'

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...await walk(full))
    else if (entry.isFile()) files.push(full)
  }
  return files
}

function slash(value) {
  return value.replaceAll('\\', '/')
}

const files = (await walk(sourceRoot)).sort((a, b) => a.localeCompare(b, 'zh-CN'))
const items = []
for (const file of files) {
  const data = await readFile(file)
  const relative = slash(path.relative(sourceRoot, file))
  const info = await stat(file)
  const item = {
    source_id: relative,
    path: file,
    bytes: info.size,
    sha256: createHash('sha256').update(data).digest('hex'),
    ...classifyAssetPath(relative),
  }
  if (item.type === 'image') {
    let metadata
    try {
      metadata = await sharp(data).metadata()
    } catch (error) {
      console.error(JSON.stringify({ failing_file: file, signature: data.subarray(0, 16).toString('hex'), error: error.message }))
      throw error
    }
    item.width = metadata.width
    item.height = metadata.height
    item.format = metadata.format
    item.has_alpha = metadata.hasAlpha
  }
  items.push(item)
}

await mkdir(outputRoot, { recursive: true })
await writeFile(path.join(outputRoot, 'asset-ledger.json'), `${JSON.stringify({
  schema_version: 1,
  customer: '深圳市赛蓝科技有限公司',
  source_root: sourceRoot,
  generated_from_complete_recursive_enumeration: true,
  items,
}, null, 2)}\n`, 'utf8')

console.log(JSON.stringify({ files: items.length, images: items.filter((item) => item.type === 'image').length }))
