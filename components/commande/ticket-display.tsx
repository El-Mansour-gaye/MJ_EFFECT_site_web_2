"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface TicketDisplayProps {
  code: string;
}

export default function TicketDisplay({ code }: TicketDisplayProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // You could add user feedback here, e.g., an alert
    }
  };

  return (
    <div className="text-center bg-black py-6 px-4 rounded-md border border-dashed border-gray-700">
      <p className="text-sm text-gray-400 uppercase tracking-wider">Votre code de commande unique</p>
      <p className="font-mono text-3xl md:text-4xl font-bold text-orange-500 tracking-widest my-3">{code}</p>
      <Button onClick={handleCopy} variant="ghost" size="sm" className="text-white hover:bg-gray-800">
        {isCopied ? (
          <>
            <Check className="mr-2 h-4 w-4 text-green-500" />
            Copié !
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copier le code
          </>
        )}
      </Button>
    </div>
  );
}
