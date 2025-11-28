"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const collections = [
  {
    title: "Sensuel & Nuit",
    description: "Pour une élégance sombre et mystérieuse.",
    route: "/collection/sensuel",
    imageUrl: "/sensuel-nuit.jpg", // Placeholder - besoin d'images réelles
  },
  {
    title: "Gourmand & Sucré",
    description: "Douceur réconfortante et notes délicieuses.",
    route: "/collection/gourmand",
    imageUrl: "/gourmand-sucre.jpg", // Placeholder - besoin d'images réelles
  },
  {
    title: "Frais & Floral",
    description: "Légèreté et pureté, idéal pour le jour.",
    route: "/collection/frais",
    imageUrl: "/frais-floral.jpg", // Placeholder - besoin d'images réelles
  },
  {
    title: "Chic & Sophistiqué",
    description: "L'éclat d'un parfum signature.",
    route: "/collection/chic",
    imageUrl: "/chic-sophistique.jpg", // Placeholder - besoin d'images réelles
  },
  {
    title: "Soins Essentiels",
    description: "Crèmes, Gommages et Textures Fondantes.",
    route: "/collection/soins",
    imageUrl: "/soins-essentiels.jpg", // Placeholder - besoin d'images réelles
  },
]

export function OlfactiveCollections() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          <span className="font-normal">Découvrez nos</span>{" "}
          <span className="font-bold">Collections de Senteurs MJ Effect</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Link
              href={collection.route}
              key={collection.route}
              className="group block relative aspect-[4/5] overflow-hidden"
            >
              <Card className="h-full w-full border-0 rounded-none overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${collection.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white/80">{collection.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
