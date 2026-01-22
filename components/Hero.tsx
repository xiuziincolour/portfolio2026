import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-content"
        >
          <div className="flex flex-col gap-2">
            <motion.span 
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Product & Brand Designer
            </motion.span>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Crafting Digital <br />
              <motion.span 
                className="hero-title-gray"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Experiences.
              </motion.span>
            </motion.h1>
          </div>

          <motion.div 
            className="hero-description-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
             <p className="hero-description">
               I help startups build confident, scalable, and user-centric products that stand out in a crowded market.
             </p>

             <a href="#projects" className="hero-scroll-link group">
                Scroll for work 
                <span className="hero-scroll-icon-wrapper">
                  <ArrowDown size={14} className="hero-scroll-icon" />
                </span>
             </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;