"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { Toast } from "@/components/toast"

type ToastContextType = {
  showToast: (message: string) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null)

  const showToast = (message: string) => {
    const id = Date.now()
    setToast({ message, id })
    console.log("Showing toast:", message)
  }

  const hideToast = () => {
    setToast(null)
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast && <Toast message={toast.message} onClose={hideToast} />}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
