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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">Nous Contacter</h1>
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Envoyez-nous un message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800">
              Envoyer
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Nos Coordonnées</h2>
          <div className="space-y-4 text-gray-700">
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
  );
}
