"use client"

import { ShoppingBag, Heart } from "lucide-react"
import { toast } from "sonner"
import { useCartStore } from "@/lib/store/cart"
import type { Product } from "@/lib/data"

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
    <div className="group transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-black/5 mb-4">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
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
        <button className="absolute top-4 right-4 p-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent">
          <Heart size={18} />
        </button>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ShoppingBag size={16} />
            Ajouter au panier
          </button>
        </div>
      </div>
      <p className="text-xs text-black/50 uppercase tracking-widest mb-1">{product.category}</p>
      <h3 className="font-serif text-lg mb-2">{product.name}</h3>
      <p className="font-medium">{product.price.toLocaleString()} FCFA</p>
    </div>
  )
}
