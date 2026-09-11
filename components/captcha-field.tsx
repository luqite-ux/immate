"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { RefreshCw, Check } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789" // ambiguous chars removed

function randomCode(length = 4) {
  let code = ""
  for (let i = 0; i < length; i++) {
    code += CHARSET[Math.floor(Math.random() * CHARSET.length)]
  }
  return code
}

type CaptchaFieldProps = {
  value: string
  onChange: (value: string) => void
  onValidityChange?: (valid: boolean) => void
  id?: string
}

export function CaptchaField({ value, onChange, onValidityChange, id = "captcha" }: CaptchaFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [code, setCode] = useState("")

  const draw = useCallback((next: string) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const { width, height } = canvas

    ctx.clearRect(0, 0, width, height)
    const bg = ctx.createLinearGradient(0, 0, width, height)
    bg.addColorStop(0, "oklch(0.96 0.008 240)")
    bg.addColorStop(1, "oklch(0.9 0.02 230)")
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `oklch(0.6 0.05 ${200 + i * 15} / 0.5)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(Math.random() * width, Math.random() * height)
      ctx.lineTo(Math.random() * width, Math.random() * height)
      ctx.stroke()
    }

    const charWidth = width / next.length
    for (let i = 0; i < next.length; i++) {
      ctx.save()
      const x = charWidth * i + charWidth / 2
      const y = height / 2
      ctx.translate(x, y)
      ctx.rotate(((Math.random() - 0.5) * 30 * Math.PI) / 180)
      ctx.font = "bold 22px 'Space Grotesk', Inter, sans-serif"
      ctx.fillStyle = `oklch(0.4 0.15 ${250 + i * 8})`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(next[i], 0, 0)
      ctx.restore()
    }

    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = "oklch(0.6 0.02 240 / 0.35)"
      ctx.beginPath()
      ctx.arc(Math.random() * width, Math.random() * height, 0.8, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const refresh = useCallback(() => {
    const next = randomCode()
    setCode(next)
    onChange("")
    onValidityChange?.(false)
    draw(next)
  }, [draw, onChange, onValidityChange])

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [])

  useEffect(() => {
    onValidityChange?.(value.length === code.length && value.toUpperCase() === code)
  }, [value, code, onValidityChange])

  const isComplete = value.length === code.length
  const isValid = isComplete && value.toUpperCase() === code

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>Verification code</Label>
      <div className="flex min-w-0 flex-wrap items-center gap-3 sm:flex-nowrap">
        <canvas
          ref={canvasRef}
          width={124}
          height={48}
          role="img"
          aria-label="Image CAPTCHA showing a 4-character verification code"
          className="rounded-md border border-border"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={refresh}
          aria-label="Refresh verification code"
        >
          <RefreshCw className="size-4" />
        </Button>
        <InputGroup className="min-w-0 flex-1 basis-full sm:basis-auto">
          <InputGroupInput
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value.slice(0, code.length))}
            placeholder="Enter code"
            maxLength={code.length}
            autoComplete="off"
            aria-invalid={isComplete && !isValid}
            className={cn("uppercase tracking-widest")}
          />
          {isComplete && (
            <InputGroupAddon align="inline-end">
              {isValid ? (
                <Check className="size-4 text-primary" aria-hidden="true" />
              ) : (
                <span className="text-xs text-destructive">No match</span>
              )}
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
    </div>
  )
}
