import React from 'react';
import { motion } from 'framer-motion';
import { UNIFIED_WORKS } from '../constants';
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
              <div className="work-grid-card-image">
                {work.type === 'image' && work.image && (
                  <img src={work.image} alt={work.title} />
                )}
                <div className="work-grid-card-hover">
                  <span>View Case Study</span>
                </div>
              </div>
              <div className="work-grid-card-body">
                <h3 className="work-grid-card-title">{work.title}</h3>
                <p className="work-grid-card-subtitle">{work.subtitle}</p>
                <div className="work-grid-card-tags">
                  {work.tags?.length
                    ? work.tags.map((tag) => (
                        <span key={tag} className="work-grid-tag">
                          {tag}
                        </span>
                      ))
                    : (
                      <>
                        {index < 2 && <span className="work-grid-tag work-grid-tag-featured">FEATURED</span>}
                        <span className="work-grid-tag">{work.category}</span>
                      </>
                    )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
