import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const deliveryRoot = 'D:\\Cursor\\Grand\\immate\\.codex-delivery'
const ledger = JSON.parse(await readFile(path.join(deliveryRoot, 'asset-ledger.json'), 'utf8'))
const images = ledger.items.filter((item) => item.type === 'image')
const paths = (prefix) => images.filter((item) => item.source_id.startsWith(prefix)).map((item) => item.path)

const products = [
  { key: 't10-max', model: 'T10 MAX', category: 'AI Translators', name: '10-inch Dual-Screen AI Business Translator', optimized: '产品图优化/10寸电商图/', raw: '10寸电商图/' },
  { key: 't5-max', model: 'T5 MAX', category: 'AI Translators', name: '5-inch Dual-Screen Smart Translator', optimized: '产品图优化/T5 MAX/', raw: 'T5 MAX/' },
  { key: 'c30', model: 'C30', category: 'Video Call Cameras', name: '2.8-inch Two-Way Video Call Camera', optimized: '产品图优化/c30/', raw: 'c30/' },
  { key: 'c41p', model: 'C41P', category: 'Video Call Cameras', name: '4.3-inch Dual-Light Two-Way Video Call Camera', optimized: '产品图优化/C41P-双光版产品图/', raw: 'C41P-双光版产品图/' },
].map((product) => ({ ...product, assets: paths(product.optimized), reference_assets: paths(product.raw) }))

const sourceEntries = []
for (const product of products) {
  sourceEntries.push({ source_id: `optimized-${product.key}`, group: product.category, classification: 'product', product_key: product.key, assets: product.assets })
  sourceEntries.push({ source_id: `raw-${product.key}`, group: `${product.category}-raw-reference`, classification: 'duplicate', duplicate_of: product.key, reason: 'Raw/e-commerce source images describe the same Excel-listed model; optimized folder is authoritative and raw files remain gallery/specification references.', assets: product.reference_assets })
}

await writeFile(path.join(deliveryRoot, 'product-coverage-manifest.json'), `${JSON.stringify({
  issue_id: 'DATA-PRODUCT-MATERIAL-COVERAGE',
  customer: '深圳市赛蓝科技有限公司',
  source_entries: sourceEntries,
  backend_product_keys: [],
  frontend_product_keys: [],
  featured_product_keys: [],
}, null, 2)}\n`, 'utf8')

await writeFile(path.join(deliveryRoot, 'full-content-manifest.json'), `${JSON.stringify({
  schema_version: 1,
  customer: '深圳市赛蓝科技有限公司',
  default_language: 'en',
  categories: ['AI Translators', 'Video Call Cameras'],
  products,
  banners: paths('轮播图/'),
  company_media: [],
  certifications: ['CE', 'FCC', 'RoHS', 'UKCA', 'EU patent', 'Turkey patent', 'National High-Tech Enterprise', 'Specialized and Innovative SME', 'Shenzhen Technology-based SME'],
  news: [],
}, null, 2)}\n`, 'utf8')

const representatives = [
  ...paths('轮播图/'),
  products[0].assets[0],
  products[1].assets[0],
  products[2].assets[0],
  products[3].assets[0],
].filter(Boolean)
await writeFile(path.join(deliveryRoot, 'v0-asset-pack.json'), `${JSON.stringify({
  schema_version: 1,
  customer: '深圳市赛蓝科技有限公司',
  representative_only: true,
  assets: representatives.map((asset) => ({ source_path: asset, ledger_reference: asset, purpose: asset.includes('轮播图') ? 'customer-supplied homepage banner' : 'representative product shape' })),
  excluded_complete_scope: 'Remaining optimized and raw product galleries stay in full-content-manifest for Codex full-content integration.',
  logo_status: 'No separate logo file supplied; use the visible IM Mate / IM Cam word brands until a verified logo source is available.',
}, null, 2)}\n`, 'utf8')

console.log(JSON.stringify({ products: products.length, authoritativeImages: products.reduce((sum, item) => sum + item.assets.length, 0), representativeAssets: representatives.length }))
