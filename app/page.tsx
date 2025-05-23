import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { ProductCarousel } from "@/components/product-carousel"
import { CategoryCarousel } from "@/components/category-carousel"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/lib/data"
import Image from "next/image"

export default function Home() {
  // Filter trending products
  const trendingProducts = products.filter((product) => product.trending)

  return (
    <div className="flex flex-col min-h-screen bg-[#e8e7e3]">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-4 animate-fade-in">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-fade-in-left">
                <h1 className="text-6xl md:text-8xl font-bold text-[#302f2d] tracking-tighter leading-none animate-fade-in-up">
                  DECORA
                </h1>
                <p className="text-lg text-[#302f2d]/80 max-w-md animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  Curated home décor that brings warmth, style, and personality to every corner of your home.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  <Link href="/shop">
                    <Button className="bg-[#302f2d] hover:bg-[#302f2d]/90 text-white rounded-full px-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      Shop Now
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-[#302f2d] text-[#302f2d] rounded-full px-6 transition-all duration-300 hover:bg-[#302f2d] hover:text-white hover:-translate-y-1"
                  >
                    Explore
                  </Button>
                </div>
              </div>
              <div className="relative animate-fade-in-right">
                <div className="animate-float">
                  <Image
                    src="/images/hero-furniture.png"
                    alt="Elegant home decor"
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4" style={{ animationDelay: "0.6s" }}>
          <div className="container mx-auto">
            <CategoryCarousel categories={categories} title="Categories" seeAllLink="/categories" />
          </div>
        </section>

        {/* Trending Products */}
        <section className="py-16 px-4" style={{ animationDelay: "0.8s" }}>
          <div className="container mx-auto">
            <ProductCarousel products={trendingProducts} title="Our Favorite Looks" seeAllLink="/shop?trending=true" />
          </div>
        </section>

        {/* About Us */}
        <section className="py-16 px-4 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden animate-fade-in-left group">
                <Image
                  src="/images/67534eab3432201edc8b915d4dafaa4c.jpg"
                  alt="About Decora"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-6 animate-fade-in-right">
                <h2 className="text-3xl md:text-4xl font-bold text-[#302f2d] animate-fade-in-up">About Decora</h2>
                <p className="text-[#302f2d]/80 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                  At Decora, we believe that your home should be a reflection of your personal style and story. Founded
                  in 2020, our mission is to provide thoughtfully designed, high-quality home décor that transforms
                  spaces into sanctuaries.
                </p>
                <p className="text-[#302f2d]/80 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  Each piece in our collection is carefully curated, balancing timeless elegance with contemporary
                  design. We work with skilled artisans and ethical manufacturers to ensure that our products are not
                  only beautiful but also responsibly made.
                </p>
                {/* <Button
                  variant="outline"
                  className="border-[#302f2d] text-[#302f2d] rounded-full px-6 transition-all duration-300 hover:bg-[#302f2d] hover:text-white hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: "0.6s" }}
                >
                  Learn More
                </Button> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#302f2d] text-white py-12 px-4 animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: "1.3s" }}>
              <h3 className="text-xl font-bold mb-4">Decora</h3>
              <p className="text-white/70">Transforming spaces with timeless elegance and contemporary design.</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "1.4s" }}>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/shop?category=wall-decor"
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    Wall Décor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=lighting"
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    Lighting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=textiles"
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    Textiles & Soft Décor
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=furniture"
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    Furniture Accents
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop?category=accessories"
                    className="text-white/70 hover:text-white transition-colors duration-200"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "1.5s" }}>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "1.6s" }}>
              <h4 className="font-semibold mb-4">Stay Connected</h4>
              <p className="text-white/70 mb-4">
                Subscribe to our newsletter for the latest updates and exclusive offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full bg-white/10 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
                />
                <Button className="rounded-l-none bg-white text-[#302f2d] hover:bg-white/90 transition-all duration-200 hover:shadow-lg">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div
            className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up"
            style={{ animationDelay: "1.7s" }}
          >
            <p className="text-white/70">© 2025 Decora. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-white/70 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
