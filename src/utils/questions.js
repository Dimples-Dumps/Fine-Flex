export const questions = [
  {
    id: 1,
    text: "Do you have an emergency fund that covers at least 3-6 months of expenses?",
    category: "Emergency Fund",
    icon: "🛡️",
    description: "An emergency fund is crucial for financial stability",
    options: [
      { value: 0, label: "No emergency fund", description: "At risk of financial shock" },
      { value: 1, label: "Less than 1 month", description: "Minimal protection" },
      { value: 2, label: "1-3 months", description: "Good start, could be better" },
      { value: 3, label: "3+ months", description: "Excellent financial cushion" }
    ]
  },
  {
    id: 2,
    text: "What percentage of your monthly income do you save?",
    category: "Savings Rate",
    icon: "💰",
    description: "Regular saving builds wealth over time",
    options: [
      { value: 0, label: "0% (I don't save)", description: "Living paycheck to paycheck" },
      { value: 1, label: "1-5%", description: "Minimal savings habit" },
      { value: 2, label: "6-10%", description: "Good savings discipline" },
      { value: 3, label: "11% or more", description: "Excellent savings habit" }
    ]
  },
  {
    id: 3,
    text: "What is your debt-to-income ratio? (Monthly debt payments ÷ monthly income)",
    category: "Debt Management",
    icon: "📊",
    description: "Lower debt means more financial freedom",
    options: [
      { value: 0, label: "Over 40%", description: "Dangerously high debt" },
      { value: 1, label: "30-40%", description: "High debt burden" },
      { value: 2, label: "20-29%", description: "Manageable debt" },
      { value: 3, label: "Under 20%", description: "Healthy debt level" }
    ]
  },
  {
    id: 4,
    text: "How often do you carry a balance on your credit cards?",
    category: "Credit Usage",
    icon: "💳",
    description: "Credit card debt can be expensive",
    options: [
      { value: 0, label: "Always carry a balance", description: "Paying high interest" },
      { value: 1, label: "Often carry a balance", description: "Interest costs add up" },
      { value: 2, label: "Sometimes carry a balance", description: "Occasional interest" },
      { value: 3, label: "Never/Always pay in full", description: "No interest charges" }
    ]
  },
  {
    id: 5,
    text: "Are you contributing to retirement accounts (401k, IRA, etc.)?",
    category: "Retirement Planning",
    icon: "🏖️",
    description: "Early retirement savings compound significantly",
    options: [
      { value: 0, label: "Not contributing", description: "Missing compound growth" },
      { value: 1, label: "Less than 5% of income", description: "Minimal contribution" },
      { value: 2, label: "5-10% of income", description: "Good contribution level" },
      { value: 3, label: "Over 10% of income", description: "Excellent retirement savings" }
    ]
  },
  {
    id: 6,
    text: "Do you follow a monthly budget?",
    category: "Budgeting",
    icon: "📋",
    description: "Budgeting helps control spending",
    options: [
      { value: 0, label: "No budget", description: "No spending awareness" },
      { value: 1, label: "Occasionally budget", description: "Inconsistent tracking" },
      { value: 2, label: "Most months", description: "Good budgeting habit" },
      { value: 3, label: "Always follow a budget", description: "Excellent financial discipline" }
    ]
  },
  {
    id: 7,
    text: "Do you have adequate insurance coverage (health, life, auto)?",
    category: "Insurance",
    icon: "🛡️",
    description: "Insurance protects against catastrophic events",
    options: [
      { value: 0, label: "No insurance", description: "High financial risk" },
      { value: 1, label: "Minimal coverage", description: "Some protection" },
      { value: 2, label: "Adequate coverage", description: "Well protected" },
      { value: 3, label: "Comprehensive coverage", description: "Fully protected" }
    ]
  },
  {
    id: 8,
    text: "How would you rate your investment knowledge?",
    category: "Investing",
    icon: "📈",
    description: "Investment knowledge helps grow wealth",
    options: [
      { value: 0, label: "No knowledge", description: "Missing growth opportunities" },
      { value: 1, label: "Basic knowledge", description: "Starting to learn" },
      { value: 2, label: "Moderate knowledge", description: "Making informed decisions" },
      { value: 3, label: "Advanced knowledge", description: "Strategic investor" }
    ]
  },
  {
    id: 9,
    text: "Do you have clear, written financial goals?",
    category: "Goal Setting",
    icon: "🎯",
    description: "Written goals increase achievement likelihood",
    options: [
      { value: 0, label: "No goals", description: "No direction" },
      { value: 1, label: "Mental goals only", description: "Unclear objectives" },
      { value: 2, label: "Written short-term goals", description: "Good focus" },
      { value: 3, label: "Written short & long-term goals", description: "Excellent planning" }
    ]
  },
  {
    id: 10,
    text: "Do you know your credit score?",
    category: "Credit Awareness",
    icon: "📊",
    description: "Credit score affects loan terms",
    options: [
      { value: 0, label: "No idea", description: "Credit blind spot" },
      { value: 1, label: "Have an idea but not sure", description: "Vague awareness" },
      { value: 2, label: "Check occasionally", description: "Good monitoring" },
      { value: 3, label: "Monitor regularly", description: "Excellent credit management" }
    ]
  },
  {
    id: 11,
    text: "How do you track your expenses?",
    category: "Expense Tracking",
    icon: "✍️",
    description: "Tracking reveals spending patterns",
    options: [
      { value: 0, label: "Don't track", description: "No spending awareness" },
      { value: 1, label: "Mentally track", description: "Inaccurate tracking" },
      { value: 2, label: "Use spreadsheet", description: "Manual but effective" },
      { value: 3, label: "Use app/software", description: "Automated tracking" }
    ]
  },
  {
    id: 12,
    text: "Do you pay your bills on time?",
    category: "Payment Habits",
    icon: "⏰",
    description: "On-time payments build credit",
    options: [
      { value: 0, label: "Often late", description: "Hurts credit score" },
      { value: 1, label: "Sometimes late", description: "Occasional issues" },
      { value: 2, label: "Rarely late", description: "Generally reliable" },
      { value: 3, label: "Always on time", description: "Excellent payment history" }
    ]
  },
  {
    id: 13,
    text: "How often do you read financial literature or educate yourself about finance?",
    category: "Financial Literacy",
    icon: "📚",
    description: "Continuous learning improves decisions",
    options: [
      { value: 0, label: "Never", description: "Limited knowledge" },
      { value: 1, label: "Rarely", description: "Occasional learning" },
      { value: 2, label: "Occasionally", description: "Growing knowledge" },
      { value: 3, label: "Regularly", description: "Always learning" }
    ]
  },
  {
    id: 14,
    text: "What is your net worth trend?",
    category: "Wealth Building",
    icon: "📈",
    description: "Net worth growth indicates financial health",
    options: [
      { value: 0, label: "Decreasing", description: "Financial decline" },
      { value: 1, label: "Stagnant", description: "No wealth growth" },
      { value: 2, label: "Slowly increasing", description: "Building slowly" },
      { value: 3, label: "Rapidly increasing", description: "Accelerating wealth" }
    ]
  }
];