import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFinancialHealth } from '../hooks/useFinancialHealth';
import { questions } from '../utils/questions';
import Navbar from '../components/Layout/Navbar';
import { FaArrowLeft, FaArrowRight, FaCheckCircle, FaClipboardList, FaChartLine, FaTrophy, FaCheck } from 'react-icons/fa';
import './Questionnaire.css';

const Questionnaire = () => {
  const navigate = useNavigate();
  const { answers, setAnswers } = useFinancialHealth();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(answers.length === 14 ? answers : new Array(14).fill(null));
  const [showSummary, setShowSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answeredStatus, setAnsweredStatus] = useState([]);
  const questionRef = useRef(null);

  useEffect(() => {
    const status = selectedAnswers.map(answer => answer !== null);
    setAnsweredStatus(status);
  }, [selectedAnswers]);

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  const handleAnswer = (value) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = value;
    setSelectedAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentStep < 13) {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handleNext = () => {
    if (selectedAnswers[currentStep] !== null) {
      if (currentStep < 13) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowSummary(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswers.every(answer => answer !== null)) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnswers(selectedAnswers);
      navigate('/dashboard');
    }
  };

  const handleRetake = () => {
    setSelectedAnswers(new Array(14).fill(null));
    setCurrentStep(0);
    setShowSummary(false);
    setAnsweredStatus(new Array(14).fill(false));
  };

  const goToQuestion = (index) => {
    setCurrentStep(index);
    setShowSummary(false);
  };

  const completedCount = selectedAnswers.filter(a => a !== null).length;
  const progress = (completedCount / 14) * 100;

  if (showSummary) {
    return (
      <>
        <Navbar />
        <div className="questionnaire-page">
          <div className="questionnaire-container">
            <div className="container">
              <div className="summary-header">
                <FaClipboardList className="summary-icon" />
                <h1>Review Your Answers</h1>
                <p>Please review your responses before submitting</p>
              </div>

              <div className="summary-card">
                <div className="summary-stats">
                  <div className="stat-badge">
                    <FaCheckCircle />
                    <span>{completedCount}/14 Questions Answered</span>
                  </div>
                  <div className="stat-badge">
                    <FaChartLine />
                    <span>Ready to submit</span>
                  </div>
                </div>

                <div className="summary-answers-list">
                  {questions.map((q, index) => (
                    <div key={q.id} className="summary-answer-item">
                      <div className="summary-question-header">
                        <div className="question-number">Q{index + 1}</div>
                        <div className="question-category-badge">{q.category}</div>
                      </div>
                      <div className="summary-question-text">{q.text}</div>
                      <div className="summary-answer-text">
                        {selectedAnswers[index] !== null ? (
                          <>
                            <FaCheck className="answer-check" />
                            {q.options.find(opt => opt.value === selectedAnswers[index])?.label}
                          </>
                        ) : (
                          <span className="not-answered">Not answered</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-actions">
                  <button className="btn-outline-custom" onClick={handleRetake}>
                    Retake Assessment
                  </button>
                  <button 
                    className="btn-primary-custom" 
                    onClick={handleSubmit}
                    disabled={completedCount !== 14}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit & View Results'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentStep];
  const isAnswered = selectedAnswers[currentStep] !== null;

  return (
    <>
      <Navbar />
      <div className="questionnaire-page">
        <div className="questionnaire-container">
          <div className="container">
            <div className="questionnaire-header">
              <div className="progress-info">
                <div className="progress-stats">
                  <span className="current-question">Question {currentStep + 1}</span>
                  <span className="total-questions">of 14</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="completion-badge">
                  <FaCheckCircle />
                  <span>{completedCount} Completed</span>
                </div>
              </div>
            </div>

            <div className="questionnaire-layout">
              <div className="question-sidebar">
                <div className="sidebar-header">
                  <h4>Questions</h4>
                  <span className="sidebar-subtitle">Click to navigate</span>
                </div>
                <div className="question-nav">
                  {questions.map((q, index) => (
                    <button
                      key={q.id}
                      className={`nav-question ${currentStep === index ? 'active' : ''} ${selectedAnswers[index] !== null ? 'completed' : ''}`}
                      onClick={() => goToQuestion(index)}
                    >
                      <span className="nav-number">{index + 1}</span>
                      <span className="nav-status">
                        {selectedAnswers[index] !== null && <FaCheck />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="question-main" ref={questionRef}>
                <div className="question-card">
                  <div className="question-category-wrapper">
                    <span className="question-category-icon">{currentQuestion.icon}</span>
                    <span className="question-category-name">{currentQuestion.category}</span>
                  </div>
                  
                  <h2 className="question-text">{currentQuestion.text}</h2>
                  <p className="question-description">{currentQuestion.description}</p>

                  <div className="options-grid">
                    {currentQuestion.options.map((option, idx) => (
                      <button
                        key={option.value}
                        className={`option-card ${selectedAnswers[currentStep] === option.value ? 'selected' : ''}`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <div className="option-marker">
                          {selectedAnswers[currentStep] === option.value ? <FaCheck /> : idx + 1}
                        </div>
                        <div className="option-content">
                          <div className="option-label">{option.label}</div>
                          <div className="option-description">{option.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="navigation-buttons">
                    <button
                      className="btn-outline-custom"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                    >
                      <FaArrowLeft /> Previous
                    </button>
                    <button
                      className="btn-primary-custom"
                      onClick={handleNext}
                      disabled={!isAnswered}
                    >
                      {currentStep === 13 ? 'Review Answers' : 'Next Question'} <FaArrowRight />
                    </button>
                  </div>
                </div>

                <div className="motivation-tip">
                  <FaTrophy className="tip-icon" />
                  <div className="tip-content">
                    <strong>Financial Wisdom Tip:</strong>
                    <p>{getTipForQuestion(currentStep)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getTipForQuestion = (questionIndex) => {
  const tips = [
    "Emergency funds prevent debt during unexpected events. Aim for 3-6 months of expenses.",
    "Saving 20% of your income is ideal, but even 10% makes a huge difference over time.",
    "Keep your debt-to-income ratio below 36% for better financial flexibility.",
    "Paying credit cards in full avoids interest and improves your credit score.",
    "Start retirement savings early - compound interest is your best friend!",
    "A budget isn't restrictive - it's a tool for financial freedom.",
    "Insurance protects your assets and future. Don't skip it!",
    "Investing knowledge grows with time. Start with low-cost index funds.",
    "Written goals are 42% more likely to be achieved. Write them down!",
    "Your credit score affects loan rates. Check it regularly for free.",
    "Tracking expenses reveals where your money actually goes.",
    "On-time payments are 35% of your credit score. Never miss one!",
    "Financial education is an investment that always pays dividends.",
    "Net worth growth is the true measure of financial health."
  ];
  return tips[questionIndex] || "Every small step counts toward financial freedom!";
};

export default Questionnaire;