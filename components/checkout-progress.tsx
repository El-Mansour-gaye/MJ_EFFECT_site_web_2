// components/checkout-progress.tsx
"use client";

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  { name: 'Panier', href: '/panier' },
  { name: 'Informations', href: '/commande/informations' },
  { name: 'Paiement', href: '/commande/paiement' },
  { name: 'Confirmation', href: '/commande/ticket' },
];

const getStepStatus = (pathname: string, stepHref: string) => {
  if (pathname.startsWith(stepHref) && stepHref !== '/panier') {
    return 'current';
  }
  if (pathname === '/panier' && stepHref === '/panier') {
    return 'current';
  }
  // A bit more complex logic to determine 'completed'
  const currentIndex = steps.findIndex(s => pathname.startsWith(s.href));
  const stepIndex = steps.findIndex(s => s.href === stepHref);

  if (currentIndex > stepIndex) {
    return 'completed';
  }

  return 'upcoming';
};


export const CheckoutProgress = () => {
    const pathname = usePathname();

    return (
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-center text-sm font-medium text-gray-500">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={cn("flex items-center", step.name === 'Confirmation' ? 'flex-shrink-0' : 'flex-1')}>

               {getStepStatus(pathname, step.href) === 'completed' ? (
                 <Link href={step.href} className="group flex h-full w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary/80">
                            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.454-12.68a.75.75 0 011.04-.208z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span className="ml-4 hidden text-sm font-medium text-gray-900 md:inline-block">{step.name}</span>
                    </span>
                 </Link>
               ) : getStepStatus(pathname, step.href) === 'current' ? (
                <div className="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                        <span className="text-primary">{`0${stepIdx + 1}`}</span>
                    </span>
                    <span className="ml-4 hidden text-sm font-medium text-primary md:inline-block">{step.name}</span>
                </div>
               ) : (
                <div className="group flex h-full w-full items-center">
                    <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                            <span className="text-gray-500 group-hover:text-gray-900">{`0${stepIdx + 1}`}</span>
                        </span>
                        <span className="ml-4 hidden text-sm font-medium text-gray-500 group-hover:text-gray-900 md:inline-block">{step.name}</span>
                    </span>
                </div>
               )}

              {/* Arrow separator */}
              {stepIdx !== steps.length - 1 ? (
                <div className="hidden h-full w-5 md:block" aria-hidden="true">
                  <svg className="h-full w-full text-gray-300" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                    <path d="M0.5 0V30L10.5 40L0.5 50V80" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
    );
  };
