"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// The order of this array directly corresponds to the visual layout:
// 1st item -> Top-left card
// 2nd item -> Bottom-left card
// 3rd item -> Center card
// 4th item -> Top-right card
// 5th item -> Bottom-right card
const collections = [
  {
    title: "Into The Night",
    description: "Pour une élégance sombre et mystérieuse.",
    route: "/collection/sensuel",
    imageUrl: "/into the night.PNG",
  },
  {
    title: "Warm Vanilla Sugar",
    description: "Douceur réconfortante et notes délicieuses.",
    route: "/collection/gourmand",
    imageUrl: "/Set #6 Warm Vanilla Sugar_1.PNG",
  },
  {
    title: "Champagne Toast",
    description: "L'éclat d'un parfum signature.",
    route: "/collection/chic",
    imageUrl: "/1-champagne toast.PNG",
  },
  {
    title: "Cactus Blossom",
    description: "Légèreté et pureté, idéal pour le jour.",
    route: "/collection/frais",
    imageUrl: "/cactus blossom.PNG",
  },
  {
    title: "Mahogany Teakwood",
    description: "Bois de cèdre, masculin, luxe.",
    route: "/collection/soins",
    imageUrl: "/mohogany taekwood intense.PNG",
  },
]

const CollectionCard = ({ collection, className }: { collection: typeof collections[0], className?: string }) => (
  <Link href={collection.route} className={`group block relative overflow-hidden ${className}`}>
    <Card className="h-full w-full border-0 rounded-none overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${collection.imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">{collection.title}</h3>
        <p className="text-white/80">{collection.description}</p>
      </CardContent>
    </Card>
  </Link>
)

export function OlfactiveCollections() {
  if (collections.length < 5) return null

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-12">
          <span className="font-normal">Découvrez nos</span>{" "}
          <span className="font-bold">Collections de Senteurs MJ Effect</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="col-span-1 space-y-8 flex flex-col">
            <CollectionCard collection={collections[0]} className="aspect-square flex-1" />
            <CollectionCard collection={collections[1]} className="aspect-square flex-1" />
          </div>
          {/* Center Column */}
          <div className="col-span-2">
            <CollectionCard collection={collections[2]} className="aspect-square h-full w-full" />
          </div>
          {/* Right Column */}
          <div className="col-span-1 space-y-8 flex flex-col">
            <CollectionCard collection={collections[3]} className="aspect-square flex-1" />
            <CollectionCard collection={collections[4]} className="aspect-square flex-1" />
          </div>
        </div>
      </div>
    </section>
  )
}
