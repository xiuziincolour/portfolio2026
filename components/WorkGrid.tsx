import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UNIFIED_WORKS } from '../constants';
import { hasProjectPage, getProjectPath } from '../lib/routes';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './WorkGrid.css';

const JARGON_MERCH_COVER_VIDEO = '/img/Jargon-merch/Jargon-merch-cover.mp4';
const JARGON_MERCH_POSTER = '/img/Jargon-merch/Jargon-tshirt-1.png';
const EMAG_COVER_LIGHT = '/img/graphics-emag/xiuzi-emag-light-mode.png';
const EMAG_COVER_DARK = '/img/graphics-emag/xiuzi-emag-dark-mode.png';
const JARGON_HOME_COVER_VIDEO = 'https://pub-b1a10ff6b2664d4c86d2cb6c5ad45fc8.r2.dev/Jargon-video.mp4';

interface WorkGridProps {
  theme?: 'light' | 'dark';
}

const WorkGrid: React.FC<WorkGridProps> = ({ theme = 'light' }) => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;
  const jargonVideoRef = useRef<HTMLVideoElement | null>(null);
  const jargonMerchVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videos = [jargonVideoRef.current, jargonMerchVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25, rootMargin: '50px' }
    );
    videos.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getCardImage = (work: (typeof UNIFIED_WORKS)[0]) => {
    if (work.id === 'w7') {
      return theme === 'dark' ? EMAG_COVER_DARK : EMAG_COVER_LIGHT;
    }
    return work.image;
  };

  return (
    <section id="work" className="work-grid-section">
      <div className="work-grid-container">
        <div className="work-grid-items">
          {UNIFIED_WORKS.filter((work) => !work.hideOnHome).map((work, index) => {
            const path = hasProjectPage(work.id) ? getProjectPath(work.id) : null;
            const content = (
              <>
                <div className="work-grid-card-image">
                  {work.id === 'w2' ? (
                    <video
                      ref={jargonVideoRef}
                      className="work-grid-card-media"
                      src={JARGON_HOME_COVER_VIDEO}
                      poster={getCardImage(work)}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-label={work.title}
                    />
                  ) : work.id === 'w3' ? (
                    <video
                      ref={jargonMerchVideoRef}
                      className="work-grid-card-media"
                      src={JARGON_MERCH_COVER_VIDEO}
                      poster={JARGON_MERCH_POSTER}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-label={work.title}
                    />
                  ) : (
                    work.type === 'image' &&
                    getCardImage(work) && (
                      <img
                        className="work-grid-card-media"
                        src={getCardImage(work)}
                        alt={work.title}
                      />
                    )
                  )}
                  {path && (
                    <div className="work-grid-card-hover">
                      <span>View Case Study</span>
                    </div>
                  )}
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
              </>
            );
            return (
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
              >
                {path ? (
                  <Link to={path} className="work-grid-card">
                    {content}
                  </Link>
                ) : (
                  <div className="work-grid-card" style={{ cursor: 'default' }}>
                    {content}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="work-grid-more">
          <Link to="/projects" className="work-grid-more-link">
            View more works
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
