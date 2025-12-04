"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BLOG_ARTICLES } from "@/lib/data"
import { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
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
  products: Product[]
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
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/home-collections')
        if (!response.ok) throw new Error('Impossible de charger les collections.')
        const data: Product[] = await response.json()
        setProducts(data)
      } catch (err) {
        setError((err as Error).message)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCollections()
  }, [])

  const bestSellers = products.filter((p) => p.is_best_seller)
  const newArrivals = products.filter((p) => p.is_new_arrival)
  const coffrets = products.filter((p) => p.is_set_or_pack)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end justify-center overflow-hidden pb-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/image-banniere.png')",
          }}
        />
        <div className="relative z-10">
          <Link href="/collection">
            <Button className="px-8 py-6 text-sm uppercase tracking-widest">Acheter Maintenant</Button>
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

            {isLoading && <p className="text-center">Chargement des collections...</p>}
            {error && <p className="text-center text-red-500">Erreur: {error}</p>}
            {!isLoading && !error && (
              <>
                {bestSellers.length > 0 && (
                  <ProductCarousel title="Nos" titleBold="Best Sellers" products={bestSellers} />
                )}
                {newArrivals.length > 0 && (
                  <ProductCarousel title="Nouveaux" titleBold="Arrivages" products={newArrivals} />
                )}
                {coffrets.length > 0 && (
                  <ProductCarousel title="Coffrets Cadeaux" titleBold="& Packs" products={coffrets} />
                )}
              </>
            )}
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
