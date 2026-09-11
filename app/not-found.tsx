import Link from 'next/link'
export default function NotFound(){return <main className="mx-auto max-w-3xl px-6 py-24 text-center"><p className="text-sm font-bold uppercase tracking-widest text-cyan-700">404</p><h1 className="mt-3 text-5xl font-bold">Page not found</h1><p className="mt-5 text-slate-600">The requested page is unavailable.</p><Link className="mt-8 inline-block rounded-lg bg-slate-950 px-6 py-3 font-semibold text-white" href="/">Return home</Link></main>}

