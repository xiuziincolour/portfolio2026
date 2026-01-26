import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { MOTION_ITEMS } from '../constants';
import './MotionGallery.css';

const MotionGallery: React.FC = () => {
  return (
    <section id="motion" className="motion-gallery-section">
      <div className="motion-gallery-container">
        <div className="motion-gallery-header">
           <h2 className="motion-gallery-title">Motion & Interaction</h2>
           <span className="motion-gallery-badge">03 — Animation</span>
        </div>

        <div className="motion-gallery-grid">
          {MOTION_ITEMS.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="motion-gallery-item"
            >
              <img src={item.placeholder} alt={item.title} className="motion-gallery-image" />
              
              <div className="motion-gallery-overlay">
                  <div className="motion-gallery-play-button">
                    <Play size={24} className="motion-gallery-play-icon" />
                  </div>
              </div>

              <div className="motion-gallery-info">
                  <h3 className="motion-gallery-item-title">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotionGallery;