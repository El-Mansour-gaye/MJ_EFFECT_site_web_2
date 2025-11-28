import { Play } from "lucide-react"
import { Product } from "@/lib/data"

interface ProductDemoCardProps {
  product: Product
  onClick: () => void
}

export function ProductDemoCard({ product, onClick }: ProductDemoCardProps) {
  return (
    <div
      className="relative aspect-[9/16] w-52 flex-shrink-0 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <img
        src={product.image}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform">
            <Play size={32} className="text-white" />
          </div>
        </div>
        <h3 className="font-serif text-lg font-bold">{product.name}</h3>
        <p className="text-sm">{product.price.toLocaleString()} FCFA</p>
      </div>
    </div>
  )
}
