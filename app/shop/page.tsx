"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Navigation } from "@/components/navigation"
import { FilterDropdown } from "@/components/filter-dropdown"
import { useCart } from "@/context/cart-context"
import { products, productTypes, materials, colorOptions, priceRanges, sortOptions } from "@/lib/data"
import type { FilterOptions, Product } from "@/lib/types"
import { Button } from "@/components/ui/button"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const trendingParam = searchParams.get("trending")

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 9
  const [filters, setFilters] = useState<FilterOptions>({
    type: null,
    material: null,
    color: null,
    price: null,
    sort: null,
  })

  const { addToCart } = useCart()

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, categoryParam, trendingParam])

  // Filter products based on all criteria
  const filteredProducts = products.filter((product) => {
    // Category filter from URL
    if (categoryParam && !product.category.toLowerCase().includes(categoryParam.toLowerCase())) {
      return false
    }

    // Trending filter from URL
    if (trendingParam === "true" && !product.trending) {
      return false
    }

    // Type filter
    if (filters.type && product.type !== filters.type) {
      return false
    }

    // Material filter
    if (filters.material && (!product.material || !product.material.includes(filters.material))) {
      return false
    }

    // Color filter
    if (filters.color && !product.colors.some((color) => color.includes(filters.color!))) {
      return false
    }

    // Price filter
    if (filters.price) {
      const price = product.price
      if (filters.price === "Under 500DZD" && price >= 50) return false
      if (filters.price === "500DZD - 1000" && (price < 50 || price > 100)) return false
      if (filters.price === "1000D|D - 200DZD" && (price < 100 || price > 200)) return false
      if (filters.price === "2000DZD - 3000DZD" && (price < 200 || price > 300)) return false
      if (filters.price === "3000DZD - 4000DZD" && (price < 300 || price > 400)) return false
      if (filters.price === "Over 4000DZD" && price <= 400) return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!filters.sort || filters.sort === "Featured") return 0
    if (filters.sort === "Price: Low to High") return a.price - b.price
    if (filters.sort === "Price: High to Low") return b.price - a.price
    if (filters.sort === "Newest") return b.id - a.id
    return 0
  })

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle filter change
  const handleFilterChange = (filterType: keyof FilterOptions, value: string | null) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  // Handle add to cart
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product.id, 1, product.colors[0])
  }

  return (
    <div className="min-h-screen bg-[#e8e7e3] pb-16">
      <Navigation />

      <div className="container mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-[#302f2d] mb-8 animate-fade-in-up">
          {categoryParam
            ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).replace("-", " ")
            : trendingParam
              ? "Trending Products"
              : "All Products"}
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <FilterDropdown
            title="Type"
            options={productTypes}
            value={filters.type}
            onChange={(value) => handleFilterChange("type", value)}
          />
          <FilterDropdown
            title="Material"
            options={materials}
            value={filters.material}
            onChange={(value) => handleFilterChange("material", value)}
          />
          <FilterDropdown
            title="Color"
            options={colorOptions}
            value={filters.color}
            onChange={(value) => handleFilterChange("color", value)}
          />
          <FilterDropdown
            title="Price"
            options={priceRanges}
            value={filters.price}
            onChange={(value) => handleFilterChange("price", value)}
          />
          <FilterDropdown
            title="Sort"
            options={sortOptions}
            value={filters.sort}
            onChange={(value) => handleFilterChange("sort", value)}
          />
        </div>

        {/* Products Count */}
        <p className="text-[#302f2d]/70 mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {sortedProducts.length} products
        </p>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 animate-fade-in-up">
            <h2 className="text-xl font-medium text-[#302f2d] mb-4">No products found</h2>
            <p className="text-[#302f2d]/70 mb-8">Try adjusting your filters to find what you're looking for.</p>
            <Button
              onClick={() =>
                setFilters({
                  type: null,
                  material: null,
                  color: null,
                  price: null,
                  sort: null,
                })
              }
              className="bg-[#302f2d] hover:bg-[#302f2d]/90 text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentProducts.map((product, index) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="block animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white rounded-lg p-4 relative group transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                  {/* <div className=" absolute top-4 left-4 bg-white text-[#302f2d] text-xs px-3 py-1 rounded-full uppercase transition-all duration-200 group-hover:bg-[#302f2d] group-hover:text-white">
                    {product.category.split(" ")[0]}
                  </div> */}
                  <div className="aspect-square relative mb-4 overflow-hidden rounded-md">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=400&width=400"}
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
                      className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-[#b9b5ac] transition-all duration-300 group-hover:bg-[#302f2d] hover:bg-[#302f2d] hover:border-[#302f2d] hover:text-white hover:scale-110 hover:rotate-90 group"
                    >
                      <Plus className="h-4 w-4 text-[#302f2d] group-hover:text-white transition-colors duration-200" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-[#b9b5ac] disabled:opacity-50 transition-all duration-200 hover:scale-110 hover:bg-[#302f2d] hover:text-white"
                aria-label="Previous page"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                    currentPage === page
                      ? "bg-[#302f2d] text-white shadow-lg"
                      : "border border-[#b9b5ac] text-[#302f2d] hover:bg-[#302f2d] hover:text-white"
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-[#b9b5ac] disabled:opacity-50 transition-all duration-200 hover:scale-110 hover:bg-[#302f2d] hover:text-white"
                aria-label="Next page"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
