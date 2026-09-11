import Link from 'next/link'
import { fetchProductsData } from '@/lib/products-db'
import Image from 'next/image'
import { HeroCarousel } from '@/components/hero-carousel'
import { Reveal } from '@/components/reveal'
export const metadata={alternates:{canonical:'https://immateai.com'}}

export const revalidate = 60

export default async function HomePage() {
  const products = await fetchProductsData()
  return <>
    <HeroCarousel />
    <section className="mx-auto max-w-7xl px-6 py-20"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Product portfolio</p><h2 className="mt-2 text-4xl font-bold">Built for real conversations</h2><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{products.map((p,i)=><Reveal key={p.slug} delay={i*70} className="h-full"><Link href={`/products/${p.slug}`} className="group block h-full rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-square rounded-xl bg-slate-50"><Image src={p.image} alt={p.imageAlt} fill className="object-contain p-3"/></div><p className="mt-5 text-xs font-semibold uppercase tracking-widest text-cyan-700">{p.series}</p><h3 className="mt-1 text-xl font-bold">{p.name}</h3><p className="mt-2 text-sm text-slate-600">{p.tagline}</p></Link></Reveal>)}</div></section>
    <section className="bg-slate-950 py-20 text-white"><div className="mx-auto max-w-7xl px-6"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Applications</p><h2 className="mt-2 text-4xl font-bold">Designed around people, not menus.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{['Hotel and retail reception','International meetings and events','Family, children and pet connection'].map((x,i)=><Reveal key={x} delay={i*80}><article className="rounded-2xl border border-white/15 bg-white/5 p-7"><span className="text-cyan-300">0{i+1}</span><h3 className="mt-4 text-xl font-bold">{x}</h3></article></Reveal>)}</div></div></section>
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">FAQ</p><h2 className="mt-2 text-4xl font-bold">Ready for a practical product conversation?</h2><p className="mt-5 text-slate-600">Review model, sample, MOQ and OEM/ODM basics before speaking with our team.</p><Link href="/faq" className="mt-6 inline-block font-semibold text-cyan-700">Explore buyer questions →</Link></div><div className="rounded-3xl bg-cyan-50 p-8"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-800">News</p><h2 className="mt-2 text-2xl font-bold">Updates will be published here</h2><p className="mt-3 text-slate-600">No verified company news is currently published.</p><Link href="/news" className="mt-6 inline-block font-semibold">View News →</Link></div></section>
  </>
}
