"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface CopyToClipboardProps {
  text: string
  className?: string
}

export function CopyToClipboard({ text, className = "" }: CopyToClipboardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error)
    }
  }

  return (
    <Button variant="outline" size="sm" className={`flex items-center gap-1 ${className}`} onClick={handleCopy}>
      {isCopied ? (
        <>
          <Check className="h-3.5 w-3.5" />
          <span>Copiado</span>
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          <span>Copiar mensaje</span>
        </>
      )}
    </Button>
  )
}
