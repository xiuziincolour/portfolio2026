import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('xiuziguo@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-email-wrapper">
          <button
            type="button"
            onClick={handleCopy}
            className="contact-email-button group"
            aria-label="Copy email address"
          >
            <Mail className="contact-email-icon" aria-hidden />
            <span>xiuziguo@gmail.com</span>
          </button>

          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 10, x: '-50%' }}
                className="contact-toast"
              >
                <Check size={16} className="contact-toast-icon" aria-hidden />
                Email copied to clipboard!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
export default Contact;
