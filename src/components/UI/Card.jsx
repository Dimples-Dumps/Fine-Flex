import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  title, 
  subtitle,
  icon,
  variant = 'default',
  padding = 'md',
  hover = true,
  className = '',
  onClick,
  ...props 
}) => {
  const classes = [
    'card-modern',
    `card-modern-${variant}`,
    `card-modern-padding-${padding}`,
    hover ? 'card-modern-hover' : '',
    onClick ? 'card-modern-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} {...props}>
      {icon && <div className="card-icon">{icon}</div>}
      {title && (
        <div className="card-header">
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;