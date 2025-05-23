"use client"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { useCart } from "@/context/cart-context"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()

  // Get full product details for cart items
  const cartItemsWithDetails = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
    }
  })

  const subtotal = getCartTotal()
  const shipping: number = 500
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-screen bg-[#e8e7e3]">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-[#302f2d] mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium text-[#302f2d] mb-4">Your cart is empty</h2>
              <p className="text-[#302f2d]/70 mb-8">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/shop">
                <Button className="bg-[#302f2d] hover:bg-[#302f2d]/90 text-white">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {/* Cart Items */}
                <div className="bg-white rounded-lg overflow-hidden">
                  {cartItemsWithDetails.map((item, index) => {
                    if (!item.product) return null
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center p-4 ${
                          index < cartItemsWithDetails.length - 1 ? "border-b border-[#e8e7e3]" : ""
                        }`}
                      >
                        <div className="w-20 h-20 relative bg-[#e8e7e3]/50 rounded-md overflow-hidden mr-4">
                          <Image
                            src={item.product.images[0] || "/placeholder.svg?height=80&width=80"}
                            alt={item.product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-[#302f2d] uppercase text-sm tracking-wider">
                                {item.product.name}
                              </h3>
                              <p className="text-[#302f2d]/70 text-xs mt-1">
                                {item.color} • {item.product.category}
                              </p>
                            </div>
                            <p className="font-medium text-[#302f2d]">
                              {(item.product.price * item.quantity).toFixed(2)}DZD
                            </p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-[#302f2d] hover:text-[#302f2d]/70"
                                aria-label="Decrease quantity"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5 12h14" />
                                </svg>
                              </button>
                              <span className="mx-3 text-[#302f2d] font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-[#302f2d] hover:text-[#302f2d]/70"
                                aria-label="Increase quantity"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 5v14" />
                                  <path d="M5 12h14" />
                                </svg>
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#302f2d]/70 hover:text-[#302f2d]"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-lg font-medium text-[#302f2d] mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-[#302f2d]">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}DZD</span>
                  </div>
                  <div className="flex justify-between text-[#302f2d]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Cost" : `${shipping.toFixed(2)}DZD`}</span>
                  </div>
                  <div className="border-t border-[#e8e7e3] pt-3 flex justify-between font-medium text-[#302f2d]">
                    <span>Total</span>
                    <span>{total.toFixed(2)}DZD</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full bg-[#302f2d] hover:bg-[#302f2d]/90 text-white">Proceed to Checkout</Button>
                </Link>
                <Link href="/shop" className="block text-center text-[#302f2d] hover:underline text-sm mt-4">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#302f2d] text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Decora</h3>
              <p className="text-white/70">Transforming spaces with timeless elegance and contemporary design.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/shop?category=wall-decor" className="text-white/70 hover:text-white">
                    Wall Décor
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=lighting" className="text-white/70 hover:text-white">
                    Lighting
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=textiles" className="text-white/70 hover:text-white">
                    Textiles & Soft Décor
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=furniture" className="text-white/70 hover:text-white">
                    Furniture Accents
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=accessories" className="text-white/70 hover:text-white">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-white/70 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/70 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/70 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Connected</h4>
              <p className="text-white/70 mb-4">
                Subscribe to our newsletter for the latest updates and exclusive offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full bg-white/10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="rounded-l-none bg-white text-[#302f2d] hover:bg-white/90">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70">© 2024 Decora. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-white/70 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/70 hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
