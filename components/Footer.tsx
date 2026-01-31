import React from 'react';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './Footer.css';

interface FooterProps {
  variant?: 'default' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ variant = 'default' }) => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  return (
    <footer className={`footer ${variant === 'dark' ? 'footer-dark' : ''}`}>
      <div className="footer-container">
        <motion.div 
          className="footer-social-wrapper"
          initial={{ opacity: 0, y: 20 }}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
        >
          <motion.span 
            className="footer-social-label"
            initial={{ opacity: 0 }}
            whileInView={shouldAnimate ? { opacity: 1 } : { opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.5 : 0, delay: shouldAnimate ? 0.3 : 0 }}
          >
            Connect on Social
          </motion.span>
          <motion.div 
            className="footer-social-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.4 : 0 }}
          >
            <a href="mailto:xiuziguo@gmail.com" className="footer-social-link group" aria-label="Email">
              <Mail size={18} className="footer-social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/xiuzi-guo/" target="_blank" rel="noopener noreferrer" className="footer-social-link group" aria-label="LinkedIn">
              <Linkedin size={18} className="footer-social-icon" />
            </a>
            <a href="https://github.com/xiuziincolour" target="_blank" rel="noopener noreferrer" className="footer-social-link group" aria-label="GitHub">
              <Github size={18} className="footer-social-icon" />
            </a>
            <a href="https://www.instagram.com/xiuziincolour" target="_blank" rel="noopener noreferrer" className="footer-social-link group" aria-label="Instagram">
              <Instagram size={18} className="footer-social-icon" />
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.p 
        className="footer-copyright"
        initial={{ opacity: 0, y: 20 }}
        whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.5 : 0 }}
      >
        © {new Date().getFullYear()} Xiuzi Design. All rights reserved.
      </motion.p>
    </footer>
  );
};

export default Footer;