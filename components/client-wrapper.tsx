"use client"

import type { ReactNode } from "react"

export function ClientWrapper({ children }: { children: ReactNode }) {
  return <>{children}</>
}
