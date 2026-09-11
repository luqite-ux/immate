import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="immate.ai home"
      className={cn("group flex items-center gap-2.5 shrink-0", className)}
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading text-sm font-bold tracking-tight transition-transform group-hover:scale-105">
        IM
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-tight text-foreground">
          immate<span className="text-primary">.ai</span>
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          IM Mate · IM Cam
        </span>
      </span>
    </Link>
  )
}
