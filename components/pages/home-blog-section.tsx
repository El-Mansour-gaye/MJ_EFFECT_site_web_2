"use client"

import Link from "next/link"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { BLOG_ARTICLES } from "@/lib/data"
import { AnimatedSection } from "@/components/animated-section"

export function HomeBlogSection() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const mainArticle = BLOG_ARTICLES[0]
  const sideArticle1 = BLOG_ARTICLES[1]
  const sideArticle2 = BLOG_ARTICLES[2]
  const carouselArticles = BLOG_ARTICLES.slice(3, 8)

  return (
    <AnimatedSection>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl">
              <span className="font-normal">Actualités</span> <span className="font-bold">du Blog</span>
            </h2>
          </div>

          {/* Top Section - Desktop */}
          <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 gap-6 h-[600px] mb-12">
            {/* Main Article */}
            <Link href={`/blog/${mainArticle.id}`} className="group relative row-span-2 col-span-1 overflow-hidden">
              <img src={mainArticle.image} alt={mainArticle.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="font-serif text-3xl font-bold mb-2">{mainArticle.title}</h3>
                <p className="text-white/80">{mainArticle.excerpt}</p>
              </div>
            </Link>

            {/* Side Article 1 */}
            <Link href={`/blog/${sideArticle1.id}`} className="group relative col-span-1 row-span-1 overflow-hidden">
              <img src={sideArticle1.image} alt={sideArticle1.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-serif text-xl font-bold">{sideArticle1.title}</h3>
              </div>
            </Link>

            {/* Side Article 2 */}
            <Link href={`/blog/${sideArticle2.id}`} className="group relative col-span-1 row-span-1 overflow-hidden">
              <img src={sideArticle2.image} alt={sideArticle2.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-serif text-xl font-bold">{sideArticle2.title}</h3>
              </div>
            </Link>
          </div>

          {/* Top Section - Mobile */}
          <div className="md:hidden grid grid-cols-1 gap-6 mb-12">
             <Link href={`/blog/${mainArticle.id}`} className="group relative h-80 overflow-hidden">
              <img src={mainArticle.image} alt={mainArticle.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-serif text-2xl font-bold mb-2">{mainArticle.title}</h3>
              </div>
            </Link>
             <Link href={`/blog/${sideArticle1.id}`} className="group relative h-80 overflow-hidden">
              <img src={sideArticle1.image} alt={sideArticle1.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-serif text-xl font-bold">{sideArticle1.title}</h3>
              </div>
            </Link>
          </div>

          {/* Bottom Carousel */}
          <div className="relative">
             <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {carouselArticles.map((article) => (
                <Link key={article.id} href={`/blog/${article.id}`} className="group text-left flex-shrink-0 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)] snap-start">
                  <div className="relative aspect-[4/3] overflow-hidden mb-4">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-lg mb-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 hidden lg:flex">
                <button
                    onClick={() => scrollCarousel("left")}
                    className="p-3 bg-white/80 backdrop-blur-sm border border-black/10 shadow-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 hidden lg:flex">
                <button
                    onClick={() => scrollCarousel("right")}
                    className="p-3 bg-white/80 backdrop-blur-sm border border-black/10 shadow-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
          </div>

           <div className="text-center mt-12">
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
  )
}
