import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { getPublishedArticles } from '@/lib/articles-db'
export const metadata={title:'News',description:'Verified product and company updates from Shenzhen Sailan Technology Co., Ltd.',alternates:{canonical:'https://immateai.com/news'}}

export const revalidate = 60

export default async function News() {
  const articles = await getPublishedArticles()
  return <><PageHero eyebrow="News" title="Product and company updates" description="Verified updates published by the Cylan team will appear here."/>{articles.length?<section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">{articles.map(a=><article key={a.slug} className="flex h-full flex-col rounded-2xl border p-6"><time className="text-sm text-slate-500">{a.publishedAt?new Date(a.publishedAt).toLocaleDateString('en-GB'):''}</time><h2 className="mt-3 line-clamp-2 text-2xl font-bold">{a.title}</h2><p className="mt-3 line-clamp-3 flex-1 text-slate-600">{a.excerpt}</p><Link className="mt-6 font-semibold text-cyan-700" href={`/news/${a.slug}`}>Read update →</Link></article>)}</section>:<section className="mx-auto max-w-3xl px-6 py-24 text-center"><h2 className="text-2xl font-bold">No published updates yet</h2><p className="mt-3 text-slate-600">Please check back for product releases and company news.</p></section>}</>
}
