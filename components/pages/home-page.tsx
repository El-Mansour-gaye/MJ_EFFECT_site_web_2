"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PRODUCTS } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ProductDemoCarousel } from "@/components/product-demo-carousel"
import { ParallaxCategories } from "@/components/pages/parallax-categories"
import { OlfactiveCollections } from "@/components/olfactive-collections"
import { AnimatedSection } from "@/components/animated-section"
import { HomeBlogSection } from "@/components/pages/home-blog-section"
import { cn } from "@/lib/utils"

function ProductCarousel({
  title,
  titleBold,
  products,
}: {
  title: string
  titleBold: string
  products: typeof PRODUCTS
}) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 280
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="mb-12 last:mb-0">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-serif text-2xl md:text-3xl">
          <span className="font-normal">{title}</span> <span className="font-bold">{titleBold}</span>
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scrollCarousel("left")}
            className="p-3 border border-black hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            className="p-3 border border-black hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-64">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function HomePage() {
  const bestSellers = PRODUCTS.filter((p) => p.tag === "Best Seller")
  const newArrivals = PRODUCTS.filter((p) => p.tag === "New")
  const coffrets = PRODUCTS.filter((p) => p.tag === "Coffret")

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/image-banniere.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
            <span className="font-normal">Révélez</span> <span className="font-bold">votre Éclat</span>
          </h1>
          <p className="text-md md:text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Découvrez notre collection exclusive de parfums et soins de luxe
          </p>
          <Link
            href="/collection"
            className="bg-accent text-accent-foreground px-8 py-3 text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors"
          >
            Acheter Maintenant
          </Link>
        </div>
      </section>

      {/* Olfactive Collections Section */}
      <AnimatedSection>
        <OlfactiveCollections />
      </AnimatedSection>

      <AnimatedSection>
        <section className="py-16 lg:py-24 bg-black/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
              <span className="font-normal">Découvrez</span> <span className="font-bold">nos Collections Phares</span>
            </h2>

            {/* Carousel 1: Best Sellers */}
            <ProductCarousel title="Nos" titleBold="Best Sellers" products={bestSellers} />

            {/* Carousel 2: New Arrivals */}
            <ProductCarousel title="Nouveaux" titleBold="Arrivages" products={newArrivals} />

            {/* Carousel 3: Gift Sets */}
            <ProductCarousel title="Coffrets Cadeaux" titleBold="& Packs" products={coffrets} />
          </div>
        </section>
      </AnimatedSection>

      {/* Parallax Categories Section */}
      <AnimatedSection>
        <ParallaxCategories />
      </AnimatedSection>

      {/* Product Demos Section */}
      <AnimatedSection>
        <ProductDemoCarousel />
      </AnimatedSection>

      <HomeBlogSection />
    </div>
  )
}
