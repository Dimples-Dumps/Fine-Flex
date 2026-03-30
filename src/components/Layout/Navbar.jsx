import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaClipboardList, FaFileAlt, FaGift, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FaHome },
    { path: '/questionnaire', label: 'Assessment', icon: FaClipboardList },
    { path: '/report', label: 'Report', icon: FaFileAlt },
    { path: '/rewards', label: 'Rewards', icon: FaGift }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          <div className="logo-icon"></div>
          <div className="logo-text">
            <span className="logo-gradient">Fine</span>
            <span>Flex Platinum</span>
          </div>
        </Link>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="link-icon" />
                <span className="link-text">{item.label}</span>
                {isActive && <div className="active-indicator" />}
              </Link>
            );
          })}
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <img src={user?.avatar} alt={user?.name} className="user-avatar" />
            <div className="user-details">
              <span className="user-name">{user?.name}</span>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn" title="Logout" style={{ background: `linear-gradient(135deg, ${'#0096D1'}, ${'#33abda'})` }}>
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;