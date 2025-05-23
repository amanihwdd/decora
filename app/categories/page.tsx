import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { categories } from "@/lib/data"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e8e7e3]">
      <Navigation />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#302f2d] mb-12 animate-fade-in-up">Categories</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                href={`/shop?category=${category.slug}`}
                key={index}
                className="block group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white h-[500px] relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
                  <div className="h-full overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover object-center transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300">
                    <h2 className="text-3xl font-bold text-[#302f2d] transition-all duration-300 group-hover:scale-105 group-hover:text-white drop-shadow-lg">
                      {category.name}.
                    </h2>
                    <div className="space-y-2 transform transition-all duration-300 group-hover:translate-y-[-10px]">
                      <p className="text-sm text-[#302f2d]/80 group-hover:text-white/90 transition-colors duration-300 drop-shadow">
                        {category.description}
                      </p>
                      <p className="text-xs text-[#302f2d]/60 group-hover:text-white/80 transition-colors duration-300 drop-shadow">
                        {category.items}
                      </p>
                      <p className="text-xs text-[#302f2d]/60 group-hover:text-white/80 transition-colors duration-300 drop-shadow">
                        Shop the full range online.
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#302f2d] text-white py-12 px-4 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up" style={{ animationDelay: "0.9s" }}>
              <h3 className="text-xl font-bold mb-4">Decora</h3>
              <p className="text-white/70">Transforming spaces with timeless elegance and contemporary design.</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "1s" }}>
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
            <div className="animate-fade-in-up" style={{ animationDelay: "1.1s" }}>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-white/70 hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/70 hover:text-white transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/70 hover:text-white transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/70 hover:text-white transition-colors duration-200">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "1.2s" }}>
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
            style={{ animationDelay: "1.3s" }}
          >
            <p className="text-white/70">© 2024 Decora. All rights reserved.</p>
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
