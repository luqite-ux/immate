export function classifyAssetPath(relative) {
  const lower = relative.toLowerCase()
  if (lower.endsWith('/thumbs.db') || lower === 'thumbs.db') {
    return {
      type: 'system-file',
      role: 'windows-thumbnail-cache',
      use: 'excluded',
      classification: 'excluded',
      reason: 'Windows thumbnail cache is not a customer image',
    }
  }
  if (lower.endsWith('.xlsx')) return { type: 'spreadsheet', role: 'customer-facts-and-products', use: 'intake-authority' }
  if (lower.startsWith('轮播图/')) return { type: 'image', role: 'customer-banner', use: 'homepage-carousel', customer_supplied: true }
  if (lower.startsWith('产品图优化/')) return { type: 'image', role: 'optimized-product-gallery', use: 'product-or-gallery', customer_supplied: true }
  if (/\.(png|jpe?g|webp)$/i.test(lower)) return { type: 'image', role: 'raw-product-reference', use: 'provenance-and-product-gallery', customer_supplied: true }
  return { type: 'file', role: 'unclassified', use: 'review-required' }
}
