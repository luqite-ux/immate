import Image from 'next/image'
import { Code2, Factory } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { Reveal } from '@/components/reveal'

export const metadata = {
  title: 'About',
  description: 'Learn about Shenzhen Cylan Technology Co., Ltd. and its IM Mate and IM Cam product families.',
  alternates: { canonical: 'https://immateai.com/about' },
}

export default function About() {
  return <>
    <PageHero
      eyebrow="About Cylan"
      title="Focused engineering for intelligent communication"
      description="Shenzhen Cylan Technology Co., Ltd. develops video communication and AI hardware for global partners."
    />

    <section className="mx-auto max-w-4xl px-6 py-16 text-lg leading-8 text-slate-700">
      <p>Cylan develops home-security cameras, commercial AI translators and AI-enabled products for children. Customer materials state that its communication and smart-device services support more than 1.6 million devices across over 150 countries.</p>
      <p className="mt-6">The 21-person team is strongly focused on research and development, with R&amp;D representing 80% of the team. Its work covers multilingual business service, remote video communication and smart monitoring.</p>
      <p className="mt-6">Company materials identify CE, FCC, RoHS and UKCA compliance, European Union and Turkish patents, National High-Tech Enterprise status, specialized SME recognition and Shenzhen technology-SME recognition. Relevant documentation can be discussed for the selected product and market.</p>
      <p className="mt-6">The company materials also record a 2026 international sustainable innovation product design award. Award and compliance documents are supplied on request where applicable.</p>
    </section>

    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-5xl">From product engineering to disciplined assembly</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">The supplied company record shows Cylan&apos;s development workspace alongside its manufacturing and assembly environment.</p>
        </Reveal>
        <Reveal className="mt-10 overflow-hidden rounded-2xl bg-white" delay={80}>
          <Image src="/images/company/cylan-rd-manufacturing.jpg" alt="Cylan research and development office, production lines and assembly workshop" width={2124} height={824} className="h-auto w-full" />
        </Reveal>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <Reveal className="flex gap-4" delay={120}>
            <Code2 className="mt-1 size-7 shrink-0 text-cyan-300" aria-hidden="true" />
            <div><h3 className="text-2xl font-bold">R&amp;D and product team</h3><p className="mt-3 leading-7 text-slate-300">In-house teams work across intelligent communication software, video hardware and connected-device product development.</p></div>
          </Reveal>
          <Reveal className="flex gap-4" delay={180}>
            <Factory className="mt-1 size-7 shrink-0 text-cyan-300" aria-hidden="true" />
            <div><h3 className="text-2xl font-bold">Manufacturing and assembly</h3><p className="mt-3 leading-7 text-slate-300">Production and assembly areas support the transition from product development to finished smart communication devices.</p></div>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <h2 className="max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-5xl">Global exhibitions and customer connections</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">Cylan presents its video communication and dual-screen AI translation products at international industry events, meeting distributors and business partners in person.</p>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-2xl bg-slate-100" delay={80}>
          <Image src="/images/company/cylan-exhibition-video-camera.jpg" alt="Cylan team meeting visitors at a video calling camera exhibition booth" width={1706} height={1279} className="h-full w-full object-cover" />
        </Reveal>
        <Reveal className="overflow-hidden rounded-2xl bg-slate-100" delay={140}>
          <Image src="/images/company/cylan-exhibition-ai-translator.jpg" alt="Cylan team and visitors at a dual-screen AI translator exhibition booth" width={1706} height={1279} className="h-full w-full object-cover" />
        </Reveal>
      </div>
    </section>
  </>
}
