import type { Product, ProductCategory, SpecGroup } from './product-types'
import { getSupabaseClient, getSupabaseConfig } from './supabase'

const txt=(v:unknown)=>typeof v==='string'?v.trim():''
const obj=(v:unknown):Record<string,unknown>=>v&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:{}
const arr=(v:unknown)=>Array.isArray(v)?v.map(txt).filter(Boolean):[]

function mapRow(row:Record<string,unknown>):Product{
  const extra=obj(row.extra_data)
  const specRecord=obj(row.specs)
  const specs:SpecGroup[]=Object.entries(specRecord).filter(([,value])=>typeof value!=='object').map(([label,value])=>({group:'Specifications',items:[{label,value:txt(value)}]})).filter(g=>g.items[0].value)
  const category=(txt(row.category_slug)||'ai-translators') as ProductCategory
  const image=txt(row.image_url)
  const gallery=[...new Set([image,...arr(extra.gallery),...arr(extra.images)].filter(Boolean))]
  return{slug:txt(row.slug),name:txt(row.name_en)||txt(row.name),series:txt(extra.series)||txt(specRecord.series),category,categoryLabel:txt(row.category),tagline:txt(row.description_en)||txt(row.description),summary:txt(row.overview_en)||txt(row.overview)||txt(row.description_en)||txt(row.description),image,gallery,imageAlt:`${txt(extra.series)} ${txt(row.name_en)||txt(row.name)} product image`.trim(),highlights:arr(row.features),specs,applicationSlugs:arr(extra.applicationSlugs)}
}
export async function fetchProductsData(){const c=getSupabaseConfig();const {data,error}=await getSupabaseClient().from('products').select('slug,name,name_en,description,description_en,overview,overview_en,image_url,category,category_slug,specs,features,extra_data,sort_order').eq('tenant_id',c.tenantId).eq('is_active',true).order('sort_order');if(error)throw error;return(data??[]).map(row=>mapRow(row as Record<string,unknown>)).filter(p=>p.slug&&p.name)}
export async function getProductBySlugFromDb(slug:string){return (await fetchProductsData()).find(p=>p.slug===slug)}

