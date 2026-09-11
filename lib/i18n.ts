// Reserved locale-routing interface.
// The site currently renders English-only content. This config exists so a
// future locale-prefixed routing layer (e.g. /en, /de, /ja under a
// [locale] segment) can be introduced without reworking the UI surface.
// Do not remove: SiteHeader and LanguageSwitcher read from this list.

export type LocaleDefinition = {
  code: string
  label: string
  nativeLabel: string
  enabled: boolean
}

export const defaultLocale = "en"

export const locales: LocaleDefinition[] = [
  { code: "en", label: "English", nativeLabel: "English", enabled: true },
  { code: "zh", label: "Chinese", nativeLabel: "中文", enabled: false },
  { code: "de", label: "German", nativeLabel: "Deutsch", enabled: false },
  { code: "es", label: "Spanish", nativeLabel: "Español", enabled: false },
  { code: "ja", label: "Japanese", nativeLabel: "日本語", enabled: false },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", enabled: false },
]

export function getLocalePath(pathname: string, code: string) {
  // Placeholder resolver for the reserved locale routing interface.
  // Once locale-prefixed routes exist, this should return `/${code}${pathname}`.
  if (code === defaultLocale) return pathname
  return pathname
}
