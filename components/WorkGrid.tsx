import React from 'react';
import { motion } from 'framer-motion';
import { UNIFIED_WORKS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './WorkGrid.css';

interface WorkGridProps {
  onOpenProject?: (id: string) => void;
}

const WorkGrid: React.FC<WorkGridProps> = ({ onOpenProject }) => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  return (
    <section id="work" className="work-grid-section">
      <div className="work-grid-container">
        {/* Section Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="work-grid-header"
        >
          <h2 className="work-grid-title">
            Selected Work
          </h2>
          <p className="work-grid-subtitle">
            Explore my latest projects
          </p>
        </motion.div>
        
        <div className="work-grid-items">
          {UNIFIED_WORKS.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                delay: shouldAnimate ? index * 0.1 : 0, 
                duration: shouldAnimate ? 0.6 : 0,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={() => onOpenProject && onOpenProject(work.id)}
              className="work-grid-card"
            >
              {/* Content Rendering Logic based on Type */}
              <div 
                className="work-grid-item"
                data-bg-color={work.bgColor || 'transparent'}
              >
                {work.type === 'image' && (
                  <img 
                    src={work.image} 
                    alt={work.title} 
                  />
                )}

                {/* Microsoft / Airbnb Style Logo Centering */}
                {work.type === 'solid-color' && !work.customContent && (
                  <div className="work-grid-logo-wrapper">
                     <img 
                        src={work.image} 
                        alt="Logo" 
                        className="work-grid-logo"
                        data-text-color={work.textColor || ''}
                     />
                  </div>
                )}

                {/* "Seattle Design Festival" Angled Text Style */}
                {work.type === 'solid-color' && work.customContent === 'text-graphic' && (
                  <div className="work-grid-text-graphic">
                    <div className="work-grid-text-graphic-inner">
                        <h3 className="work-grid-text-graphic-title">
                          Motion<br/>Graphic<br/>Festival
                        </h3>
                    </div>
                    {/* Decorative line */}
                    <div className="work-grid-text-graphic-line"></div>
                  </div>
                )}
              </div>

              {/* Hover Overlay - displaying Title & Subtitle */}
              <div className="work-grid-overlay">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    className="work-grid-overlay-content"
                  >
                    <span className="work-grid-overlay-subtitle">
                      {work.subtitle}
                    </span>
                    <h3 className="work-grid-overlay-title">
                      {work.title}
                    </h3>
                    <div className="work-grid-overlay-button">
                      View Case Study <ArrowUpRight size={16} />
                    </div>
                  </motion.div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;