"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown, SlidersHorizontal, X } from "lucide-react"
import { PRODUCTS, Product } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"

const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))]
const OLFACTIVE_FAMILIES = [...new Set(PRODUCTS.map((p) => p.subCategory))]
const PRICE_RANGES = ["0 - 15,000 FCFA", "15,000 - 25,000 FCFA", "25,000+ FCFA"]

export default function CollectionPageContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const initialSubCategory = searchParams.get("subCategory")

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [openAccordion, setOpenAccordion] = useState<string | null>("category")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sortOrder, setSortOrder] = useState("price-asc")

  useEffect(() => {
    const categories = initialCategory ? [decodeURIComponent(initialCategory)] : []
    const subCategories = initialSubCategory ? [decodeURIComponent(initialSubCategory)] : []
    setSelectedCategories(categories)
    setSelectedSubCategories(subCategories)
  }, [initialCategory, initialSubCategory])

  const handleProductClick = (product: Product) => setSelectedProduct(product)
  const handleCloseModal = () => setSelectedProduct(null)

  const toggleFilter = (value: string, selected: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const filteredProducts = PRODUCTS.filter((product) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const subCategoryMatch = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory)
    const priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.some((range) => {
        if (range === "0 - 15,000 FCFA") return product.price <= 15000
        if (range === "15,000 - 25,000 FCFA") return product.price > 15000 && product.price <= 25000
        if (range === "25,000+ FCFA") return product.price > 25000
        return false
      })
    return categoryMatch && subCategoryMatch && priceMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      // "popular" and "new" can be implemented if there's data for it
      // For now, "popular" will be the default order
      default:
        return 0
    }
  })

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Accordion */}
      <div className="border-b border-black/10 pb-6">
        <button
          onClick={() => setOpenAccordion(openAccordion === "category" ? null : "category")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-serif text-lg">Catégorie</span>
          <ChevronDown size={20} className={`transition-transform ${openAccordion === "category" ? "rotate-180" : ""}`} />
        </button>
        {openAccordion === "category" && (
          <div className="mt-4 space-y-3">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                  className="w-4 h-4 accent-[#C9A050]"
                />
                <span className="text-sm">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Olfactive Family Accordion */}
      <div className="border-b border-black/10 pb-6">
        <button
          onClick={() => setOpenAccordion(openAccordion === "olfactive" ? null : "olfactive")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-serif text-lg">Famille Olfactive</span>
          <ChevronDown size={20} className={`transition-transform ${openAccordion === "olfactive" ? "rotate-180" : ""}`} />
        </button>
        {openAccordion === "olfactive" && (
          <div className="mt-4 space-y-3">
            {OLFACTIVE_FAMILIES.map((family) => (
              <label key={family} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSubCategories.includes(family)}
                  onChange={() => toggleFilter(family, selectedSubCategories, setSelectedSubCategories)}
                  className="w-4 h-4 accent-[#C9A050]"
                />
                <span className="text-sm">{family}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Accordion */}
      <div className="border-b border-black/10 pb-6">
        <button
          onClick={() => setOpenAccordion(openAccordion === "price" ? null : "price")}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="font-serif text-lg">Gamme de Prix</span>
          <ChevronDown size={20} className={`transition-transform ${openAccordion === "price" ? "rotate-180" : ""}`} />
        </button>
        {openAccordion === "price" && (
          <div className="mt-4 space-y-3">
            {PRICE_RANGES.map((range) => (
              <label key={range} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(range)}
                  onChange={() => toggleFilter(range, selectedPrices, setSelectedPrices)}
                  className="w-4 h-4 accent-[#C9A050]"
                />
                <span className="text-sm">{range}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
            <span className="font-normal">Notre</span> <span className="font-bold">Collection</span>
          </h1>
          <p className="text-black/70 max-w-2xl mx-auto">
            Explorez notre sélection exclusive de parfums et soins de luxe, soigneusement choisis pour révéler votre
            beauté naturelle.
          </p>
        </div>

        <div className="lg:hidden mb-6">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 border border-black px-4 py-2"
          >
            <SlidersHorizontal size={18} />
            <span className="text-sm uppercase tracking-widest">Filtres</span>
          </button>
        </div>

        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-xl">Filtres</span>
                <button onClick={() => setMobileFilterOpen(false)}><X size={24} /></button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        <div className="flex gap-12">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-black/70">{sortedProducts.length} produits</p>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-black/20 px-4 py-2 text-sm bg-transparent"
              >
                <option value="price-asc">Prix: Croissant</option>
                <option value="price-desc">Prix: Décroissant</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product)} className="cursor-pointer">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  )
}
