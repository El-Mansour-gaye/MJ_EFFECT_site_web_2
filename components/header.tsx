"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"
import { NAVIGATION_LINKS } from "@/lib/navigation"
import { useCartStore } from "@/lib/store/cart"

function HeaderContent() {
  const cart = useCartStore((state) => state.cart_content);
  const cartItemCount = cart.reduce((total, item) => total + item.quantite, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<number | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const navLinkClasses = (path: string, hasMegaMenu?: boolean) => {
    const baseClasses = "font-sans text-sm uppercase tracking-widest transition-colors relative pt-1 after:absolute after:block after:w-full after:h-[1px] after:bg-luxury-accent after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 after:origin-left";

    if (hasMegaMenu) {
      const category = searchParams.get("category");
      const linkCategory = new URLSearchParams(path.split("?")[1]).get("category");
      return `${baseClasses} ${category === linkCategory ? "text-accent" : "hover:text-accent"}`;
    }

    return `${baseClasses} ${pathname === path ? "text-accent" : "hover:text-accent"}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="block">
            <div className="bg-black rounded-full p-1 flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20">
              <img src="/logo-mj-effect.png" alt="MJ EFFECT Logo" className="h-14 lg:h-16 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAVIGATION_LINKS.map((link, index) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.megaMenu && setOpenMegaMenu(index)}
                onMouseLeave={() => link.megaMenu && setOpenMegaMenu(null)}
              >
                <Link href={link.href} className={`flex items-center gap-1 ${navLinkClasses(link.href, !!link.megaMenu)}`}>
                  {link.label} {link.megaMenu && <ChevronDown size={14} />}
                </Link>

                {link.megaMenu && openMegaMenu === index && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-4xl bg-white border border-black/10 shadow-xl mt-0 p-8 data-[state=open]:animate-in data-[state=open]:zoom-in-95 duration-300">
                    <div className="grid grid-cols-3 gap-8">
                      {link.megaMenu.subCategories.map((subCategory) => (
                        <div key={subCategory.title}>
                          <h3 className="font-serif text-lg mb-4">{subCategory.title}</h3>
                          <ul className="space-y-2 text-sm text-black/70">
                            {subCategory.items.map((item) => (
                              <li key={item.name}>
                                <Link href={item.href} className="hover:text-accent">
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className="bg-black/5 p-4">
                        <p className="text-xs uppercase tracking-widest text-accent mb-2">Produit Vedette</p>
                        <img
                          src={link.megaMenu.featuredProduct.image}
                          alt={link.megaMenu.featuredProduct.name}
                          className="w-full h-32 object-cover mb-2"
                        />
                        <p className="font-serif">{link.megaMenu.featuredProduct.name}</p>
                        <p className="text-sm text-black/70">{link.megaMenu.featuredProduct.price.toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-accent transition-colors">
              <Search size={20} />
            </button>
            <Link href="/panier" className="p-2 hover:text-accent transition-colors relative">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-black/10 py-4">
          <nav className="container mx-auto px-4 flex flex-col gap-4">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-left text-sm uppercase tracking-widest py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}


export function Header() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderContent />
    </Suspense>
  )
}
