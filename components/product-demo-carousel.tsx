"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/lib/types"
import { ProductDemoCard } from "./product-demo-card"
import { VideoViewerModal } from "./video-viewer-modal"

const staticDemoProducts: Product[] = [
  {
    id: "demo-1",
    nom: "Bath and Body Works - Fine Fragrance Mist",
    prix_fcfa: 15000,
    stock: 1,
    slug: "bath-and-body-works-fine-fragrance-mist",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Bath-et-Body-work-fine-fragrance-mist.mp4",
  },
  {
    id: "demo-2",
    nom: "Gommage corps Dove",
    prix_fcfa: 12000,
    stock: 1,
    slug: "gommage-corps-dove-1",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Dove-gommage-corps-1.mp4",
  },
  {
    id: "demo-3",
    nom: "Gommage corps Dove",
    prix_fcfa: 12000,
    stock: 1,
    slug: "gommage-corps-dove-2",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Dove-gommage-corps-2.mp4",
  },
  {
    id: "demo-4",
    nom: "Gommage corps Dove",
    prix_fcfa: 12000,
    stock: 1,
    slug: "gommage-corps-dove-3",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Dove-gommage-corps-3.mp4",
  },
  {
    id: "demo-5",
    nom: "Gingham Georgeous - Fine Fragrance Mist",
    prix_fcfa: 0, // Pas de produit associé
    stock: 0,
    slug: "gingham-georgeous-fine-fragrance-mist",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Gingham-georgeous-fine-fragrance-mist.mp4",
  },
  {
    id: "demo-6",
    nom: "Gommages Tree Hut",
    prix_fcfa: 0, // Pas de produit associé
    stock: 0,
    slug: "gommages-tree-hut",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Tree-hut-2-gommages.mp4",
  },
  {
    id: "demo-7",
    nom: "Packs Tree Hut",
    prix_fcfa: 45000,
    stock: 1,
    slug: "packs-tree-hut-1",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: true,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Tree-hut-packs-1.mp4",
  },
  {
    id: "demo-8",
    nom: "Packs Tree Hut",
    prix_fcfa: 45000,
    stock: 1,
    slug: "packs-tree-hut-2",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: true,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Tree-hut-packs-2.mp4",
  },
  {
    id: "demo-9",
    nom: "Shea Sugar Scrub Tree Hut",
    prix_fcfa: 18000,
    stock: 1,
    slug: "shea-sugar-scrub-tree-hut",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Tree-hut-shea-sugar-scrub.mp4",
  },
  {
    id: "demo-10",
    nom: "Sweet Pumpkin Tree Hut",
    prix_fcfa: 0, // Pas de produit associé
    stock: 0,
    slug: "sweet-pumpkin-tree-hut",
    is_best_seller: false,
    is_new_arrival: false,
    is_set_or_pack: false,
    category: "démos",
    subCategory: null,
    image: "/images/placeholder.png",
    images: ["/images/placeholder.png"],
    tag: null,
    details: "",
    video_url: "/videos/Tree-hut-sweet-pumkin.mp4",
  },
]

export function ProductDemoCarousel() {
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
      const scrollAmount = 280 // w-64 (256px) + gap-6 (24px)
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
      })
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl md:text-4xl">
            <span className="font-normal">Découvrez nos produits en</span> <span className="font-bold">action</span>
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
          {staticDemoProducts.map((product, index) => (
            <ProductDemoCard key={product.id} product={product} onClick={() => openModal(index)} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <VideoViewerModal products={staticDemoProducts} startIndex={selectedProductIndex} onClose={closeModal} />
      )}
    </section>
  )
}
