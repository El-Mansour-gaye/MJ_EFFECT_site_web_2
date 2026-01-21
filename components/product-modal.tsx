"use client"

import { X, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react"
import { Product } from "@/lib/types"
import useEmblaCarousel from "embla-carousel-react"
import { useState, useCallback, useEffect } from "react"
import { encodeImagePath } from "@/lib/utils"
import { useCartStore } from "@/lib/store/cart"

interface ProductModalProps {
  product: Product & { description?: string; conseils_utilisation?: string; composition?: string };
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const isOutOfStock = product.stock <= 0;
  const addToCart = useCartStore((state) => state.addToCart)
  const [emblaRef, emblaApi] = useEmblaCarousel()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const images = product.images?.length ? product.images : (product.image ? [product.image] : ['/placeholder.svg']);

  const TABS = [
    {
      id: "description",
      label: "Description",
      content: product.description || product.details || `Ceci est une description détaillée du produit. Elle met en avant les qualités uniques de ${product.nom}, ses notes olfactives, et les émotions qu'il évoque. Une fragrance conçue pour laisser une impression mémorable.`,
    },
    {
      id: "conseils",
      label: "Conseils d'utilisation",
      content: product.conseils_utilisation || "Appliquez généreusement sur une peau propre et sèche. Massez doucement jusqu'à absorption complète. Idéal pour une utilisation quotidienne matin et soir.",
    },
    {
      id: "composition",
      label: "Composition",
      content: product.composition || "Ingrédients : Aqua (Water), Glycerin, Butyrospermum Parkii (Shea) Butter, Parfum (Fragrance), Cetearyl Alcohol, Glyceryl Stearate, PEG-100 Stearate, Dimethicone, Phenoxyethanol, Ethylhexylglycerin.",
    },
  ]

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
        className="bg-white shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row"
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
                    className="w-full h-64 md:h-full object-cover"
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
                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 disabled:opacity-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 disabled:opacity-50"
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
          <div className="flex items-center justify-between my-4">
            <h2 id="product-modal-title" className="text-3xl lg:text-4xl font-serif font-bold">{product.nom}</h2>
            {isOutOfStock && (
              <span className="px-3 py-1 text-xs uppercase tracking-widest bg-red-500 text-white">
                En rupture
              </span>
            )}
          </div>
          <p className="text-2xl text-[#C9A050] mb-2">{Number(product.prix_fcfa).toLocaleString()} FCFA</p>
          {isOutOfStock && (
            <p className="text-sm text-red-500 mb-6">Sera expédié dans 10-20 jours</p>
          )}

          <div className="flex-grow">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-black text-black'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="pt-6 text-gray-700 text-sm">
              {TABS.find((tab) => tab.id === activeTab)?.content}
            </div>
          </div>

          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm uppercase tracking-widest text-gray-500">Quantité</p>
                <div className="flex items-center">
                    <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                    <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border-t border-b border-gray-300">{quantity}</span>
                    <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 hover:bg-gray-100 transition-colors"
                    >
                    <Plus size={16} />
                    </button>
                </div>
            </div>
            <button
              onClick={() => {
                addToCart({
                  produit_id: product.id,
                  nom: product.nom,
                  prix_fcfa: product.prix_fcfa,
                  quantite: quantity,
                })
                onClose()
              }}
              className="w-full bg-black text-white py-3 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {isOutOfStock ? "Précommander" : "Ajouter au Panier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
