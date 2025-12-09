
'use client';

import React, { useState } from 'react';
import { quizQuestions, quizResults } from '@/lib/quiz-data';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Profile = 'A' | 'B' | 'C';

export default function QuizInteractive() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<{ [key in Profile]: number }>({ A: 0, B: 0, C: 0 });
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerClick = (profile: Profile) => {
    setScores((prevScores) => ({
      ...prevScores,
      [profile]: prevScores[profile] + 1,
    }));

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateResult = () => {
    const finalScores = Object.entries(scores);
    finalScores.sort((a, b) => b[1] - a[1]);
    const winningProfile = finalScores[0][0] as Profile;
    return quizResults.find((result) => result.profile === winningProfile);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({ A: 0, B: 0, C: 0 });
    setQuizFinished(false);
  };

  const progressPercentage = (currentQuestionIndex / quizQuestions.length) * 100;

  const questionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  const resultVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  };

  if (quizFinished) {
    const result = calculateResult();
    if (!result) return null;

    return (
      <motion.div
        className="text-center max-w-3xl mx-auto"
        variants={resultVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold font-playfair-display mb-4">{result.title}</h2>
        <p className="text-lg text-white/80 mb-8">{result.description}</p>
        <h3 className="text-2xl font-semibold mb-6">Nos recommandations pour vous :</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {result.products.map((product) => (
            <div key={product.name} className="bg-[#1A1A1A] overflow-hidden">
              <div className="relative w-full h-64">
                <Image src={product.image} alt={product.name} layout="fill" objectFit="cover" />
              </div>
              <div className="p-4">
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-white/70">{product.category}</p>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={restartQuiz} variant="outline" className="rounded-none">
          Recommencer le Quiz
        </Button>
      </motion.div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-2 mb-8">
        <motion.div
          className="bg-orange-500 h-2"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercentage}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          variants={questionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 h-24">
            {`Question ${currentQuestionIndex + 1}/${quizQuestions.length}: ${currentQuestion.question}`}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.answers.map((answer) => (
              <Button
                key={answer.text}
                onClick={() => handleAnswerClick(answer.profile)}
                variant="outline"
                className="w-full text-lg py-8 rounded-none transition-all duration-300 hover:bg-white hover:text-black"
              >
                {answer.text}
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
