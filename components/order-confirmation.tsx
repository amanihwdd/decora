"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface OrderConfirmationProps {
  isOpen: boolean
  onClose: () => void
  orderNumber: string
}

export function OrderConfirmation({ isOpen, onClose, orderNumber }: OrderConfirmationProps) {
  const [mounted, setMounted] = useState(false)

  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!mounted || !isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-lg p-6 max-w-md w-full animate-bounce-in shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center animate-fade-in-left">
            <CheckCircle className="h-6 w-6 text-green-500 mr-2 animate-pulse-slow" />
            <h2 className="text-xl font-bold text-[#302f2d]">Order Confirmed</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[#302f2d] hover:bg-[#302f2d]/10 transition-all duration-200 hover:rotate-90"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="space-y-4 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-[#302f2d]">
            Thank you for your order! Your order number is{" "}
            <span className="font-bold animate-pulse-slow">{orderNumber}</span>.
          </p>
          <p className="text-[#302f2d]/70">
            We've sent a confirmation email with your order details. Your items will be shipped soon.
          </p>
        </div>

        <div className="flex flex-col space-y-2 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Link href="/" className="w-full">
            <Button className="w-full bg-[#302f2d] hover:bg-[#302f2d]/90 text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
              Continue Shopping
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-[#b9b5ac] text-[#302f2d] transition-all duration-200 hover:bg-[#e8e7e3] hover:-translate-y-0.5"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
