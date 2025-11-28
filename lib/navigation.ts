import { Product, PRODUCTS } from "./data"

export interface MegaMenu {
  subCategories: {
    title: string
    items: { name: string; href: string }[]
  }[]
  featuredProduct: Product
}

export interface NavLink {
  href: string
  label: string
  megaMenu?: MegaMenu
}

export const NAVIGATION_LINKS: NavLink[] = [
  {
    href: "/",
    label: "Accueil",
  },
  {
    href: "/collection?category=Parfums",
    label: "Parfums",
    megaMenu: {
      subCategories: [
        {
          title: "Par Notes",
          items: [
            { name: "Floral", href: "/collection?category=Parfums&subCategory=Floral" },
            { name: "Boisé", href: "/collection?category=Parfums&subCategory=Boisé" },
            { name: "Frais", href: "/collection?category=Parfums&subCategory=Frais" },
            { name: "Doux", href: "/collection?category=Parfums&subCategory=Doux" },
          ],
        },
        {
          title: "Par Ambiance",
          items: [
            { name: "Pétillant", href: "/collection?category=Parfums&subCategory=Pétillant" },
            { name: "Sensuel", href: "/collection?category=Parfums&subCategory=Sensuel" },
            { name: "Mystérieux", href: "/collection?category=Parfums&subCategory=Mystérieux" },
            { name: "Chic", href: "/collection?category=Parfums&subCategory=Chic" },
            { name: "Lumineux", href: "/collection?category=Parfums&subCategory=Lumineux" },
          ],
        },
      ],
      featuredProduct: PRODUCTS.find((p) => p.id === 2) || PRODUCTS[0],
    },
  },
  {
    href: "/collection?category=Soins%20Corporels",
    label: "Soins Corporels",
    megaMenu: {
      subCategories: [
        {
          title: "Types de Soin",
          items: [
            { name: "Crèmes", href: "/collection?category=Soins%20Corporels&subCategory=Crème" },
            { name: "Laits", href: "/collection?category=Soins%20Corporels&subCategory=Lait" },
            { name: "Gels Douche", href: "/collection?category=Soins%20Corporels&subCategory=Gel%20Douche" },
            { name: "Soins du Visage", href: "/collection?category=Soins%20Corporels&subCategory=Visage" },
          ],
        },
      ],
      featuredProduct: PRODUCTS.find((p) => p.id === 10) || PRODUCTS[0],
    },
  },
  {
    href: "/collection?category=Gommages%20et%20Gels%20Douche",
    label: "Gommages & Gels Douche",
    megaMenu: {
      subCategories: [
        {
          title: "Types de Produit",
          items: [
            { name: "Gommages", href: "/collection?category=Gommages%20et%20Gels%20Douche&subCategory=Gommage" },
            { name: "Ensembles", href: "/collection?category=Gommages%20et%20Gels%20Douche&subCategory=Ensemble" },
          ],
        },
      ],
      featuredProduct: PRODUCTS.find((p) => p.id === 18) || PRODUCTS[0],
    },
  },
  {
    href: "/collection?category=Coffrets",
    label: "Coffrets",
    megaMenu: {
      subCategories: [
        {
          title: "Nos Ensembles",
          items: [{ name: "Tous les coffrets", href: "/collection?category=Coffrets" }],
        },
      ],
      featuredProduct: PRODUCTS.find((p) => p.id === 24) || PRODUCTS[0],
    },
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/a-propos",
    label: "À Propos",
  },
  {
    href: "/contact",
    label: "Contact",
  },
]
