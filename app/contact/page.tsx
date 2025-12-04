import { Metadata } from "next";

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
  return (
    <div className="min-h-screen flex items-center justify-center py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-serif font-bold text-center mb-16">Nous Contacter</h1>
        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="bg-gray-50 p-8">
            <h2 className="text-3xl font-semibold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-800">Nom</label>
                <input type="text" id="name" name="name" className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-800">Email</label>
                <input type="email" id="email" name="email" className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500" />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-800">Message</label>
                <textarea id="message" name="message" rows={5} className="mt-2 block w-full px-4 py-3 bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 px-6 hover:bg-gray-800 transition-colors duration-300 text-lg">
                Envoyer
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-6">Nos Coordonnées</h2>
            <div className="space-y-5 text-gray-700 text-lg">
              <p>
                <strong>Adresse :</strong> 123 Rue du Parfum, 75001 Paris, France
              </p>
              <p>
                <strong>Email :</strong> contact@votremarque.com
              </p>
              <p>
                <strong>Téléphone :</strong> +33 1 23 45 67 89
              </p>
              <p>
                <strong>Horaires :</strong> Lundi - Vendredi, 9h00 - 18h00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
