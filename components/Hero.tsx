import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 bg-brand-bg">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8 md:gap-12"
        >
          <div className="flex flex-col gap-2">
            <motion.span 
              className="text-brand-blue font-medium tracking-widest uppercase text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Product & Brand Designer
            </motion.span>
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-brand-text leading-[0.9] -ml-[0.05em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              Crafting Digital <br />
              <motion.span 
                className="text-brand-gray/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Experiences.
              </motion.span>
            </motion.h1>
          </div>

          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
             <p className="max-w-md text-lg md:text-xl text-gray-500 leading-relaxed">
               I help startups build confident, scalable, and user-centric products that stand out in a crowded market.
             </p>

             <a href="#projects" className="group flex items-center gap-3 text-brand-text font-medium text-sm uppercase tracking-widest hover:text-brand-blue transition-colors">
                Scroll for work 
                <span className="p-2 border border-gray-300 rounded-full group-hover:border-brand-blue transition-colors">
                  <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </span>
             </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;