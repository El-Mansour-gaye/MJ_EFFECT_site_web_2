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
    title: "Quiz : Quelle Senteur MG Effect êtes-vous ?",
    excerpt: "Vous ne savez pas quel parfum ou quel soin choisir ? Répondez à notre quiz rapide et découvrez votre profil olfactif idéal. C'est ludique, rapide et personnalisé !",
    date: "29 Mai 2024",
    readTime: "2 min",
    category: "Quiz",
    image: "/gift-sets-korite-tabaski-dakar.png",
    content: `
      <p><strong>(Mots-clés SEO : quiz parfum, quel parfum choisir, test olfactif, trouver sa signature olfactive, quiz beauté MG Effect)</strong></p>
      <h2 class="text-2xl font-bold my-4">Vous hésitez entre "Into The Night" et "Champagne Toast" ? Vous ne savez pas si votre peau a besoin d'un Body Butter ou d'un Lait Corporel ?</h2>
      <p class="mb-4">Le monde des senteurs est vaste et il est parfois difficile de trouver la fragrance ou le soin qui nous correspond vraiment. C'est pourquoi nous avons créé ce quiz ludique et rapide pour vous aider à découvrir votre signature olfactive personnelle.</p>
      <p class="mb-4">En quelques questions, nous analyserons vos préférences et votre personnalité pour vous recommander les produits MG Effect qui sont faits pour vous. Prête à trouver votre match parfait ?</p>
      <div class="my-8 text-center">
        <a href="/quiz" class="inline-block bg-accent text-accent-foreground font-bold py-4 px-8 rounded-none hover:bg-accent/90 transition-colors">
          Démarrer le Quiz !
        </a>
      </div>
      <p class="text-center italic text-white/70">C'est rapide, amusant et les résultats pourraient vous surprendre !</p>
    `,
  },
  {
    id: 11,
    title: "Les 5 Astuces Infuillibles pour Faire Tenir votre Parfum Toute la Journée à Dakar (Malgré la Chaleur)",
    excerpt: "La chaleur et l'humidité de Dakar sont magnifiques, mais elles sont les pires ennemies de votre parfum ! Découvrez comment faire tenir votre fragrance préférée.",
    date: "27 Novembre 2025",
    readTime: "5 min",
    category: "Conseils Beauté",
    image: "/perfume-long-lasting-dakar.png",
    content: `
      <p><strong>(Mots-clés SEO : parfum longue tenue Dakar, brume corporelle chaleur, fixateur parfum Sénégal)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">La chaleur et l'humidité de Dakar sont magnifiques, mais elles sont les pires ennemies de votre parfum ! Vous adorez votre fragrance, mais elle semble disparaître après seulement quelques heures. Ne vous inquiétez pas, le problème n'est pas votre parfum, c'est votre technique. Chez MG Effect, nous avons testé les méthodes qui fonctionnent réellement sous les tropiques.</p>

      <h3 class="text-xl font-bold my-4">I. La Préparation de la Peau : Le Secret de l'Hydratation</h3>
      <p class="mb-4">Le parfum ne tient pas sur la peau sèche. Considérez votre peau comme une éponge : elle doit être humide pour absorber et retenir les molécules olfactives.</p>
      <p class="mb-4"><strong>Hydratez Intensivement (C'est Crucial !) :</strong> Appliquez une crème corporelle ou un beurre hydratant juste après la douche et avant de vous parfumer. Si la crème n'a pas d'odeur, c'est l'idéal ! Sinon, utilisez une crème assortie à votre parfum pour superposer les senteurs.</p>
      <p class="italic mb-4">*Produit Recommandé MG Effect : Notre Glowtion Body Butter (Into The Night ou Platinum) crée une base riche et hydratante sans graisser. Il scelle le parfum sur la peau, prolongeant sa durée de vie.</p>

      <h3 class="text-xl font-bold my-4">II. Les Points Stratégiques : Où Appliquer ?</h3>
      <p class="mb-4">Oubliez la brume aléatoire ! Le parfum s'active avec la chaleur du corps.</p>
      <p class="mb-4"><strong>Les Zones de Pulsation :</strong> Visez les zones où votre sang pulse : l'intérieur des poignets, derrière les oreilles, à la base de la nuque. Ces points dégagent de la chaleur qui diffuse le parfum tout au long de la journée.</p>
      <p class="mb-4"><strong>N'oubliez pas les Cheveux :</strong> Les cheveux retiennent les odeurs plus longtemps que la peau. Vaporisez légèrement votre brume parfumée sur votre brosse avant de vous coiffer.</p>

      <h3 class="text-xl font-bold my-4">III. La Technique du "Layering" (Superposition)</h3>
      <p class="mb-4">Le secret des connaisseurs est de créer une base olfactive complète.</p>
      <p class="mb-4"><strong>Superposez les Produits :</strong> Utilisez d'abord le Gel Douche, puis la Crème ou le Lait de Corps, et enfin la Brume ou l'Eau de Toilette de la même fragrance.</p>
      <p class="italic mb-4">Exemple MG Effect : Si vous aimez Into The Night, commencez par le gel de douche de la gamme, appliquez le Glowtion Body Butter Into The Night, puis terminez avec la Brume Into The Night (Numéro 3). C'est le combo gagnant pour une tenue longue durée.</p>

      <h3 class="text-xl font-bold my-4">IV. Conseil Bonus : Les Brumes vs. Les Parfums</h3>
      <p class="mb-4">En climat chaud, les Brumes (comme celles de MG Effect à 15 000 FCFA) peuvent être plus efficaces que les parfums lourds, car elles peuvent être réappliquées plus facilement sans devenir entêtantes. Gardez-en une dans votre sac !</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MG Effect Mentionnés dans cet Article :</h4>
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
    title: "Body Butter vs Lait de Corps : Quel Soin MG Effect Choisir pour la Peau Sénégalaise ?",
    excerpt: "La peau, exposée au soleil, au vent et aux variations d'humidité, a besoin d'une attention particulière à Dakar. Découvrez quel soin est fait pour vous.",
    date: "26 Novembre 2025",
    readTime: "4 min",
    category: "Soins Corporels",
    image: "/body-butter-vs-lotion-senegal.png",
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
            <th class="border border-gray-300 p-2">MG Effect Body Butter (Ex: Glowtion Body Butter)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 p-2">Texture</td><td class="border border-gray-300 p-2">Épaisse, riche et crémeuse.</td></tr>
          <tr><td class="border border-gray-300 p-2">But Principal</td><td class="border border-gray-300 p-2">Réparer, nourrir et créer une barrière protectrice contre la déshydratation.</td></tr>
          <tr><td class="border border-gray-300 p-2">Quand l'utiliser</td><td class="border border-gray-300 p-2">Idéal le soir ou pendant la saison la plus sèche. Parfait pour les zones rugueuses (coudes, genoux, pieds).</td></tr>
          <tr><td class="border border-gray-300 p-2">Avantage MG Effect</td><td class="border border-gray-300 p-2">Notre Glowtion Body Butter (disponible en CHAMPAGNE TOAST ou INTO THE NIGHT) offre une hydratation intense plus un élégant effet "glow".</td></tr>
        </tbody>
      </table>

      <h3 class="text-xl font-bold my-4">II. Le Lait de Corps : La Légèreté Quotidienne</h3>
      <p class="mb-4">Le Lait de Corps est plus aqueux, pénètre rapidement et est parfait pour un usage quotidien.</p>
       <table class="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2">Caractéristique</th>
            <th class="border border-gray-300 p-2">MG Effect Lait de Corps (Ex: Dr Teals, Advanced Colonels)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td class="border border-gray-300 p-2">Texture</td><td class="border border-gray-300 p-2">Fluide, légère et non grasse.</td></tr>
          <tr><td class="border border-gray-300 p-2">But Principal</td><td class="border border-gray-300 p-2">Hydratation rapide et quotidienne. Pénétration en moins de 15 secondes.</td></tr>
          <tr><td class="border border-gray-300 p-2">Quand l'utiliser</td><td class="border border-gray-300 p-2">Idéal le matin avant de s'habiller ou après une douche rapide. Parfait pour les peaux moins sèches ou les jours très chauds.</td></tr>
          <tr><td class="border border-gray-300 p-2">Avantage MG Effect</td><td class="border border-gray-300 p-2">Nos Laits de Corps Dr Teals (11 000 FCFA) ou le Lait à la Vitamine C Advanced Colonels (14 000 FCFA) sont conçus pour une absorption ultra-rapide, un must sous la chaleur sénégalaise.</td></tr>
        </tbody>
      </table>

      <h3 class="text-xl font-bold my-4">III. Notre Verdict pour la Peau Sénégalaise</h3>
      <p class="mb-4"><strong>Peau Très Sèche / Routine Nuit :</strong> Optez pour un Body Butter sans hésiter. L'effet occlusif garantit que votre peau reste souple toute la nuit.</p>
      <p class="mb-4"><strong>Peau Normale / Routine Jour :</strong> Le Lait de Corps est votre allié. Il vous garde hydratée sans sensation collante.</p>
      <p class="italic mb-4">Conseil d'Expert : La Vitamine C est essentielle pour l'éclat de la peau. N'oubliez pas notre Crème de visage à la vitamine C Advanced Colonels (13 000 FCFA) pour uniformiser votre teint.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MG Effect Mentionnés dans cet Article :</h4>
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
    image: "/glowing-skin-scrub-senegal.jfif",
    content: `
      <p><strong>(Mots-clés SEO : gommage corps Sénégal, peau éclatante Dakar, gommage Moroccan Rose prix, routine soin avant hydratation)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">Vivre sous le soleil de Dakar, c'est génial, mais votre peau en paie le prix ! La chaleur, la poussière et l'humidité peuvent rendre la peau terne et même favoriser l'apparition de tâches. Le secret d'une peau lumineuse et éclatante ? Le Gommage Corporel. Chez MG Effect, on vous explique pourquoi cette étape est non négociable.</p>

      <h3 class="text-xl font-bold my-4">I. Le Rôle Fondamental du Gommage</h3>
      <p class="mb-4">Le gommage est l'étape d'exfoliation qui permet à votre peau de respirer et de se renouveler.</p>
      <p class="mb-4"><strong>Élimination des Cellules Mortes :</strong> Les micro-particules (sucre, sel) présentes dans le gommage frottent doucement la surface de la peau pour déloger les cellules mortes accumulées. C'est l'effet "gomme" qui révèle la nouvelle peau, plus fraîche, en dessous.</p>
      <p class="mb-4"><strong>Prévention des Poils Incarnés :</strong> Pour ceux qui s'épilent ou se rasent, l'exfoliation régulière est essentielle pour libérer les poils et éviter les irritations et les bosses.</p>

      <h3 class="text-xl font-bold my-4">II. Le Gommage, Clé de l'Hydratation</h3>
      <p class="mb-4">L'efficacité de votre Lait de Corps ou de votre Body Butter est directement liée à l'étape du gommage.</p>
      <p class="mb-4"><strong>Absorption Optimale :</strong> Imaginez que vous mettez une crème hydratante sur une couche de poussière. Ça ne sert à rien ! En éliminant la couche de cellules mortes, le gommage permet à vos soins (crèmes, laits, sérums) de pénétrer plus profondément et d'être 100% efficaces.</p>
      <p class="italic mb-4">Produits MG Effect à Utiliser Après : C'est le moment d'appliquer le Lait de corps Dr Teals ou votre Glowtion Body Butter pour un résultat spectaculaire et un éclat inégalé.</p>

      <h3 class="text-xl font-bold my-4">III. Comment et Quand Utiliser les Gommages MG Effect ?</h3>
      <p class="mb-4">La règle d'or : 2 à 3 fois par semaine maximum !</p>
      <p class="mb-4"><strong>Nos Gommages-Douche 2-en-1 :</strong> La gamme de Gommages et Gels Douche MG Effect (18 000 FCFA), comme le Moroccan Rose ou le Tropic Glow, vous offre le luxe de la purification et de l'hydratation en un seul geste sous la douche.</p>
      <p class="mb-4"><strong>Le Tropic Glow :</strong> Parfait pour un coup de boost vitaminé et frais le matin.</p>
      <p class="mb-4"><strong>Le Moroccan Rose :</strong> Idéal pour une touche sensuelle et relaxante en fin de journée.</p>

      <h3 class="text-xl font-bold my-4">IV. Conseil d'Expert : Uniformiser le Teint</h3>
      <p class="mb-4">Un gommage régulier est le meilleur moyen d'aider à réduire l'apparence des taches sombres et d'obtenir un teint plus uniforme sur le corps. Pour le visage, notre Crème de visage à la vitamine C Advanced Colonels vous donnera le même effet ciblé.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MG Effect Mentionnés dans cet Article :</h4>
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
    image: "/into-the-night-perfume-review-dakar.png",
    content: `
      <p><strong>(Mots-clés SEO : Into The Night prix FCFA, parfum sensuel femme Dakar, avis Into The Night, brume Bath and Body Works Sénégal)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">Chez MG Effect, on ne peut pas ignorer le succès de notre Brume/Eau de Toilette Into The Night. Elle est rapidement devenue un Best-Seller et la référence pour toutes celles qui cherchent une fragrance sombre, sensuelle et sophistiquée à Dakar. Nous décortiquons pour vous cette essence incontournable.</p>

      <h3 class="text-xl font-bold my-4">I. Le Profil Olfactif : Mystère et Élégance</h3>
      <p class="mb-4">Into The Night est la fragrance idéale pour les soirées chic ou les rendez-vous importants.</p>
      <p class="mb-4"><strong>Notes Clés :</strong> Imaginez un cocktail de mûres, de patchouli et de vanille noire. Le résultat est un sillage riche, gourmand sans être écœurant, et surtout mémorable.</p>
      <p class="mb-4"><strong>Ambiance :</strong> C'est le parfum qui dit : "Je suis là." Il incarne l'élégance, la confiance et une touche de mystère.</p>
      <p class="italic mb-4">Produit Concurrentiel : Souvent comparé aux parfums de luxe par son profil olfactif, il reste accessible chez MG Effect à 15 000 FCFA.</p>

      <h3 class="text-xl font-bold my-4">II. Le Layering : Multiplier la Puissance</h3>
      <p class="mb-4">Si vous aimez un parfum, superposez-le ! C'est la seule façon de garantir cette tenue "longue durée" tant recherchée sous la chaleur sénégalaise.</p>
      <p class="mb-4"><strong>La Base Hydratante :</strong> L'article précédent l'a prouvé : vous avez besoin d'une base hydratée. L'utiliser avec le Glowtion Body Butter Into The Night est un must. Le beurre corporel fixe le parfum sur la peau, le libérant lentement.</p>
      <p class="italic mb-4">Le Coffret Complet : Pour une expérience totale (idéale pour offrir), le SET #2 Into The Night (32 000 FCFA) contient tous les éléments nécessaires pour un sillage chic, sensuel et puissant, du gel douche à la brume.</p>

      <h3 class="text-xl font-bold my-4">III. Pourquoi c'est le Parfum Parfait pour la Soirée à Dakar</h3>
      <p class="mb-4"><strong>Puissance et Projection :</strong> Il a une excellente projection sans être envahissant, ce qui est parfait pour se démarquer lors des événements sans déranger.</p>
      <p class="mb-4"><strong>Unisex Appeal :</strong> Bien qu'il soit souvent considéré comme féminin, son fond boisé et sa richesse plaisent également à une clientèle masculine. Si vous recherchez un parfum d'homme luxe similaire, essayez notre Mahogany Teakwood Intense !</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MG Effect Mentionnés dans cet Article :</h4>
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
    title: "Où Acheter des Parfums de Marque Authentiques et Abordables à Dakar ? Le Guide MG Effect",
    excerpt: "Le marché des parfums à Dakar est vaste. Voici comment vous assurer de faire le bon achat, et pourquoi nos prix en FCFA sont les plus compétitifs.",
    date: "23 Novembre 2025",
    readTime: "4 min",
    category: "Guide d'Achat",
    image: "/buy-authentic-perfume-dakar.png",
    content: `
      <p><strong>(Mots-clés SEO : parfum pas cher Dakar, boutique parfum fiable Sénégal, prix brumes FCFA, meilleur magasin parfum Dakar)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">Le marché des parfums à Dakar est vaste, mais il peut être difficile de s'y retrouver entre les imitations et les prix exorbitants. Chez MG Effect, nous nous engageons à offrir l'équilibre parfait entre authenticité, qualité et accessibilité. Voici comment vous assurer de faire le bon achat, et pourquoi nos prix en FCFA sont les plus compétitifs.</p>

      <h3 class="text-xl font-bold my-4">I. Les Risques de l'Achat en Ligne ou de Rue</h3>
      <p class="mb-4">La chasse aux bonnes affaires peut parfois mal tourner, surtout avec les produits de beauté.</p>
      <p class="mb-4"><strong>Méfiance face aux Contrefaçons :</strong> Un parfum trop bon marché est souvent synonyme de contrefaçon. Ces produits contiennent des ingrédients non testés qui peuvent irriter votre peau.</p>
      <p class="mb-4"><strong>L'Importance du Stockage :</strong> Un vendeur fiable s'assure que ses parfums sont stockés à l'abri de la chaleur et du soleil, un point crucial au Sénégal. Nos produits MG Effect sont toujours conservés dans des conditions optimales pour garantir la qualité de la fragrance.</p>

      <h3 class="text-xl font-bold my-4">II. Pourquoi Choisir MG Effect : Transparence et Prix FCFA</h3>
      <p class="mb-4">Notre mission est de démocratiser le luxe des soins et parfums de qualité.</p>
      <p class="mb-4"><strong>Prix Fixes et Transparents :</strong> Fini les négociations incertaines. Nos prix sont affichés clairement, comme nos Brumes/Eaux de toilette à 15 000 FCFA et nos Gommages à 18 000 FCFA. Vous savez exactement ce que vous payez, en FCFA.</p>
      <p class="mb-4"><strong>Authenticité Garantie :</strong> Nous nous approvisionnons directement auprès de marques reconnues pour vous garantir des produits originaux. Votre confiance est notre priorité.</p>

      <h3 class="text-xl font-bold my-4">III. Votre Guide d'Achat Local</h3>
      <p class="mb-4">Comment maximiser votre budget beauté chez MG Effect :</p>
      <p class="mb-4"><strong>Les Essentiels (15 000 FCFA) :</strong> Nos brumes comme A Thousand Wishes ou Champagne Toast sont parfaites pour un usage quotidien et offrent le meilleur rapport qualité-prix.</p>
      <p class="mb-4"><strong>Le Soin de Base (dès 11 000 FCFA) :</strong> Ajoutez le Lait de corps Dr Teals à votre panier. C'est le complément parfait pour faire durer vos parfums.</p>
      <p class="mb-4"><strong>Les Carrefours d'Achat :</strong> Que vous commandiez en ligne sur notre site pour une livraison rapide à Dakar ou que vous préfériez récupérer votre commande dans nos points de retrait, nous simplifions le processus d'achat pour vous.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MG Effect Mentionnés dans cet Article :</h4>
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
    title: "Idées Cadeaux Élégants : Les Coffrets Parfums MG Effect Idéaux pour la Korité et la Tabaski",
    excerpt: "Trouver le cadeau parfait, élégant et mémorable peut être un défi. Découvrez nos sets MG Effect, conçus pour impressionner (dès 32 000 FCFA).",
    date: "22 Novembre 2025",
    readTime: "5 min",
    category: "Cadeaux",
    image: "/gift-sets-korite-tabaski-dakar.png",
    content: `
      <p><strong>(Mots-clés SEO : idée cadeau femme Tabaski, coffret parfum Korité, cadeau luxe prix abordable Dakar, set parfum 32000 FCFA)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction (Accroche)</h2>
      <p class="mb-4">La Korité et la Tabaski sont des moments de partage et de générosité. Trouver le cadeau parfait, élégant et mémorable peut être un défi. Oubliez les cadeaux impersonnels. Offrir un coffret de parfums et de soins corporels de luxe est un geste d'attention ultime. Découvrez nos sets MG Effect, conçus pour impressionner.</p>

      <h3 class="text-xl font-bold my-4">I. Le Cadeau qui Raconte une Histoire : Le Choix du Set</h3>
      <p class="mb-4">Un coffret est plus qu'un seul produit ; c'est une expérience complète de layering et de bien-être.</p>
      <p class="mb-4"><strong>L'Art du Layering :</strong> Nos coffrets regroupent plusieurs produits de la même fragrance (brume, gel, crème), garantissant une tenue et un sillage exceptionnels pour la personne qui le reçoit.</p>
      <p class="mb-4"><strong>Un Luxe Abordable :</strong> Offrir un produit haut de gamme ne devrait pas vider votre portefeuille. Nos Coffrets/Ensembles MG Effect commencent à 32 000 FCFA, représentant un excellent rapport qualité-prix comparé à l'achat des produits séparément.</p>

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
      <p class="mb-4"><strong>Facilité d'Achat :</strong> Évitez le stress des magasins bondés avant les fêtes. Commandez votre Coffret MG Effect en ligne et faites-vous livrer directement, ou optez pour une livraison rapide à Dakar.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Produits MG Effect Mentionnés dans cet Article :</h4>
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
  {
    id: 7,
    title: "La Routine Éclat Complète : Le Guide MG Effect en 4 Étapes",
    excerpt: "Obtenir une peau radieuse et un sillage parfumé qui dure toute la journée à Dakar n'est pas un mystère. C'est une routine. Voici le guide MG Effect en 4 étapes clés.",
    date: "28 Mai 2024",
    readTime: "6 min",
    category: "Routine de Soin",
    image: "/into-the-night-perfume-review-dakar.png",
    content: `
      <p><strong>(Mots-clés SEO : routine soin corporel Sénégal, comment avoir une belle peau Dakar, gommage avant hydratation, layering parfum, guide beauté complet)</strong></p>
      <h2 class="text-2xl font-bold my-4">Introduction : Le Secret n'est pas un Produit, c'est une Routine</h2>
      <p class="mb-4">Obtenir une peau radieuse et un sillage parfumé qui dure toute la journée à Dakar n'est pas un mystère. C'est une routine. Beaucoup pensent qu'un seul produit miracle suffit, mais la vérité est dans la synergie de plusieurs étapes. Chez MG Effect, nous avons conçu une routine complète en 4 étapes simples mais puissantes, utilisant nos produits phares pour maximiser leur efficacité.</p>

      <h3 class="text-xl font-bold my-4">Étape 1 : Purifier et Préparer avec le Gommage (2-3 fois/semaine)</h3>
      <p class="mb-4">La base de toute routine efficace. Le gommage n'est pas un simple nettoyage, c'est une préparation de la toile. Il élimine les cellules mortes qui ternissent le teint et empêchent vos soins de pénétrer.</p>
      <p class="mb-4"><strong>Action :</strong> Sous la douche, sur peau humide, massez énergiquement votre corps avec l'un de nos gommages. Insistez sur les zones sèches comme les coudes et les genoux.</p>
      <p class="italic mb-4">*Produit Recommandé MG Effect : Le <strong>Gommage Moroccan Rose (18 000 FCFA)</strong> pour une exfoliation douce et un parfum floral envoûtant, ou le <strong>Tropic Glow</strong> pour un effet tonifiant et frais.</p>

      <h3 class="text-xl font-bold my-4">Étape 2 : Hydrater Intensément (Quotidiennement)</h3>
      <p class="mb-4">Une peau exfoliée est une peau assoiffée. C'est le moment idéal pour lui apporter une hydratation profonde. Le choix entre un lait et un beurre dépend de vos besoins.</p>
      <p class="mb-4"><strong>Action :</strong> Juste après la douche, sur une peau encore légèrement humide, appliquez généreusement votre soin hydratant.</p>
      <p class="mb-4"><strong>Pour une hydratation légère et rapide (le matin) :</strong> Optez pour le <strong>Lait de corps Dr Teals (11 000 FCFA)</strong>. Il pénètre vite et ne laisse aucun film gras.</p>
      <p class="mb-4"><strong>Pour une nutrition profonde (le soir ou peau très sèche) :</strong> Le <strong>Glowtion Body Butter (disponible en CHAMPAGNE TOAST ou INTO THE NIGHT)</strong> est votre meilleur allié. Sa texture riche répare la peau et laisse un glow subtil.</p>

      <h3 class="text-xl font-bold my-4">Étape 3 : Sceller avec la Brume Parfumée (Le "Layering")</h3>
      <p class="mb-4">C'est l'étape qui fait toute la différence pour la tenue de votre parfum. La peau hydratée est la meilleure base pour fixer les notes olfactives.</p>
      <p class="mb-4"><strong>Action :</strong> Vaporisez votre brume préférée sur les points de pulsation (poignets, cou, derrière les oreilles) et sur vos vêtements. Pour une synergie parfaite, utilisez une brume de la même gamme que votre soin corporel.</p>
      <p class="italic mb-4">*Exemple de combo parfait : Appliquez le Glowtion Body Butter <strong>Into The Night</strong>, puis la <strong>Brume/Eau de Toilette Into The Night (15 000 FCFA)</strong>. Le résultat ? Un sillage sensuel et une tenue prolongée, même avec la chaleur de Dakar.</p>

      <h3 class="text-xl font-bold my-4">Étape 4 (Bonus) : Le Soin Visage Ciblé</h3>
      <p class="mb-4">Ne négligez pas votre visage ! L'uniformité du teint est la touche finale d'une routine éclat.</p>
      <p class="mb-4"><strong>Action :</strong> Matin et soir, sur un visage propre, appliquez une crème ciblée pour l'éclat et l'uniformité.</p>
      <p class="italic mb-4">*Produit Recommandé MG Effect : La <strong>Crème de visage à la vitamine C Advanced Colonels (13 000 FCFA)</strong> est spécialement conçue pour lutter contre les taches et illuminer le teint, un indispensable au Sénégal.</p>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-bold text-lg mb-2">🛍️ Récapitulatif de la Routine Complète MG Effect :</h4>
        <ul>
          <li><strong>Étape 1 (Exfolier) :</strong> Gommage Moroccan Rose ou Tropic Glow (18 000 FCFA)</li>
          <li><strong>Étape 2 (Hydrater) :</strong> Lait de corps Dr Teals (11 000 FCFA) ou Glowtion Body Butter</li>
          <li><strong>Étape 3 (Parfumer) :</strong> Brume/Eau de Toilette au choix (ex: Into The Night) (15 000 FCFA)</li>
          <li><strong>Étape 4 (Visage) :</strong> Crème de visage Vitamine C Advanced Colonels (13 000 FCFA)</li>
        </ul>
        <p class="mt-4 font-bold">Le résultat : une peau soignée, lumineuse et un parfum qui vous accompagne durablement.</p>
      </div>
    `,
  },
  {
    id: 8,
    title: "L'Art du Gifting : Offrir un Parfum MG Effect",
    excerpt: "Un parfum est un cadeau intime et élégant. Découvrez nos conseils pour choisir la fragrance parfaite et offrir une expérience inoubliable, sans craindre de vous tromper.",
    date: "30 Mai 2024",
    readTime: "4 min",
    category: "Conseils Beauté",
    image: "/gift-perfume-mg-effect.png",
    content: `
      <p><strong>(Mots-clés SEO : offrir un parfum, idée cadeau luxe, coffret parfum, cadeau femme, cadeau homme, parfum MG Effect)</strong></p>
      <h2 class="text-2xl font-bold my-4">Offrir un Parfum : Un Geste d'Élégance Intemporel</h2>
      <p class="mb-4">Choisir un parfum pour quelqu'un est l'un des cadeaux les plus personnels et sophistiqués qui soient. C'est offrir une émotion, un sillage, une signature invisible qui accompagnera la personne au quotidien. Pourtant, beaucoup hésitent, paralysés par la peur de "mal choisir". Chez MG Effect, nous croyons que l'intention est reine et nous sommes là pour vous guider.</p>

      <h3 class="text-xl font-bold my-4">1. Pensez à la Personnalité, Pas Seulement au Parfum</h3>
      <p class="mb-4">Avant de sentir, observez. La personne est-elle discrète et élégante ? Peut-être appréciera-t-elle des notes florales et poudrées comme notre <strong>"A Thousand Wishes"</strong>. Est-elle audacieuse et extravertie ? Un parfum sensuel et mémorable comme <strong>"Into The Night"</strong> pourrait être son match parfait. Le parfum est un prolongement de soi.</p>

      <h3 class="text-xl font-bold my-4">2. Fiez-vous à ses Goûts Connus</h3>
      <p class="mb-4">A-t-elle déjà des parfums ou des bougies qu'elle adore ? Si elle est attirée par les senteurs sucrées et réconfortantes, une fragrance gourmande comme <strong>"Warm Vanilla Sugar"</strong> sera un choix réconfortant et sûr. Si elle préfère la fraîcheur, des notes plus vives et pétillantes comme celles de <strong>"Champagne Toast"</strong> feront mouche.</p>

      <h3 class="text-xl font-bold my-4">3. L'Option Sûre et Luxueuse : Le Coffret Découverte</h3>
      <p class="mb-4">En cas de doute, le coffret parfum est l'idée cadeau luxe par excellence. Il offre une expérience complète, un rituel de soin grâce à l'art du "layering" (superposition). Nos <strong>Sets MG Effect (dès 32 000 FCFA)</strong> combinent brume, crème et gel douche pour un sillage intense et une tenue prolongée. C'est un cadeau généreux qui ne déçoit jamais.</p>

      <h3 class="text-xl font-bold my-4">4. L'Expérience Compte Autant que le Contenu</h3>
      <p class="mb-4">Chez MG Effect, chaque produit est pensé comme un bijou. L'emballage luxueux, le design soigné du flacon... L'expérience de déballage (l'unboxing) fait partie intégrante du cadeau. C'est la promesse d'un moment spécial avant même la première vaporisation.</p>

      <h2 class="text-2xl font-bold my-4">Conclusion : Le Plus Beau Cadeau est Votre Attention</h2>
      <p class="mb-4">N'oubliez jamais que l'acte d'offrir un parfum est avant tout une preuve d'affection. En prenant le temps de réfléchir à la personne, vous ne pouvez pas vous tromper. Le véritable cadeau, c'est l'intention et l'amour que vous y mettez.</p>
    `
  },
  {
    id: 9,
    title: "Notre Engagement pour la Qualité : Les Ingrédients d'Exception",
    excerpt: "Derrière chaque sillage MG Effect se cache une promesse : celle de l'excellence. Plongez au cœur de notre philosophie et découvrez la sélection rigoureuse de nos ingrédients.",
    date: "30 Mai 2024",
    readTime: "3 min",
    category: "La Marque",
    image: "/quality-ingredients-mg-effect.png",
    content: `
      <p><strong>(Mots-clés SEO : ingrédients de qualité, parfumerie de niche, haute parfumerie, origine des ingrédients, engagement qualité MG Effect)</strong></p>
      <h2 class="text-2xl font-bold my-4">La Philosophie MG Effect : L'Excellence avant Tout</h2>
      <p class="mb-4">Dans un monde où tout va vite, nous choisissons de prendre le temps. Le temps de sélectionner, de composer et de perfectionner. Notre engagement qualité n'est pas un argument marketing, c'est le fondement de notre marque. Chaque fragrance que nous vous proposons est le fruit d'une recherche obsessionnelle des meilleurs ingrédients, car nous croyons que la haute parfumerie doit être une expérience accessible.</p>

      <h3 class="text-xl font-bold my-4">Une Sélection Rigoureuse, une Promesse de Qualité</h3>
      <p class="mb-4">Nous ne nous contentons pas de trouver un ingrédient ; nous cherchons sa meilleure expression. Qu'il s'agisse d'une fleur, d'une résine ou d'une épice, notre quête est celle de la pureté et de l'intensité. Ce processus garantit non seulement un parfum agréable, mais aussi une complexité et une tenue qui distinguent une simple senteur d'une véritable signature olfactive.</p>

      <h3 class="text-xl font-bold my-4">Lumière sur Nos Ingrédients Emblématiques</h3>
      <p class="mb-4"><strong>La Rose Raffinée :</strong> Loin d'être démodée, la rose est le cœur battant de la parfumerie de niche. Dans des créations comme <strong>"You're The One"</strong>, nous utilisons des essences qui capturent sa facette la plus moderne et veloutée. C'est une rose fraîche, presque croquante, qui apporte une élégance romantique et intemporelle.</p>
      <p class="mb-4"><strong>La Vanille Chaleureuse et Addictive :</strong> La vanille a mille visages. Chez MG Effect, nous l'aimons profonde, riche et réconfortante. Dans notre best-seller <strong>"Warm Vanilla Sugar"</strong>, elle se dévoile sous son jour le plus gourmand, évoquant le caramel et le sucre filé, sans jamais être écœurante. C'est une vanille de caractère, qui crée une addiction immédiate.</p>

      <h3 class="text-xl font-bold my-4">De l'Ingrédient au Sillage : La Tenue et la Complexité</h3>
      <p class="mb-4">La qualité de nos ingrédients de base est la raison pour laquelle nos parfums évoluent si bien sur la peau. Un bon ingrédient libère ses facettes tout au long de la journée, créant un sillage vivant et complexe. C'est cette richesse qui fait qu'un parfum MG Effect ne sent jamais "plat" et vous accompagne avec élégance du matin au soir.</p>

      <h2 class="text-2xl font-bold my-4">Notre Promesse : Une Expérience Inoubliable</h2>
      <p class="mb-4">Choisir MG Effect, c'est choisir une parfumerie qui respecte autant ses clients que les ingrédients qu'elle utilise. C'est la promesse d'une expérience olfactive de haute qualité, pensée pour vous et conçue pour durer.</p>
    `
      },
    {
    id: 12,
    title: "Les Secrets d'un Parfum Réussi : Notes de Tête, de Cœur et de Fond",
    excerpt: "Découvrez la magie de la pyramide olfactive et comment les notes d'un parfum évoluent pour créer une signature unique.",
    date: "30 Mai 2024",
    readTime: "4 min",
    category: "Conseils Parfum",
    image: "/perfume-long-lasting-dakar.png",
    content: `
      <h2 class="text-2xl font-bold my-4">Plongez dans l'Art de la Parfumerie</h2>
      <p class="mb-4">Un parfum est bien plus qu'une simple senteur ; c'est une œuvre d'art liquide, une histoire qui se dévoile au fil des heures. Chez MG Effect, nous croyons que pour vraiment apprécier une fragrance, il faut en comprendre les secrets. Le plus important d'entre eux ? La fameuse <strong>pyramide olfactive</strong>.</p>

      <h3 class="text-xl font-bold my-4">1. Les Notes de Tête : La Première Impression Foudroyante</h3>
      <p class="mb-4">Les notes de tête sont les premières que vous sentez, juste après la vaporisation. Elles sont légères, volatiles et conçues pour intriguer. Pensez à des agrumes pétillants, des herbes fraîches ou des fruits délicats. C'est le coup de foudre, l'accroche qui vous invite à en découvrir plus. Elles durent de quelques minutes à une heure, le temps de laisser place à l'acte suivant.</p>
      <p class="italic mb-4">*Chez MG Effect : Les premières notes de notre brume "Champagne Toast" vous captivent avec une fraîcheur pétillante inoubliable.</p>

      <h3 class="text-xl font-bold my-4">2. Les Notes de Cœur : L'Âme du Parfum</h3>
      <p class="mb-4">Une fois les notes de tête dissipées, le cœur du parfum se révèle. C'est le thème principal, la personnalité de la fragrance. Souvent composées de fleurs opulentes, d'épices chaudes ou de fruits plus ronds, les notes de cœur sont plus complexes et durent plusieurs heures. C'est là que réside le véritable caractère d'un parfum.</p>
      <p class="italic mb-4">*Chez MG Effect : Nos parfums floraux, comme "A Thousand Wishes", révèlent un cœur riche où la pivoine et l'amaretto créent une signature romantique et sophistiquée.</p>

      <h3 class="text-xl font-bold my-4">3. Les Notes de Fond : Le Souvenir Durable</h3>
      <p class="mb-4">Les notes de fond sont les dernières à apparaître, mais les plus tenaces. Elles sont lourdes, riches et servent de fixateur pour prolonger la durée de vie du parfum. Le bois de santal, la vanille, le musc ou l'ambre sont des notes de fond typiques. C'est le sillage que vous laissez derrière vous, le souvenir olfactif qui persiste sur la peau et les vêtements.</p>
      <p class="italic mb-4">*Chez MG Effect : Des fragrances comme "Into The Night" laissent un sillage mémorable grâce à des notes de fond profondes de patchouli et de vanille noire, garantissant un <strong>parfum longue tenue</strong>.</p>

      <h2 class="text-2xl font-bold my-4">Conclusion : L'Importance du Test sur la Peau</h2>
      <p class="mb-4">Vous comprenez maintenant pourquoi un parfum évolue. Il ne faut jamais <strong>choisir son parfum</strong> sur une simple touche en papier. La magie opère au contact de votre peau, dont la chaleur unique révèle chaque facette de la pyramide olfactive. Prenez le temps de laisser une fragrance vivre avec vous pendant quelques heures. C'est le seul moyen de découvrir si son histoire vous correspond vraiment.</p>
    `,
  },
  {
    id: 10,
    title: "Plongée dans nos Collections : Laquelle est faite pour vous ?",
    excerpt: "Boisée, Florale, Orientale, Fraîche... Découvrez nos univers olfactifs et trouvez la collection qui deviendra votre signature.",
    date: "31 Mai 2024",
    readTime: "5 min",
    category: "Collections",
    image: "/buy-authentic-perfume-dakar.png",
    content: `
      <h2 class="text-2xl font-bold my-4">Un Voyage Olfactif à travers les Collections MG Effect</h2>
      <p class="mb-4">Trouver son parfum signature, c'est un peu comme trouver une partie de soi. Chez MG Effect, nous avons classé nos trésors olfactifs en grandes familles pour vous aider à naviguer dans cet univers fascinant. Laissez-vous guider et découvrez la collection qui raconte le mieux votre histoire.</p>

      <h3 class="text-xl font-bold my-4">La Collection Florale : L'Élégance Romantique</h3>
      <p class="mb-4">Pour les âmes délicates, romantiques et ultra-féminines. Cette collection capture l'essence des jardins en fleurs. Parfaite pour les beaux jours, les cérémonies ou simplement pour celles qui aiment laisser un sillage de douceur et de sophistication.</p>
      <p class="mb-4"><strong>Ingrédients Phares :</strong> Rose, Pivoine, Jasmin, Fleur de cerisier.</p>
      <p class="italic mb-4">*Découvrez dans cette collection : "A Thousand Wishes", "You're The One".</p>

      <h3 class="text-xl font-bold my-4">La Collection Gourmande & Fruitée : La Joie de Vivre</h3>
      <p class="mb-4">Si vous êtes d'une nature optimiste, pétillante et un brin espiègle, cette collection est faite pour vous. Des notes sucrées, acidulées et réconfortantes qui évoquent des souvenirs heureux et des moments de pur plaisir. Idéale pour le quotidien, pour se donner un coup de boost et rayonner.</p>
      <p class="mb-4"><strong>Ingrédients Phares :</strong> Vanille, Fraise, Champagne, Pêche.</p>
      <p class="italic mb-4">*Découvrez dans cette collection : "Champagne Toast", "Warm Vanilla Sugar".</p>

      <h3 class="text-xl font-bold my-4">La Collection Orientale & Sensuelle : Le Mystère Envoûtant</h3>
      <p class="mb-4">Pour les personnalités audacieuses, mystérieuses et affirmées. Cette famille olfactive regroupe des senteurs riches, chaudes et épicées. Ce sont des parfums de caractère, parfaits pour le soir, qui laissent une empreinte inoubliable et captivante. Osez <strong>trouver votre parfum signature</strong> parmi ces élixirs puissants.</p>
      <p class="mb-4"><strong>Ingrédients Phares :</strong> Ambre, Patchouli, Vanille Noire, Musc.</p>
      <p class="italic mb-4">*Découvrez dans cette collection : "Into The Night", "Dark Kiss".</p>

      <h3 class="text-xl font-bold my-4">La Collection Boisée & Aromatique : La Force Tranquille</h3>
      <p class="mb-4">Souvent associée aux fragrances masculines, cette collection séduit de plus en plus de femmes par son élégance brute et son caractère apaisant. Pour les esprits libres, authentiques et charismatiques. Le <strong>parfum boisé</strong> est un gage de raffinement et de confiance en soi.</p>
      <p class="mb-4"><strong>Ingrédients Phares :</strong> Acajou (Mahogany), Lavande, Bois de Teck, Musc.</p>
      <p class="italic mb-4">*Découvrez dans cette collection : "Mahogany Teakwood Intense".</p>

      <h2 class="text-2xl font-bold my-4">Explorez et Trouvez Votre Match Parfait</h2>
      <p class="mb-4">Chaque collection est une invitation à explorer une facette de votre personnalité. N'hésitez pas à naviguer entre les différentes <strong>collections de parfums</strong> sur notre site. Et si vous êtes encore indécise, notre quiz est là pour vous guider !</p>
      <div class="my-8 text-center">
        <a href="/quiz" class="inline-block bg-accent text-accent-foreground font-bold py-4 px-8 rounded-none hover:bg-accent/90 transition-colors">
          Faire le Quiz des Senteurs
        </a>
      </div>
    `,
  },
]
