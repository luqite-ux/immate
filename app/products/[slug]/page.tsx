import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlugFromDb } from '@/lib/products-db'

export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const p=await getProductBySlugFromDb((await params).slug)
  if(!p)return{}
  const url=`https://immateai.com/products/${p.slug}`
  return{title:`${p.series} ${p.name}`,description:p.summary,alternates:{canonical:url},openGraph:{title:`${p.series} ${p.name}`,description:p.summary,url,type:'website',images:p.image?[{url:p.image,alt:p.imageAlt}]:[]},twitter:{card:'summary_large_image',title:`${p.series} ${p.name}`,description:p.summary,images:p.image?[p.image]:[]}}
}

export default async function ProductPage({params}:{params:Promise<{slug:string}>}) {
  const p = await getProductBySlugFromDb((await params).slug)
  if (!p) notFound()
  const jsonLd={'@context':'https://schema.org','@type':'Product','@id':`https://immateai.com/products/${p.slug}#product`,name:`${p.series} ${p.name}`,description:p.summary,image:p.image?[p.image]:undefined,brand:{'@type':'Brand',name:p.series},manufacturer:{'@id':'https://immateai.com/#organization'}}
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/><section className="mx-auto max-w-7xl px-6 py-16"><Link href="/products" className="text-sm font-semibold text-cyan-700">← All products</Link><div className="mt-8 grid gap-12 lg:grid-cols-2"><div className="relative aspect-square rounded-3xl bg-slate-50"><Image fill src={p.image} alt={p.imageAlt} className="object-contain p-8"/></div><div><p className="text-sm font-bold uppercase tracking-widest text-cyan-700">{p.series} · {p.categoryLabel}</p><h1 className="mt-3 text-5xl font-bold">{p.name}</h1><p className="mt-5 text-xl text-slate-600">{p.tagline}</p><p className="mt-6 leading-7 text-slate-700">{p.summary}</p>{p.highlights.length>0&&<ul className="mt-8 space-y-3">{p.highlights.map(h=><li key={h} className="rounded-lg bg-slate-50 p-3">✓ {h}</li>)}</ul>}<Link href={`/contact?product=${p.slug}`} className="mt-8 inline-block rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white">Discuss this product</Link></div></div></section></>
}

