import Image from 'next/image'
import Link from 'next/link'
import { Building2, CarFront, Presentation, Utensils } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { applications } from '@/lib/applications'
export const metadata={title:'Applications',description:'Application scenarios for IM Mate AI translators and IM Cam video call cameras.',alternates:{canonical:'https://immateai.com/applications'}}
const translatorScenes = [
  { title: 'Taxi and in-car service', text: 'Support practical communication between drivers and international passengers.', image: '/images/applications/taxi-translator.jpg', icon: CarFront },
  { title: 'Restaurant and dining', text: 'Help staff discuss ordering, ingredients and service needs across languages.', image: '/images/applications/restaurant-translator.jpg', icon: Utensils },
  { title: 'Lobby and reception', text: 'Create a clear translation touchpoint for hotels, offices and service counters.', image: '/images/applications/lobby-translator.jpg', icon: Building2 },
  { title: 'Conference and meetings', text: 'Support face-to-face business discussion with a shared dual-screen experience.', image: '/images/applications/conference-translator.jpg', icon: Presentation },
]

export default function Applications(){return <><PageHero eyebrow="Applications" title="Communication hardware for the moments that matter" description="From multilingual service desks to simple family video contact, each device supports an actual conversation."/>
  <section className="mx-auto max-w-7xl px-6 py-20">
    <Reveal><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Dual-screen translation</p><h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-5xl">A shared screen for service and business</h2></Reveal>
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      {translatorScenes.map(({title,text,image,icon:Icon},i)=><Reveal key={title} delay={i*60} className="h-full"><article className="grid h-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:grid-cols-[1.1fr_.9fr]"><div className="relative min-h-64 bg-slate-100"><Image src={image} alt={`${title} dual-screen translation scenario`} fill className="object-cover"/></div><div className="flex flex-col justify-center p-7"><Icon className="size-7 text-cyan-700" aria-hidden="true"/><h3 className="mt-5 text-2xl font-bold">{title}</h3><p className="mt-3 leading-7 text-slate-600">{text}</p></div></article></Reveal>)}
    </div>
  </section>
  <section className="bg-slate-950 py-20 text-white"><div className="mx-auto max-w-7xl px-6"><Reveal><p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">More ways to connect</p><h2 className="mt-3 text-4xl font-bold">Products shaped around real interactions</h2></Reveal><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{applications.map((a,i)=><Reveal key={a.slug} delay={i*50} className="h-full"><article className="h-full rounded-2xl border border-white/15 bg-white/5 p-7"><h3 className="text-2xl font-bold">{a.title}</h3><p className="mt-3 leading-7 text-slate-300">{a.summary}</p></article></Reveal>)}</div><Link href="/contact" className="mt-10 inline-flex rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">Discuss an application</Link></div></section>
</>}
