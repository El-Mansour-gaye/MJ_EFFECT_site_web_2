
import { ShieldCheck, Gem, Users, Globe } from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';

const features = [
  {
    icon: <Globe size={40} className="text-orange-500" />,
    title: "Import Direct USA",
    description: "L'assurance de produits authentiques et certifiés.",
  },
  {
    icon: <ShieldCheck size={40} className="text-orange-500" />,
    title: "Qualité Contrôlée",
    description: "Testés par nos soins pour garantir votre sécurité.",
  },
  {
    icon: <Users size={40} className="text-orange-500" />,
    title: "Conseils d'Experts",
    description: "Des recommandations uniques pour des résultats réels.",
  },
    {
    icon: <Gem size={40} className="text-orange-500" />,
    title: "Fierté Locale",
    description: "Le meilleur de la beauté américaine, adapté au Sénégal.",
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
