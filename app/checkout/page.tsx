"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/context/cart-context"
import { products } from "@/lib/data"
import { wilayas, pickupOffices } from "../../lib/algeria-data"
import type { PickupOffice } from "../../lib/algeria-data"

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()

  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [availableOffices, setAvailableOffices] = useState<PickupOffice[]>([])

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    wilayaId: "",
    address: "",
    shippingMethod: "doorToDoor", // "doorToDoor" or "officePickup"
    pickupOfficeId: "",
    notes: "",
  })

  // Get full product details for cart items
  const cartItemsWithDetails = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
    }
  })

  // Calculate shipping cost based on selected wilaya and shipping method
  const selectedWilaya = wilayas.find((w) => w.id.toString() === formData.wilayaId)
  const shippingCost = selectedWilaya
    ? formData.shippingMethod === "doorToDoor"
      ? selectedWilaya.doorToDoorPrice
      : selectedWilaya.officePickupPrice
    : 0

  // Calculate totals
  const subtotal = getCartTotal()
  const total = subtotal + shippingCost

  // Update available offices when wilaya changes
  useEffect(() => {
    if (formData.wilayaId) {
      const wilayaId = Number.parseInt(formData.wilayaId)
      const offices = pickupOffices.filter((office) => office.wilayaId === wilayaId)
      setAvailableOffices(offices)

      // Reset pickup office selection if no offices available or wilaya changed
      if (offices.length === 0 || !offices.some((office) => office.id === formData.pickupOfficeId)) {
        setFormData((prev) => ({
          ...prev,
          pickupOfficeId: "",
        }))
      }
    } else {
      setAvailableOffices([])
      setFormData((prev) => ({
        ...prev,
        pickupOfficeId: "",
      }))
    }
  }, [formData.wilayaId, formData.pickupOfficeId])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle shipping method change
  const handleShippingMethodChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      shippingMethod: value,
    }))
  }

  // Form validation
  const isFormValid = () => {
    const requiredFields = ["firstName", "lastName", "phone", "wilayaId"]

    // Add address validation for door-to-door delivery
    if (formData.shippingMethod === "doorToDoor") {
      requiredFields.push("address")
    }

    // Add pickup office validation for office pickup
    if (formData.shippingMethod === "officePickup") {
      requiredFields.push("pickupOfficeId")
    }

    return requiredFields.every((field) => formData[field as keyof typeof formData])
  }

  // Place order
  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid()) {
      alert("Please fill in all required fields")
      return
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty")
      return
    }

    try {
      setLoading(true)

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate random order ID
      const randomOrderId = Math.random().toString(36).substring(2, 10).toUpperCase()
      setOrderId(randomOrderId)

      // Show order confirmation
      setOrderComplete(true)

      // Clear cart
      clearCart()
    } catch (error) {
      console.error("Error placing order:", error)
      alert("There was an error placing your order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // If order is complete, show confirmation
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#e8e7e3]">
        <Navigation />
        <div className="container mx-auto px-4 py-12 max-w-3xl animate-fade-in-up">
          <div className="bg-[#302f2d] rounded-lg shadow-lg p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-[#e8e7e3] mx-auto mb-4 animate-bounce-in" />
            <h1
              className="text-3xl font-bold text-[#e8e7e3] mb-4 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Order Confirmed!
            </h1>
            <p className="text-[#e8e7e3]/90 mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              Thank you for your order. We've received your order and will begin processing it right away. You will
              receive a confirmation call shortly.
            </p>
            <p
              className="text-lg font-medium text-[#e8e7e3] mb-2 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Order #{orderId}
            </p>
            <p className="text-[#e8e7e3]/90 mb-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
              Estimated delivery: 3-5 business days
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Link href="/">
                <Button className="bg-[#b9b5ac] hover:bg-[#b9b5ac]/90 text-[#302f2d] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  Return to Home
                </Button>
              </Link>
              <Link href="/shop">
                <Button
                  variant="outline"
                  className="border-[#b9b5ac] text-[#e8e7e3] bg-transparent hover:bg-[#e8e7e3]/10 transition-all duration-300 hover:-translate-y-1"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>

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
              <p className="text-white/70">© 2025 Decora. All rights reserved.</p>
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

  return (
    <div className="min-h-screen bg-[#e8e7e3]">
      <Navigation />

      <div className="container mx-auto px-4 py-12 animate-fade-in">
        <div className="flex items-center mb-8">
          <Button
            asChild
            variant="ghost"
            className="text-[#302f2d] hover:text-[#302f2d]/80 transition-all duration-200"
          >
            <Link href="/cart" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-[#302f2d] ml-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <form onSubmit={placeOrder} className="bg-[#302f2d] rounded-lg shadow-lg p-6">
              {/* Contact Information */}
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <h2 className="text-xl font-medium text-[#e8e7e3] mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-[#e8e7e3]">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]"
                    />
                  </div>
                  <div className="space-y-2 text-[#e8e7e3]">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]"
                    />
                  </div>
                  <div className="space-y-2 text-[#e8e7e3]">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]"
                    />
                  </div>
                  <div className="space-y-2 text-[#e8e7e3]">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <h2 className="text-xl font-medium text-[#e8e7e3] mb-4">Shipping Information</h2>

                {/* Wilaya Selection */}
                <div className="mb-6 text-[#e8e7e3]">
                  <Label htmlFor="wilayaId" className="mb-2 block">
                    Wilaya (Province) *
                  </Label>
                  <Select value={formData.wilayaId} onValueChange={(value) => handleSelectChange("wilayaId", value)}>
                    <SelectTrigger className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]">
                      <SelectValue placeholder="Select your wilaya" />
                    </SelectTrigger>
                    <SelectContent>
                      {wilayas.map((wilaya) => (
                        <SelectItem key={wilaya.id} value={wilaya.id.toString()}>
                          {wilaya.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Shipping Method */}
                {formData.wilayaId && (
                  <div className="mb-6 text-[#e8e7e3]">
                    <Label className="mb-2 block">Shipping Method *</Label>
                    <RadioGroup
                      value={formData.shippingMethod}
                      onValueChange={handleShippingMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-2 border border-[#b9b5ac]/30 rounded-md p-3 hover:bg-[#b9b5ac]/10 transition-colors duration-200">
                        <RadioGroupItem value="doorToDoor" id="doorToDoor" className="mt-1 text-[#b9b5ac]" />
                        <div className="grid gap-1.5">
                          <Label htmlFor="doorToDoor" className="font-medium">
                            Door to Door Delivery
                          </Label>
                          <p className="text-sm text-[#e8e7e3]/70">
                            We'll deliver your order directly to your address
                            {selectedWilaya && (
                              <span className="font-medium text-[#b9b5ac] ml-1">
                                ({selectedWilaya.doorToDoorPrice.toLocaleString()} DZD)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 border border-[#b9b5ac]/30 rounded-md p-3 hover:bg-[#b9b5ac]/10 transition-colors duration-200">
                        <RadioGroupItem
                          value="officePickup"
                          id="officePickup"
                          className="mt-1 text-[#b9b5ac]"
                          disabled={availableOffices.length === 0}
                        />
                        <div className="grid gap-1.5">
                          <Label
                            htmlFor="officePickup"
                            className={`font-medium ${availableOffices.length === 0 ? "text-[#e8e7e3]/40" : ""}`}
                          >
                            Office Pickup
                          </Label>
                          <p className="text-sm text-[#e8e7e3]/70">
                            {availableOffices.length > 0
                              ? `Pick up your order from one of our offices ${
                                  selectedWilaya && (
                                    <span className="font-medium text-[#b9b5ac]">
                                      ({selectedWilaya.officePickupPrice.toLocaleString()} DZD)
                                    </span>
                                  )
                                }`
                              : "No pickup offices available in this wilaya"}
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Delivery Address (for door-to-door) */}
                {formData.wilayaId && formData.shippingMethod === "doorToDoor" && (
                  <div className="space-y-2 text-[#e8e7e3] animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]"
                      placeholder="Enter your full delivery address"
                    />
                  </div>
                )}

                {/* Pickup Office Selection (for office pickup) */}
                {formData.wilayaId && formData.shippingMethod === "officePickup" && availableOffices.length > 0 && (
                  <div className="space-y-2 text-[#e8e7e3] animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <Label htmlFor="pickupOfficeId">Select Pickup Office *</Label>
                    <Select
                      value={formData.pickupOfficeId}
                      onValueChange={(value) => handleSelectChange("pickupOfficeId", value)}
                    >
                      <SelectTrigger className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]">
                        <SelectValue placeholder="Select pickup office" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableOffices.map((office) => (
                          <SelectItem key={office.id} value={office.id}>
                            {office.officeName} - {office.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <h2 className="text-xl font-medium text-[#e8e7e3] mb-4">Order Notes (Optional)</h2>
                <div className="space-y-2 text-[#e8e7e3]">
                  <Label htmlFor="notes">Special instructions for delivery</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="bg-[#e8e7e3] border-none text-[#302f2d] focus:ring-[#b9b5ac]"
                    rows={3}
                  />
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                className="w-full bg-[#b9b5ac] hover:bg-[#b9b5ac]/90 text-[#302f2d] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
                disabled={loading || !isFormValid() || cartItems.length === 0}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
              <p
                className="text-[#e8e7e3]/60 text-sm mt-4 text-center animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-[#302f2d] rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-medium text-[#e8e7e3] mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 text-[#e8e7e3] max-h-[300px] overflow-y-auto pr-2">
                {cartItemsWithDetails.map((item, index) => {
                  if (!item.product) return null
                  return (
                    <div
                      key={item.id}
                      className="flex items-center animate-fade-in-left"
                      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                    >
                      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-[#e8e7e3]/10">
                        <Image
                          src={item.product.images[0] || "/placeholder.svg?height=64&width=64"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-[#e8e7e3]">{item.product.name}</h3>
                        <p className="text-xs text-[#e8e7e3]/70">
                          {item.color} • Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-[#e8e7e3]">
                        {(item.product.price * item.quantity).toLocaleString()} DZD
                      </p>
                    </div>
                  )
                })}
              </div>

              <Separator className="my-4 bg-[#b9b5ac]/20" />

              {/* Order Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <p className="text-[#e8e7e3]/70">Subtotal</p>
                  <p className="font-medium text-[#e8e7e3]">{subtotal.toLocaleString()} DZD</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-[#e8e7e3]/70">Shipping</p>
                  <p className="font-medium text-[#e8e7e3]">{shippingCost.toLocaleString()} DZD</p>
                </div>
                <Separator className="my-2 bg-[#b9b5ac]/20" />
                <div className="flex justify-between">
                  <p className="font-medium text-[#e8e7e3]">Total</p>
                  <p className="text-lg font-bold text-[#b9b5ac]">{total.toLocaleString()} DZD</p>
                </div>
              </div>

              <div className="bg-[#b9b5ac]/10 p-4 rounded-md animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <h3 className="font-medium text-[#e8e7e3] mb-2 text-sm">Payment Method</h3>
                <p className="text-[#e8e7e3]/70 text-sm flex items-center">
                  <span className="mr-2">💵</span> Cash on Delivery only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <p className="text-white/70">© 2025 Decora. All rights reserved.</p>
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
