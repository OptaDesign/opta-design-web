import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { CartProvider } from "@/components/cart-provider"
import { ToastProvider } from "@/components/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Opta Design - Diseño de Contenido de Calidad",
  description:
    "Somos Opta, una agencia que diseña contenido de calidad hecho a medida para marcas que quieran destacar.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ToastProvider>
            <CartProvider>{children}</CartProvider>
          </ToastProvider>
        </Providers>
      </body>
    </html>
  )
}
