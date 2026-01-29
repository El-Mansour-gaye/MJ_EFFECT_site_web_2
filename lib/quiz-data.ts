
export interface QuizQuestion {
  question: string;
  answers: {
    text: string;
    profile: 'A' | 'B' | 'C';
  }[];
}

export interface QuizResult {
  profile: 'A' | 'B' | 'C';
  title: string;
  description: string;
  products: {
    name: string;
    image: string;
    category: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "Quelle est votre soirée idéale ?",
    answers: [
      { text: "Un dîner élégant dans un restaurant chic.", profile: 'A' },
      { text: "Une fête animée avec mes meilleurs amis.", profile: 'B' },
      { text: "Une soirée cocooning à la maison avec un bon livre.", profile: 'C' },
    ],
  },
  {
    question: "Votre boisson préférée ?",
    answers: [
      { text: "Un verre de vin rouge profond et complexe.", profile: 'A' },
      { text: "Une coupe de champagne pétillante ou un cocktail fruité.", profile: 'B' },
      { text: "Un chocolat chaud crémeux ou un thé apaisant.", profile: 'C' },
    ],
  },
  {
    question: "Si vous étiez une couleur, vous seriez...",
    answers: [
      { text: "Le noir, l'or ou un rouge bordeaux intense.", profile: 'A' },
      { text: "Le rose vif, l'argenté ou un orange éclatant.", profile: 'B' },
      { text: "Le beige, le crème ou un rose poudré.", profile: 'C' },
    ],
  },
  {
    question: "Choisissez un accessory :",
    answers: [
      { text: "Un collier de diamants discret mais scintillant.", profile: 'A' },
      { text: "Des boucles d'oreilles audacieuses qui ne passent pas inaperçues.", profile: 'B' },
      { text: "Une écharpe en cachemire douce et enveloppante.", profile: 'C' },
    ],
  },
];

export const quizResults: QuizResult[] = [
  {
    profile: 'A',
    title: "Votre profil : L'Élégante Sophistiquée",
    description: "Vous êtes attirée par le mystère, l'élégance et le luxe intemporel. Votre sillage doit être aussi mémorable et chic que vous. Vous ne suivez pas les tendances, vous les créez.",
    products: [
      { name: "Into The Night", image: "/into-the-night.png", category: "Brume & Soins Corporels" },
      { name: "Dark Kiss", image: "/dark-kiss.png", category: "Brume & Soins Corporels" },
      { name: "SET #2 Into The Night", image: "/images-pack-produit/set2-pack-de-3.png", category: "Coffret Cadeau" },
    ],
  },
  {
    profile: 'B',
    title: "Votre profil : La Pétillante Sociale",
    description: "Vous êtes l'âme de la fête ! Énergique, joyeuse et toujours optimiste, vous aimez les senteurs qui pétillent et qui attirent l'attention. Votre parfum est une extension de votre personnalité vibrante.",
    products: [
      { name: "Champagne Toast", image: "/champagne-toast.png", category: "Brume & Soins Corporels" },
      { name: "A Thousand Wishes", image: "/a-thousand-wishes.png", category: "Brume & Soins Corporels" },
      { name: "SET #1 Champagne Toast", image: "/images-pack-produit/set1-pack-de-3.png", category: "Coffret Cadeau" },
    ],
  },
  {
    profile: 'C',
    title: "Votre profil : La Douce Rêveuse",
    description: "Vous êtes une âme douce, en quête de confort et de réconfort. Vous appréciez les moments de calme et les plaisirs simples. Votre parfum idéal est une caresse, une senteur gourmande et chaleureuse qui vous enveloppe.",
    products: [
      { name: "Warm Vanilla Sugar", image: "/placeholder.jpg", category: "Brume & Soins Corporels" },
      { name: "Glowtion Body Butter", image: "/glowtion-body-butter.png", category: "Soin Corporel" },
      { name: "SET #6 Warm Vanilla Sugar", image: "/images-pack-produit/set6-pack-de-3.png", category: "Coffret Cadeau" },
    ],
  },
];
