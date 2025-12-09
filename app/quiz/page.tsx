
import React from 'react';
import QuizInteractive from '@/components/quiz-interactive';

export default function QuizPage() {
  return (
    <main className="container mx-auto px-4 py-16 min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold font-playfair-display mb-4">Découvrez Votre Signature Olfactive</h1>
        <p className="text-lg text-white/80">
          Répondez à quelques questions pour révéler le profil de senteur qui vous correspond parfaitement et découvrir les collections MG Effect faites pour vous.
        </p>
      </div>
      <QuizInteractive />
    </main>
  );
}
