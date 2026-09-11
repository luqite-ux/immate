import type { Product, ProductCategory, SpecGroup } from './product-types'
import { getSupabaseClient, getSupabaseConfig } from './supabase'

const txt=(v:unknown)=>typeof v==='string'?v.trim():''
const obj=(v:unknown):Record<string,unknown>=>v&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:{}
const arr=(v:unknown)=>Array.isArray(v)?v.map(txt).filter(Boolean):[]

function mapRow(row:Record<string,unknown>):Product{const extra=obj(row.extra_data);const specRecord=obj(row.specs);const specs:SpecGroup[]=Object.entries(specRecord).map(([group,value])=>({group,items:Array.isArray(value)?value.map(x=>{const i=obj(x);return{label:txt(i.label),value:txt(i.value)}}).filter(x=>x.label&&x.value):[{label:group,value:txt(value)}]})).filter(g=>g.items.some(i=>i.value));const category=(txt(row.category_slug)||'ai-translators') as ProductCategory;return{slug:txt(row.slug),name:txt(row.name_en)||txt(row.name),series:txt(extra.series)||txt(obj(row.specs).series),category,categoryLabel:txt(row.category),tagline:txt(row.description_en)||txt(row.description),summary:txt(row.overview_en)||txt(row.overview)||txt(row.description_en)||txt(row.description),image:txt(row.image_url),imageAlt:`${txt(extra.series)} ${txt(row.name_en)||txt(row.name)} product image`.trim(),highlights:arr(row.features),specs,applicationSlugs:arr(extra.applicationSlugs)}}
export async function fetchProductsData(){const c=getSupabaseConfig();const {data,error}=await getSupabaseClient().from('products').select('slug,name,name_en,description,description_en,overview,overview_en,image_url,category,category_slug,specs,features,extra_data,sort_order').eq('tenant_id',c.tenantId).eq('is_active',true).order('sort_order');if(error)throw error;return(data??[]).map(row=>mapRow(row as Record<string,unknown>)).filter(p=>p.slug&&p.name)}
export async function getProductBySlugFromDb(slug:string){return (await fetchProductsData()).find(p=>p.slug===slug)}
