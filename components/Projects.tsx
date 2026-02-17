import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { UNIFIED_WORKS } from '../constants';
import { WorkItem } from '../types';
import { hasProjectPage, getProjectPath } from '../lib/routes';
import './Projects.css';

const JARGON_MERCH_COVER_VIDEO = '/img/Jargon-merch/Jargon-merch-cover.mp4';
const JARGON_MERCH_POSTER = '/img/jagron-merch-cover-lightmode.png';

type FilterType = 'all' | 'UI/UX' | 'Graphic Design';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const jargonMerchVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = jargonMerchVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) el.play().catch(() => {});
          else el.pause();
        });
      },
      { threshold: 0.25, rootMargin: '50px' }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [activeFilter]);

  const filteredWorks = activeFilter === 'all'
    ? UNIFIED_WORKS
    : activeFilter === 'UI/UX'
    ? UNIFIED_WORKS.filter((work) => work.category === 'UI/UX')
    : UNIFIED_WORKS.filter((work) => work.category === 'Graphic Design');

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

          <motion.div layout className="projects-grid">
            <AnimatePresence mode="wait">
              {filteredWorks.map((work: WorkItem, index: number) => {
                const path = hasProjectPage(work.id) ? getProjectPath(work.id) : null;
                const cardContent = (
                  <>
                    <div
                      className="projects-card-content"
                      data-bg-color={work.bgColor || 'transparent'}
                    >
                      {work.id === 'w3' ? (
                        <video
                          ref={jargonMerchVideoRef}
                          src={JARGON_MERCH_COVER_VIDEO}
                          poster={JARGON_MERCH_POSTER}
                          className="projects-card-image"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          aria-label={work.title}
                        />
                      ) : work.type === 'image' ? (
                        <img
                          src={work.image}
                          alt={work.title}
                          className="projects-card-image"
                        />
                      ) : null}

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
                              Motion<br />Graphic<br />Festival
                            </h3>
                          </div>
                          <div className="projects-card-text-graphic-line"></div>
                        </div>
                      )}
                    </div>

                    {path && (
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
                    )}
                  </>
                );
                return (
                  <motion.div
                    key={work.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {path ? (
                      <Link to={path} className="projects-card">
                        {cardContent}
                      </Link>
                    ) : (
                      <div className="projects-card" style={{ cursor: 'default' }}>
                        {cardContent}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

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
