export const calculateHealthScore = (answers) => {
  if (!answers || answers.length === 0) return 0;
  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  const maxScore = answers.length * 3;
  const percentage = (totalScore / maxScore) * 100;
  return Math.round(percentage);
};

export const getHealthCategory = (score) => {
  if (score >= 80) return {
    label: 'Excellent',
    description: 'Outstanding financial health! You\'re a role model for financial wellness.',
    color: '#22c55e',
    bg: 'linear-gradient(135deg, #22c55e, #16a34a)',
    icon: '🏆',
    advice: 'Keep up the great work! Consider mentoring others and exploring advanced investment strategies.'
  };
  if (score >= 60) return {
    label: 'Good',
    description: 'You\'re on the right track! With some improvements, you can achieve excellent financial health.',
    color: '#0ea5e9',
    bg: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    icon: '👍',
    advice: 'Focus on building your emergency fund and increasing your savings rate.'
  };
  if (score >= 40) return {
    label: 'Fair',
    description: 'Your financial health needs attention. Small changes can make a big difference.',
    color: '#eab308',
    bg: 'linear-gradient(135deg, #eab308, #ca8a04)',
    icon: '⚠️',
    advice: 'Start with creating a budget and paying down high-interest debt.'
  };
  if (score >= 20) return {
    label: 'Needs Improvement',
    description: 'Significant work needed. Start with small, achievable financial goals.',
    color: '#f97316',
    bg: 'linear-gradient(135deg, #f97316, #ea580c)',
    icon: '🔴',
    advice: 'Seek financial education, create a strict budget, and consider credit counseling.'
  };
  return {
    label: 'Critical',
    description: 'Immediate action required. Your financial stability is at risk.',
    color: '#ef4444',
    bg: 'linear-gradient(135deg, #ef4444, #dc2626)',
    icon: '🚨',
    advice: 'Consult a financial advisor immediately. Focus on essential expenses and debt management.'
  };
};

export const getCategoryBreakdown = (answers, questions) => {
  const categories = {};
  questions.forEach((q, index) => {
    categories[q.category] = {
      score: answers[index],
      maxScore: 3,
      icon: q.icon,
      description: q.description
    };
  });
  return categories;
};

export const getRecommendations = (answers, questions) => {
  const recommendations = [];
  const weakAreas = [];
  
  answers.forEach((answer, index) => {
    if (answer <= 1) {
      weakAreas.push({
        category: questions[index].category,
        currentScore: answer,
        suggestion: getSuggestionForCategory(questions[index].category, answer)
      });
    }
  });
  
  if (weakAreas.length > 0) {
    recommendations.push({
      title: "Priority Areas for Improvement",
      items: weakAreas.slice(0, 3)
    });
  }
  
  return recommendations;
};

const getSuggestionForCategory = (category, score) => {
  const suggestions = {
    "Emergency Fund": score === 0 ? "Start with saving $1,000 as a starter emergency fund" : "Set up automatic transfers to build your emergency fund",
    "Savings Rate": "Aim to save at least 20% of your income using the 50/30/20 rule",
    "Debt Management": "Use the debt avalanche or snowball method to pay down debt faster",
    "Credit Usage": "Always pay your credit card balance in full to avoid interest charges",
    "Retirement Planning": "Take advantage of employer 401(k) matching - it's free money!",
    "Budgeting": "Try the 50/30/20 budget: 50% needs, 30% wants, 20% savings",
    "Insurance": "Review your coverage annually to ensure adequate protection",
    "Investing": "Start with low-cost index funds and dollar-cost averaging",
    "Goal Setting": "Use SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound",
    "Credit Awareness": "Check your credit report annually for free at AnnualCreditReport.com",
    "Expense Tracking": "Use apps like Mint or YNAB to automatically track expenses",
    "Payment Habits": "Set up automatic bill payments to never miss a due date",
    "Financial Literacy": "Read one finance book per month or follow trusted finance podcasts",
    "Wealth Building": "Focus on increasing income and investing the difference"
  };
  return suggestions[category] || "Focus on improving this area with small, consistent steps";
};

export const getRewardsBasedOnScore = (score) => {
  const baseRewards = [
    {
      id: 1,
      name: "Premium Financial eBook Bundle",
      description: "Get access to 5 bestselling financial literacy ebooks valued at $99",
      discount: "FREE",
      code: "FINREADS2024",
      icon: "📚",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Coffee Shop Voucher",
      description: "Enjoy a complimentary coffee at any partner café",
      discount: "$10 OFF",
      code: "COFFEE10",
      icon: "☕",
      color: "from-amber-500 to-orange-500"
    }
  ];
  
  if (score >= 50) {
    baseRewards.push({
      id: 3,
      name: "15% Off at Spurs Sports Bar",
      description: "Enjoy 15% off your total bill at any Spurs location. Perfect for game nights!",
      discount: "15% OFF",
      code: "SPURS15HEALTH",
      icon: "🏀",
      color: "from-red-500 to-orange-500"
    });
  }
  
  if (score >= 60) {
    baseRewards.push({
      id: 4,
      name: "Gym Membership Discount",
      description: "20% off any gym membership plan for 3 months",
      discount: "20% OFF",
      code: "FITLIFE20",
      icon: "💪",
      color: "from-green-500 to-emerald-500"
    });
  }
  
  if (score >= 70) {
    baseRewards.push({
      id: 5,
      name: "Free Financial Planning Session",
      description: "30-minute consultation with a certified financial planner",
      discount: "FREE SESSION",
      code: "PLANNOW30",
      icon: "🎯",
      color: "from-blue-500 to-cyan-500"
    });
  }
  
  if (score >= 80) {
    baseRewards.push({
      id: 6,
      name: "Premium Investment Course",
      description: "Access to advanced investment strategies course ($299 value)",
      discount: "FREE",
      code: "INVESTPRO",
      icon: "📈",
      color: "from-indigo-500 to-purple-500"
    });
  }
  
  return baseRewards;
};