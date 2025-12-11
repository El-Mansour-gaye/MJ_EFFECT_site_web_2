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

  return (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="relative w-full aspect-[3/4]"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative w-full h-full shadow-md transition-shadow duration-300 group-hover:shadow-xl"
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ rotateY: -25 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Front Face */}
          <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" }}>
            <img
              ref={imageRef}
              src={encodeImagePath(product.image || "/placeholder.svg")}
              alt={product.nom}
              className="w-full h-full object-cover"
            />
            {product.tag && (
              <span
                className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
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
              className="absolute top-3 right-3 p-2 bg-white/80 text-black rounded-full backdrop-blur-sm hover:bg-white"
            >
              <Heart size={16} />
            </button>
          </div>

          {/* Side Face - Revealed on Hover */}
          <div
            className="absolute w-full h-full bg-black/90 p-4 flex flex-col items-center justify-center text-center text-white"
            style={{
              transform: "rotateY(90deg) translateZ(calc(100% - 40px))",
              transformOrigin: "right center",
              backfaceVisibility: "hidden"
            }}
          >
              {product.stock < 10 ? (
                <p className="font-serif text-lg">Bientôt Épuisé</p>
              ) : (
                product.details && (
                  <>
                    <p className="text-white/70 text-[10px] uppercase tracking-widest">
                      Note Clé
                    </p>
                    <p className="font-serif text-lg mt-1">
                      {product.details}
                    </p>
                  </>
                )
              )}
               <button
                onClick={handleAddToCart}
                className="add-to-cart-button w-full bg-accent text-accent-foreground py-2.5 flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-accent/90 transition-colors mt-6"
              >
                <ShoppingBag size={14} />
                Ajouter
              </button>
          </div>
        </motion.div>
      </motion.div>
      <div className="pt-4 text-center">
        <p className="text-xs text-black/50 uppercase tracking-widest mb-1">{product.category}</p>
        <h3 className="font-serif text-lg mb-2">{product.nom}</h3>
        <p className="font-medium">{Number(product.prix_fcfa).toLocaleString()} FCFA</p>
      </div>
    </motion.div>
  )
}
