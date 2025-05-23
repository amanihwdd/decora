"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"

interface ProductCarouselProps {
  products: Product[]
  title: string
  seeAllLink?: string
}

export function ProductCarousel({ products, title, seeAllLink }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()
  const containerRef = useRef<HTMLDivElement>(null)

  const productsPerView = {
    mobile: 2,
    desktop: 4,
  }

  const totalSlides = Math.ceil(products.length / productsPerView.desktop)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
    scrollToCurrentSlide(-1)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : totalSlides - 1))
    scrollToCurrentSlide(1)
  }

  const scrollToCurrentSlide = (direction: number) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth * direction
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product.id, 1, product.colors[0])
  }

  return (
    <div className="relative animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#302f2d] animate-fade-in-left">{title}</h2>
        {seeAllLink && (
          <Link
            href={seeAllLink}
            className="text-[#302f2d] hover:underline text-sm uppercase tracking-wide transition-all duration-200 hover:text-[#302f2d]/80 animate-fade-in-right"
          >
            See All
          </Link>
        )}
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory transition-transform duration-500 ease-out"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-1/2 md:w-1/4 snap-start animate-scale-in"
              style={{
                scrollSnapAlign: "start",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Link href={`/product/${product.id}`} className="block">
                <div className="bg-white rounded-lg p-4 relative group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="z-30 absolute top-4 left-4 bg-white text-[#302f2d] text-xs px-3 py-1 rounded-full uppercase transition-all duration-200 group-hover:bg-[#302f2d] group-hover:text-white">
                    {product.category.split(" ")[0]}
                  </div>
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                      <h3 className="font-medium text-[#302f2d] uppercase text-sm tracking-wider">
                        {product.name.substring(0, 4)}
                      </h3>
                      <p className="text-[#302f2d] text-sm">{product.price.toFixed(2)}DZD</p>
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      aria-label="Add to cart"
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-[#b9b5ac] transition-all duration-300 group-hover:bg-[#302f2d] hover:bg-[#302f2d] hover:border-[#302f2d] hover:text-white hover:scale-110 hover:rotate-90 group "
                    >
                      <Plus className="h-4 w-4 text-[#302f2d]  group-hover:text-white transition-colors duration-200" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 ${
              currentIndex === 0
                ? "border-[#b9b5ac]/50 text-[#302f2d]/50"
                : "border-[#b9b5ac] text-[#302f2d] hover:bg-[#302f2d] hover:text-white hover:border-[#302f2d]"
            }`}
            aria-label="Previous products"
          >
            <ChevronLeft className="h-5 w-5 transition-transform duration-200 hover:-translate-x-0.5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalSlides - 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              currentIndex >= totalSlides - 1
                ? "bg-[#302f2d]/50 text-white"
                : "bg-[#302f2d] text-white hover:bg-[#302f2d]/90 hover:shadow-lg"
            }`}
            aria-label="Next products"
          >
            <ChevronRight className="h-5 w-5 transition-transform duration-200 hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
