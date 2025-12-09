"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function TicketFinder() {
  const [ticketCode, setTicketCode] = useState('');
  const router = useRouter();

  const handleFindTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (ticketCode.trim()) {
      router.push(`/commande/ticket/${ticketCode.trim()}`);
    }
  };

  return (
    <form onSubmit={handleFindTicket} className="flex flex-col gap-3">
       <input
        type="text"
        value={ticketCode}
        onChange={(e) => setTicketCode(e.target.value)}
        placeholder="Votre code de commande"
        className="bg-white/10 border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
      />
      <button type="submit" className="bg-accent text-accent-foreground px-4 py-3 text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors">
        Retrouver
      </button>
    </form>
  );
}
