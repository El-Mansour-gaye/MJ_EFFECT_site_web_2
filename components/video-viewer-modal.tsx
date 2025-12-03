"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { X } from "lucide-react"
import { Product } from "@/lib/types"

interface VideoViewerModalProps {
  products: Product[]
  startIndex: number
  onClose: () => void
}

export function VideoViewerModal({ products, startIndex, onClose }: VideoViewerModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = startIndex * window.innerHeight
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [startIndex])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white z-10">
        <X size={32} />
      </button>
      <div
        ref={scrollContainerRef}
        className="w-full h-full snap-y snap-mandatory overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="w-full h-screen snap-center flex items-center justify-center relative">
            <video
              src={product.videoUrl}
              className="h-full w-auto"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="absolute bottom-16 left-4 text-white p-4">
              <h3 className="font-serif text-2xl font-bold">{product.name}</h3>
              <p className="text-lg mb-4">{product.price.toLocaleString()} FCFA</p>
              <Link
                href={`/collection/${product.id}`}
                className="bg-white text-black px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Voir le produit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (!isMounted) {
    return null
  }

  return createPortal(modalContent, document.body)
}
