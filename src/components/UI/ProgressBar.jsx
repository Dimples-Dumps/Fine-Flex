import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, max = 100, showLabel = true, animated = true, color = 'primary' }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="progress-modern">
      <div className="progress-bar-container">
        <div 
          className={`progress-bar-fill progress-bar-${color} ${animated ? 'progress-animated' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="progress-label">
          <span className="progress-value">{value}</span>
          <span className="progress-max">/{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;