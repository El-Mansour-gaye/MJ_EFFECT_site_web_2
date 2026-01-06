import { Metadata } from "next";
import { BLOG_ARTICLES } from "@/lib/data";
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { BlogArticle } from "@/lib/data"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = BLOG_ARTICLES.find((a) => a.id === parseInt(id));
  if (!article) {
    return {
      title: "Article non trouvé",
      description: "Cet article n'existe pas.",
    };
  }

  const titles: { [key: number]: string } = {
    1: "5 Astuces pour Faire Tenir votre Parfum Toute la Journée à Dakar",
    2: "Body Butter vs Lait de Corps : Choisir son Soin pour la Peau Sénégalaise",
    3: "Gommage (Moroccan Rose) : Le Secret d'une Peau Éclatante à Dakar",
    4: "Avis Complet du Parfum Into The Night (15 000 FCFA)",
    5: "Où Acheter des Parfums Authentiques et Abordables à Dakar ?",
    6: "Coffrets Parfums MJ Effect : Idées Cadeaux Korité & Tabaski",
  };

  const descriptions: { [key: number]: string } = {
    1: "Découvrez nos secrets pour fixer votre parfum, brume ou eau de toilette malgré la chaleur sénégalaise. L'astuce du Body Butter fonctionne !",
    2: "Guide comparatif MJ Effect : Beurre corporel riche ou lait léger ? Quel soin hydratant convient le mieux à votre peau à Dakar.",
    3: "Intégrez un gommage MJ Effect à votre routine pour éliminer les cellules mortes. Essayez Tropic Glow ou Moroccan Rose (18 000 FCFA).",
    4: "Notre review du Best-Seller Into The Night : un parfum sensuel, chic et parfait pour les soirées à Dakar. Prix et layering.",
    5: "Notre guide pour trouver des produits de marque fiables au Sénégal. Découvrez les prix de nos brumes MJ Effect en FCFA.",
    6: "Offrez un set de luxe pour les fêtes religieuses (dès 32 000 FCFA). Sélection de coffrets élégants : You're The One, Into The Night.",
  };

  const title = titles[article.id] || "Article";
  const description = descriptions[article.id] || "Article";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

const RECENT_ARTICLES = [
  { id: 2, title: "Tendances parfums hiver 2025", date: "22 Nov 2025" },
  { id: 3, title: "Guide ultime des soins corps", date: "18 Nov 2025" },
  { id: 4, title: "Parfums homme: comment choisir", date: "15 Nov 2025" },
]

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articleId = id;
  const article = BLOG_ARTICLES.find((a) => a.id === parseInt(articleId!))

  if (!article) {
    return <div>Article not found</div>
  }

  return (
    <article className="py-8 lg:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-black/50 mb-8">
          <Link href="/" className="hover:text-[#C9A050]">
            Accueil
          </Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-[#C9A050]">
            Blog
          </Link>
          <ChevronRight size={14} />
          <span className="text-black">{article.category}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Info */}
            <div className="flex items-center gap-4 text-sm text-black/70 mb-4">
              <span className="text-[#C9A050] uppercase tracking-widest">{article.category}</span>
              <span>|</span>
              <span>{article.readTime} de lecture</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-8 text-balance">
              <span className="font-normal">{article.title.substring(0, article.title.lastIndexOf(" "))}</span>{" "}
              <span className="font-bold">{article.title.substring(article.title.lastIndexOf(" ") + 1)}</span>
            </h1>

            {/* Featured Image */}
            <img
              src={article.image}
              alt={article.title}
              className="w-full mb-8"
            />

            {/* Content */}
            <div
              className="max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Share */}
            <div className="border-t border-black/10 mt-12 pt-8">
              <p className="text-sm uppercase tracking-widest text-black/50 mb-4">Partager cet article</p>
              <div className="flex gap-4">
                <button className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors">
                  Facebook
                </button>
                <button className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors">
                  Twitter
                </button>
                <button className="border border-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors">
                  Pinterest
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="font-serif text-xl mb-6">Articles Récents</h3>
              <div className="space-y-6">
                {RECENT_ARTICLES.map((article) => (
                  <Link href={`/blog/${article.id}`} key={article.id} className="block text-left group">
                    <p className="font-serif group-hover:text-[#C9A050] transition-colors">{article.title}</p>
                    <p className="text-sm text-black/50">{article.date}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-12 p-6 bg-black/5">
                <p className="text-[#C9A050] text-sm uppercase tracking-widest mb-2">Newsletter</p>
                <h4 className="font-serif text-lg mb-4">Recevez nos conseils beauté</h4>
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full border border-black/20 px-4 py-3 text-sm mb-3 focus:outline-none focus:border-[#C9A050]"
                />
                <button className="w-full bg-black text-white py-3 text-sm uppercase tracking-widest hover:bg-black/80 transition-colors">
                  S'inscrire
                </button>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </article>
  )
}
