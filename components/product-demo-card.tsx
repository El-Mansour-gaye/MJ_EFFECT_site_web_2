import { Product } from "@/lib/types"

interface ProductDemoCardProps {
  product: Product
  onClick: () => void
}

export function ProductDemoCard({ product, onClick }: ProductDemoCardProps) {
  return (
    <div
      className="relative aspect-[9/16] w-64 flex-shrink-0 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <video
        src={product.video_url}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <h3 className="font-serif text-lg font-bold">{product.nom}</h3>
        {product.prix_fcfa > 0 && <p className="text-sm">{product.prix_fcfa.toLocaleString()} FCFA</p>}
      </div>
    </div>
  )
}
