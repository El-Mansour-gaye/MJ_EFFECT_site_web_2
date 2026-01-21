"use client"

import { useRef } from "react"
import Image from "next/image"
import { ShoppingBag, Heart } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useCartStore } from "@/lib/store/cart"
import { useFavoritesStore } from "@/lib/store/favorites"
import type { Product } from "@/lib/types"
import { encodeImagePath } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  const addToCart = useCartStore((state) => state.addToCart)
  const cartIconRef = useCartStore((state) => state.cartIconRef)
  const { favoriteIds, toggleFavorite } = useFavoritesStore()
  const isFavorite = favoriteIds.includes(product.id)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleFavorite(product.id)
    toast.success(isFavorite ? `${product.nom} retiré des favoris` : `${product.nom} ajouté aux favoris!`, {
      icon: <Heart size={16} className={`mr-2 ${isFavorite ? "text-gray-400" : "text-red-500"}`} />,
    })
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    // --- Core logic first ---
    addToCart({
      produit_id: product.id,
      nom: product.nom,
      prix_fcfa: product.prix_fcfa,
      quantite: 1,
      image_url: product.image || undefined,
    })
    toast.success(`${product.nom} a été ajouté au panier!`)
    // --- End of core logic ---

    // Animation logic (visual feedback only)
    if (imageRef.current && cartIconRef?.current) {
      const imageRect = imageRef.current.getBoundingClientRect()
      const cartRect = cartIconRef.current.getBoundingClientRect()

      const flyingImage = imageRef.current.cloneNode(true) as HTMLImageElement
      flyingImage.style.position = "fixed"
      flyingImage.style.left = `${imageRect.left}px`
      flyingImage.style.top = `${imageRect.top}px`
      flyingImage.style.width = `${imageRect.width}px`
      flyingImage.style.height = `${imageRect.height}px`
      flyingImage.style.zIndex = "1000"
      flyingImage.style.transition = "all 0.8s cubic-bezier(0.55, 0.055, 0.675, 0.19)"
      document.body.appendChild(flyingImage)

      // Add event listener for the end of the transition
      flyingImage.addEventListener(
        "transitionend",
        () => {
          document.body.removeChild(flyingImage)
        },
        { once: true }
      )

      // Animate to cart
      requestAnimationFrame(() => {
        flyingImage.style.left = `${cartRect.left + cartRect.width / 2}px`
        flyingImage.style.top = `${cartRect.top + cartRect.height / 2}px`
        flyingImage.style.width = "0px"
        flyingImage.style.height = "0px"
        flyingImage.style.opacity = "0"
      })
    }
  }

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-black/5 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        <Image
          ref={imageRef}
          src={encodeImagePath(product.image || "/placeholder.svg")}
          alt={product.nom}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {isOutOfStock ? (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs uppercase tracking-widest bg-red-500 text-white">
            En rupture
          </span>
        ) : product.tag && (
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

        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 bg-white text-black rounded-full transition-all hover:text-accent z-10"
        >
          <Heart size={18} className={`${isFavorite ? 'fill-red-500 text-red-500' : 'fill-transparent'}`}/>
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bottom-6">
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button w-full bg-black text-white py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <ShoppingBag size={16} />
            {isOutOfStock ? "Précommander" : "Ajouter au panier"}
          </button>
        </div>
      </div>
      <div className="pt-4 text-center">
        <p className="text-xs text-black/50 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-serif text-lg mb-2">{product.nom}</h3>
        {isOutOfStock && (
          <p className="text-sm text-red-500 mb-2">Sera expédié dans 10-20 jours</p>
        )}
        <p className="font-medium">{Number(product.prix_fcfa).toLocaleString()} FCFA</p>
      </div>
    </motion.div>
  )
}
