"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Category } from "@/lib/types"

interface CategoryCarouselProps {
  categories: Category[]
  title: string
  seeAllLink?: string
}

export function CategoryCarousel({ categories, title, seeAllLink }: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const categoriesPerView = {
    mobile: 1,
    desktop: 3,
  }

  const totalSlides = Math.ceil(categories.length / categoriesPerView.desktop)

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
          {categories.slice(0, 6).map((category, index) => (
            <div
              key={category.slug}
              className="flex-shrink-0 w-full md:w-1/3 snap-start animate-scale-in"
              style={{
                scrollSnapAlign: "start",
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <Link href={`/shop?category=${category.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg?height=600&width=800"}
                      alt={category.name}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                    <div className="bg-white/80 px-6 py-3 rounded-sm backdrop-blur-sm transition-all duration-300 group-hover:bg-white/90 group-hover:scale-105 group-hover:shadow-lg">
                      <span className="text-[#302f2d] font-medium uppercase tracking-wider">{category.name}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110 ${
              currentIndex === 0
                ? "border-[#b9b5ac]/50 text-[#302f2d]/50"
                : "border-[#b9b5ac] text-[#302f2d] hover:bg-[#302f2d] hover:text-white hover:border-[#302f2d]"
            }`}
            aria-label="Previous categories"
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
            aria-label="Next categories"
          >
            <ChevronRight className="h-5 w-5 transition-transform duration-200 hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
