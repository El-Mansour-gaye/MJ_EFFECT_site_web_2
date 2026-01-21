"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown, SlidersHorizontal, X, Heart } from "lucide-react"
import { Product } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { AnimatedSection } from "@/components/animated-section"
import { useFavoritesStore } from "@/lib/store/favorites"

const PRICE_RANGES = ["0 - 15,000 FCFA", "15,000 - 25,000 FCFA", "25,000+ FCFA"]

export default function CollectionPageContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const initialSubCategory = searchParams.get("subCategory")
  const searchTerm = searchParams.get("search")

  const { favoriteIds } = useFavoritesStore()
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [openAccordion, setOpenAccordion] = useState<string | null>("category")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [olfactiveFamilies, setOlfactiveFamilies] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [sortOrder, setSortOrder] = useState("price-asc")

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const url = searchTerm ? `/api/products?search=${encodeURIComponent(searchTerm)}` : '/api/products'
        const response = await fetch(url)
        if (!response.ok) throw new Error('Failed to fetch products')
        const data: Product[] = await response.json()
        setProducts(data)

        // Populate filters from all products if not already done
        if (allProducts.length === 0) {
            const allResponse = await fetch('/api/products')
            const allData = await allResponse.json()
            setAllProducts(allData)
            setCategories([...new Set(allData.map((p: Product) => p.category).filter(Boolean))])
            setOlfactiveFamilies([...new Set(allData.map((p: Product) => p.famille_olfactive || p.subcategory).filter(Boolean))])
        }

      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [searchTerm])

  useEffect(() => {
    const categories = initialCategory ? [decodeURIComponent(initialCategory)] : []
    const subCategories = initialSubCategory ? [decodeURIComponent(initialSubCategory)] : []
    setSelectedCategories(categories)
    setSelectedSubCategories(subCategories)
  }, [initialCategory, initialSubCategory, products]) // Depend on products to ensure filters are ready

  const handleProductClick = (product: Product) => setSelectedProduct(product)
  const handleCloseModal = () => setSelectedProduct(null)

  const toggleFilter = (value: string, selected: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  const filteredProducts = products.filter((product) => {
    const favoritesMatch = !showOnlyFavorites || favoriteIds.includes(product.id)
    const categoryMatch = selectedCategories.length === 0 || (product.category && selectedCategories.includes(product.category))
    const subCategoryMatch = selectedSubCategories.length === 0 ||
      (product.famille_olfactive && selectedSubCategories.includes(product.famille_olfactive)) ||
      (product.subcategory && selectedSubCategories.includes(product.subcategory))
    const priceMatch =
      selectedPrices.length === 0 ||
      selectedPrices.some((range) => {
        const price = Number(product.prix_fcfa);
        if (range === "0 - 15,000 FCFA") return price <= 15000
        if (range === "15,000 - 25,000 FCFA") return price > 15000 && price <= 25000
        if (range === "25,000+ FCFA") return price > 25000
        return false
      })
    return favoritesMatch && categoryMatch && subCategoryMatch && priceMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = Number(a.prix_fcfa);
    const priceB = Number(b.prix_fcfa);
    switch (sortOrder) {
      case "price-asc":
        return priceA - priceB
      case "price-desc":
        return priceB - priceA
      default:
        return 0
    }
  })

  const FilterSidebar = () => (
    <div className="space-y-6">
       {/* Favorites Filter */}
      <div className="border-b border-black/10 pb-6">
        <label className="flex items-center gap-3 cursor-pointer">
            <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className="w-4 h-4 accent-[#C9A050]"
            />
            <span className="flex items-center gap-2">
                <Heart size={16} className={`${showOnlyFavorites ? 'text-red-500' : ''}`} />
                Mes favoris
            </span>
        </label>
      </div>

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
            {categories.map((cat) => (
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
            {olfactiveFamilies.map((family) => (
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
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection delay={0}>
          <div className="text-center mb-12">
            {searchTerm ? (
                <>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                    Résultats pour : "{searchTerm}"
                </h1>
                <p className="text-black/70 max-w-2xl mx-auto">
                    {sortedProducts.length} {sortedProducts.length > 1 ? 'produits trouvés' : 'produit trouvé'}
                </p>
                </>
            ) : (
                <>
                 <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                    <span className="font-normal">Notre</span> <span className="font-bold">Collection</span>
                    </h1>
                    <p className="text-black/70 max-w-2xl mx-auto">
                    Explorez notre sélection exclusive de parfums et soins de luxe, soigneusement choisis pour révéler votre
                    beauté naturelle.
                    </p>
                </>
            )}

          </div>
        </AnimatedSection>

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
          <AnimatedSection delay={0.2} className="hidden lg:block w-64 flex-shrink-0">
            <aside>
              <FilterSidebar />
            </aside>
          </AnimatedSection>

          <div className="flex-1">
            <AnimatedSection delay={0.3}>
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
            </AnimatedSection>
            {isLoading && <p>Chargement des produits...</p>}
            {error && <p className="text-red-500">Erreur: {error}</p>}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product, index) => (
                  <AnimatedSection key={product.id} delay={0.2 + index * 0.05}>
                    <div onClick={() => handleProductClick(product)} className="cursor-pointer h-full">
                      <ProductCard product={product} />
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
    </div>
  )
}
