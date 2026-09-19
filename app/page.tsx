import Link from 'next/link'
import { fetchProductsData } from '@/lib/products-db'
import Image from 'next/image'
import { Award, BadgeCheck, Blocks, CloudCog, Globe2, Laptop, Lightbulb, Network, ShieldCheck } from 'lucide-react'
import { HeroCarousel } from '@/components/hero-carousel'
import { Reveal } from '@/components/reveal'
import { globalEvents } from '@/lib/events'
export const metadata={alternates:{canonical:'https://immateai.com'}}

export const revalidate = 60

export default async function HomePage() {
  const products = await fetchProductsData()
  return <>
    <HeroCarousel />
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-px bg-slate-200 px-6 sm:grid-cols-3">
        {[
          ['21-person team', 'A compact product and engineering organization'],
          ['80% focused on R&D', 'Research-led hardware and software development'],
          ['1.6 million connected devices', 'A documented base of connected-device service'],
        ].map(([value, label]) => <Reveal key={value} className="bg-white px-6 py-10"><p className="text-3xl font-bold tracking-[-0.03em] text-slate-950">{value}</p><p className="mt-2 text-sm leading-6 text-slate-600">{label}</p></Reveal>)}
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-20"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Product portfolio</p><h2 className="mt-2 text-4xl font-bold">Built for real conversations</h2><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{products.map((p,i)=><Reveal key={p.slug} delay={i*70} className="h-full"><Link href={`/products/${p.slug}`} className="group block h-full rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-square rounded-xl bg-slate-50"><Image src={p.image} alt={p.imageAlt} fill className="object-contain p-3"/></div><p className="mt-5 text-xs font-semibold uppercase tracking-widest text-cyan-700">{p.series}</p><h3 className="mt-1 text-xl font-bold">{p.name}</h3><p className="mt-2 text-sm text-slate-600">{p.tagline}</p></Link></Reveal>)}</div></section>
    <section className="bg-slate-100 py-20"><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.35fr_.65fr]"><Reveal className="overflow-hidden rounded-2xl bg-white"><Image src="/images/company/cylan-rd-manufacturing.jpg" alt="Cylan research and development office, production lines and assembly workshop" width={2124} height={824} className="h-auto w-full"/></Reveal><Reveal delay={100}><h2 className="text-4xl font-bold tracking-[-0.03em]">Engineering and production under one roof</h2><p className="mt-5 leading-7 text-slate-600">Meet the teams and facilities behind Cylan&apos;s video communication and AI translation products.</p><Link href="/about" className="mt-7 inline-flex rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700">Inside Cylan</Link></Reveal></div></section>
    <section className="overflow-hidden bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Verified innovation</p>
            <h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] md:text-5xl">Patents, design protection and product innovation</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">Cylan&apos;s supplied records document product engineering, software development and registered industrial design work in China, the European Union and Türkiye.</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal className="h-full" delay={40}><article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"><div className="relative aspect-[4/5] bg-white"><Image src="/images/credentials/dual-screen-utility-patent.jpg" alt="Chinese utility patent certificate for a dual-screen translator" fill className="object-contain p-4"/></div><div className="flex-1 p-5"><p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">China · 2026</p><h3 className="mt-2 text-lg font-bold">Dual-screen translator utility patent</h3></div></article></Reveal>
          <Reveal className="h-full" delay={80}><article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"><div className="relative aspect-[4/5] bg-white"><Image src="/images/credentials/adaptive-translation-invention-patent.jpg" alt="Chinese invention patent certificate for adaptive translation generation" fill className="object-contain p-4"/></div><div className="flex-1 p-5"><p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">China · 2026</p><h3 className="mt-2 text-lg font-bold">Adaptive translation invention patent</h3></div></article></Reveal>
          <Reveal className="h-full" delay={120}><article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"><div className="relative aspect-[4/5] bg-white"><Image src="/images/credentials/eu-registered-design.jpg" alt="European Union registered design certificate for a language translation device" fill className="object-contain p-4"/></div><div className="flex-1 p-5"><p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">European Union · 2025</p><h3 className="mt-2 text-lg font-bold">European Union registered design</h3></div></article></Reveal>
          <Reveal className="h-full" delay={160}><article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"><div className="relative aspect-[4/5] bg-white"><Image src="/images/credentials/sustainable-design-award.jpg" alt="2026 sustainable innovative product distinguished design award certificate" fill className="object-contain p-4"/></div><div className="flex-1 p-5"><p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">Product design · 2026</p><h3 className="mt-2 text-lg font-bold">2026 sustainable product design award</h3></div></article></Reveal>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Lightbulb, title: 'Product engineering', text: 'Utility and invention patents for dual-screen translation hardware and adaptive translated-text generation.' },
            { icon: Globe2, title: 'International design protection', text: 'European Union and Turkish registered designs for language-translation devices.' },
            { icon: Laptop, title: 'AI translator software copyright', text: 'Registered software copyright for Cylan AI Translator Management Software V1.0.0.' },
            { icon: Award, title: 'Recognized product design', text: 'A 2026 distinguished design award for the desktop intelligent dual-screen translator.' },
            { icon: ShieldCheck, title: 'Documented ownership', text: 'Certificates identify Shenzhen Sailan Technology Co., Ltd. as the rights holder.' },
            { icon: BadgeCheck, title: 'Evidence available', text: 'Relevant patent, registration and award documents can be reviewed for applicable products and markets.' },
          ].map(({icon: Icon,title,text},i)=><Reveal key={title} delay={i*45} className="h-full bg-slate-950"><article className="h-full p-7 text-white"><Icon className="size-7 text-cyan-300" aria-hidden="true"/><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-300">{text}</p></article></Reveal>)}
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-500">Registration scope and legal status are governed by the issuing authorities and the corresponding official registers.</p>
      </div>
    </section>
    <section className="bg-slate-950 py-20 text-white"><div className="mx-auto max-w-7xl px-6"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">Applications</p><h2 className="mt-2 text-4xl font-bold">Designed around people, not menus.</h2><div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">{['Hotel and retail reception','International meetings and events','Family, children and pet connection'].map((x,i)=><Reveal key={x} delay={i*80} className="h-full"><article className="h-full rounded-2xl border border-white/15 bg-white/5 p-7"><span className="text-cyan-300">0{i+1}</span><h3 className="mt-4 text-xl font-bold">{x}</h3></article></Reveal>)}</div></div></section>
    <section className="bg-cyan-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Integration capability</p><h2 className="mt-3 text-4xl font-bold tracking-[-0.03em] md:text-5xl">From device to cloud, built to connect</h2></div><p className="max-w-2xl text-lg leading-8 text-slate-600">Cylan&apos;s supplied platform overview covers device connectivity, application integration and web-based service access for partner projects.</p></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {icon: Blocks, title: 'APP SDK', text: 'Mobile application integration for connected-device experiences.'},
            {icon: Network, title: 'Device SDK', text: 'Device-side access for communication hardware and embedded products.'},
            {icon: CloudCog, title: 'Web SDK', text: 'Browser and service integration for partner platforms and workflows.'},
          ].map(({icon:Icon,title,text},i)=><Reveal key={title} delay={i*70} className="h-full"><article className="h-full rounded-2xl border border-cyan-100 bg-white p-7 shadow-sm"><Icon className="size-7 text-cyan-700" aria-hidden="true"/><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></article></Reveal>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Global exhibitions</p><h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-5xl">Meet the products in real conversations</h2></div><Link href="/events" className="font-semibold text-cyan-700">Explore all events →</Link></Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {globalEvents.slice(0,3).map((event,i)=><Reveal key={event.slug} delay={i*70} className="h-full"><Link href={`/events#${event.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="relative aspect-[4/3] overflow-hidden bg-slate-100"><Image src={event.images[0].src} alt={event.images[0].alt} fill className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="flex-1 p-6"><p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">{event.date} · {event.location}</p><h3 className="mt-3 text-xl font-bold">{event.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{event.summary}</p></div></Link></Reveal>)}
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">FAQ</p><h2 className="mt-2 text-4xl font-bold">Ready for a practical product conversation?</h2><p className="mt-5 text-slate-600">Review model, sample, MOQ and OEM/ODM basics before speaking with our team.</p><Link href="/faq" className="mt-6 inline-block font-semibold text-cyan-700">Explore buyer questions →</Link></div><div className="rounded-3xl bg-cyan-50 p-8"><p className="text-sm font-semibold uppercase tracking-widest text-cyan-800">News</p><h2 className="mt-2 text-2xl font-bold">Updates will be published here</h2><p className="mt-3 text-slate-600">No verified company news is currently published.</p><Link href="/news" className="mt-6 inline-block font-semibold">View News →</Link></div></section>
  </>
}
