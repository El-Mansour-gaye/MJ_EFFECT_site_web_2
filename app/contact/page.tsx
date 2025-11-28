import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contactez MJ Effect : Support Client à Dakar",
  description: "Besoin d'aide ? Contactez l'équipe MJ Effect par téléphone ou email pour toute question sur nos produits et votre commande.",
  openGraph: {
    title: "Contactez MJ Effect : Support Client à Dakar",
    description: "Besoin d'aide ? Contactez l'équipe MJ Effect par téléphone ou email pour toute question sur nos produits et votre commande.",
    type: "website",
  },
};

export default function ContactPage() {
  const contactDetails = {
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "123 Rue du Parfum, 75001 Paris, France",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@votremarque.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+33 1 23 45 67 89",
    hours: process.env.NEXT_PUBLIC_CONTACT_HOURS || "Lundi - Vendredi, 9h00 - 18h00",
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-serif">Nous Contacter</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4">
          Une question ? Une suggestion ? N'hésitez pas à nous écrire. Notre équipe est là pour vous répondre.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">

        {/* Contact Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
            <CardDescription>Nous vous répondrons dans les plus brefs délais.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" placeholder="Votre nom complet" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="votre@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tapez votre message ici..." className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Envoyer le Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold mb-4">Nos Coordonnées</h2>
            <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3 flex-shrink-0">
                    <MapPin size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Notre Boutique</h3>
                    <p className="text-muted-foreground">{contactDetails.address}</p>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3 flex-shrink-0">
                    <Mail size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-muted-foreground">{contactDetails.email}</p>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3 flex-shrink-0">
                    <Phone size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Téléphone</h3>
                    <p className="text-muted-foreground">{contactDetails.phone}</p>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3 flex-shrink-0">
                    <Clock size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Horaires d'ouverture</h3>
                    <p className="text-muted-foreground">{contactDetails.hours}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
