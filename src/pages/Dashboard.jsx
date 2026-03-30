import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFinancialHealth } from '../hooks/useFinancialHealth';
import { calculateHealthScore, getHealthCategory, getRecommendations } from '../utils/calculations';
import { questions } from '../utils/questions';
import Navbar from '../components/Layout/Navbar';
import { FaChartLine, FaClipboardList, FaGift, FaArrowRight, FaTrophy, FaShieldAlt, FaWallet, FaPiggyBank, FaChartPie } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { answers } = useFinancialHealth();
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (answers && answers.length === 14) {
      const calculatedScore = calculateHealthScore(answers);
      setScore(calculatedScore);
      setCategory(getHealthCategory(calculatedScore));
      setRecommendations(getRecommendations(answers, questions));
    }
  }, [answers]);

  const hasCompleted = answers && answers.length === 14;
  const stats = [
    { icon: FaChartLine, label: 'Health Score', value: hasCompleted ? `${score}/100` : 'Pending', color: '#0096D1' },
    { icon: FaPiggyBank, label: 'Savings Habit', value: hasCompleted ? 'Active' : 'Not Set', color: '#33abda' },
    { icon: FaChartPie, label: 'Questions', value: hasCompleted ? '14/14' : `${answers?.length || 0}/14`, color: '#0096D1' },
    { icon: FaTrophy, label: 'Rewards', value: hasCompleted ? `${Math.floor(score / 20) + 1} Available` : 'Complete Quiz', color: '#33abda' }
  ];

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div className="dashboard-hero" style={{ background: `linear-gradient(135deg, #0096D1 0%, #33abda 100%)` }}>
          <div className="container">
            <div className="hero-content">
              <div className="welcome-section">
                <h1 className="welcome-title">
                  Welcome back, <span className="text-gradient">{user?.name}</span>!
                </h1>
                <p className="welcome-subtitle">Track your financial journey and unlock rewards</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {!hasCompleted ? (
            <div className="assessment-prompt">
              <div className="prompt-icon">📋</div>
              <h3>Complete Your Financial Assessment</h3>
              <p>Answer 14 questions to get your personalized financial health score, insights, and exclusive rewards.</p>
              <button className="btn-primary-custom" onClick={() => navigate('/questionnaire')}>
                Start Assessment <FaArrowRight />
              </button>
            </div>
          ) : (
            <>
              <div className="stats-grid">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)` }}>
                        <Icon />
                      </div>
                      <div className="stat-info">
                        <h3>{stat.value}</h3>
                        <p>{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="dashboard-grid">
                <div className="score-section-main">
                  <div className="score-card-large" style={{ background: `linear-gradient(135deg, #0096D1, #33abda)` }}>
                    <div className="score-circle">
                      <div className="score-number">{score}</div>
                      <div className="score-label">Health Score</div>
                    </div>
                    <div className="score-details">
                      <div className="score-category">
                        <span className="category-icon">{category?.icon}</span>
                        <span className="category-name">{category?.label}</span>
                      </div>
                      <p className="score-description">{category?.description}</p>
                    </div>
                  </div>
                </div>

                <div className="actions-section">
                  <div className="action-buttons">
                    <button className="action-btn" onClick={() => navigate('/questionnaire')}>
                      <FaClipboardList />
                      <span>Retake Assessment</span>
                    </button>
                    <button className="action-btn" onClick={() => navigate('/report')}>
                      <FaChartLine />
                      <span>Full Report</span>
                    </button>
                    <button className="action-btn primary" onClick={() => navigate('/rewards')} style={{ background: `linear-gradient(135deg, #0096D1, #33abda)` }}>
                      <FaGift />
                      <span>Claim Rewards</span>
                    </button>
                  </div>
                </div>
              </div>

              {recommendations.length > 0 && (
                <div className="recommendations-section">
                  <h3>
                    <FaShieldAlt /> Personalized Recommendations
                  </h3>
                  <div className="recommendations-grid">
                    {recommendations[0]?.items.map((item, index) => (
                      <div key={index} className="recommendation-card" style={{ borderLeftColor: '#0096D1' }}>
                        <div className="rec-header">
                          <span className="rec-category" style={{ color: '#0096D1' }}>{item.category}</span>
                          <span className="rec-score">Score: {item.currentScore}/3</span>
                        </div>
                        <p className="rec-suggestion">{item.suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="quick-tips">
                <h3>
                  <FaWallet /> Financial Wellness Tips
                </h3>
                <div className="tips-carousel">
                  <div className="tip-item" style={{ background: `linear-gradient(135deg, #0096D110, #33abda10)` }}>
                    <div className="tip-icon">💰</div>
                    <p>Save 20% of your income using the 50/30/20 rule</p>
                  </div>
                  <div className="tip-item" style={{ background: `linear-gradient(135deg, #0096D110, #33abda10)` }}>
                    <div className="tip-icon">📊</div>
                    <p>Track your expenses weekly to identify spending patterns</p>
                  </div>
                  <div className="tip-item" style={{ background: `linear-gradient(135deg, #0096D110, #33abda10)` }}>
                    <div className="tip-icon">🎯</div>
                    <p>Set SMART financial goals for better outcomes</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;