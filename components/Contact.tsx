import React, { useState } from 'react';
import { Mail, Linkedin, Dribbble, Globe, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './Contact.css';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  const handleCopy = () => {
    navigator.clipboard.writeText('hello@kairos.design');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-brand-bg border-t border-gray-200 relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: shouldAnimate ? 0.6 : 0 }}
           className="flex flex-col items-center"
        >
           <motion.div 
             className="flex items-center gap-4 mb-8"
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
             viewport={{ once: false }}
             transition={{ duration: shouldAnimate ? 0.5 : 0 }}
           >
             <motion.span 
               className="h-[1px] w-12 bg-brand-orange"
               initial={{ width: 0 }}
               whileInView={shouldAnimate ? { width: 48 } : { width: 48 }}
               viewport={{ once: false }}
               transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
             ></motion.span>
             <span className="text-brand-orange font-medium tracking-widest uppercase text-xs">Contact</span>
             <motion.span 
               className="h-[1px] w-12 bg-brand-orange"
               initial={{ width: 0 }}
               whileInView={shouldAnimate ? { width: 48 } : { width: 48 }}
               viewport={{ once: false }}
               transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
             ></motion.span>
           </motion.div>

          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-brand-text mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.1 : 0 }}
          >
            Let's start a conversation.
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-500 mb-12 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
          >
            Interested in working together? I'm currently open to new opportunities and collaborations. Click the email below to copy it.
          </motion.p>
          
          <motion.div 
            className="relative mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.3 : 0 }}
          >
             <button 
                onClick={handleCopy}
                className="group relative inline-flex items-center gap-3 sm:gap-4 text-3xl sm:text-4xl md:text-6xl font-bold text-brand-blue hover:text-brand-orange transition-all duration-300 pb-2 border-b-2 border-brand-blue/20 hover:border-brand-orange/50"
             >
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                <span className="tracking-tight">hello@kairos.design</span>
                
                <span className="absolute -right-8 sm:-right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 bg-white p-2 rounded-full shadow-sm hidden sm:block">
                    <Copy size={20} />
                </span>
             </button>

             {/* Toast Notification */}
             <AnimatePresence>
                {copied && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, x: "-50%" }}
                        className="absolute top-full mt-6 left-1/2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-xl whitespace-nowrap z-10"
                    >
                        <Check size={16} className="text-green-400" />
                        Email copied to clipboard!
                    </motion.div>
                )}
             </AnimatePresence>
          </motion.div>

          <motion.div 
            className="flex flex-col gap-6 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.4 : 0 }}
          >
             <motion.span 
               className="text-xs font-bold uppercase tracking-widest text-gray-400"
               initial={{ opacity: 0 }}
               whileInView={shouldAnimate ? { opacity: 1 } : { opacity: 1 }}
               viewport={{ once: false }}
               transition={{ duration: shouldAnimate ? 0.5 : 0, delay: shouldAnimate ? 0.5 : 0 }}
             >
               Connect on Social
             </motion.span>
             <motion.div 
               className="flex gap-4"
               initial={{ opacity: 0, y: 20 }}
               whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
               viewport={{ once: false }}
               transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.6 : 0 }}
             >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 group" aria-label="LinkedIn">
                  <Linkedin size={24} className="text-[#2864C6] group-hover:text-brand-orange transition-colors" />
                </a>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 group" aria-label="Dribbble">
                  <Dribbble size={24} className="text-[#2864C6] group-hover:text-brand-orange transition-colors" />
                </a>
                <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded-full shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300 group" aria-label="Behance">
                  <Globe size={24} className="text-[#2864C6] group-hover:text-brand-orange transition-colors" />
                </a>
             </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;