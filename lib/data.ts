export interface Product {
  id: number
  name: string
  price: number
  category: string
  subCategory: string
  image: string
  images: string[]
  tag?: string
  details?: string
}

export interface BlogArticle {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  content: string
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 1,
    title: "Les 5 Astuces Infuillibles pour Faire Tenir votre Parfum Toute la Journée à Dakar (Malgré la Chaleur)",
    excerpt: "La chaleur et l'humidité de Dakar sont magnifiques, mais elles sont les pires ennemies de votre parfum ! Découvrez comment faire tenir votre fragrance préférée.",
    date: "27 Novembre 2025",
    readTime: "5 min",
    category: "Conseils Beauté",
    image: "/blog/perfume-long-lasting-dakar.jpg",
    content: `
      <p><strong>(Mots-clés SEO : parfum longue tenue Dakar, brume corporelle chaleur, fixateur parfum Sénégal)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">La chaleur et l'humidité de Dakar sont magnifiques, mais elles sont les pires ennemies de votre parfum ! Vous adorez votre fragrance, mais elle semble disparaître après seulement quelques heures. Ne vous inquiétez pas, le problème n'est pas votre parfum, c'est votre technique. Chez MJ Effect, nous avons testé les méthodes qui fonctionnent réellement sous les tropiques.</p>

      <h3 class="text-xl font-bold my-4">I. La Préparation de la Peau : Le Secret de l'Hydratation</h3>
      <p class="mb-4">Le parfum ne tient pas sur la peau sèche. Considérez votre peau comme une éponge : elle doit être humide pour absorber et retenir les molécules olfactives.</p>
      <p class="mb-4"><strong>Hydratez Intensivement (C'est Crucial !) :</strong> Appliquez une crème corporelle ou un beurre hydratant juste après la douche et avant de vous parfumer. Si la crème n'a pas d'odeur, c'est l'idéal ! Sinon, utilisez une crème assortie à votre parfum pour superposer les senteurs.</p>
      <p class="italic mb-4">*Produit Recommandé MJ Effect : Notre Glowtion Body Butter (Into The Night ou Platinum) crée une base riche et hydratante sans graisser. Il scelle le parfum sur la peau, prolongeant sa durée de vie.</p>

      <h3 class="text-xl font-bold my-4">II. Les Points Stratégiques : Où Appliquer ?</h3>
      <p class="mb-4">Oubliez la brume aléatoire ! Le parfum s'active avec la chaleur du corps.</p>
      <p class="mb-4"><strong>Les Zones de Pulsation :</strong> Visez les zones où votre sang pulse : l'intérieur des poignets, derrière les oreilles, à la base de la nuque. Ces points dégagent de la chaleur qui diffuse le parfum tout au long de la journée.</p>
      <p class="mb-4"><strong>N'oubliez pas les Cheveux :</strong> Les cheveux retiennent les odeurs plus longtemps que la peau. Vaporisez légèrement votre brume parfumée sur votre brosse avant de vous coiffer.</p>

      <h3 class="text-xl font-bold my-4">III. La Technique du "Layering" (Superposition)</h3>
      <p class="mb-4">Le secret des connaisseurs est de créer une base olfactive complète.</p>
      <p class="mb-4"><strong>Superposez les Produits :</strong> Utilisez d'abord le Gel Douche, puis la Crème ou le Lait de Corps, et enfin la Brume ou l'Eau de Toilette de la même fragrance.</p>
      <p class="italic mb-4">Exemple MJ Effect : Si vous aimez Into The Night, commencez par le gel de douche de la gamme, appliquez le Glowtion Body Butter Into The Night, puis terminez avec la Brume Into The Night (Numéro 3). C'est le combo gagnant pour une tenue longue durée.</p>

      <h3 class="text-xl font-bold my-4">IV. Conseil Bonus : Les Brumes vs. Les Parfums</h3>
      <p class="mb-4">En climat chaud, les Brumes (comme celles de MJ Effect à 15 000 FCFA) peuvent être plus efficaces que les parfums lourds, car elles peuvent être réappliquées plus facilement sans devenir entêtantes. Gardez-en une dans votre sac !</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MJ Effect Mentionnés dans cet Article :</h4>
        <ul>
          <li>Into The Night (Brume/Eau de Toilette) : 15 000 FCFA</li>
          <li>Glowtion Body Butter Into The Night (Soins Corporels)</li>
          <li>SET #2 Into The Night (Coffret) : 32 000 FCFA (pour le layering complet)</li>
          <li>Toutes les Brumes/Eaux de Toilette (Champagne Toast, Dark Kiss, Mahogany Teakwood, etc.)</li>
        </ul>
      </div>
    `,
  },
  {
    id: 2,
    title: "Body Butter vs Lait de Corps : Quel Soin MJ Effect Choisir pour la Peau Sénégalaise ?",
    excerpt: "La peau, exposée au soleil, au vent et aux variations d'humidité, a besoin d'une attention particulière à Dakar. Découvrez quel soin est fait pour vous.",
    date: "26 Novembre 2025",
    readTime: "4 min",
    category: "Soins Corporels",
    image: "/blog/body-butter-vs-lotion-senegal.jpg",
    content: `
      <p><strong>(Mots-clés SEO : Body Butter Dakar, meilleur lait corps peau sèche Sénégal, hydratation intense Afrique)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">La peau, exposée au soleil, au vent et aux variations d'humidité, a besoin d'une attention particulière à Dakar. Vous avez le choix entre le Lait de Corps léger et le Body Butter (beurre corporel) intense. Lequel est fait pour vous ? Tout dépend de votre type de peau et du moment de la journée !</p>

      <h3 class="text-xl font-bold my-4">I. Le Body Butter (Beurre Corporel) : Hydratation de Choc</h3>
      <p class="mb-4">Le Body Butter est la solution la plus riche pour lutter contre la sécheresse.</p>
      <table class="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">Caractéristique</th>
            <th class="border border-gray-300 p-2">MJ Effect Body Butter (Ex: Glowtion Body Butter)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 p-2">Texture</td><td class="border border-gray-300 p-2">Épaisse, riche et crémeuse.</td></tr>
          <tr><td class="border border-gray-300 p-2">But Principal</td><td class="border border-gray-300 p-2">Réparer, nourrir et créer une barrière protectrice contre la déshydratation.</td></tr>
          <tr><td class="border border-gray-300 p-2">Quand l'utiliser</td><td class="border border-gray-300 p-2">Idéal le soir ou pendant la saison la plus sèche. Parfait pour les zones rugueuses (coudes, genoux, pieds).</td></tr>
          <tr><td class="border border-gray-300 p-2">Avantage MJ Effect</td><td class="border border-gray-300 p-2">Notre Glowtion Body Butter (disponible en CHAMPAGNE TOAST ou INTO THE NIGHT) offre une hydratation intense plus un élégant effet "glow".</td></tr>
        </tbody>
      </table>

      <h3 class="text-xl font-bold my-4">II. Le Lait de Corps : La Légèreté Quotidienne</h3>
      <p class="mb-4">Le Lait de Corps est plus aqueux, pénètre rapidement et est parfait pour un usage quotidien.</p>
       <table class="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">Caractéristique</th>
            <th class="border border-gray-300 p-2">MJ Effect Lait de Corps (Ex: Dr Teals, Advanced Colonels)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 p-2">Texture</td><td class="border border-gray-300 p-2">Fluide, légère et non grasse.</td></tr>
          <tr><td class="border border-gray-300 p-2">But Principal</td><td class="border border-gray-300 p-2">Hydratation rapide et quotidienne. Pénétration en moins de 15 secondes.</td></tr>
          <tr><td class="border border-gray-300 p-2">Quand l'utiliser</td><td class="border border-gray-300 p-2">Idéal le matin avant de s'habiller ou après une douche rapide. Parfait pour les peaux moins sèches ou les jours très chauds.</td></tr>
          <tr><td class="border border-gray-300 p-2">Avantage MJ Effect</td><td class="border border-gray-300 p-2">Nos Laits de Corps Dr Teals (11 000 FCFA) ou le Lait à la Vitamine C Advanced Colonels (14 000 FCFA) sont conçus pour une absorption ultra-rapide, un must sous la chaleur sénégalaise.</td></tr>
        </tbody>
      </table>

      <h3 class="text-xl font-bold my-4">III. Notre Verdict pour la Peau Sénégalaise</h3>
      <p class="mb-4"><strong>Peau Très Sèche / Routine Nuit :</strong> Optez pour un Body Butter sans hésiter. L'effet occlusif garantit que votre peau reste souple toute la nuit.</p>
      <p class="mb-4"><strong>Peau Normale / Routine Jour :</strong> Le Lait de Corps est votre allié. Il vous garde hydratée sans sensation collante.</p>
      <p class="italic mb-4">Conseil d'Expert : La Vitamine C est essentielle pour l'éclat de la peau. N'oubliez pas notre Crème de visage à la vitamine C Advanced Colonels (13 000 FCFA) pour uniformiser votre teint.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MJ Effect Mentionnés dans cet Article :</h4>
        <ul>
          <li>Glowtion Body Butter (CHAMPAGNE TOAST / INTO THE NIGHT) : Hydratation riche + Glow.</li>
          <li>Lait de corps Dr Teals : 11 000 FCFA.</li>
          <li>Lait de corps à la vitamine C Advanced Colonels : 14 000 FCFA.</li>
          <li>Crème de visage à la vitamine C Advanced Colonels : 13 000 FCFA.</li>
          <li>Gommages (Moroccan Rose, Tropic Glow) : 18 000 FCFA (à utiliser avant les crèmes pour une meilleure absorption !).</li>
        </ul>
      </div>
    `,
  },
  {
    id: 3,
    title: "Obtenez un Glow Éclatant : Pourquoi Intégrer un Gommage à votre Routine Peau au Sénégal",
    excerpt: "Vivre sous le soleil de Dakar, c'est génial, mais votre peau en paie le prix ! Découvrez le secret d'une peau lumineuse et éclatante : le Gommage Corporel.",
    date: "25 Novembre 2025",
    readTime: "4 min",
    category: "Soins",
    image: "/blog/glowing-skin-scrub-senegal.jpg",
    content: `
      <p><strong>(Mots-clés SEO : gommage corps Sénégal, peau éclatante Dakar, gommage Moroccan Rose prix, routine soin avant hydratation)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">Vivre sous le soleil de Dakar, c'est génial, mais votre peau en paie le prix ! La chaleur, la poussière et l'humidité peuvent rendre la peau terne et même favoriser l'apparition de tâches. Le secret d'une peau lumineuse et éclatante ? Le Gommage Corporel. Chez MJ Effect, on vous explique pourquoi cette étape est non négociable.</p>

      <h3 class="text-xl font-bold my-4">I. Le Rôle Fondamental du Gommage</h3>
      <p class="mb-4">Le gommage est l'étape d'exfoliation qui permet à votre peau de respirer et de se renouveler.</p>
      <p class="mb-4"><strong>Élimination des Cellules Mortes :</strong> Les micro-particules (sucre, sel) présentes dans le gommage frottent doucement la surface de la peau pour déloger les cellules mortes accumulées. C'est l'effet "gomme" qui révèle la nouvelle peau, plus fraîche, en dessous.</p>
      <p class="mb-4"><strong>Prévention des Poils Incarnés :</strong> Pour ceux qui s'épilent ou se rasent, l'exfoliation régulière est essentielle pour libérer les poils et éviter les irritations et les bosses.</p>

      <h3 class="text-xl font-bold my-4">II. Le Gommage, Clé de l'Hydratation</h3>
      <p class="mb-4">L'efficacité de votre Lait de Corps ou de votre Body Butter est directement liée à l'étape du gommage.</p>
      <p class="mb-4"><strong>Absorption Optimale :</strong> Imaginez que vous mettez une crème hydratante sur une couche de poussière. Ça ne sert à rien ! En éliminant la couche de cellules mortes, le gommage permet à vos soins (crèmes, laits, sérums) de pénétrer plus profondément et d'être 100% efficaces.</p>
      <p class="italic mb-4">Produits MJ Effect à Utiliser Après : C'est le moment d'appliquer le Lait de corps Dr Teals ou votre Glowtion Body Butter pour un résultat spectaculaire et un éclat inégalé.</p>

      <h3 class="text-xl font-bold my-4">III. Comment et Quand Utiliser les Gommages MJ Effect ?</h3>
      <p class="mb-4">La règle d'or : 2 à 3 fois par semaine maximum !</p>
      <p class="mb-4"><strong>Nos Gommages-Douche 2-en-1 :</strong> La gamme de Gommages et Gels Douche MJ Effect (18 000 FCFA), comme le Moroccan Rose ou le Tropic Glow, vous offre le luxe de la purification et de l'hydratation en un seul geste sous la douche.</p>
      <p class="mb-4"><strong>Le Tropic Glow :</strong> Parfait pour un coup de boost vitaminé et frais le matin.</p>
      <p class="mb-4"><strong>Le Moroccan Rose :</strong> Idéal pour une touche sensuelle et relaxante en fin de journée.</p>

      <h3 class="text-xl font-bold my-4">IV. Conseil d'Expert : Uniformiser le Teint</h3>
      <p class="mb-4">Un gommage régulier est le meilleur moyen d'aider à réduire l'apparence des taches sombres et d'obtenir un teint plus uniforme sur le corps. Pour le visage, notre Crème de visage à la vitamine C Advanced Colonels vous donnera le même effet ciblé.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MJ Effect Mentionnés dans cet Article :</h4>
        <ul>
          <li>Gommage et Gel de Douche (Moroccan Rose, Tropic Glow, Vanille) : 18 000 FCFA</li>
          <li>Lait de corps Dr Teals : 11 000 FCFA</li>
          <li>Glowtion Body Butter : Soin riche à appliquer après l'exfoliation.</li>
          <li>Crème de visage à la vitamine C Advanced Colonels : 13 000 FCFA (pour l'uniformité du teint).</li>
        </ul>
      </div>
    `,
  },
  {
    id: 4,
    title: "Review du Parfum Into The Night : L'Essence Chic et Sensuelle qui Conquiert Dakar",
    excerpt: "Découvrez pourquoi notre Brume/Eau de Toilette Into The Night est rapidement devenue un Best-Seller et la référence pour une fragrance sombre, sensuelle et sophistiquée à Dakar.",
    date: "24 Novembre 2025",
    readTime: "4 min",
    category: "Produits",
    image: "/blog/into-the-night-perfume-review-dakar.jpg",
    content: `
      <p><strong>(Mots-clés SEO : Into The Night prix FCFA, parfum sensuel femme Dakar, avis Into The Night, brume Bath and Body Works Sénégal)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">Chez MJ Effect, on ne peut pas ignorer le succès de notre Brume/Eau de Toilette Into The Night. Elle est rapidement devenue un Best-Seller et la référence pour toutes celles qui cherchent une fragrance sombre, sensuelle et sophistiquée à Dakar. Nous décortiquons pour vous cette essence incontournable.</p>

      <h3 class="text-xl font-bold my-4">I. Le Profil Olfactif : Mystère et Élégance</h3>
      <p class="mb-4">Into The Night est la fragrance idéale pour les soirées chic ou les rendez-vous importants.</p>
      <p class="mb-4"><strong>Notes Clés :</strong> Imaginez un cocktail de mûres, de patchouli et de vanille noire. Le résultat est un sillage riche, gourmand sans être écœurant, et surtout mémorable.</p>
      <p class="mb-4"><strong>Ambiance :</strong> C'est le parfum qui dit : "Je suis là." Il incarne l'élégance, la confiance et une touche de mystère.</p>
      <p class="italic mb-4">Produit Concurrentiel : Souvent comparé aux parfums de luxe par son profil olfactif, il reste accessible chez MJ Effect à 15 000 FCFA.</p>

      <h3 class="text-xl font-bold my-4">II. Le Layering : Multiplier la Puissance</h3>
      <p class="mb-4">Si vous aimez un parfum, superposez-le ! C'est la seule façon de garantir cette tenue "longue durée" tant recherchée sous la chaleur sénégalaise.</p>
      <p class="mb-4"><strong>La Base Hydratante :</strong> L'article précédent l'a prouvé : vous avez besoin d'une base hydratée. L'utiliser avec le Glowtion Body Butter Into The Night est un must. Le beurre corporel fixe le parfum sur la peau, le libérant lentement.</p>
      <p class="italic mb-4">Le Coffret Complet : Pour une expérience totale (idéale pour offrir), le SET #2 Into The Night (32 000 FCFA) contient tous les éléments nécessaires pour un sillage chic, sensuel et puissant, du gel douche à la brume.</p>

      <h3 class="text-xl font-bold my-4">III. Pourquoi c'est le Parfum Parfait pour la Soirée à Dakar</h3>
      <p class="mb-4"><strong>Puissance et Projection :</strong> Il a une excellente projection sans être envahissant, ce qui est parfait pour se démarquer lors des événements sans déranger.</p>
      <p class="mb-4"><strong>Unisex Appeal :</strong> Bien qu'il soit souvent considéré comme féminin, son fond boisé et sa richesse plaisent également à une clientèle masculine. Si vous recherchez un parfum d'homme luxe similaire, essayez notre Mahogany Teakwood Intense !</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MJ Effect Mentionnés dans cet Article :</h4>
        <ul>
          <li>Into The Night (Brume/Eau de Toilette) : 15 000 FCFA</li>
          <li>Glowtion Body Butter Into The Night : Soin hydratant assorti.</li>
          <li>SET #2 Into The Night : 32 000 FCFA (pour le Layering).</li>
          <li>Mahogany Teakwood Intense : 15 000 FCFA (suggestion pour homme).</li>
          <li>Dark Kiss (pour comparaison, un autre best-seller sensuel) : 15 000 FCFA.</li>
        </ul>
      </div>
    `,
  },
  {
    id: 5,
    title: "Où Acheter des Parfums de Marque Authentiques et Abordables à Dakar ? Le Guide MJ Effect",
    excerpt: "Le marché des parfums à Dakar est vaste. Voici comment vous assurer de faire le bon achat, et pourquoi nos prix en FCFA sont les plus compétitifs.",
    date: "23 Novembre 2025",
    readTime: "4 min",
    category: "Guide d'Achat",
    image: "/blog/buy-authentic-perfume-dakar.jpg",
    content: `
      <p><strong>(Mots-clés SEO : parfum pas cher Dakar, boutique parfum fiable Sénégal, prix brumes FCFA, meilleur magasin parfum Dakar)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">Le marché des parfums à Dakar est vaste, mais il peut être difficile de s'y retrouver entre les imitations et les prix exorbitants. Chez MJ Effect, nous nous engageons à offrir l'équilibre parfait entre authenticité, qualité et accessibilité. Voici comment vous assurer de faire le bon achat, et pourquoi nos prix en FCFA sont les plus compétitifs.</p>

      <h3 class="text-xl font-bold my-4">I. Les Risques de l'Achat en Ligne ou de Rue</h3>
      <p class="mb-4">La chasse aux bonnes affaires peut parfois mal tourner, surtout avec les produits de beauté.</p>
      <p class="mb-4"><strong>Méfiance face aux Contrefaçons :</strong> Un parfum trop bon marché est souvent synonyme de contrefaçon. Ces produits contiennent des ingrédients non testés qui peuvent irriter votre peau.</p>
      <p class="mb-4"><strong>L'Importance du Stockage :</strong> Un vendeur fiable s'assure que ses parfums sont stockés à l'abri de la chaleur et du soleil, un point crucial au Sénégal. Nos produits MJ Effect sont toujours conservés dans des conditions optimales pour garantir la qualité de la fragrance.</p>

      <h3 class="text-xl font-bold my-4">II. Pourquoi Choisir MJ Effect : Transparence et Prix FCFA</h3>
      <p class="mb-4">Notre mission est de démocratiser le luxe des soins et parfums de qualité.</p>
      <p class="mb-4"><strong>Prix Fixes et Transparents :</strong> Fini les négociations incertaines. Nos prix sont affichés clairement, comme nos Brumes/Eaux de toilette à 15 000 FCFA et nos Gommages à 18 000 FCFA. Vous savez exactement ce que vous payez, en FCFA.</p>
      <p class="mb-4"><strong>Authenticité Garantie :</strong> Nous nous approvisionnons directement auprès de marques reconnues pour vous garantir des produits originaux. Votre confiance est notre priorité.</p>

      <h3 class="text-xl font-bold my-4">III. Votre Guide d'Achat Local</h3>
      <p class="mb-4">Comment maximiser votre budget beauté chez MJ Effect :</p>
      <p class="mb-4"><strong>Les Essentiels (15 000 FCFA) :</strong> Nos brumes comme A Thousand Wishes ou Champagne Toast sont parfaites pour un usage quotidien et offrent le meilleur rapport qualité-prix.</p>
      <p class="mb-4"><strong>Le Soin de Base (dès 11 000 FCFA) :</strong> Ajoutez le Lait de corps Dr Teals à votre panier. C'est le complément parfait pour faire durer vos parfums.</p>
      <p class="mb-4"><strong>Les Carrefours d'Achat :</strong> Que vous commandiez en ligne sur notre site pour une livraison rapide à Dakar ou que vous préfériez récupérer votre commande dans nos points de retrait, nous simplifions le processus d'achat pour vous.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MJ Effect Mentionnés dans cet Article :</h4>
        <ul>
          <li>Toutes les Brumes/Eaux de Toilette (ex: A Thousand Wishes, Champagne Toast) : 15 000 FCFA</li>
          <li>Lait de corps Dr Teals : 11 000 FCFA</li>
          <li>Gommages et Gels Douche : 18 000 FCFA</li>
          <li>Coffrets / Ensembles (dès 32 000 FCFA)</li>
        </ul>
      </div>
    `,
  },
  {
    id: 6,
    title: "Idées Cadeaux Élégants : Les Coffrets Parfums MJ Effect Idéaux pour la Korité et la Tabaski",
    excerpt: "Trouver le cadeau parfait, élégant et mémorable peut être un défi. Découvrez nos sets MJ Effect, conçus pour impressionner (dès 32 000 FCFA).",
    date: "22 Novembre 2025",
    readTime: "5 min",
    category: "Cadeaux",
    image: "/blog/gift-sets-korite-tabaski-dakar.jpg",
    content: `
      <p><strong>(Mots-clés SEO : idée cadeau femme Tabaski, coffret parfum Korité, cadeau luxe prix abordable Dakar, set parfum 32000 FCFA)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">La Korité et la Tabaski sont des moments de partage et de générosité. Trouver le cadeau parfait, élégant et mémorable peut être un défi. Oubliez les cadeaux impersonnels. Offrir un coffret de parfums et de soins corporels de luxe est un geste d'attention ultime. Découvrez nos sets MJ Effect, conçus pour impressionner.</p>

      <h3 class="text-xl font-bold my-4">I. Le Cadeau qui Raconte une Histoire : Le Choix du Set</h3>
      <p class="mb-4">Un coffret est plus qu'un seul produit ; c'est une expérience complète de layering et de bien-être.</p>
      <p class="mb-4"><strong>L'Art du Layering :</strong> Nos coffrets regroupent plusieurs produits de la même fragrance (brume, gel, crème), garantissant une tenue et un sillage exceptionnels pour la personne qui le reçoit.</p>
      <p class="mb-4"><strong>Un Luxe Abordable :</strong> Offrir un produit haut de gamme ne devrait pas vider votre portefeuille. Nos Coffrets/Ensembles MJ Effect commencent à 32 000 FCFA, représentant un excellent rapport qualité-prix comparé à l'achat des produits séparément.</p>

      <h3 class="text-xl font-bold my-4">II. Sélection de Coffrets pour Chaque Fête</h3>
      <p class="mb-4">Que ce soit pour remercier l'hôte de la Tabaski ou honorer une amie à la Korité, nous avons le set parfait :</p>
       <table class="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">Occasion</th>
            <th class="border border-gray-300 p-2">Set Recommandé</th>
            <th class="border border-gray-300 p-2">Ambiance Olfactive</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 p-2">Élégance Classique</td><td class="border border-gray-300 p-2">SET #4 You're The One</td><td class="border border-gray-300 p-2">Romantique, classe, puissance. Idéal pour un cadeau traditionnel et sophistiqué.</td></tr>
          <tr><td class="border border-gray-300 p-2">Soirées Spéciales</td><td class="border border-gray-300 p-2">SET #2 Into The Night</td><td class="border border-gray-300 p-2">Chic, sensuel, longue tenue. Le choix parfait pour celle qui aime se démarquer après le coucher du soleil.</td></tr>
          <tr><td class="border border-gray-300 p-2">Confort et Douceur</td><td class="border border-gray-300 p-2">SET #6 Warm Vanilla Sugar</td><td class="border border-gray-300 p-2">Vanille chaude, caramel blond, sucre doux. Un cadeau cocooning, réconfortant et universel.</td></tr>
        </tbody>
      </table>

      <h3 class="text-xl font-bold my-4">III. Derniers Conseils pour un Cadeau Mémorable</h3>
      <p class="mb-4"><strong>Personnalisation :</strong> Pensez aux notes olfactives que la personne aime déjà (floral, boisé, sucré) pour choisir le bon set. Si elle aime les ambiances riches, optez pour Touch of Gold (musc chaud, vanille lumineuse).</p>
      <p class="mb-4"><strong>Facilité d'Achat :</strong> Évitez le stress des magasins bondés avant les fêtes. Commandez votre Coffret MJ Effect en ligne et faites-vous livrer directement, ou optez pour une livraison rapide à Dakar.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MJ Effect Mentionnés dans cet Article :</h4>
        <ul>
          <li>Tous les Coffrets / Ensembles (Sets) : 32 000 FCFA</li>
          <li>SET #2 Into The Night</li>
          <li>SET #4 You're The One</li>
          <li>SET #6 Warm Vanilla Sugar</li>
          <li>SET #5 Touch of Gold (Notes de musc chaud, vanille)</li>
        </ul>
      </div>
    `,
  },
]
export const PRODUCTS: Product[] = [
  // Parfums
  {
    id: 1,
    name: "Champagne Toast (Numéro 1)",
    price: 15000,
    category: "Parfums",
    subCategory: "Pétillant",
    image: "/1-champagne toast.PNG",
    images: ["/1-champagne toast.PNG"],
    details: "Parfum pétillant, sucré et ultra girly.",
  },
  {
    id: 29,
    name: "Champagne Toast (Numéro 2)",
    price: 15000,
    category: "Parfums",
    subCategory: "Pétillant",
    image: "/champagne toast.PNG",
    images: ["/champagne toast.PNG"],
    details: "Parfum pétillant, sucré et ultra girly.",
  },
  {
    id: 2,
    name: "Into The Night (Numéro 3)",
    price: 15000,
    category: "Parfums",
    subCategory: "Sensuel",
    image: "/into the night.PNG",
    images: ["/into the night.PNG"],
    details: "Senteur sombre, sensuelle et élégante.",
    tag: "Best Seller",
  },
  {
    id: 3,
    name: "Cactus Blossom (Numéro 5)",
    price: 15000,
    category: "Parfums",
    subCategory: "Floral",
    image: "/cactus blossom.PNG",
    images: ["/cactus blossom.PNG"],
    details: "Frais, floral et légèrement fruité.",
  },
  {
    id: 4,
    name: "Dark Kiss (Numéro 6)",
    price: 15000,
    category: "Parfums",
    subCategory: "Mystérieux",
    image: "/dark kiss.PNG",
    images: ["/dark kiss.PNG"],
    details: "Mystérieux, sucré, sexy. Mûres, vanille noire...",
  },
  {
    id: 5,
    name: "Bergamot & Musk (Numéro 7)",
    price: 15000,
    category: "Parfums",
    subCategory: "Frais",
    image: "/berganot et musk.PNG",
    images: ["/berganot et musk.PNG"],
    details: "Odeur propre, douce et classy.",
  },
  {
    id: 6,
    name: "Touch of Gold (Numéro 8)",
    price: 15000,
    category: "Parfums",
    subCategory: "Chic",
    image: "/touch of gold.PNG",
    images: ["/touch of gold.PNG"],
    details: "Parfum chic, élégant, sophistiqué.",
  },
  {
    id: 7,
    name: "In The Stars (Numéro 9)",
    price: 15000,
    category: "Parfums",
    subCategory: "Lumineux",
    image: "/in the stars.PNG",
    images: ["/in the stars.PNG"],
    details: "Lumineux, chaleureux, légèrement sucré.",
  },
  {
    id: 8,
    name: "Mahogany Teakwood Intense (Numéro 10)",
    price: 15000,
    category: "Parfums",
    subCategory: "Boisé",
    image: "/mohogany taekwood intense.PNG",
    images: ["/mohogany taekwood intense.PNG"],
    details: 'Style parfum "homme luxe". Bois de cèdre...',
  },
  {
    id: 9,
    name: "A Thousand Wishes",
    price: 15000,
    category: "Parfums",
    subCategory: "Doux",
    image: "/a thousand wishes.PNG",
    images: ["/a thousand wishes.PNG"],
    details: "Parfum doux, sucré, très féminin.",
    tag: "Best Seller",
  },

  // Soins Corporels
  {
    id: 10,
    name: "Into The Night Glowtion Body Butter",
    price: 12000,
    category: "Soins Corporels",
    subCategory: "Crème",
    image: "/into the night - glowtion Body Butter.PNG",
    images: ["/into the night - glowtion Body Butter.PNG"],
    details: "Hydratation intense + effet glow élégant.",
    tag: "New",
  },
  {
    id: 11,
    name: "PLATINUM Glowtion Body Butter",
    price: 12000,
    category: "Soins Corporels",
    subCategory: "Crème",
    image: "/platinum - glowtion Body Butter.PNG",
    images: ["/platinum - glowtion Body Butter.PNG"],
    details: "Texture riche et fondante qui laisse la peau...",
  },
  {
    id: 12,
    name: "CHAMPAGNE TOAST Body Butter",
    price: 12000,
    category: "Soins Corporels",
    subCategory: "Crème",
    image: "/champagne toast body butter.PNG",
    images: ["/champagne toast body butter.PNG"],
    details: "Ultra crémeux, fond sur la peau et donne...",
  },
  {
    id: 13,
    name: "Dr Teals Lait de corps",
    price: 11000,
    category: "Soins Corporels",
    subCategory: "Lait",
    image: "/Laite de Corps Dr Teals -12000.PNG",
    images: ["/Laite de Corps Dr Teals -12000.PNG"],
  },
  {
    id: 14,
    name: "Dr Teals Body wash/glow & radiance",
    price: 9000,
    category: "Soins Corporels",
    subCategory: "Gel Douche",
    image: "/Body wash Dr teals - 11000.PNG",
    images: ["/Body wash Dr teals - 11000.PNG"],
  },
  {
    id: 15,
    name: "Advanced Colonels Crème de visage",
    price: 13000,
    category: "Soins Corporels",
    subCategory: "Visage",
    image: "/advanced clinicals - 13000 - creme de visage a lavitamine c.PNG",
    images: ["/advanced clinicals - 13000 - creme de visage a lavitamine c.PNG"],
    details: "Crème de visage à la vitamine C",
  },
  {
    id: 16,
    name: "Advanced Colonels Lait de corps",
    price: 14000,
    category: "Soins Corporels",
    subCategory: "Lait",
    image: "/advanced clinical - 14000 - Lait de corps à la vitamine C.PNG",
    images: ["/advanced clinical - 14000 - Lait de corps à la vitamine C.PNG"],
    details: "Lait de corps à la vitamine C",
  },

  // Gommages et Gels Douche
  {
    id: 17,
    name: "Gommage Général",
    price: 10000,
    category: "Gommages et Gels Douche",
    subCategory: "Gommage",
    image: "/luxury-body-scrub-general.jpg",
    images: ["/luxury-body-scrub-general.jpg"],
  },
  {
    id: 18,
    name: "Moroccan Rose Gommage et gel de douche",
    price: 18000,
    category: "Gommages et Gels Douche",
    subCategory: "Ensemble",
    image: "/tree hut maroccan rose.PNG",
    images: ["/tree hut maroccan rose.PNG", "/tree hut - maroccan rose_2.PNG"],
    tag: "New",
  },
  {
    id: 19,
    name: "Vanille Gommage et gel de douche",
    price: 18000,
    category: "Gommages et Gels Douche",
    subCategory: "Ensemble",
    image: "/tree hut Vanilla_1.PNG",
    images: ["/tree hut Vanilla_1.PNG", "/tree hut Vanilla_2.PNG"],
  },
  {
    id: 20,
    name: "Tropic Glow Gommage et gel de douche",
    price: 18000,
    category: "Gommages et Gels Douche",
    subCategory: "Ensemble",
    image: "/tree hut tropic glow_1.PNG",
    images: ["/tree hut tropic glow_1.PNG", "/tree hut tropic glow_2.PNG"],
  },
  {
    id: 21,
    name: "Sweet Punkin Gommage et gel de douche",
    price: 18000,
    category: "Gommages et Gels Douche",
    subCategory: "Ensemble",
    image: "/tree hut sweet punkin_1.PNG",
    images: ["/tree hut sweet punkin_1.PNG", "/tree hut sweet punkin_2.PNG"],
  },
  {
    id: 22,
    name: "Vitamin C Gommage et gel de douche",
    price: 18000,
    category: "Gommages et Gels Douche",
    subCategory: "Ensemble",
    image: "/tree hut vitamin c_1.PNG",
    images: ["/tree hut vitamin c_1.PNG", "/tree hut vitamin c_2.PNG"],
  },

  // Coffrets / Ensembles
  {
    id: 23,
    name: "SET #1 Champagne Toast",
    price: 32000,
    category: "Coffrets",
    subCategory: "Parfum",
    image: "/Set #1 Champagne Toast (gel + brume + creme)_1.PNG",
    images: ["/Set #1 Champagne Toast (gel + brume + creme)_1.PNG", "/Set #1 Champagne Toast (gel + brume + creme)_2.PNG", "/Set #1 Champagne Toast (gel + brume + creme)_3.PNG"],
    details: "(gel + brume...)",
    tag: "Coffret",
  },
  {
    id: 24,
    name: "SET #2 Into The Night",
    price: 32000,
    category: "Coffrets",
    subCategory: "Parfum",
    image: "/SET #2 – Into The Night_1.PNG",
    images: ["/SET #2 – Into The Night_1.PNG", "/SET #2 – Into The Night_2.PNG", "/SET #2 – Into The Night_3.PNG"],
    details: "Ambiance : chic, sensuel, soirée, longue tenue.",
  },
  {
    id: 25,
    name: "SET #3 A Thousand Wishes",
    price: 32000,
    category: "Coffrets",
    subCategory: "Parfum",
    image: "/SET #3 A Thousand Wishes_1.PNG",
    images: ["/SET #3 A Thousand Wishes_1.PNG", "/SET #3 A Thousand Wishes_2.PNG", "/SET #3 A Thousand Wishes_3.PNG"],
  },
  {
    id: 26,
    name: "SET #4 You're The One",
    price: 32000,
    category: "Coffrets",
    subCategory: "Parfum",
    image: "/SET #4 – You’re The One_1.PNG",
    images: ["/SET #4 – You’re The One_1.PNG", "/SET #4 – You’re The One_2.PNG", "/SET #4 – You’re The One_3.PNG"],
    details: "Ambiance : romantique, classe, puissance.",
  },
  {
    id: 27,
    name: "SET #5 Touch of Gold",
    price: 32000,
    category: "Coffrets",
    subCategory: "Parfum",
    image: "/Set #5 Touch of Gold_1.PNG",
    images: ["/Set #5 Touch of Gold_1.PNG", "/Set #5 Touch of Gold_2.PNG", "/Set #5 Touch of Gold_3.PNG"],
    details: "Notes olfactives : musc chaud, vanille lumineuse...",
  },
  {
    id: 28,
    name: "SET #6 Warm Vanilla Sugar",
    price: 32000,
    category: "Coffrets",
    subCategory: "Parfum",
    image: "/Set #6 Warm Vanilla Sugar_1.PNG",
    images: ["/Set #6 Warm Vanilla Sugar_1.PNG", "/Set #6 Warm Vanilla Sugar_2.PNG", "/set #6 Warm Vanilla Sugar_3.PNG"],
    details: "Vanille chaude • Caramel blond • Sucre doux...",
  },
]
