import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const classes = [
    'btn-modern',
    `btn-modern-${variant}`,
    `btn-modern-${size}`,
    fullWidth ? 'btn-modern-full' : '',
    loading ? 'btn-modern-loading' : '',
    className
  ].filter(Boolean).join(' ');

  const getGradient = () => {
    if (variant === 'primary') return 'linear-gradient(135deg, #D8ABB7, #DABE85)';
    if (variant === 'danger') return 'linear-gradient(135deg, #e6a0a0, #d48a8a)';
    if (variant === 'success') return 'linear-gradient(135deg, #8B9A6E, #7A885C)';
    return '';
  };

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      style={variant === 'primary' || variant === 'danger' || variant === 'success' ? { background: getGradient() } : {}}
      {...props}
    >
      {loading && <FaSpinner className="btn-spinner" />}
      {!loading && icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
      {!loading && icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
};

export default Button;