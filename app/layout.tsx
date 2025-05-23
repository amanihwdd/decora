import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Decora - Home Decor & Furniture",
  description: "Discover curated home décor that brings warmth, style, and personality to every corner of your home.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
