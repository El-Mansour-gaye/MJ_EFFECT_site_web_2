import { Product } from "./types"

export interface DynamicMegaMenuItem {
  label: string
  href: string
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
          images: [
            { src: "/perfume-long-lasting-dakar.png", alt: "Parfums 1" },
            { src: "/into-the-night-perfume-review-dakar.png", alt: "Parfums 2" }
          ],
        },
        {
          label: "Soins Corporels",
          href: "/collection?category=Soins%20Corporels",
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
          images: [
            { src: "/platinum - glowtion Body Butter.PNG", alt: "Soins Corporels 1" },
            { src: "/Laite de Corps Dr Teals -12000.PNG", alt: "Soins Corporels 2" }
          ],
        },
        {
          label: "Gommages & Gels Douche",
          href: "/collection?category=Gommages%20et%20Gels%20Douche",
          subCategories: [
            {
              title: "Types de Produit",
              items: [
                { name: "Gommages", href: "/collection?category=Gommages%20et%20Gels%20Douche&subCategory=Gommage" },
                { name: "Ensembles", href: "/collection?category=Gommages%20et%20Gels%20Douche&subCategory=Ensemble" },
              ],
            },
          ],
          images: [
            { src: "/tree-hut-vitamin-c-1.PNG", alt: "Gommages" },
            { src: "/body-wash-dr-teals-11000.png", alt: "Gels Douche" }
          ],
        },
        {
          label: "Coffrets",
          href: "/collection?category=Coffrets",
          subCategories: [
            {
              title: "Nos Ensembles",
              items: [{ name: "Tous les coffrets", href: "/collection?category=Coffrets" }],
            },
          ],
          images: [
            { src: "/set-1-champagne-toast-1.png", alt: "Coffret" },
            { src: "/set-1-champagne-toast-2.PNG", alt: "Coffret" },
            { src: "/set-1-champagne-toast-3.PNG", alt: "Coffret" },
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
