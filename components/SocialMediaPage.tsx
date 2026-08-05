import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useGoBack } from '../lib/useGoBack';
import './SocialMediaPage.css';

/** Order matches the design mockup: 4×2 grid, left→right, top→bottom */
const IMAGES = [
  {
    src: '/img/socialmedia/Thcreativeroom/Thecreativeroom-1.png',
    alt: 'The Creative Room — every deadline',
  },
  {
    src: '/img/socialmedia/bravo/Bravo-socialmedia-2.png',
    alt: 'Bravo — POTEIN GO bubble tea',
  },
  {
    src: '/img/socialmedia/Jargon/Jargon-sociamedia-2.png',
    alt: 'Jargon — Design team badge',
  },
  {
    src: '/img/socialmedia/Jargon/Jargon-sociamedia-4.png',
    alt: 'Jargon — gamified trade courses',
  },
  {
    src: '/img/socialmedia/Thcreativeroom/Thecreativeroom-3.png',
    alt: 'The Creative Room — team of creatives',
  },
  {
    src: '/img/socialmedia/Jargon/Jargon-sociamedia-3.png',
    alt: 'Jargon — Our Features',
  },
  {
    src: '/img/socialmedia/Thcreativeroom/Thecreativeroom-2.png',
    alt: "The Creative Room — you're not alone",
  },
  {
    src: '/img/socialmedia/bravo/Bravo-socialmedia-1.png',
    alt: "Bravo — Downtown Vancouver's Ultimate Sugar Rush",
  },
];

const SocialMediaPage: React.FC = () => {
  const goBack = useGoBack('/design');
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="social-media-page">
      <div className="social-media-nav">
        <button type="button" onClick={goBack} className="social-media-back" aria-label="Back">
          <ArrowLeft size={16} className="social-media-back-icon" />
          <span>Back</span>
        </button>
      </div>

      <motion.div
        className="social-media-layout"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="social-media-title">Social Media</h1>

        <div className="social-media-grid">
          {IMAGES.map((image) => (
            <button
              key={image.src}
              type="button"
              className="social-media-cell"
              onClick={() => setLightboxSrc(image.src)}
              aria-label={`View ${image.alt}`}
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </motion.div>

      {lightboxSrc && (
        <div
          className="social-media-lightbox"
          onClick={() => setLightboxSrc(null)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setLightboxSrc(null);
          }}
          role="button"
          tabIndex={0}
          aria-label="Close lightbox"
        >
          <button
            type="button"
            className="social-media-lightbox-close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="social-media-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default SocialMediaPage;
