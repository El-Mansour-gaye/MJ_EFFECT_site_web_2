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
            src="/image-banniere.jpg"
            alt="Notre Histoire"
            width={800}
            height={400}
            className="shadow-2xl mx-auto"
          />
        </div>
        <h1 className="text-5xl font-serif font-bold text-center mb-12">Notre Mission</h1>
      <div className="max-w-4xl mx-auto text-xl text-gray-700 leading-relaxed">
        <p className="mb-6">
          Bienvenue chez MG Effect, votre destination beauté de confiance au Sénégal. Née d'une passion pour l'excellence, notre mission est de vous offrir une sélection de produits cosmétiques de premier choix, directement importés des États-Unis.
        </p>
        <p className="mb-6">
          Nous croyons que la qualité ne doit jamais être compromise. C'est pourquoi chaque produit que nous proposons est soigneusement sélectionné et rigoureusement testé par nos équipes avant d'être mis à votre disposition. Nous nous assurons ainsi de leur efficacité et de leur sécurité pour vous garantir une expérience inégalée.
        </p>
        <p className="mb-6">
          Chez MG Effect, nous allons au-delà de la simple vente. Nous tissons une relation étroite et privilégiée avec notre clientèle. Notre équipe d'experts est à votre écoute pour vous offrir des conseils personnalisés et vous aider à construire la gamme cosmétique qui correspond parfaitement à vos besoins et à votre type de peau.
        </p>
        <p>
          Rejoignez la communauté MG Effect et découvrez une nouvelle approche de la beauté, où qualité, confiance et service personnalisé sont au cœur de nos préoccupations.
        </p>
      </div>
      </div>
    </div>
  );
}
