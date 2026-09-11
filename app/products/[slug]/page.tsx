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
  const jsonLd={'@context':'https://schema.org','@type':'Product','@id':`https://immateai.com/products/${p.slug}#product`,name:`${p.series} ${p.name}`,description:p.summary,image:p.gallery,brand:{'@type':'Brand',name:p.series},manufacturer:{'@id':'https://immateai.com/#organization'}}
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}}/><section className="mx-auto max-w-7xl px-6 py-16"><Link href="/products" className="text-sm font-semibold text-cyan-700">← All products</Link><div className="mt-8 grid gap-12 lg:grid-cols-2"><div className="relative aspect-square rounded-3xl bg-slate-50"><Image fill src={p.image} alt={p.imageAlt} className="object-contain p-8"/></div><div><p className="text-sm font-bold uppercase tracking-widest text-cyan-700">{p.series} · {p.categoryLabel}</p><h1 className="mt-3 text-5xl font-bold">{p.name}</h1><p className="mt-5 text-xl text-slate-600">{p.tagline}</p><p className="mt-6 leading-7 text-slate-700">{p.summary}</p>{p.highlights.length>0&&<div className="mt-8"><h2 className="text-xl font-bold">Product highlights</h2><ul className="mt-4 space-y-3">{p.highlights.map(h=><li key={h} className="rounded-lg bg-slate-50 p-3">✓ {h}</li>)}</ul></div>}<Link href={`/contact?product=${p.slug}`} className="mt-8 inline-block rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white">Discuss this product</Link></div></div>{p.specs.length>0&&<section className="mt-20"><p className="text-sm font-bold uppercase tracking-widest text-cyan-700">Specifications</p><h2 className="mt-2 text-3xl font-bold">Supplied product details</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{p.specs.flatMap(group=>group.items).map(item=><div key={`${item.label}-${item.value}`} className="rounded-2xl border bg-white p-5"><p className="text-sm font-semibold text-slate-500">{item.label}</p><p className="mt-2 font-semibold text-slate-900">{item.value}</p></div>)}</div></section>}{p.gallery.length>1&&<section className="mt-20"><p className="text-sm font-bold uppercase tracking-widest text-cyan-700">Product gallery</p><h2 className="mt-2 text-3xl font-bold">Explore {p.name} in detail</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{p.gallery.map((image,index)=><div key={image} className="relative aspect-square overflow-hidden rounded-2xl border bg-slate-50"><Image fill src={image} alt={`${p.series} ${p.name} product view ${index+1}`} className="object-contain p-3"/></div>)}</div></section>}</section></>
}
