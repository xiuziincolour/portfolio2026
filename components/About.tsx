import React from 'react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './About.css';

interface AboutProps {
  onOpenAboutMe?: () => void;
}

const About: React.FC<AboutProps> = ({ onOpenAboutMe }) => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  return (
    <section id="about" className="about-section">
      <div className="about-container">
         <div className="about-content-wrapper">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: shouldAnimate ? 0.8 : 0 }}
              className="about-image-wrapper"
            >
               <img 
                  src="/img/aboutme/xiuzi-pic.png" 
                  alt="Xiuzi Profile" 
                  className="about-image" 
                />
               <button 
                 className="about-image-button"
                 onClick={onOpenAboutMe}
               >
                 About Me
               </button>
            </motion.div>

            {/* Text Side */}
            <div className="about-text-wrapper">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                 viewport={{ once: false }}
                 transition={{ duration: shouldAnimate ? 0.6 : 0 }}
               >
                 <motion.h2 
                   className="about-title"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.1 : 0 }}
                 >
                   I have a love-hate relationship with chaos.
                 </motion.h2>

                 <motion.div 
                   className="about-description"
                   initial={{ opacity: 0 }}
                   whileInView={shouldAnimate ? { opacity: 1 } : { opacity: 1 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
                 >
                   <p>
                     I love diving into chaos, and I hate leaving it messy. With 6+ years of experience, I've become a professional 'noise-canceling' filter for digital products. I translate messy ideas into confident, scalable systems—because life is too short for clunky interfaces and bad kerning.
                   </p>
                 </motion.div>
               </motion.div>
            </div>
         </div>
      </div>
    </section>
  );
};
export default About;