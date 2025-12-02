"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/lib/types"
import { ProductDemoCard } from "./product-demo-card"
import { VideoViewerModal } from "./video-viewer-modal"

export function ProductDemoCarousel() {
  const [demoProducts, setDemoProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDemoProducts = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/home-collections')
        if (!response.ok) throw new Error('Impossible de charger les démos produits.')
        const data: Product[] = await response.json()
        const productsWithVideo = data.filter((p) => p.video_url)
        setDemoProducts(productsWithVideo)
      } catch (err) {
        setError((err as Error).message)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDemoProducts()
  }, [])

  const openModal = (index: number) => {
    setSelectedProductIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 232 // w-52 (208px) + gap-6 (24px)
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">
            <span className="font-normal">Nos</span> <span className="font-bold">Démos Produits en Action</span>
          </h2>
          <p>Chargement des démos...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">
            <span className="font-normal">Nos</span> <span className="font-bold">Démos Produits en Action</span>
          </h2>
          <p className="text-red-500">Erreur: {error}</p>
        </div>
      </section>
    )
  }

  if (demoProducts.length === 0) {
    // Don't render the section if there are no demo videos
    return null
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl">
            <span className="font-normal">Nos</span> <span className="font-bold">Démos Produits en Action</span>
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel("left")}
              className="p-3 border border-black hover:bg-black hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="p-3 border border-black hover:bg-black hover:text-white transition-colors"
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
          {demoProducts.map((product, index) => (
            <ProductDemoCard key={product.id} product={product} onClick={() => openModal(index)} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <VideoViewerModal products={demoProducts} startIndex={selectedProductIndex} onClose={closeModal} />
      )}
    </section>
  )
}
