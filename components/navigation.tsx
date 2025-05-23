"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/mobile-menu"
import { useCart } from "@/context/cart-context"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { getCartCount } = useCart()

  return (
    <>
      <header className="py-6 px-4 md:px-8 sticky top-0 z-50 bg-[#e8e7e3] backdrop-blur-sm animate-fade-in-down">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-[#302f2d] transition-all duration-300 hover:scale-105">
              Decora
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-[#302f2d] hover:text-[#302f2d]/70 text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-[#302f2d] hover:text-[#302f2d]/70 text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="text-[#302f2d] hover:text-[#302f2d]/70 text-sm uppercase tracking-wide transition-all duration-200 hover:-translate-y-0.5"
              >
                Categories
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/search"
              className="text-[#302f2d] hover:text-[#302f2d]/70 transition-all duration-200 hover:scale-110"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
            <Link
              href="/cart"
              className="text-[#302f2d] hover:text-[#302f2d]/70 relative transition-all duration-200 hover:scale-110"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-[#302f2d] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-bounce-in">
                {getCartCount()}
              </span>
              <span className="sr-only">Cart</span>
            </Link>
            <Button
              variant="ghost"
              className="md:hidden p-0 h-auto transition-all duration-200 hover:scale-110"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5 text-[#302f2d]" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
