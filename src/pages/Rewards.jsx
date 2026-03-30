import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useFinancialHealth } from '../hooks/useFinancialHealth';
import { calculateHealthScore, getRewardsBasedOnScore } from '../utils/calculations';
import Navbar from '../components/Layout/Navbar';
import { FaQrcode, FaStar, FaTrophy, FaTimes, FaCopy, FaCheck } from 'react-icons/fa';
import './Rewards.css';

const Rewards = () => {
  const { answers } = useFinancialHealth();
  const [score, setScore] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (answers && answers.length === 14) {
      const calculatedScore = calculateHealthScore(answers);
      setScore(calculatedScore);
      const availableRewards = getRewardsBasedOnScore(calculatedScore);
      setRewards(availableRewards);
    }
  }, [answers]);

  const handleViewQR = async (reward) => {
    setSelectedReward(reward);
    try {
      const qrData = JSON.stringify({
        reward: reward.name,
        code: reward.code,
        discount: reward.discount,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        user: JSON.parse(localStorage.getItem('financialHealthUser'))
      });
      const url = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#0096D1',
          light: '#ffffff'
        }
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => {
    setSelectedReward(null);
    setQrCodeUrl('');
  };

  if (!answers || answers.length !== 14) {
    return (
      <>
        <Navbar />
        <div className="rewards-page">
          <div className="container">
            <div className="no-rewards-state">
              <div className="state-icon">🎁</div>
              <h3>Complete Your Assessment First</h3>
              <p>Take the financial health questionnaire to unlock exclusive rewards based on your score.</p>
              <button className="btn-primary-custom" onClick={() => window.location.href = '/questionnaire'}>
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const tier = score >= 80 ? 'Platinum' : score >= 60 ? 'Gold' : score >= 40 ? 'Silver' : 'Bronze';

  return (
    <>
      <Navbar />
      <div className="rewards-page">
        <div className="rewards-hero" style={{ background: 'linear-gradient(135deg, #0096D1 0%, #33abda 100%)' }}>
          <div className="container">
            <div className="hero-content">
              <FaTrophy className="hero-icon" />
              <h1>Your Rewards</h1>
              <p>Based on your financial health score of <strong>{score}/100</strong>, you've earned the <strong className={`tier-${tier.toLowerCase()}`}>{tier}</strong> tier</p>
              <div className="tier-badge">
                <FaStar />
                <span>{tier} Member</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="rewards-stats">
            <div className="stat">
              <div className="stat-value">{rewards.length}</div>
              <div className="stat-label">Available Rewards</div>
            </div>
            <div className="stat">
              <div className="stat-value">{score}/100</div>
              <div className="stat-label">Health Score</div>
            </div>
            <div className="stat">
              <div className="stat-value">30 Days</div>
              <div className="stat-label">Validity</div>
            </div>
          </div>

          <div className="rewards-grid">
            {rewards.map((reward, index) => (
              <div key={reward.id} className="reward-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="card-glow" style={{ background: 'linear-gradient(135deg, #0096D1, #33abda)' }}></div>
                <div className="reward-badge" style={{ background: 'linear-gradient(135deg, #0096D1, #33abda)' }}>{reward.discount}</div>
                <div className="reward-icon">{reward.icon}</div>
                <h3 className="reward-name">{reward.name}</h3>
                <p className="reward-description">{reward.description}</p>
                <div className="reward-code-section">
                  <code className="reward-code">{reward.code}</code>
                  <button className="copy-btn" onClick={() => handleCopyCode(reward.code)} style={{ color: '#0096D1' }}>
                    {copied ? <FaCheck /> : <FaCopy />}
                  </button>
                </div>
                <button className="redeem-btn" onClick={() => handleViewQR(reward)}>
                  <FaQrcode /> Get QR Code
                </button>
              </div>
            ))}
          </div>

          <div className="rewards-footer">
            <p>🎉 New rewards added monthly based on your financial progress!</p>
            <p>Complete the assessment again in 3 months to unlock more rewards.</p>
          </div>
        </div>
      </div>

      {selectedReward && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="modal-content-reward">
              <div className="reward-header-modal">
                <div className="reward-icon-modal">{selectedReward.icon}</div>
                <h2>{selectedReward.name}</h2>
                <div className="reward-discount-modal" style={{ background: 'linear-gradient(135deg, #0096D1, #33abda)' }}>{selectedReward.discount}</div>
              </div>
              
              <div className="qr-section">
                {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="qr-code-image" />}
                <p className="qr-instruction">Show this QR code at the merchant to redeem your reward</p>
              </div>
              
              <div className="reward-details-modal">
                <div className="detail-row">
                  <strong>Promo Code:</strong>
                  <code className="promo-code" style={{ color: '#0096D1' }}>{selectedReward.code}</code>
                </div>
                <div className="detail-row">
                  <strong>Valid Until:</strong>
                  <span>30 days from now</span>
                </div>
                <div className="detail-row">
                  <strong>Terms:</strong>
                  <span>One-time use per customer. Cannot combine with other offers.</span>
                </div>
              </div>
              
              <button className="close-modal-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Rewards;