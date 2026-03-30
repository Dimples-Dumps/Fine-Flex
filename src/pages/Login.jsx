import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaArrowRight, FaShieldAlt, FaChartLine, FaWallet, FaUserPlus, FaSignInAlt, FaUser, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, user } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Load remembered email from localStorage
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isRegistering) {
      // Registration validation
      if (!name.trim()) {
        setError('Please enter your full name');
        setLoading(false);
        return;
      }

      if (!email.trim()) {
        setError('Please enter your email address');
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      if (!password) {
        setError('Please enter a password');
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      try {
        await register(name, email, password);
        setSuccess('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // Login validation
      if (!email.trim()) {
        setError('Please enter your email address');
        setLoading(false);
        return;
      }

      if (!password) {
        setError('Please enter your password');
        setLoading(false);
        return;
      }

      try {
        await login(email, password);
        
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  const features = [
    { icon: FaShieldAlt, title: 'Secure & Private', description: 'Your data is encrypted and protected' },
    { icon: FaChartLine, title: 'Smart Analytics', description: 'Get insights about your financial health' },
    { icon: FaWallet, title: 'Rewards Program', description: 'Earn exclusive rewards for good habits' }
  ];

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="bg-blob blob-1" style={{ background: `linear-gradient(135deg, #0096D1, #33abda)` }}></div>
        <div className="bg-blob blob-2" style={{ background: `linear-gradient(135deg, #FFF4EA, #fff8f0)` }}></div>
        <div className="bg-blob blob-3" style={{ background: `linear-gradient(135deg, #0077a8, #f5e5d8)` }}></div>
      </div>
      
      <div className="login-container">
        <div className="login-left fade-in-up">
          <div className="login-brand">
            <div className="brand-icon"></div>
            <h1 className="brand-name">
              <span className="brand-name-first">Fine</span>
              <span className="brand-name-second">Flex</span>
            </h1>
            <p className="brand-tagline">Your Journey to Financial Freedom Starts Here</p>
          </div>
          
          <div className="features-section">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="feature-card slide-in-left" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon" style={{ background: `linear-gradient(135deg, #0096D1, #33abda)` }}>
                    <Icon />
                  </div>
                  <div className="feature-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="login-right scale-in">
          <div className="login-card">
            <div className="card-header">
              <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
              <p>{isRegistering ? 'Sign up to start your financial journey' : 'Sign in to access your financial dashboard'}</p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}
              
              {isRegistering && (
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {isRegistering && (
                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              )}
              
              {!isRegistering && (
                <div className="remember-me">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Remember me</span>
                  </label>
                </div>
              )}
              
              <button type="submit" className="login-btn" disabled={loading} style={{ background: `linear-gradient(135deg, #0096D1, #33abda)` }}>
                {loading ? (
                  <div className="spinner-small"></div>
                ) : (
                  <>
                    {isRegistering ? 'Create Account' : 'Sign In'}
                    {isRegistering ? <FaUserPlus className="btn-icon" /> : <FaArrowRight className="btn-icon" />}
                  </>
                )}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}
                <button 
                  type="button" 
                  className="toggle-mode-btn"
                  onClick={toggleMode}
                >
                  {isRegistering ? 'Sign In' : 'Create Account'}
                </button>
              </p>
            </div>

            {!isRegistering && (
              <div className="demo-info">
                <div className="demo-title">✨ New to FinHealth?</div>
                <div className="demo-details">
                  <FaCheckCircle /> Create a free account to get started
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;