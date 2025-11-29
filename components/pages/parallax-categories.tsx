"use client"

import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Parfums & Brumes",
    href: "/collection?category=Parfums",
    imageUrl: "/mohogany taekwood intense.PNG",
  },
  {
    name: "Soins Corporels",
    href: "/collection?category=Soins Corporels",
    imageUrl: "/into the night - glowtion Body Butter.PNG",
  },
  {
    name: "Gommages & Gels Douche",
    href: "/collection?category=Gommages et Gels Douche",
    imageUrl: "/cactus blossom.PNG",
  },
  {
    name: "Coffrets & Ensembles",
    href: "/collection?category=Coffrets",
    imageUrl: "/set-6-warm-vanilla-sugar-3.PNG",
  },
  {
    name: "Best Sellers",
    href: "/collection",
    imageUrl: "/champagne toast body butter.PNG",
  },
]

export function ParallaxCategories() {
  return (
    <section
      className="relative w-full h-[50vh] overflow-hidden grid place-items-center"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/image-section-parallaxe.png')",
        }}
      />
      <div className="absolute inset-0 z-1 bg-black/50" />
      <div className="z-10 text-center text-white">
        <h2 className="font-serif text-4xl md:text-5xl mb-12">
          <span className="font-light">Explorez l'Univers</span> <span className="font-bold">MJ Effect</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {categories.map((category) => (
            <Link href={category.href} key={category.name} className="group text-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30 mx-auto">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-center p-4">
                  <p className="font-sans text-lg text-white">{category.name}</p>
                </div>
              </div>
              <p className="mt-4 font-sans text-lg transition-opacity duration-300 group-hover:opacity-0">{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
