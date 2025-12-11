
import { ShieldCheck, Gem, Users, Globe } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

const features = [
  {
    icon: <Gem size={40} className="text-orange-500" />,
    title: "Produits Authentiques des USA",
    description: "Nous importons directement des États-Unis une sélection exclusive de produits de beauté, vous garantissant une qualité et une authenticité inégalées.",
  },
  {
    icon: <ShieldCheck size={40} className="text-orange-500" />,
    title: "Qualité Testée et Approuvée",
    description: "Votre sécurité est notre priorité. Chaque article est rigoureusement testé par nos experts avant d'être proposé, assurant efficacité et fiabilité.",
  },
  {
    icon: <Users size={40} className="text-orange-500" />,
    title: "Conseils Personnalisés",
    description: "Nous croyons en une approche sur-mesure. Profitez de l'expertise de notre équipe pour des recommandations adaptées à vos besoins uniques.",
  },
    {
    icon: <Globe size={40} className="text-orange-500" />,
    title: "Une Expertise Locale au Sénégal",
    description: "En tant qu'entreprise sénégalaise, nous comprenons les besoins spécifiques de notre marché et nous nous engageons à servir notre communauté avec passion.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
            <span className="font-normal">Pourquoi</span> <span className="font-bold">nous Choisir ?</span>
          </h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-serif mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
