import { getSupabaseClient, getSupabaseConfig } from './supabase'
export type Article={slug:string;title:string;excerpt:string;content:string;featuredImage:string;publishedAt:string;updatedAt:string}
const text=(v:unknown)=>typeof v==='string'?v.trim():''
const localized=(v:unknown)=>v&&typeof v==='object'&&!Array.isArray(v)?text((v as Record<string,unknown>).en):''
const map=(r:Record<string,unknown>):Article=>({slug:text(r.slug),title:localized(r.title_i18n)||text(r.title),excerpt:localized(r.excerpt_i18n)||text(r.excerpt),content:localized(r.content_i18n)||text(r.content),featuredImage:text(r.featured_image),publishedAt:text(r.published_at)||text(r.created_at),updatedAt:text(r.updated_at)||text(r.published_at)||text(r.created_at)})
export async function getPublishedArticles(){const c=getSupabaseConfig();const {data,error}=await getSupabaseClient().from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,featured_image,published_at,created_at,updated_at').eq('tenant_id',c.tenantId).eq('is_published',true).order('published_at',{ascending:false});if(error)throw error;return(data??[]).map(r=>map(r as Record<string,unknown>)).filter(a=>a.slug&&a.title)}
export async function getArticleBySlug(slug:string){return(await getPublishedArticles()).find(a=>a.slug===slug)}
