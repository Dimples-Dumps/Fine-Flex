import { useState, useEffect } from 'react';

export const useFinancialHealth = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('questionnaireAnswers');
    if (storedAnswers) {
      try {
        const parsed = JSON.parse(storedAnswers);
        setAnswers(parsed);
      } catch (e) {
        console.error('Error loading answers:', e);
        setAnswers([]);
      }
    }
  }, []);

  const saveAnswers = (newAnswers) => {
    setAnswers(newAnswers);
    localStorage.setItem('questionnaireAnswers', JSON.stringify(newAnswers));
  };

  const clearAnswers = () => {
    setAnswers([]);
    localStorage.removeItem('questionnaireAnswers');
  };

  return {
    answers,
    setAnswers: saveAnswers,
    clearAnswers,
    hasCompleted: answers.length === 14
  };
};