import { Metadata } from "next";
import BlogIndexPageContent from "./blog-page-content";

export const metadata: Metadata = {
  title: "Blog MJ Effect : Conseils Beauté, Tendances Parfums et Soins",
  description: "Tous nos articles : guides d'achat, astuces pour la peau sénégalaise, reviews de nos meilleurs parfums (Into The Night, Champagne Toast).",
  openGraph: {
    title: "Blog MJ Effect : Conseils Beauté, Tendances Parfums et Soins",
    description: "Tous nos articles : guides d'achat, astuces pour la peau sénégalaise, reviews de nos meilleurs parfums (Into The Night, Champagne Toast).",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return <BlogIndexPageContent />;
}
