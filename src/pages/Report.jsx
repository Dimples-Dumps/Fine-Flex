import React, { useState, useEffect } from 'react';
import { useFinancialHealth } from '../hooks/useFinancialHealth';
import { calculateHealthScore, getHealthCategory, getCategoryBreakdown, getRecommendations } from '../utils/calculations';
import { questions } from '../utils/questions';
import Navbar from '../components/Layout/Navbar';
import { FaDownload, FaChartBar, FaListAlt, FaTrophy, FaChartLine } from 'react-icons/fa';
import './Report.css';

const Report = () => {
  const { answers } = useFinancialHealth();
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState(null);
  const [breakdown, setBreakdown] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (answers && answers.length === 14) {
      const calculatedScore = calculateHealthScore(answers);
      setScore(calculatedScore);
      setCategory(getHealthCategory(calculatedScore));
      setBreakdown(getCategoryBreakdown(answers, questions));
      setRecommendations(getRecommendations(answers, questions));
    }
  }, [answers]);

  const handleDownload = () => {
    const reportData = {
      generatedOn: new Date().toISOString(),
      user: JSON.parse(localStorage.getItem('financialHealthUser')),
      healthScore: { score, category: category?.label, description: category?.description },
      answers: answers.map((answer, index) => ({
        question: questions[index].text,
        category: questions[index].category,
        answer: questions[index].options.find(opt => opt.value === answer)?.label,
        score: answer,
        maxScore: 3
      })),
      categoryBreakdown: breakdown,
      recommendations
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `financial-report-${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
  };

  if (!answers || answers.length !== 14) {
    return (
      <>
        <Navbar />
        <div className="report-page">
          <div className="container">
            <div className="no-data-state">
              <div className="no-data-icon">📊</div>
              <h3>No Assessment Data Found</h3>
              <p>Please complete the financial health questionnaire first to view your detailed report.</p>
              <button className="btn-primary-custom" onClick={() => window.location.href = '/questionnaire'}>
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="report-page">
        <div className="report-header-bg" style={{ background: 'linear-gradient(135deg, #0096D1 0%, #33abda 100%)' }}>
          <div className="container">
            <div className="report-header">
              <div>
                <h1>Financial Health Report</h1>
                <p>Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <button className="btn-primary-custom" onClick={handleDownload}>
                <FaDownload /> Download Report
              </button>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="score-summary-card" style={{ background: `linear-gradient(135deg, #0096D1, #33abda)` }}>
            <div className="score-big">
              <div className="score-value">{score}</div>
              <div className="score-max">/100</div>
            </div>
            <div className="score-info">
              <div className="category-badge">
                <span className="category-icon">{category?.icon}</span>
                <span className="category-name">{category?.label}</span>
              </div>
              <p className="category-description">{category?.description}</p>
              <div className="advice-box">
                <strong>💡 Expert Advice:</strong> {category?.advice}
              </div>
            </div>
          </div>

          <div className="report-tabs">
            <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <FaChartBar /> Overview
            </button>
            <button className={`tab-btn ${activeTab === 'breakdown' ? 'active' : ''}`} onClick={() => setActiveTab('breakdown')}>
              <FaListAlt /> Category Breakdown
            </button>
            <button className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`} onClick={() => setActiveTab('recommendations')}>
              <FaTrophy /> Recommendations
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="insight-cards">
                <div className="insight-card">
                  <div className="insight-icon">📈</div>
                  <div className="insight-content">
                    <h4>Financial Health Score</h4>
                    <p className="insight-value">{score}/100</p>
                    <p className="insight-desc">Your score is {score >= 70 ? 'above' : 'below'} the average of 65</p>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">🎯</div>
                  <div className="insight-content">
                    <h4>Top Performing Category</h4>
                    <p className="insight-value">{Object.entries(breakdown).sort((a, b) => b[1].score - a[1].score)[0]?.[0]}</p>
                    <p className="insight-desc">Your strongest financial area</p>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">⚠️</div>
                  <div className="insight-content">
                    <h4>Area for Improvement</h4>
                    <p className="insight-value">{Object.entries(breakdown).sort((a, b) => a[1].score - b[1].score)[0]?.[0]}</p>
                    <p className="insight-desc">Focus on improving this area first</p>
                  </div>
                </div>
              </div>

              <div className="strength-weakness">
                <div className="strength-section">
                  <h4>✅ Strengths</h4>
                  {Object.entries(breakdown).filter(([_, data]) => data.score >= 2).slice(0, 4).map(([category, data]) => (
                    <div key={category} className="strength-item">
                      <span className="item-icon">{data.icon}</span>
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
                <div className="weakness-section">
                  <h4>⚠️ Areas to Improve</h4>
                  {Object.entries(breakdown).filter(([_, data]) => data.score <= 1).slice(0, 4).map(([category, data]) => (
                    <div key={category} className="weakness-item">
                      <span className="item-icon">{data.icon}</span>
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="breakdown-tab">
              {Object.entries(breakdown).map(([category, data]) => (
                <div key={category} className="category-item">
                  <div className="category-header">
                    <div className="category-title">
                      <span className="category-icon">{data.icon}</span>
                      <span className="category-name">{category}</span>
                    </div>
                    <div className="category-score">{data.score}/3</div>
                  </div>
                  <div className="progress-bar-custom">
                    <div className="progress-fill" style={{ width: `${(data.score / 3) * 100}%`, background: 'linear-gradient(135deg, #0096D1, #33abda)' }}></div>
                  </div>
                  <p className="category-desc">{data.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="recommendations-tab">
              <div className="recommendation-header">
                <FaChartLine style={{ color: '#0096D1' }} />
                <h3>Personalized Action Plan</h3>
              </div>
              {recommendations.length > 0 && (
                <div className="action-plan">
                  <h4>Priority Actions</h4>
                  {recommendations[0]?.items.map((item, index) => (
                    <div key={index} className="action-item">
                      <div className="action-number" style={{ background: 'linear-gradient(135deg, #0096D1, #33abda)' }}>{index + 1}</div>
                      <div className="action-content">
                        <strong style={{ color: '#0096D1' }}>{item.category}</strong>
                        <p>{item.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="next-steps">
                <h4>Next Steps</h4>
                <ul>
                  <li>✓ Review your progress monthly</li>
                  <li>✓ Set up automatic savings transfers</li>
                  <li>✓ Track your expenses using a budgeting app</li>
                  <li>✓ Re-take the assessment in 3 months</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;