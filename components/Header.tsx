import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import './Header.css';

interface HeaderProps {
  onNavigateToProjects?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToProjects }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transformation earlier for a responsive feel
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`header-container ${isScrolled ? 'scrolled' : ''}`}
      >
        <motion.div
          layout
          className={`header-nav-wrapper ${isScrolled ? 'scrolled' : ''}`}
        >
          {/* Logo */}
          <motion.a 
            layout 
            href="#" 
            className={`header-logo-link ${isScrolled ? 'scrolled' : ''}`}
          >
            <img 
              src="/img/xiuzi_logo.png" 
              alt="Xiuzi Logo" 
              className="header-logo-image"
            />
          </motion.a>

          {/* Desktop Nav */}
          <nav className="header-desktop-nav">
            <div className={`header-nav-links ${isScrolled ? 'scrolled' : ''}`}>
              {NAV_LINKS.map((link) => (
                link.name === 'Projects' && onNavigateToProjects ? (
                  <button
                    key={link.name}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToProjects();
                    }}
                    className="header-nav-link group"
                  >
                    {link.name}
                  </button>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="header-nav-link group"
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
            
            <motion.a
              layout
              href="#contact"
              className={`header-cta-button ${isScrolled ? 'scrolled' : ''}`}
            >
              Let's Talk { !isScrolled && <ArrowRight size={16} className="header-cta-icon" /> }
            </motion.a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </motion.div>
      </motion.header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="header-mobile-menu"
          >
            <div className="header-mobile-menu-header">
               <img 
                 src="/img/xiuzi_logo.png" 
                 alt="Xiuzi Logo" 
                 className="header-mobile-logo-image"
               />
               <button 
                onClick={() => setMobileMenuOpen(false)}
                className="header-mobile-menu-close"
               >
                 <X size={24} />
               </button>
            </div>
            
            <nav className="header-mobile-nav">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  {link.name === 'Projects' && onNavigateToProjects ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigateToProjects();
                      }}
                      className="header-mobile-nav-link"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="header-mobile-nav-link"
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="header-mobile-cta-wrapper"
              >
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="header-mobile-cta"
                  >
                    Start a Project <ArrowRight size={24} className="header-mobile-cta-icon" />
                  </a>
              </motion.div>
            </nav>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="header-mobile-footer"
            >
               <div className="header-mobile-footer-content">
                 <div>
                    <p className="header-mobile-social-label">Socials</p>
                    <div className="header-mobile-social-links">
                       <a href="#" className="header-mobile-social-link">LinkedIn</a>
                       <a href="#" className="header-mobile-social-link">Behance</a>
                       <a href="#" className="header-mobile-social-link">Instagram</a>
                    </div>
                 </div>
                 <p className="header-mobile-location">Based in SF</p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;