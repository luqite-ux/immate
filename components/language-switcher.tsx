"use client"

import { Globe, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { locales } from "@/lib/i18n"

// Reserved locale interface: only English is enabled today. The other
// locales are listed so the routing layer described in lib/i18n.ts can be
// wired up later without changing this UI.
export function LanguageSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          aria-label="Select language"
        >
          <Globe className="size-4" aria-hidden="true" />
          <span className="text-sm">EN</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            disabled={!locale.enabled}
            className="justify-between text-sm"
          >
            <span>{locale.nativeLabel}</span>
            {locale.enabled ? (
              <Check className="size-3.5 text-primary" aria-hidden="true" />
            ) : (
              <span className="text-[10px] text-muted-foreground">Coming soon</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
