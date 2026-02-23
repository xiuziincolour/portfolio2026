import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { UNIFIED_WORKS } from '../constants';
import WorkGrid from './WorkGrid';
import './Projects.css';

type FilterType = 'all' | 'uiux' | 'product' | 'graphic';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredWorks = useMemo(() => {
    if (activeFilter === 'all') return UNIFIED_WORKS;
    if (activeFilter === 'uiux') return UNIFIED_WORKS.filter((w) => w.category === 'UI/UX');
    if (activeFilter === 'product') return UNIFIED_WORKS.filter((w) => w.category === 'Product');
    return UNIFIED_WORKS.filter((w) => w.category === 'Graphic Design');
  }, [activeFilter]);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div className="projects-header-container">
          <Link to="/" className="projects-back-button">
            <ArrowLeft size={16} className="projects-back-icon" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      <div className="projects-main">
        <div className="projects-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="projects-title-section"
          >
            <h1 className="projects-title">Projects</h1>
            <p className="projects-subtitle">Explore my design work</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="projects-filters"
          >
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`projects-filter-button ${activeFilter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('uiux')}
              className={`projects-filter-button ${activeFilter === 'uiux' ? 'active' : ''}`}
            >
              UI/UX Design
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('product')}
              className={`projects-filter-button ${activeFilter === 'product' ? 'active' : ''}`}
            >
              Product Design
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('graphic')}
              className={`projects-filter-button ${activeFilter === 'graphic' ? 'active' : ''}`}
            >
              Graphic Design
            </button>
          </motion.div>

          <div className="projects-work-grid-wrapper">
            <WorkGrid works={filteredWorks} showMoreLink={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
