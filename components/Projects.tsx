import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { UNIFIED_WORKS } from '../constants';
import { WorkItem } from '../types';
import './Projects.css';

interface ProjectsProps {
  onBack: () => void;
  onOpenProject?: (id: string) => void;
}

type FilterType = 'all' | 'UI/UX' | 'Graphic Design';

const Projects: React.FC<ProjectsProps> = ({ onBack, onOpenProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Filter works based on selected category
  const filteredWorks = activeFilter === 'all' 
    ? UNIFIED_WORKS 
    : activeFilter === 'UI/UX'
    ? UNIFIED_WORKS.filter(work => work.category === 'UI/UX')
    : UNIFIED_WORKS.filter(work => work.category === 'Motion' || work.category === 'Product' || work.category === 'Video');

  const handleProjectClick = (work: WorkItem) => {
    if (onOpenProject) {
      onOpenProject(work.id);
    }
  };

  return (
    <div className="projects-page">
      {/* Header with Back Button */}
      <div className="projects-header">
        <div className="projects-header-container">
          <button 
            onClick={onBack}
            className="projects-back-button"
          >
            <ArrowLeft size={16} className="projects-back-icon" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="projects-main">
        <div className="projects-container">
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="projects-title-section"
          >
            <h1 className="projects-title">Projects</h1>
            <p className="projects-subtitle">Explore my design work</p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="projects-filters"
          >
            <button
              onClick={() => setActiveFilter('all')}
              className={`projects-filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('UI/UX')}
              className={`projects-filter-button ${activeFilter === 'UI/UX' ? 'active' : ''}`}
            >
              UI/UX Design
            </button>
            <button
              onClick={() => setActiveFilter('Graphic Design')}
              className={`projects-filter-button ${activeFilter === 'Graphic Design' ? 'active' : ''}`}
            >
              Graphic Design
            </button>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="projects-grid"
          >
            <AnimatePresence mode="wait">
              {filteredWorks.map((work, index) => (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  onClick={() => handleProjectClick(work)}
                  className="projects-card"
                >
                  <div 
                    className="projects-card-content"
                    data-bg-color={work.bgColor || 'transparent'}
                  >
                    {work.type === 'image' && (
                      <img 
                        src={work.image} 
                        alt={work.title} 
                        className="projects-card-image"
                      />
                    )}

                    {work.type === 'solid-color' && !work.customContent && (
                      <div className="projects-card-logo-wrapper">
                        <img 
                          src={work.image} 
                          alt="Logo" 
                          className="projects-card-logo"
                          data-text-color={work.textColor || ''}
                        />
                      </div>
                    )}

                    {work.type === 'solid-color' && work.customContent === 'text-graphic' && (
                      <div className="projects-card-text-graphic">
                        <div className="projects-card-text-graphic-inner">
                          <h3 className="projects-card-text-graphic-title">
                            Motion<br/>Graphic<br/>Festival
                          </h3>
                        </div>
                        <div className="projects-card-text-graphic-line"></div>
                      </div>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="projects-card-overlay">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="projects-card-overlay-content"
                    >
                      <span className="projects-card-overlay-subtitle">
                        {work.subtitle}
                      </span>
                      <h3 className="projects-card-overlay-title">
                        {work.title}
                      </h3>
                      <div className="projects-card-overlay-button">
                        View Project <ArrowUpRight size={16} />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredWorks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="projects-empty"
            >
              <p>No projects found in this category.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
