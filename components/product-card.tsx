"use client"

import { ShoppingBag, Heart } from "lucide-react"
import { toast } from "sonner"
import { useCartStore } from "@/lib/store/cart"
import type { Product } from "@/lib/data"
import { encodeImagePath } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() // Prevent the modal from opening
    addToCart({
      produit_id: product.id.toString(),
      nom: product.name,
      prix_fcfa: product.price,
      quantite: 1,
    })
    toast.success(`${product.name} a été ajouté au panier!`)
  }

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-black/5">
        <img
          src={encodeImagePath(product.image || "/placeholder.svg")}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-serif text-xl mb-2">{product.name}</h3>
          <p className="font-medium text-lg">{product.price.toLocaleString()} FCFA</p>
        </div>
        {product.tag && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 text-xs uppercase tracking-widest ${
              product.tag === "Promo"
                ? "bg-accent text-accent-foreground"
                : product.tag === "New"
                  ? "bg-black text-white"
                  : "bg-white text-black"
            }`}
          >
            {product.tag}
          </span>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent">
          <Heart size={18} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bottom-6">
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button w-full bg-black text-white py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ShoppingBag size={16} />
            Ajouter au panier
          </button>
        </div>
      </div>
      <div className="pt-4 text-center">
        <p className="text-xs text-black/50 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-serif text-lg mb-2">{product.name}</h3>
        <p className="font-medium">{product.price.toLocaleString()} FCFA</p>
      </div>
    </div>
  )
}
