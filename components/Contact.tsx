import React, { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './Contact.css';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  const handleCopy = () => {
    navigator.clipboard.writeText('xiuziguo@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
           viewport={{ once: false }}
           transition={{ duration: shouldAnimate ? 0.6 : 0 }}
           className="contact-content-wrapper"
        >
           <motion.div 
             className="contact-badge-wrapper"
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
             viewport={{ once: false }}
             transition={{ duration: shouldAnimate ? 0.5 : 0 }}
           >
             <motion.span 
               className="contact-badge-line"
               initial={{ width: 0 }}
               whileInView={shouldAnimate ? { width: 48 } : { width: 48 }}
               viewport={{ once: false }}
               transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
             ></motion.span>
             <span className="contact-badge">Contact</span>
             <motion.span 
               className="contact-badge-line"
               initial={{ width: 0 }}
               whileInView={shouldAnimate ? { width: 48 } : { width: 48 }}
               viewport={{ once: false }}
               transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
             ></motion.span>
           </motion.div>

          <motion.h2 
            className="contact-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.1 : 0 }}
          >
            Let's start a conversation.
          </motion.h2>
          <motion.p 
            className="contact-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
          >
            Interested in working together? I'm currently open to new opportunities and collaborations. Click the email below to copy it.
          </motion.p>
          
          <motion.div 
            className="contact-email-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.3 : 0 }}
          >
             <button 
                onClick={handleCopy}
                className="contact-email-button group"
             >
                <Mail className="contact-email-icon" />
                <span>xiuziguo@gmail.com</span>
                
                <span className="contact-email-copy-icon">
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
                        className="contact-toast"
                    >
                        <Check size={16} className="contact-toast-icon" />
                        Email copied to clipboard!
                    </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;