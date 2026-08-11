import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { UNIFIED_WORKS } from '../constants';
import { hasProjectPage, getProjectPath } from '../lib/routes';
import { useGoBack } from '../lib/useGoBack';
import './Projects.css';

const JARGON_HOME_COVER_VIDEO = 'https://pub-b1a10ff6b2664d4c86d2cb6c5ad45fc8.r2.dev/Jargon-video.mp4';
const JARGON_MERCH_COVER_VIDEO = 'https://pub-b1a10ff6b2664d4c86d2cb6c5ad45fc8.r2.dev/Jargon-merch-cover.mp4';
const JARGON_MERCH_POSTER = '/img/Jargon-merch/Jargon-tshirt-1.png';
const COMING_SOON_IDS = new Set(['w5']);

const Projects: React.FC = () => {
  const goBack = useGoBack('/');
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const jargonVideoRef = useRef<HTMLVideoElement | null>(null);
  const jargonMerchVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videos = [jargonVideoRef.current, jargonMerchVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return undefined;

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

  const renderCover = (work: (typeof UNIFIED_WORKS)[number]) => {
    if (work.id === 'w2') {
      return (
        <video
          ref={jargonVideoRef}
          className="projects-cell-media"
          src={JARGON_HOME_COVER_VIDEO}
          poster={work.image}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={work.title}
        />
      );
    }

    if (work.id === 'w3') {
      return (
        <video
          ref={jargonMerchVideoRef}
          className="projects-cell-media"
          src={JARGON_MERCH_COVER_VIDEO}
          poster={JARGON_MERCH_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={work.title}
        />
      );
    }

    if (!work.image) return null;

    return (
      <img
        className="projects-cell-media"
        src={work.image}
        alt={work.title}
        loading="lazy"
        decoding="async"
      />
    );
  };

  return (
    <div className="projects-page">
      <div className="projects-nav">
        <button type="button" onClick={goBack} className="projects-back" aria-label="Back">
          <ArrowLeft size={16} className="projects-back-icon" />
          <span>Back</span>
        </button>
      </div>

      <motion.div
        className="projects-layout"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="projects-title">Projects</h1>

        <div className="projects-grid">
          {UNIFIED_WORKS.map((work) => {
            const path = hasProjectPage(work.id) ? getProjectPath(work.id) : null;
            const media = renderCover(work);
            if (!media) return null;

            const isComingSoon = COMING_SOON_IDS.has(work.id);
            const isLinked = Boolean(path || work.externalUrl || isComingSoon);
            const content = (
              <>
                {media}
                {isLinked && (
                  <div className="projects-cell-hover">
                    <span>
                      {isComingSoon
                        ? 'Coming Soon'
                        : work.externalUrl
                          ? 'View Design'
                          : 'View Case Study'}
                    </span>
                  </div>
                )}
              </>
            );

            if (isComingSoon) {
              return (
                <button
                  key={work.id}
                  type="button"
                  className="projects-cell"
                  aria-label={`${work.title} — Coming soon`}
                  onClick={() => setComingSoonOpen(true)}
                >
                  {content}
                </button>
              );
            }

            if (work.externalUrl) {
              return (
                <a
                  key={work.id}
                  href={work.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projects-cell"
                  aria-label={work.title}
                >
                  {content}
                </a>
              );
            }

            if (path) {
              return (
                <Link key={work.id} to={path} className="projects-cell" aria-label={work.title}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={work.id} className="projects-cell projects-cell--static" aria-label={work.title}>
                {content}
              </div>
            );
          })}
        </div>
      </motion.div>

      {comingSoonOpen && (
        <div
          className="projects-coming-soon"
          onClick={() => setComingSoonOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setComingSoonOpen(false);
          }}
          role="button"
          tabIndex={0}
          aria-label="Close coming soon"
        >
          <div
            className="projects-coming-soon-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-coming-soon-title"
          >
            <button
              type="button"
              className="projects-coming-soon-close"
              onClick={() => setComingSoonOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <p id="projects-coming-soon-title" className="projects-coming-soon-text">
              Coming soon
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
