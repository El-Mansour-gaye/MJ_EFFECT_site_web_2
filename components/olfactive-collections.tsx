"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { encodeImagePath } from "@/lib/utils"

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
    route: "/collection",
    imageUrl: "/into-the-night.png",
  },
  {
    title: "Warm Vanilla Sugar",
    description: "Douceur réconfortante et notes délicieuses.",
    route: "/collection",
    imageUrl: "/set-6-warm-vanilla-sugar-3.PNG",
  },
  {
    title: "Champagne Toast",
    description: "L'éclat d'un parfum signature.",
    route: "/collection",
    imageUrl: "/champagne-toast-body-butter.png",
  },
  {
    title: "Cactus Blossom",
    description: "Légèreté et pureté, idéal pour le jour.",
    route: "/collection",
    imageUrl: "/cactus blossom.PNG",
  },
  {
    title: "Mahogany Teakwood",
    description: "Bois de cèdre, masculin, luxe.",
    route: "/collection",
    imageUrl: "/mohogany taekwood intense.PNG",
  },
]

const CollectionCard = ({
  collection,
  className,
}: {
  collection: (typeof collections)[0]
  className?: string
}) => (
  <Link
    href={collection.route}
    className={`group block relative overflow-hidden ${className}`}
  >
    <Card className="h-full w-full border-0 rounded-none overflow-hidden transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-2xl">
      <Image
        src={encodeImagePath(collection.imageUrl)}
        alt={collection.title}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <h3 className="font-serif text-[clamp(1.1rem,1rem+0.25vw,1.25rem)] font-bold mb-1">
          {collection.title}
        </h3>
        <p className="text-[clamp(0.75rem,0.7rem+0.25vw,0.875rem)] text-white/80">
          {collection.description}
        </p>
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
        <span className="font-bold">Collections de Senteurs MG Effect</span>
        </h2>
        <div className="w-full overflow-x-auto pb-4">
          <div className="mx-auto flex w-full justify-center gap-4 min-w-[750px]">
            {/* Left Column */}
            <div className="w-1/4 space-y-4 flex flex-col">
              <CollectionCard
                collection={collections[0]}
                className="aspect-square flex-1"
              />
              <CollectionCard
                collection={collections[1]}
                className="aspect-square flex-1"
              />
            </div>
            {/* Center Column */}
            <div className="w-1/2">
              <CollectionCard
                collection={collections[2]}
                className="aspect-square h-full w-full"
              />
            </div>
            {/* Right Column */}
            <div className="w-1/4 space-y-4 flex flex-col">
              <CollectionCard
                collection={collections[3]}
                className="aspect-square flex-1"
              />
              <CollectionCard
                collection={collections[4]}
                className="aspect-square flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
