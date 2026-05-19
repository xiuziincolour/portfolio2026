import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { UNIFIED_WORKS } from '../constants';
import { WorkItem } from '../types';
import WorkGrid from './WorkGrid';
import './Projects.css';

type FilterType = 'all' | 'uiux' | 'product' | 'graphic';

const isProductDesignWork = (work: WorkItem) =>
  work.category === 'Product' ||
  work.tags?.some((tag) => tag.toLowerCase() === 'product design');

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredWorks = useMemo(() => {
    if (activeFilter === 'all') return UNIFIED_WORKS;
    if (activeFilter === 'uiux') return UNIFIED_WORKS.filter((w) => w.category === 'UI/UX');
    if (activeFilter === 'product') return UNIFIED_WORKS.filter(isProductDesignWork);
    return UNIFIED_WORKS.filter((w) => w.category === 'Graphic Design');
  }, [activeFilter]);

  return (
    <motion.div className="projects-page">
      <motion.div className="projects-container">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="projects-back-button"
          aria-label="Back to home"
        >
          <ArrowLeft size={16} className="projects-back-icon" />
          <span>Back</span>
        </button>

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

        <motion.div className="projects-work-grid-wrapper">
          <WorkGrid works={filteredWorks} showMoreLink={false} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
