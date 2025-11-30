import Image from 'next/image';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos de MJ Effect",
  description: "Notre histoire : l'engagement de MJ Effect à vous offrir des produits de beauté authentiques et de luxe. Découvrez nos valeurs et notre mission au Sénégal.",
  openGraph: {
    title: "À Propos de MJ Effect",
    description: "Notre histoire : l'engagement de MJ Effect à vous offrir des produits de beauté authentiques et de luxe. Découvrez nos valeurs et notre mission au Sénégal.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 lg:pt-32 flex flex-col">
      <div className="container mx-auto px-4 py-16 text-center max-w-6xl">
        <div className="mb-12">
          <Image
            src="/elegant-woman-perfume-floral-luxury.jpg"
            alt="Notre Histoire"
            width={800}
            height={400}
            className="shadow-2xl mx-auto"
          />
        </div>
        <h1 className="text-5xl font-serif font-bold text-center mb-12">Notre Histoire</h1>
      <div className="max-w-4xl mx-auto text-xl text-gray-700 leading-relaxed">
        <p className="mb-6">
          Bienvenue chez nous. Notre marque est née d'une passion pour les fragrances exquises et l'art de la parfumerie. Nous croyons que le parfum est plus qu'une simple odeur ; c'est une expression de soi, un souvenir, une œuvre d'art invisible.
        </p>
        <p className="mb-6">
          Notre voyage a commencé il y a une décennie, dans un petit atelier où nous avons méticuleusement mélangé des ingrédients rares et précieux pour créer des parfums uniques qui racontent une histoire. Chaque bouteille est le fruit d'un travail artisanal et d'un dévouement à la qualité.
        </p>
        <p>
          Nous nous engageons à utiliser des ingrédients durables et éthiques, en respectant à la fois la planète et les artisans qui les cultivent. Rejoignez-nous dans ce voyage olfactif et découvrez votre signature personnelle.
        </p>
      </div>
      </div>
    </div>
  );
}
