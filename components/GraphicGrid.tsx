import React from 'react';
import { motion } from 'framer-motion';
import { GRAPHICS } from '../constants';
import './GraphicGrid.css';

const GraphicGrid: React.FC = () => {
  return (
    <section id="graphic" className="graphic-grid-section">
      <div className="graphic-grid-container">
        <div className="graphic-grid-header">
           <h2 className="graphic-grid-title">Visual Playground</h2>
           <span className="graphic-grid-badge">02 — Graphic</span>
        </div>

        <div className="graphic-grid-masonry">
          {GRAPHICS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="graphic-grid-item"
            >
              {/* Tape Element */}
              <div 
                className={`graphic-grid-tape ${
                  index % 3 === 0 ? 'rotate-2' : index % 3 === 1 ? 'rotate-1' : 'rotate-3'
                }`}
              >
                {/* Subtle texture/shine for the tape */}
                <div className="graphic-grid-tape-shine"></div>
              </div>

              {/* Paper Container */}
              <div 
                className={`graphic-grid-paper ${
                  index % 2 === 0 ? 'rotate-left' : 'rotate-right'
                }`}
              >
                {/* Image */}
                <div className="graphic-grid-image-wrapper">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="graphic-grid-image" 
                  />
                </div>
                
                {/* Minimalist Caption mimicking gallery/poster labels */}
                <div className="graphic-grid-caption">
                   <span className="graphic-grid-caption-type">{item.type}</span>
                   <h3 className="graphic-grid-caption-title">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GraphicGrid;