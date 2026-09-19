import Image from 'next/image'
import Link from 'next/link'
import { PageHero } from '@/components/page-hero'
import { filterProductsByCategory } from '@/lib/product-filter'
import { fetchProductsData } from '@/lib/products-db'

export const metadata = { title: 'Products', description: 'Explore IM Mate AI translators and IM Cam video call cameras.', alternates: { canonical: 'https://immateai.com/products' } }
export const revalidate = 60

type Comparison = { title: string; products: [string, string]; rows: Array<[string, string, string]> }

const comparisons: Comparison[] = [
  { title: 'T10 MAX vs T5 MAX', products: ['T10 MAX', 'T5 MAX'], rows: [
    ['Best fit', 'Desktop business, reception and meetings', 'Travel, mobile and counter service'],
    ['Conversation format', '10-inch dual-screen face-to-face', 'Compact dual-screen face-to-face'],
    ['Connected use', 'Remote video translation', '4G and Wi-Fi operation'],
    ['Languages', '35+', '35+'], ['Weight', '1.08 kg', '0.76 kg'],
    ['Colors', 'White / Grey', 'White / Grey / Pink / Green'], ['MOQ', '100 pieces', '100 pieces'],
  ] },
  { title: 'C30 vs C41P', products: ['C30', 'C41P'], rows: [
    ['Best fit', 'Simple one-button video calling', 'Remote viewing and family connection'],
    ['Display', '2.8-inch screen', '4.3-inch screen'],
    ['Calling', 'Two-way video and audio', 'Two-way video and audio'],
    ['Viewing', '1080p, 120° wide-angle', '1080p, 360° pan-tilt'],
    ['Setup', 'One-button calling workflow', 'IM Cam app for Android and iOS'],
    ['Weight', '0.14 kg', '0.34 kg'], ['MOQ', '100 pieces', '100 pieces'],
  ] },
]

function ComparisonGroup({ comparison }: { comparison: Comparison }) {
  return <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="border-b border-slate-200 bg-slate-950 px-5 py-5 text-white sm:px-7"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Buyer comparison</p><h3 className="mt-2 text-2xl font-bold">{comparison.title}</h3></div>
    <div className="divide-y divide-slate-200">
      <div className="grid grid-cols-2 bg-slate-50 text-sm font-bold text-slate-950 sm:grid-cols-[1.15fr_1fr_1fr]"><span className="hidden px-5 py-4 sm:block">Buying factor</span>{comparison.products.map(product => <span key={product} className="px-5 py-4">{product}</span>)}</div>
      {comparison.rows.map(([factor, first, second]) => <div key={factor} className="grid grid-cols-2 sm:grid-cols-[1.15fr_1fr_1fr]"><p className="col-span-2 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 sm:col-span-1 sm:bg-white">{factor}</p><p className="px-5 py-4 text-sm leading-6 text-slate-700">{first}</p><p className="px-5 py-4 text-sm leading-6 text-slate-700">{second}</p></div>)}
    </div>
  </article>
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const products = await fetchProductsData()
  const { category } = await searchParams
  const visibleProducts = filterProductsByCategory(products, category)
  return <>
    <PageHero eyebrow="IM Mate · IM Cam" title="Smart devices for clearer human connection" description="Compare our translator and video call camera platforms for service, business and family applications." />
    <section className="mx-auto grid max-w-7xl items-stretch gap-6 px-6 py-16 md:grid-cols-2">{visibleProducts.map(p => <Link href={`/products/${p.slug}`} key={p.slug} className="grid h-full rounded-2xl border bg-white p-5 shadow-sm sm:grid-cols-2"><div className="relative aspect-square rounded-xl bg-slate-50"><Image fill src={p.image} alt={p.imageAlt} className="object-contain p-4" /></div><div className="flex h-full flex-col p-4"><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">{p.categoryLabel}</p><h2 className="mt-2 text-3xl font-bold">{p.series} {p.name}</h2><p className="mt-3 text-slate-600">{p.summary}</p></div></Link>)}</section>
    <section className="border-y border-slate-200 bg-slate-100/70"><div className="mx-auto max-w-7xl px-6 py-16">
      <div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-700">Product selection</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Compare the details that matter to your purchase</h2><p className="mt-4 leading-7 text-slate-600">Use these verified differences to shortlist a model, then send the expected quantity, project type and target date with your inquiry.</p></div>
      <div className="mt-10 grid gap-8 xl:grid-cols-2">{comparisons.map(comparison => <ComparisonGroup key={comparison.title} comparison={comparison} />)}</div>
      <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-blue-700 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><h3 className="text-2xl font-bold">Purchasing notes</h3><p className="mt-2 max-w-3xl text-blue-50">Tell us whether you need a sample, bulk order, OEM / ODM discussion or SDK integration review. Include your estimated quantity and target date so the team can respond with the right next step.</p></div><Link href="/contact" className="shrink-0 rounded-lg bg-white px-5 py-3 text-center font-semibold text-blue-800 hover:bg-blue-50">Discuss your project</Link></div>
    </div></section>
  </>
}
