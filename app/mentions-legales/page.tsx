import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales - MJ Effect",
  description: "Informations légales et identification de la société MJ Effect.",
  openGraph: {
    title: "Mentions Légales - MJ Effect",
    description: "Informations légales et identification de la société MJ Effect.",
    type: "website",
  },
};

export default function LegalNoticePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">Mentions Légales</h1>
      <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
        <p className="mb-6">
          Nom de l'entreprise : Votre Marque SAS<br/>
          Adresse : 123 Rue du Parfum, 75001 Paris, France<br/>
          Capital social : 10,000 €<br/>
          RCS : Paris 123 456 789<br/>
          Numéro de TVA intracommunautaire : FR12345678901<br/>
          Directeur de la publication : [Nom du directeur]
        </p>

        <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
        <p className="mb-6">
          Ce site est hébergé par Vercel Inc.<br/>
          Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br/>
          Site web : www.vercel.com
        </p>

        <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
        <p>
          L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
        </p>
      </div>
    </div>
  );
}
