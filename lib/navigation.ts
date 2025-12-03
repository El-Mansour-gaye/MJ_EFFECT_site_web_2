import { Product } from "./types"

export interface MegaMenu {
  subCategories: {
    title: string
    items: { name: string; href: string }[]
  }[]
  images?: string[]
  featuredProduct?: Product // Make featuredProduct optional
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
      images: ["/perfume-long-lasting-dakar.png"],
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
      images: ["/glowing-skin-scrub-senegal.jfif"],
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
      images: ["/body-butter-vs-lotion-senegal.png"],
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
      images: [
        "/gift-sets-korite-tabaski-dakar.png",
        "/image-illustrative-coffret-ou-set.png",
      ],
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
