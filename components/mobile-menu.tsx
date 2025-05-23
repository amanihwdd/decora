"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!mounted) {
    return null
  }

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Menu */}
      <div className="fixed inset-0 z-50 bg-[#e8e7e3] overflow-y-auto animate-slide-in-right">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8 animate-fade-in-down">
            <Link href="/" className="text-2xl font-bold text-[#302f2d]" onClick={onClose}>
              Decora
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-[#302f2d] hover:bg-[#302f2d]/10 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          <nav className="space-y-6">
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Link
                href="/"
                className="block text-xl font-medium text-[#302f2d] hover:text-[#302f2d]/70 transition-colors duration-200"
                onClick={onClose}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block text-xl font-medium text-[#302f2d] hover:text-[#302f2d]/70 transition-colors duration-200"
                onClick={onClose}
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="block text-xl font-medium text-[#302f2d] hover:text-[#302f2d]/70 transition-colors duration-200"
                onClick={onClose}
              >
                Categories
              </Link>
            </div>

            <div className="pt-4 border-t border-[#b9b5ac] animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-sm uppercase tracking-wider text-[#302f2d]/70 mb-3">Shop by Category</h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li
                    key={category.slug}
                    className="animate-fade-in-left"
                    style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                  >
                    <Link
                      href={`/shop?category=${category.slug}`}
                      className="block text-[#302f2d] hover:text-[#302f2d]/70 transition-colors duration-200 py-1"
                      onClick={onClose}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#b9b5ac] animate-fade-in-up" style={{ animationDelay: "0.7s" }}>
              <Link
                href="/cart"
                className="block text-xl font-medium text-[#302f2d] hover:text-[#302f2d]/70 transition-colors duration-200"
                onClick={onClose}
              >
                Cart
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
