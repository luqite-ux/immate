import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { siteConfig } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://immateai.com'),
  title: {
    default: 'immate.ai — IM Mate AI Translators & IM Cam Video Call Cameras',
    template: '%s | immate.ai',
  },
  description:
    'immate.ai by Shenzhen Cylan Technology Co., Ltd. designs IM Mate AI translators and IM Cam video call cameras for B2B partners worldwide, including T10 MAX, T5 MAX, C30, and C41P.',
  icons: {
    icon: [{ url: '/icon.svg?v=20260911-im', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':`${siteConfig.url}/#organization`,name:siteConfig.legalName,url:siteConfig.url,email:siteConfig.email},{'@type':'WebSite','@id':`${siteConfig.url}/#website`,url:siteConfig.url,name:'immate.ai',publisher:{'@id':`${siteConfig.url}/#organization`},inLanguage:'en'}]}
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,'\\u003c')}} />
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
