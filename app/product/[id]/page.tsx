"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ZoomIn, Heart, Share2 } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/data"
import { useCart } from "@/context/cart-context"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)

  const { addToCart } = useCart()

  // Find the product by ID
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    return (
      <div className="min-h-screen bg-[#e8e7e3] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#302f2d] mb-4">Product Not Found</h1>
          <Link href="/shop">
            <Button className="bg-[#302f2d] hover:bg-[#302f2d]/90 text-white">Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity, product.colors[selectedColor])
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#e8e7e3]">
      <Navigation />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-[#302f2d]/70">
              <li>
                <Link href="/" className="hover:text-[#302f2d]">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/shop" className="hover:text-[#302f2d]">
                  Shop
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-[#302f2d]">
                  {product.category}
                </Link>
              </li>
              <li>/</li>
              <li className="text-[#302f2d]">{product.name}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-white rounded-lg overflow-hidden aspect-square">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg?height=800&width=800"}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-300 ${
                    isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <ZoomIn className="h-5 w-5 text-[#302f2d]" />
                </button>
              </div>
              {/* Image Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden ${
                      selectedImage === index ? "ring-2 ring-[#302f2d]" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg?height=200&width=200"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Product Sheet Header */}
              <div className="inline-block">
                <span className="bg-white px-6 py-2 rounded-full text-sm font-medium text-[#302f2d] border border-[#b9b5ac]">
                  PRODUCT SHEET
                </span>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div className="border-b border-[#b9b5ac] pb-4">
                  <h3 className="text-sm font-medium text-[#302f2d] mb-2">NAME:</h3>
                  <h1 className="text-2xl font-bold text-[#302f2d] uppercase tracking-wide">{product.name}</h1>
                </div>

                <div className="border-b border-[#b9b5ac] pb-4">
                  <h3 className="text-sm font-medium text-[#302f2d] mb-2">DESCRIPTION:</h3>
                  <p className="text-[#302f2d]/80">{product.description}</p>
                </div>

                <div className="border-b border-[#b9b5ac] pb-4">
                  <h3 className="text-sm font-medium text-[#302f2d] mb-2">CATEGORY:</h3>
                  <p className="text-[#302f2d]/80">{product.category}</p>
                </div>

                <div className="border-b border-[#b9b5ac] pb-4">
                  <h3 className="text-sm font-medium text-[#302f2d] mb-3">COLORS:</h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === index ? "border-[#302f2d]" : "border-[#b9b5ac]"
                        }`}
                        style={{
                          backgroundColor:
                            color.toLowerCase() === "white"
                              ? "#ffffff"
                              : color.toLowerCase() === "black"
                                ? "#000000"
                                : color.toLowerCase() === "beige"
                                  ? "#b9b5ac"
                                  : color.toLowerCase() === "gray"
                                    ? "#808080"
                                    : "#b9b5ac",
                        }}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>

                <div className="border-b border-[#b9b5ac] pb-4">
                  <h3 className="text-sm font-medium text-[#302f2d] mb-2">AVAILABILITY:</h3>
                  <p className="text-green-600 font-medium">{product.availability}</p>
                </div>

                <div className="border-b border-[#b9b5ac] pb-4">
                  <h3 className="text-sm font-medium text-[#302f2d] mb-2">PRICE:</h3>
                  <p className="text-2xl font-bold text-[#302f2d]">{product.price.toFixed(2)}DZD</p>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-[#302f2d]">QUANTITY:</span>
                  <div className="flex items-center border border-[#b9b5ac] rounded-full">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-[#e8e7e3] rounded-l-full"
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
                        className="text-[#302f2d]"
                      >
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                    <span className="px-4 py-2 text-[#302f2d] font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-[#e8e7e3] rounded-r-full"
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
                        className="text-[#302f2d]"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#302f2d] hover:bg-[#302f2d]/90 text-white rounded-full py-3"
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-[#b9b5ac]">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full border-[#b9b5ac]">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share product</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-[#302f2d] mb-8">Related Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <Link href={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="block">
                    <div className="bg-white rounded-lg p-4 relative group">
                      {/* <div className="absolute top-4 left-4 bg-white text-[#302f2d] text-xs px-3 py-1 rounded-full uppercase">
                        {relatedProduct.category.split(" ")[0]}
                      </div> */}
                      <div className="aspect-square relative mb-4 overflow-hidden">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg?height=400&width=400"}
                          alt={relatedProduct.name}
                          fill
                          className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-[#302f2d] uppercase text-sm tracking-wider">
                            {relatedProduct.name.substring(0, 8)}
                          </h3>
                          <p className="text-[#302f2d] text-sm">{relatedProduct.price.toFixed(2)}DZD</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addToCart(relatedProduct.id, 1, relatedProduct.colors[0])
                          }}
                          aria-label="Add to cart"
                          className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-[#b9b5ac] transition-colors group-hover:bg-[#302f2d] hover:bg-[#302f2d] hover:border-[#302f2d] hover:text-white group"
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
                            className="text-[#302f2d] group-hover:text-white"
                          >
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
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
