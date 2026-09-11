import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { fetchProductsData } from '@/lib/products-db'

export const revalidate = 60

export default async function ProductsPage() {
  const products = await fetchProductsData()
  return <><PageHero eyebrow="IM Mate · IM Cam" title="Smart devices for clearer human connection" description="Compare our translator and video call camera platforms for service, business and family applications."/><section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2">{products.map(p=><Link href={`/products/${p.slug}`} key={p.slug} className="grid rounded-2xl border bg-white p-5 shadow-sm sm:grid-cols-2"><div className="relative aspect-square rounded-xl bg-slate-50"><Image fill src={p.image} alt={p.imageAlt} className="object-contain p-4"/></div><div className="p-4"><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">{p.categoryLabel}</p><h2 className="mt-2 text-3xl font-bold">{p.series} {p.name}</h2><p className="mt-3 text-slate-600">{p.summary}</p></div></Link>)}</section></>
}
