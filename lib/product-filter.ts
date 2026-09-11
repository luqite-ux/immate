import type { ProductCategory } from './product-types'

const productCategories: ProductCategory[] = ['ai-translators', 'video-call-cameras']

export function filterProductsByCategory<T extends { category: string }>(
  products: T[],
  category?: string,
) {
  if (!category || !productCategories.includes(category as ProductCategory)) return products
  return products.filter((product) => product.category === category)
}
