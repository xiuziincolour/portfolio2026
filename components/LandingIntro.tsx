import React from 'react';
import { motion } from 'framer-motion';
import './LandingIntro.css';

const LandingIntro: React.FC = () => {
  return (
    <section className="landing-intro">
      <div className="landing-intro-container">
        <div className="landing-intro-text">
          <motion.h2
            className="landing-intro-headline"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            I have a love-hate relationship with chaos.
          </motion.h2>
          <motion.div
            className="landing-intro-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              I love diving into chaos, and I hate leaving it messy. With 6+ years of experience, I've become a professional &lsquo;noise-canceling&rsquo; filter for digital products. I translate messy ideas into confident, scalable systems—because life is too short for clunky interfaces and bad kerning.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
