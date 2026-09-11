import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles-db'

export const dynamicParams = true
export const revalidate = 60

export default async function NewsArticle({params}:{params:Promise<{slug:string}>}) {
  const article = await getArticleBySlug((await params).slug)
  if (!article) notFound()
  return <article className="article-prose mx-auto max-w-3xl px-6 py-16"><p className="text-sm text-cyan-700">{article.publishedAt?new Date(article.publishedAt).toLocaleDateString('en-GB'):''}</p><h1 className="mt-3 text-5xl font-bold">{article.title}</h1>{article.excerpt&&<p className="mt-5 text-xl text-slate-600">{article.excerpt}</p>}<div className="mt-10" dangerouslySetInnerHTML={{__html:article.content}}/></article>
}
