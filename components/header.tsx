"use client"

import { useState, Suspense, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"
import { NAVIGATION_LINKS, DynamicMegaMenuItem } from "@/lib/navigation"
import { useCartStore } from "@/lib/store/cart"
import { encodeImagePath } from "@/lib/utils"

function HeaderContent() {
  const cart = useCartStore((state) => state.cart_content)
  const setCartIconRef = useCartStore((state) => state.setCartIconRef)
  const cartItemCount = cart.reduce((total, item) => total + item.quantite, 0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<number | null>(null)
  const [activeMegaMenuItem, setActiveMegaMenuItem] = useState<DynamicMegaMenuItem | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLElement>(null)
  const cartIconRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setCartIconRef(cartIconRef)
  }, [setCartIconRef])

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      const headerHeight = headerRef.current ? headerRef.current.clientHeight : 0

      if (currentScrollY > headerHeight) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar)
    }
  }, [])

  const handleMegaMenuOpen = (index: number) => {
    const link = NAVIGATION_LINKS[index]
    if (link.megaMenu?.dynamicContent) {
      setOpenMegaMenu(index)
      setActiveMegaMenuItem(link.megaMenu.dynamicContent[0])
    } else if (link.megaMenu) {
      setOpenMegaMenu(index)
      setActiveMegaMenuItem(null)
    }
  }

  const navLinkClasses = (path: string, hasMegaMenu?: boolean) => {
    const baseClasses = "font-sans text-sm uppercase tracking-widest transition-colors hover:text-accent"

    if (hasMegaMenu) {
      const category = searchParams.get("category")
      const linkCategory = new URLSearchParams(path.split("?")[1]).get("category")
      return `${baseClasses} ${category === linkCategory ? "text-white" : "text-white/70"}`
    }

    return `${baseClasses} ${pathname === path ? "text-white" : "text-white/70"}`
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-8 left-0 right-0 z-50 bg-black border-b border-white/10 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="block flex-shrink-0">
            <div className="flex items-center justify-center">
              <Image src="/logo-mj-effect.png" alt="MJ EFFECT Logo" width={112} height={112} className="h-20 lg:h-28 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAVIGATION_LINKS.map((link, index) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleMegaMenuOpen(index)}
                onMouseLeave={() => setOpenMegaMenu(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 whitespace-nowrap ${navLinkClasses(link.href, !!link.megaMenu)}`}
                >
                  {link.label} {link.megaMenu && <ChevronDown size={14} />}
                </Link>

                {link.megaMenu && openMegaMenu === index && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-6xl bg-white text-black border border-black/10 shadow-xl mt-0 p-8 data-[state=open]:animate-in data-[state=open]:zoom-in-95 duration-300">
                    {link.megaMenu.dynamicContent ? (
                      <div className="grid grid-cols-4 gap-x-8">
                        <div className="col-span-1 border-r border-gray-200 pr-6 space-y-2">
                          {link.megaMenu.dynamicContent.map((item) => (
                            <div
                              key={item.label}
                              onMouseEnter={() => setActiveMegaMenuItem(item)}
                              className={`p-4 rounded-lg cursor-pointer transition-colors ${activeMegaMenuItem?.label === item.label ? "bg-gray-100" : "hover:bg-gray-50"}`}
                            >
                              <Link href={item.href} className="font-bold text-md text-black">
                                {item.label}
                              </Link>
                            </div>
                          ))}
                        </div>
                        <div className="col-span-3">
                          {activeMegaMenuItem && (
                            <div className="grid grid-cols-3 gap-x-8">
                              <div className="col-span-2 grid grid-cols-2 gap-x-8">
                                {activeMegaMenuItem.subCategories.map((subCategory) => (
                                  <div key={subCategory.title}>
                                    <h3 className="font-serif text-lg mb-4 text-black">{subCategory.title}</h3>
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
                              </div>
                              <div className="col-span-1">
                                <div
                                  className={`grid gap-2 ${
                                    activeMegaMenuItem.images && activeMegaMenuItem.images.length > 1 ? "grid-cols-2" : "grid-cols-1"
                                  }`}
                                >
                                  {activeMegaMenuItem.images?.map((image, index) => (
                                    <Link
                                      href={activeMegaMenuItem.href}
                                      key={image.src}
                                      className={`group relative block ${
                                        activeMegaMenuItem.images && activeMegaMenuItem.images.length === 3 && index === 0
                                          ? "col-span-2"
                                          : ""
                                      }`}
                                    >
                                      <Image
                                        src={encodeImagePath(image.src)}
                                        alt={image.alt}
                                        width={200}
                                        height={200}
                                        className="w-full h-40 object-cover rounded-md"
                                      />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-8">
                        {link.megaMenu.subCategories?.map((subCategory) => (
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
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={400}
                                height={400}
                                className="w-full h-auto object-cover rounded-md"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-white">
            <button className="p-2 hover:text-accent transition-colors">
              <Search size={24} />
            </button>
            <Link ref={cartIconRef} href="/panier" className="p-2 hover:text-white/70 transition-colors relative">    
              <ShoppingBag size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-4 h-4 flex items-center justify-center">
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
                className="text-left text-sm uppercase tracking-widest py-2 text-black transition-colors hover:text-accent"
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
