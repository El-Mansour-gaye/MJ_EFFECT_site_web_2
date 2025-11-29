"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/lib/types"
import useEmblaCarousel from "embla-carousel-react"
import { useState, useCallback, useEffect } from "react"
import { encodeImagePath } from "@/lib/utils"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const images = product.images?.length ? product.images : (product.image ? [product.image] : ['/placeholder.svg']);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Carousel */}
        <div className="w-full md:w-1/2 relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {images.map((imgSrc, index) => (
                <div className="flex-grow-0 flex-shrink-0 w-full" key={index}>
                  <img
                    src={encodeImagePath(imgSrc)}
                    alt={`${product.nom} image ${index + 1}`}
                    className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                </div>
              ))}
            </div>
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 disabled:opacity-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 disabled:opacity-50"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col relative overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
          >
            <X size={24} />
          </button>

          <p className="text-sm uppercase tracking-widest text-gray-500">{product.category}</p>
          <h2 id="product-modal-title" className="text-3xl lg:text-4xl font-serif font-bold my-4">{product.nom}</h2>
          <p className="text-2xl text-[#C9A050] mb-6">{Number(product.prix_fcfa).toLocaleString()} FCFA</p>

          <div className="text-gray-700 space-y-4">
            <p>
              {product.details || `Ceci est une description détaillée du produit. Elle met en avant les qualités uniques de ${product.nom}, ses notes olfactives, et les émotions qu'il évoque. Une fragrance conçue pour laisser une impression mémorable.`}
            </p>
          </div>

          <div className="mt-auto pt-6">
             <button className="w-full bg-black text-white py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors rounded">
                Ajouter au Panier
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
