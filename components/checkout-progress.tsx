// components/checkout-progress.tsx
"use client";

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const steps = [
  { name: 'Panier', href: '/panier' },
  { name: 'Informations', href: '/commande/informations' },
  { name: 'Paiement', href: '/commande/paiement' },
  { name: 'Confirmation', href: '/commande/ticket' },
];

export const CheckoutProgress = () => {
  const pathname = usePathname();

  const getCurrentStepIndex = () => {
    if (pathname.startsWith('/commande/informations')) return 1;
    if (pathname.startsWith('/commande/paiement')) return 2;
    if (pathname.startsWith('/commande/ticket')) return 3;
    return 0; // Default to Panier
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center justify-center space-x-8 sm:space-x-20">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative">
            <div className="flex flex-col items-center space-y-2">
                {stepIdx < currentStepIndex ? (
                <>
                    <div className="absolute inset-0 top-4 left-1/2 w-full h-0.5 bg-primary" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span>{stepIdx + 1}</span>
                    </div>
                    <span className="font-medium text-sm text-primary">{step.name}</span>
                </>
                ) : stepIdx === currentStepIndex ? (
                <>
                    <div className="absolute inset-0 top-4 left-1/2 w-full h-0.5 bg-gray-200" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                    <span>{stepIdx + 1}</span>
                    </div>
                    <span className="font-bold text-sm text-primary">{step.name}</span>
                </>
                ) : (
                <>
                    <div className="absolute inset-0 top-4 left-1/2 w-full h-0.5 bg-gray-200" />
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background text-gray-500">
                    <span>{stepIdx + 1}</span>
                    </div>
                    <span className="text-sm text-gray-500">{step.name}</span>
                </>
                )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
