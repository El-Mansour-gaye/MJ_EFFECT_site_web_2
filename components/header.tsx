"use client"

import { useState, Suspense, useEffect, useRef } from "react"
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
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0;

      if (currentScrollY > headerHeight) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // Near the top of the page, always show header
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const navLinkClasses = (path: string, hasMegaMenu?: boolean) => {
    const baseClasses = "font-sans text-sm uppercase tracking-widest transition-colors relative pt-1 after:absolute after:block after:w-full after:h-[1px] after:bg-accent after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-100 after:origin-left";

    if (hasMegaMenu) {
      const category = searchParams.get("category");
      const linkCategory = new URLSearchParams(path.split("?")[1]).get("category");
      return `${baseClasses} ${category === linkCategory ? "text-white" : "text-white/70 hover:text-white"}`;
    }

    return `${baseClasses} ${pathname === path ? "text-white" : "text-white/70 hover:text-white"}`;
  };

  return (
    <header ref={headerRef} className={`fixed top-8 left-0 right-0 z-50 bg-black border-b border-white/10 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="block">
            <div className="flex items-center justify-center">
              <img src="/logo-mj-effect.png" alt="MJ EFFECT Logo" className="h-20 lg:h-28 w-auto" />
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
                <Link href={link.href} className={`flex items-center gap-1 whitespace-nowrap ${navLinkClasses(link.href, !!link.megaMenu)}`}>
                  {link.label} {link.megaMenu && <ChevronDown size={14} />}
                </Link>

                {link.megaMenu && openMegaMenu === index && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-4xl bg-white border border-black/10 shadow-xl mt-0 p-8 data-[state=open]:animate-in data-[state=open]:zoom-in-95 duration-300">
                    <div className="grid grid-cols-4 gap-8">
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
                      <div className="col-span-1 space-y-4">
                        {link.megaMenu.images?.map((image) => (
                          <div key={image.alt} className="group relative">
                            <img src={image.src} alt={image.alt} className="w-full h-auto object-cover rounded-md" />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                              <h4 className="text-white font-serif text-lg">{image.alt}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-white">
            <button className="p-2 hover:text-white/70 transition-colors">
              <Search size={24} />
            </button>
            <Link href="/panier" className="p-2 hover:text-white/70 transition-colors relative">
              <ShoppingBag size={24} />
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
