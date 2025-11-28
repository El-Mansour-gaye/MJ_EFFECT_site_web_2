import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - MJ Effect",
  description: "Politique de confidentialité de MJ Effect concernant le traitement de vos données personnelles et l'utilisation du site web.",
  openGraph: {
    title: "Politique de Confidentialité - MJ Effect",
    description: "Politique de confidentialité de MJ Effect concernant le traitement de vos données personnelles et l'utilisation du site web.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-8">Politique de Confidentialité</h1>
      <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed">
        <p className="mb-6">
          Votre vie privée est importante pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations personnelles lorsque vous visitez notre site web.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Collecte des informations</h2>
        <p className="mb-6">
          Nous collectons des informations lorsque vous vous inscrivez à notre newsletter, passez une commande, remplissez un formulaire ou naviguez sur le site. Les informations collectées incluent votre nom, votre adresse e-mail, votre adresse postale, etc.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Utilisation des informations</h2>
        <p className="mb-6">
          Toutes les informations que nous recueillons auprès de vous peuvent être utilisées pour :
          <ul className="list-disc list-inside mt-2">
            <li>Personnaliser votre expérience et répondre à vos besoins individuels</li>
            <li>Fournir un contenu publicitaire personnalisé</li>
            <li>Améliorer notre site web</li>
            <li>Améliorer le service client et vos besoins de prise en charge</li>
            <li>Vous contacter par e-mail</li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold mb-4">Vos droits</h2>
        <p>
          Conformément à la loi "Informatique et Libertés" et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, veuillez nous contacter à l'adresse email [contact@votremarque.com].
        </p>
      </div>
    </div>
  );
}
