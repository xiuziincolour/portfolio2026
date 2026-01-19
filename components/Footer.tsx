import React from 'react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './Footer.css';

const Footer: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  return (
    <footer className="bg-brand-bg py-12 px-6 md:px-12 border-t border-brand-text/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: shouldAnimate ? 0.6 : 0 }}
        >
           <img 
             src="/img/xiuzi_logo.png" 
             alt="Xiuzi Logo" 
             className="h-6 w-auto"
           />
        </motion.div>
        <motion.p 
          className="text-gray-400 text-sm font-medium"
          initial={{ opacity: 0, x: 20 }}
          whileInView={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: shouldAnimate ? 0.6 : 0 }}
        >
          © {new Date().getFullYear()} Kairos Design. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;