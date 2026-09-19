import type { MetadataRoute } from 'next'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'
export const revalidate=60
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base='https://immateai.com';const now=new Date();const [products,articles]=await Promise.all([fetchProductsData(),getPublishedArticles()]);return['','/products','/applications','/events','/about','/faq','/news','/contact'].map(path=>({url:`${base}${path}`,lastModified:now})).concat(products.map(p=>({url:`${base}/products/${p.slug}`,lastModified:now})),articles.map(a=>({url:`${base}/news/${a.slug}`,lastModified:new Date(a.updatedAt||a.publishedAt)})))}

