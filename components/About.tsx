import React from 'react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './About.css';

const About: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  return (
    <section id="about" className="about-section py-24 px-6 md:px-12 bg-brand-bg text-brand-text">
      <div className="about-container max-w-7xl mx-auto">
         <div className="about-content-wrapper flex flex-col md:flex-row gap-12 md:gap-24 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: shouldAnimate ? 0.8 : 0 }}
              className="about-image-wrapper w-full md:w-5/12 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100"
            >
               <img 
                  src="https://picsum.photos/800/1200?random=99" 
                  alt="Xiuzi Profile" 
                  className="about-image w-full h-full object-cover" 
                />
            </motion.div>

            {/* Text Side */}
            <div className="about-text-wrapper w-full md:w-7/12">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                 viewport={{ once: false }}
                 transition={{ duration: shouldAnimate ? 0.6 : 0 }}
               >
                 <motion.span 
                   className="about-badge"
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.5 : 0 }}
                 >
                   The Designer
                 </motion.span>
                 
                 <motion.h2 
                   className="about-title"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.1 : 0 }}
                 >
                   Driven by clarity in a <br/> chaotic world.
                 </motion.h2>

                 <motion.div 
                   className="about-description space-y-6"
                   initial={{ opacity: 0 }}
                   whileInView={shouldAnimate ? { opacity: 1 } : { opacity: 1 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
                 >
                   <p>
                     Hi, I'm Xiuzi. I believe that good design is invisible. It should work so smoothly you don't notice it until you realize how effortless the experience was.
                   </p>
                   <p>
                     With over 6 years of experience, I specialize in stripping away the non-essential to reveal the core purpose. My approach is <strong className="text-brand-text font-medium">"Digital-first"</strong>: creating confident, scalable systems that adapt to human needs.
                   </p>
                 </motion.div>

                 <motion.div 
                   className="about-stats mt-12"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.3 : 0 }}
                 >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: shouldAnimate ? 0.5 : 0, delay: shouldAnimate ? 0.4 : 0 }}
                    >
                      <h4 className="about-stat-number">6+</h4>
                      <p className="about-stat-label">Years Exp.</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: shouldAnimate ? 0.5 : 0, delay: shouldAnimate ? 0.5 : 0 }}
                    >
                      <h4 className="about-stat-number">50+</h4>
                      <p className="about-stat-label">Projects</p>
                    </motion.div>
                 </motion.div>
               </motion.div>
            </div>
         </div>
      </div>
    </section>
  );
};
export default About;