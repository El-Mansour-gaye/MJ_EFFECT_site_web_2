"use client"

import { X } from "lucide-react"
import { Product } from "@/lib/data"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
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
          <h2 id="product-modal-title" className="text-3xl lg:text-4xl font-serif font-bold my-4">{product.name}</h2>
          <p className="text-2xl text-[#C9A050] mb-6">{product.price.toLocaleString()} FCFA</p>

          <div className="text-gray-700 space-y-4">
            <p>
              Ceci est une description détaillée du produit. Elle met en avant les qualités uniques de {product.name}, ses notes olfactives, et les émotions qu'il évoque. Une fragrance conçue pour laisser une impression mémorable.
            </p>
            <p>
              <strong>Notes de tête :</strong> Bergamote, Poivre Rose<br/>
              <strong>Notes de cœur :</strong> Jasmin, Rose de Damas<br/>
              <strong>Notes de fond :</strong> Santal, Vanille, Musc
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
