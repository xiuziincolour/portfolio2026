import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../constants';
import './Header.css';

const Header: React.FC = () => {
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
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${isScrolled ? 'pt-6' : 'pt-0'}`}
      >
        <motion.div
          layout
          className={`pointer-events-auto relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            isScrolled
              ? 'w-[95%] lg:w-auto lg:min-w-[800px] bg-brand-bg/80 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3'
              : 'w-full max-w-7xl px-6 md:px-12 py-8 bg-transparent border-transparent'
          }`}
        >
          {/* Logo */}
          <motion.a 
            layout 
            href="#" 
            className={`font-bold tracking-tighter text-brand-text flex items-center gap-1 transition-all shrink-0 ${isScrolled ? 'text-xl' : 'text-2xl'}`}
          >
            KAIROS<span className="text-brand-blue">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            <div className={`flex items-center transition-all duration-500 ${isScrolled ? 'gap-5 mr-5' : 'gap-8 mr-8'}`}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative group text-sm font-medium text-brand-text/80 hover:text-brand-text transition-colors whitespace-nowrap"
                >
                  {link.name}
                  {/* Animated underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-blue rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <motion.a
              layout
              href="#contact"
              className={`flex items-center gap-2 bg-brand-text text-white rounded-full font-medium transition-colors hover:bg-brand-blue shrink-0 ${
                isScrolled ? 'px-5 py-2 text-xs' : 'px-6 py-3 text-sm'
              }`}
            >
              Let's Talk { !isScrolled && <ArrowRight size={16} className="opacity-70 group-hover:translate-x-1 transition-transform" /> }
            </motion.a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-brand-text p-2 rounded-full hover:bg-gray-100 transition-colors"
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
            className="fixed inset-0 z-[60] bg-brand-bg flex flex-col p-6 md:p-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 shrink-0">
               <span className="text-2xl font-bold tracking-tighter text-brand-text">KAIROS<span className="text-brand-blue">.</span></span>
               <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 bg-white rounded-full hover:bg-gray-100 hover:text-brand-orange transition-colors shadow-sm"
               >
                 <X size={24} />
               </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-block text-4xl sm:text-5xl md:text-6xl font-bold text-brand-text hover:text-brand-blue transition-colors tracking-tight hover:translate-x-4 transform duration-300"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
              >
                  <a
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-3 text-xl font-medium text-brand-blue group"
                  >
                    Start a Project <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </a>
              </motion.div>
            </nav>
            
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="mt-auto pt-12 border-t border-gray-200"
            >
               <div className="flex justify-between items-end">
                 <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Socials</p>
                    <div className="flex gap-4 text-brand-text">
                       <a href="#" className="hover:text-brand-blue transition-colors">LinkedIn</a>
                       <a href="#" className="hover:text-brand-blue transition-colors">Behance</a>
                       <a href="#" className="hover:text-brand-blue transition-colors">Instagram</a>
                    </div>
                 </div>
                 <p className="text-gray-400 text-sm uppercase tracking-widest">Based in SF</p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;