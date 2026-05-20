import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user] = useState(null); // À remplacer par votre store

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Accueil', icon: '🏠' },
    { path: '/library', label: 'Bibliothèque', icon: '📚' },
    { path: '/timeline', label: 'Timeline', icon: '📅' },      // ← Nouveau : Timeline
    { path: '/guide', label: 'Guide', icon: '📖' },            // ← Guide existant
    { path: '/profile', label: 'Profil', icon: '👤' },
    { path: '/achievements', label: 'Succès', icon: '🏆' },
  ];

  return (
    <div className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        {/* Logo Triforce */}
        <Link to="/" className="navbar-logo">
          <div className="triforce-logo">
            <svg 
              width="40" 
              height="35" 
              viewBox="0 0 100 90" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="triforce-svg"
            >
              <defs>
                <linearGradient id="triforceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#c9a03d' }} />
                  <stop offset="50%" style={{ stopColor: '#ffd700' }} />
                  <stop offset="100%" style={{ stopColor: '#c9a03d' }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Triangle supérieur */}
              <polygon 
                points="50,10 20,70 80,70" 
                fill="url(#triforceGrad)" 
                className="triforce-top"
                filter="url(#glow)"
              />
              
              {/* Triangle gauche */}
              <polygon 
                points="50,45 20,70 35,70" 
                fill="url(#triforceGrad)" 
                className="triforce-left"
                opacity="0.7"
              />
              
              {/* Triangle droit */}
              <polygon 
                points="50,45 65,70 80,70" 
                fill="url(#triforceGrad)" 
                className="triforce-right"
                opacity="0.7"
              />
              
              {/* Effet de lumière centrale */}
              <circle cx="50" cy="45" r="3" fill="#ffd700" className="triforce-core">
                <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            
            <div className="logo-text-container">
              <span className="logo-text">Zelda N64</span>
              <span className="logo-subtitle">Emulator Hub</span>
            </div>
          </div>
        </Link>

        {/* Navigation Desktop */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="navbar-user">
          {!user ? (
            <Link to="/profile">
              <button className="auth-btn">
                <span>⚡</span> Connexion
              </button>
            </Link>
          ) : (
            <div className="user-info">
              <div className="user-avatar">
                <span>👤</span>
              </div>
              <span className="user-name">Link</span>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-nav-link ${location.pathname === item.path ? 'mobile-nav-link-active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
        {!user && (
          <Link to="/profile" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span className="nav-icon">⚡</span> Connexion
          </Link>
        )}
      </div>
    </div>
  );
}