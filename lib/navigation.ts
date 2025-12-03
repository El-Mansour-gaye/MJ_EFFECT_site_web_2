import { Product } from "./types"

export interface MegaMenuCategory {
  title: string
  href: string
  subCategories: {
    title: string
    items: { name: string; href: string }[]
  }[]
  images?: { src: string; alt: string }[]
}

export interface MegaMenu {
  categories: MegaMenuCategory[]
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
      categories: [
        {
          title: "Parfums",
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
          images: [{ src: "/perfume-long-lasting-dakar.png", alt: "Parfums" }],
        },
        {
          title: "Soins Corporels",
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
          images: [{ src: "/glowing-skin-scrub-senegal.jfif", alt: "Soins Corporels" }],
        },
        {
          title: "Gommages & Gels Douche",
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
          images: [{ src: "/body-butter-vs-lotion-senegal.png", alt: "Gommages & Gels Douche" }],
        },
        {
          title: "Coffrets",
          href: "/collection?category=Coffrets",
          subCategories: [
            {
              title: "Nos Ensembles",
              items: [{ name: "Tous les coffrets", href: "/collection?category=Coffrets" }],
            },
          ],
          images: [
            { src: "/gift-sets-korite-tabaski-dakar.png", alt: "Coffrets" },
            { src: "/image-illustrative-coffret-ou-set.png", alt: "Coffrets" },
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
