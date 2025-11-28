import { Metadata } from "next";
import { Suspense } from "react";
import CollectionPageContent from "./collection-page-content";

export const metadata: Metadata = {
  title: "Boutique Officielle MJ Effect : Parfums, Sets et Soins",
  description: "Achetez toute la collection MJ Effect en ligne : parfums, laits, gommages et coffrets cadeaux. Authenticité garantie. Paiement en FCFA.",
  openGraph: {
    title: "Boutique Officielle MJ Effect : Parfums, Sets et Soins",
    description: "Achetez toute la collection MJ Effect en ligne : parfums, laits, gommages et coffrets cadeaux. Authenticité garantie. Paiement en FCFA.",
    type: "website",
  },
};

export default function CollectionPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <CollectionPageContent />
    </Suspense>
  )
}
