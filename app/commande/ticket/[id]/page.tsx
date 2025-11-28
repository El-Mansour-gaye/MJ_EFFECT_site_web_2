// /app/commande/ticket/[id]/page.tsx
"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const TicketPage = () => {
  const params = useParams();
  const { id } = params;

  const handleDownloadPdf = () => {
    // Logic to generate and download PDF would go here.
    // For now, we just log a message.
    // Example using html2canvas and jspdf:
    /*
    const input = document.getElementById('ticket-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`ticket-${id}.pdf`);
    });
    */
    console.log('Downloading PDF for ticket:', id);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div id="ticket-content" className="p-8 border rounded-lg max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">Votre Ticket de Commande</h1>
        <p className="mb-2">Merci pour votre commande !</p>
        <p className="text-lg font-mono bg-gray-100 p-2 rounded">
          ID Ticket: {id}
        </p>
        <p className="mt-4 text-sm">Veuillez conserver ce numéro pour le suivi.</p>
      </div>

      <div className="mt-8 space-y-4">
        <Button onClick={handleDownloadPdf}>
          Télécharger le PDF
        </Button>
        <div>
            <Button asChild variant="outline">
                <Link href="/commande/confirmation">
                    Terminer
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
