import React, { useState } from 'react';
import { Menu, X, Check, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import './Header.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onNavigateToProjects?: () => void;
  onNavigateToVideos?: () => void;
  onNavigateToAboutMe?: () => void;
}

const EmailIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4.5 6.5H19.5C20.6046 6.5 21.5 7.39543 21.5 8.5V17.5C21.5 18.6046 20.6046 19.5 19.5 19.5H4.5C3.39543 19.5 2.5 18.6046 2.5 17.5V8.5C2.5 7.39543 3.39543 6.5 4.5 6.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M3.8 8.2L12 13.8L20.2 8.2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme, onNavigateToProjects, onNavigateToVideos, onNavigateToAboutMe }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cursorToast, setCursorToast] = useState<{ x: number; y: number; key: number } | null>(null);

  const EMAIL = 'xiuziguo@gmail.com';

  const copyToClipboard = async (text: string) => {
    // Prefer async clipboard API
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleEmailClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Cursor feedback animation near click point
    setCursorToast({ x: e.clientX, y: e.clientY, key: Date.now() });
    window.setTimeout(() => setCursorToast(null), 900);

    try {
      await copyToClipboard(EMAIL);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <header className="header-container">
        <div className="header-nav-wrapper">
          {/* Logo */}
          <a href="#" className="header-logo-link">
            <img 
              src="/img/xiuzi_logo.png" 
              alt="Xiuzi Logo" 
              className="header-logo-image"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="header-desktop-nav">
            <div className="header-nav-links">
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
                ) : link.name === 'Film' && onNavigateToVideos ? (
                  <button
                    key={link.name}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToVideos();
                    }}
                    className="header-nav-link group"
                  >
                    {link.name}
                  </button>
                ) : link.name === 'About' && onNavigateToAboutMe ? (
                  <button
                    key={link.name}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToAboutMe();
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
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-cta-button"
              onClick={handleEmailClick}
              aria-label="Copy email address"
              title="Copy email"
            >
              <EmailIcon size={18} className="header-cta-icon" />
            </button>

            <button
              type="button"
              className={`header-theme-toggle ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
              onClick={onToggleTheme}
              aria-label="Toggle dark mode"
              title="Toggle dark mode"
            >
              <span className="header-theme-toggle-icons" aria-hidden="true">
                <Sun size={14} className="header-theme-icon header-theme-icon-sun" />
                <Moon size={14} className="header-theme-icon header-theme-icon-moon" />
              </span>
              <span className="header-theme-toggle-track" aria-hidden="true">
                <span className="header-theme-toggle-thumb" />
              </span>
            </button>

          {/* Mobile Toggle */}
          <button
            className="header-mobile-toggle"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          </div>
        </div>
      </header>

      {/* Cursor toast near click position */}
      <AnimatePresence>
        {cursorToast && (
          <motion.div
            key={cursorToast.key}
            className="header-cursor-toast"
            style={{ left: cursorToast.x, top: cursorToast.y }}
            initial={{ opacity: 0, y: 0, scale: 0.9 }}
            animate={{ opacity: 1, y: -14, scale: 1 }}
            exit={{ opacity: 0, y: -22, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check size={14} className="header-cursor-toast-icon" />
            Copied
          </motion.div>
        )}
      </AnimatePresence>

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
                  ) : link.name === 'Film' && onNavigateToVideos ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigateToVideos();
                      }}
                      className="header-mobile-nav-link"
                    >
                      {link.name}
                    </button>
                  ) : link.name === 'About' && onNavigateToAboutMe ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigateToAboutMe();
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