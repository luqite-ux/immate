import Link from "next/link"
import { Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { siteConfig } from "@/lib/site"
import { fetchProductsData } from "@/lib/products-db"

const footerNav = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
]

export async function SiteFooter() {
  const products = await fetchProductsData()
  const legalOwner = siteConfig.legalName.replace(/[\s\.，,;；:：!！?？]+$/, "")
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.legalName} designs IM Mate AI translators and IM Cam video call cameras for
              B2B partners worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Site</h3>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Products</h3>
            <ul className="mt-4 space-y-2.5">
              <li className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                AI Translators
              </li>
              {products
                .filter((p) => p.category === "ai-translators")
                .map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
              <li className="pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground/70">
                Video Call Cameras
              </li>
              {products
                .filter((p) => p.category === "video-call-cameras")
                .map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-sm text-muted-foreground">{siteConfig.region}</li>
              <li className="text-sm text-muted-foreground">{siteConfig.domain}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {legalOwner}. All rights reserved.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
