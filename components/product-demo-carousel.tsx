"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { PRODUCTS } from "@/lib/data"
import { ProductDemoCard } from "./product-demo-card"
import { VideoViewerModal } from "./video-viewer-modal"

export function ProductDemoCarousel() {
  const demoProducts = PRODUCTS.filter((p) => p.videoUrl)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

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
