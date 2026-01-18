import React from 'react';
import { motion } from 'framer-motion';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './About.css';

const About: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-brand-bg text-brand-text">
      <div className="max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
            {/* Image Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: shouldAnimate ? 0.8 : 0 }}
              className="w-full md:w-5/12 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100"
            >
               <img 
                  src="https://picsum.photos/800/1200?random=99" 
                  alt="Kairos Profile" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
            </motion.div>

            {/* Text Side */}
            <div className="w-full md:w-7/12">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                 viewport={{ once: false }}
                 transition={{ duration: shouldAnimate ? 0.6 : 0 }}
               >
                 <motion.span 
                   className="text-brand-blue font-bold tracking-widest uppercase text-xs mb-6 block"
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.5 : 0 }}
                 >
                   The Designer
                 </motion.span>
                 
                 <motion.h2 
                   className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.1 : 0 }}
                 >
                   Driven by clarity in a <br/> chaotic world.
                 </motion.h2>

                 <motion.div 
                   className="space-y-6 text-lg text-gray-500 leading-relaxed font-light"
                   initial={{ opacity: 0 }}
                   whileInView={shouldAnimate ? { opacity: 1 } : { opacity: 1 }}
                   viewport={{ once: false }}
                   transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
                 >
                   <p>
                     Hi, I'm Kairos. I believe that good design is invisible. It should work so smoothly you don't notice it until you realize how effortless the experience was.
                   </p>
                   <p>
                     With over 6 years of experience, I specialize in stripping away the non-essential to reveal the core purpose. My approach is <strong>"Digital-first"</strong>: creating confident, scalable systems that adapt to human needs.
                   </p>
                 </motion.div>

                 <motion.div 
                   className="mt-12 flex gap-12"
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
                      <h4 className="text-3xl font-bold text-brand-text">6+</h4>
                      <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Years Exp.</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: shouldAnimate ? 0.5 : 0, delay: shouldAnimate ? 0.5 : 0 }}
                    >
                      <h4 className="text-3xl font-bold text-brand-text">50+</h4>
                      <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Projects</p>
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