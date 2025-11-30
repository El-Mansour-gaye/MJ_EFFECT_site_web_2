"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BLOG_ARTICLES } from "@/lib/data"
import { Product } from "@/lib/types"
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

      {/* Actualités du Blog Section */}
      <AnimatedSection>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
              <span className="font-normal">Actualités</span> <span className="font-bold">du Blog</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_ARTICLES.slice(0, 3).map((article) => {
              const titleWords = article.title.split(" ")
              const lastWord = titleWords.pop()
              const restOfTitle = titleWords.join(" ")
              return (
                <Link key={article.id} href={`/blog/${article.id}`} className="group text-left">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm text-foreground/60 mb-2">
                    {article.date} • {article.readTime}
                  </p>
                  <h3 className="font-serif text-xl mb-2 group-hover:text-accent transition-colors">
                    <span className="font-normal">{restOfTitle}</span> <span className="font-bold">{lastWord}</span>
                  </h3>
                  <p className="text-sm text-foreground/70 line-clamp-2">{article.excerpt}</p>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="border border-black px-8 py-3 text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Voir tous les articles
            </Link>
          </div>
        </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
