import { Product } from "./types"

export interface DynamicMegaMenuItem {
  label: string
  href: string
  description: string
  subCategories: {
    title: string
    items: { name: string; href: string }[]
  }[]
  images?: { src: string; alt: string }[]
}

export interface MegaMenu {
  dynamicContent?: DynamicMegaMenuItem[]
  subCategories?: {
    title: string
    items: { name: string; href: string }[]
  }[]
  images?: { src: string; alt: string }[]
  featuredProduct?: Product
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
    href: "/collection",
    label: "Collections",
    megaMenu: {
      dynamicContent: [
        {
          label: "Parfums",
          href: "/collection?category=Parfums",
          description: "Des fragrances exquises pour exprimer votre personnalité unique.",
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
          images: [{ src: "/perfume-long-lasting-dakar.png", alt: "Parfum longue durée" }],
        },
        {
          label: "Soins Corporels",
          href: "/collection?category=Soins%20Corporels",
          description: "Une gamme complète pour une peau douce, hydratée et radieuse.",
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
          images: [{ src: "/glowing-skin-scrub-senegal.jfif", alt: "Gommage pour une peau éclatante" }],
        },
        {
          label: "Gommages & Gels Douche",
          href: "/collection?category=Gommages%20et%20Gels%20Douche",
          description: "Exfoliez et nettoyez votre peau en douceur pour un éclat renouvelé.",
          subCategories: [
            {
              title: "Types de Produit",
              items: [
                { name: "Gommages", href: "/collection?category=Gommages%20et%20Gels%20Douche&subCategory=Gommage" },
                { name: "Ensembles", href: "/collection?category=Gommages%20et%20Gels%20Douche&subCategory=Ensemble" },
              ],
            },
          ],
          images: [{ src: "/body-butter-vs-lotion-senegal.png", alt: "Beurre corporel vs lotion" }],
        },
        {
          label: "Coffrets",
          href: "/collection?category=Coffrets",
          description: "Les ensembles parfaits pour offrir ou se faire plaisir.",
          subCategories: [
            {
              title: "Nos Ensembles",
              items: [{ name: "Tous les coffrets", href: "/collection?category=Coffrets" }],
            },
          ],
          images: [
            { src: "/gift-sets-korite-tabaski-dakar.png", alt: "Coffrets cadeaux" },
            { src: "/image-illustrative-coffret-ou-set.png", alt: "Image illustrative d'un coffret" },
          ],
        },
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
