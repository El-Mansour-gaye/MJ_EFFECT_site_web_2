"use client"

import { useRef } from "react"
import { ShoppingBag, Heart } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useCartStore } from "@/lib/store/cart"
import type { Product } from "@/lib/types"
import { encodeImagePath } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const cartIconRef = useCartStore((state) => state.cartIconRef)
  const imageRef = useRef<HTMLImageElement>(null)

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

  const dynamicInfo =
    product.stock && product.stock < 10
      ? "Bientôt Épuisé"
      : product.note_principale || "Découvrir"

  const isBientotEpuise = dynamicInfo === "Bientôt Épuisé"

  return (
    <div className="group cursor-pointer aspect-[3/4] [perspective:1200px]">
      <div className="relative w-full h-full transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(-20deg)]" style={{ transformStyle: "preserve-3d" }}>
        {/* Front Face */}
        <div className="absolute w-full h-full overflow-hidden bg-black/5 shadow-md">
           <img
            ref={imageRef}
            src={encodeImagePath(product.image || "/placeholder.svg")}
            alt={product.nom}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
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
           <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/60 to-transparent">
             <h3 className="font-serif text-lg text-white mb-1">{product.nom}</h3>
             <p className="font-medium text-white/90">{Number(product.prix_fcfa).toLocaleString()} FCFA</p>
           </div>
          <button className="absolute top-4 right-4 p-2 bg-white/80 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-accent">
            <Heart size={18} />
          </button>
        </div>

        {/* Side Face */}
        <div
          className="absolute top-0 left-0 h-full w-full bg-black flex flex-col justify-center items-center p-4 text-center"
          style={{
            transform: "rotateY(90deg) translateZ(calc(50% + 2px))", // Adjust translateZ to avoid flicker
            transformOrigin: "center right",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
           }}
        >
          <p className={`font-bold text-lg uppercase tracking-wider ${isBientotEpuise ? "text-red-500" : "text-accent"}`}>
            {dynamicInfo}
          </p>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)]">
            <button
              onClick={handleAddToCart}
              className="add-to-cart-button w-full bg-white text-black py-3 flex items-center justify-center gap-2 text-sm uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingBag size={16} />
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
