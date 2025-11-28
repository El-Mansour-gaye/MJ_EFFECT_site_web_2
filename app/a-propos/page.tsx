import { Metadata } from "next";
import { Gem, Handshake, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Notre Histoire</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Née d'une passion pour les fragrances exquises, notre marque est une ode à l'art de la parfumerie. Nous croyons que le parfum est plus qu'une odeur : c'est une expression de soi, un souvenir, une œuvre d'art invisible.
        </p>
      </div>

      {/* Our Values Section */}
      <div className="bg-muted">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Gem size={32} />
                </div>
                <CardTitle className="text-2xl">Qualité & Artisanat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chaque bouteille est le fruit d'un travail artisanal méticuleux. Nous sélectionnons des ingrédients rares et précieux pour créer des parfums uniques qui racontent une histoire.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Leaf size={32} />
                </div>
                <CardTitle className="text-2xl">Durabilité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous nous engageons à utiliser des ingrédients durables et éthiques, en respectant à la fois la planète et les artisans qui les cultivent avec passion.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                  <Handshake size={32} />
                </div>
                <CardTitle className="text-2xl">Confiance & Transparence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous bâtissons une relation de confiance avec nos clients en étant transparents sur nos processus et en garantissant l'authenticité de chaque produit.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl font-bold mb-4">Rejoignez Notre Voyage Olfactif</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
          Découvrez votre signature personnelle parmi nos créations et laissez nos parfums raconter votre histoire.
        </p>
        {/* You can add a Button here linking to the collection page if you want */}
        {/* Example:
        <Button asChild size="lg">
          <Link href="/collection">Découvrir la Collection</Link>
        </Button>
        */}
      </div>
    </div>
  );
}
