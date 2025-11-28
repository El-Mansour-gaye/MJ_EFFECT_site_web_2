"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PRODUCTS, BLOG_ARTICLES } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ProductDemoCarousel } from "@/components/product-demo-carousel"
import { ParallaxCategories } from "@/components/pages/parallax-categories"
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver"
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
      const scrollAmount = 320
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
          <div key={product.id} className="flex-shrink-0 w-72">
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

  const [collectionsRef, collectionsVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  const [featuredRef, featuredVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })
  const [blogRef, blogVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true })

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/elegant-woman-luxury-perfume-gold-atmosphere.jpg')",
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

      {/* Packery Grid - Categories */}
      <section ref={collectionsRef} className={cn("py-16 lg:py-24 transition-opacity duration-500", collectionsVisible ? "opacity-100" : "opacity-0")}>
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
            <span className="font-normal">Nos</span> <span className="font-bold">Collections</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/collection"
              className="relative aspect-[3/4] overflow-hidden group col-span-2 row-span-2"
            >
              <img
                src="/elegant-woman-perfume-floral-luxury.jpg"
                alt="Pour Elle"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-white text-2xl md:text-3xl">Pour Elle</span>
              </div>
            </Link>
            <Link href="/collection" className="relative aspect-square overflow-hidden group">
              <img
                src="/masculine-perfume-bottle-leather-wood.jpg"
                alt="Pour Lui"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-white text-xl md:text-2xl">Pour Lui</span>
              </div>
            </Link>
            <Link href="/collection" className="relative aspect-square overflow-hidden group">
              <img
                src="/luxury-gift-box-perfume-set-gold-ribbon.jpg"
                alt="Coffrets"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-white text-xl md:text-2xl">Coffrets</span>
              </div>
            </Link>
            <Link
              href="/collection"
              className="relative aspect-square overflow-hidden group col-span-2"
            >
              <img
                src="/luxury-body-care-products-cream-lotion-gold.jpg"
                alt="Soins Corps"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-white text-xl md:text-2xl">Soins Corps</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section ref={featuredRef} className={cn("py-16 lg:py-24 bg-black/5 transition-all duration-500", featuredVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
        <div className="container mx-auto px-4">
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

      {/* Parallax Categories Section */}
      <ParallaxCategories />

      {/* Product Demos Section */}
      <ProductDemoCarousel />


      {/* Actualités du Blog Section */}
      <section ref={blogRef} className={cn("py-16 lg:py-24 transition-all duration-500", blogVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
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

    </div>
  )
}
