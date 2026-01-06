"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { BLOG_ARTICLES } from "@/lib/data"
import { AnimatedSection } from "@/components/animated-section"

const BLOG_CATEGORIES = ["Tous", "Soins", "Parfums Homme", "Tendances", "Conseils Beauté", "Nouveautés"]

export default function BlogIndexPageContent() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <AnimatedSection>
        <div className="bg-black text-white py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl lg:text-5xl mb-4">
              <span className="font-normal">Le</span> <span className="font-bold">Journal</span>
            </h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Conseils beauté, tendances parfums et secrets de soins. Explorez notre univers.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <AnimatedSection delay={0.2} className="lg:w-64 shrink-0">
            <aside>
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-sans text-sm uppercase tracking-widest text-black/50 mb-4">Catégories</h3>
                <ul className="space-y-2">
                  {BLOG_CATEGORIES.map((category) => (
                    <li key={category}>
                      <button className="font-sans text-sm hover:text-[#C9A050] transition-colors w-full text-left py-1">
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-black/5 p-6">
                <h3 className="font-serif text-lg mb-2">
                  <span className="font-normal">Restez</span> <span className="font-bold">Informé</span>
                </h3>
                <p className="font-sans text-sm text-black/70 mb-4">
                  Recevez nos derniers articles et offres exclusives.
                </p>
                <Input
                  type="email"
                  placeholder="Votre email"
                  className="mb-3 border-black/20 focus:border-[#C9A050] rounded-none"
                />
                <Button className="w-full bg-black text-white hover:bg-[#C9A050] rounded-none font-sans text-sm uppercase tracking-widest">
                  S'abonner
                </Button>
              </div>
            </aside>
          </AnimatedSection>

          {/* Articles Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-8">
              {BLOG_ARTICLES.map((article, index) => (
                <AnimatedSection key={article.id} delay={0.4 + index * 0.1}>
                  <Link href={`/blog/${article.id}`} className="group h-full flex flex-col">
                    <article className="flex flex-col flex-grow">
                      {/* Article Image */}
                      <div className="overflow-hidden mb-4">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Article Content */}
                      <div className="flex flex-col flex-grow">
                        <p className="font-sans text-xs uppercase tracking-widest text-[#C9A050] mb-2">
                          {article.category}
                        </p>
                        <h3 className="font-serif text-xl mb-2 group-hover:text-[#C9A050] transition-colors">
                          {article.title.split(" ").map((word, i, arr) =>
                            i === arr.length - 1 ? (
                              <span key={i} className="font-bold">
                                {word}
                              </span>
                            ) : (
                              <span key={i} className="font-normal">
                                {word}{" "}
                              </span>
                            ),
                          )}
                        </h3>
                        <p className="font-sans text-xs text-black/50 mb-3">
                          {article.date} | {article.readTime}
                        </p>
                        <p className="font-sans text-sm text-black/70 mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
                        <Button
                          variant="outline"
                          className="rounded-none border-black hover:bg-black hover:text-white font-sans text-xs uppercase tracking-widest bg-transparent mt-auto"
                        >
                          Lire l'article
                        </Button>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
