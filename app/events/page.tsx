import Image from 'next/image'
import { CalendarDays, Globe2, PlayCircle, Users } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'
import { fieldGallery, globalEvents } from '@/lib/events'

export const metadata = {
  title: 'Global Events',
  description: 'See IM Mate translators and IM Cam video call cameras demonstrated at international exhibitions and business meetings.',
  alternates: { canonical: 'https://immateai.com/events' },
}

export default function EventsPage() {
  return <>
    <PageHero eyebrow="Global presence" title="Products tested in real conversations" description="From exhibition booths to international business meetings, Cylan demonstrates its communication hardware with the people who will use it." />

    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="grid gap-6 md:grid-cols-3">
        {[
          { icon: CalendarDays, value: '7', label: 'documented industry events' },
          { icon: Globe2, value: '2025–2026', label: 'recent exhibition record' },
          { icon: Users, value: 'Live', label: 'buyer and partner demonstrations' },
        ].map(({ icon: Icon, value, label }) => <article key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-7"><Icon className="size-7 text-cyan-700" aria-hidden="true"/><p className="mt-6 text-4xl font-bold">{value}</p><p className="mt-2 text-slate-600">{label}</p></article>)}
      </Reveal>
    </section>

    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl space-y-20 px-6">
        {globalEvents.map((event, index) => <Reveal key={event.slug}>
          <article id={event.slug} className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className={index % 2 ? 'lg:order-2' : ''}>
              <p className="text-sm font-semibold uppercase tracking-[.2em] text-cyan-300">{event.date} · {event.location}</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{event.name}</h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">{event.summary}</p>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-cyan-200"><PlayCircle className="size-5" aria-hidden="true"/>Field demonstration video</div>
            </div>
            <div className={index % 2 ? 'lg:order-1' : ''}>
              <div className="grid gap-4 sm:grid-cols-2">
                {event.images.map((image, imageIndex) => <div key={image.src} className={event.images.length === 1 || imageIndex === 0 ? 'relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 sm:col-span-2' : 'relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900'}><Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover"/></div>)}
              </div>
              <video className="mt-4 aspect-video w-full rounded-2xl bg-black object-contain" controls preload="none" poster={event.images[0].src} aria-label={`${event.name} product demonstration`}><source src={event.video} type="video/mp4"/></video>
            </div>
          </article>
        </Reveal>)}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal><p className="text-sm font-semibold uppercase tracking-widest text-cyan-700">Field notes</p><h2 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-5xl">Products, people and proof of use</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">A wider view of Cylan&apos;s engineering environment, product displays, international visitors and partner conversations.</p></Reveal>
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {fieldGallery.map((image, index) => <Reveal key={image.src} delay={(index % 3) * 50} className="mb-4 break-inside-avoid"><div className="overflow-hidden rounded-2xl bg-slate-100"><Image src={image.src} alt={image.alt} width={1200} height={900} className="h-auto w-full transition duration-500 hover:scale-[1.02]"/></div></Reveal>)}
      </div>
    </section>
  </>
}
