import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import './JargonMerchPage.css';

const PHOTOBOOTH_TOP_IMAGE = '/img/Jargon-merch/jargon-photobooth/Jargon-photobooth.png';
const PHOTOBOOTH_SITE_URL = 'https://jargon-photobooth.vercel.app/';
/* Order: 1, 2, 5, 3, 4 so that #5 is in the center */
const PHOTOBOOTH_IMAGES = [1, 2, 5, 3, 4].map((i) => ({
  src: `/img/Jargon-merch/jargon-photobooth/jargon-photobooth-${i}.png`,
  alt: `Jargon Photobooth ${i}`,
}));
/* Slight rotations and vertical offsets for a crooked, lively layout (index matches display order) */
const PHOTOBOOTH_ROTATIONS = [-2.5, 1.8, -1.8, -1.2, 2.2]; // degrees: 1, 2, 5, 3, 4
const PHOTOBOOTH_OFFSETS_Y = [0, 6, -4, -5, 8]; // px

const SECTIONS = [
  {
    id: 'brochure',
    title: 'Brochure',
    paragraph: 'The brochure brings Jargon brand messaging and product overview into a portable print piece. Clear hierarchy across spreads supports in-person events and partner conversations.',
    images: [
      { src: '/img/Jargon-merch/Jargon%20Brochure-01.png', alt: 'Jargon Brochure 01' },
      { src: '/img/Jargon-merch/Jargon%20Brochure-02.png', alt: 'Jargon Brochure 02' },
      { src: '/img/Jargon-merch/Jargon%20Brochure-03.png', alt: 'Jargon Brochure 03' },
    ],
  },
  {
    id: 'tshirt',
    title: 'T-shirt',
    paragraph: 'T-shirts extend the brand palette and typography for everyday wear and event merch. Details reinforce logo and type recognition.',
    images: [
      { src: '/img/Jargon-merch/Jargon-tshirt-1.png', alt: 'Jargon T-shirt 1' },
      { src: '/img/Jargon-merch/Jargon-tshirt-2.png', alt: 'Jargon T-shirt 2' },
      { src: '/img/Jargon-merch/Jargon-tshirt-3.png', alt: 'Jargon T-shirt 3' },
      { src: '/img/Jargon-merch/Jargon-tshirt-4.png', alt: 'Jargon T-shirt 4' },
      { src: '/img/Jargon-merch/Jargon-tshirt-5.png', alt: 'Jargon T-shirt 5' },
      { src: '/img/Jargon-merch/jargon-t-detail.png', alt: 'Jargon T-shirt detail' },
    ],
  },
  {
    id: 'business-card',
    title: 'Business Card',
    paragraph: 'The business card is kept minimal, highlighting the brand and contact info for networking and professional use.',
    images: [
      { src: '/img/Jargon-merch/Jargon-business%20card.png', alt: 'Jargon business card' },
    ],
  },
];

/* Group Pictures: images from grouppictures folder, 1766911098834 as first */
const GROUP_PICTURES = [
  { src: '/img/Jargon-merch/grouppictures/1766911098834.jpeg', alt: 'Group picture 1' },
  { src: '/img/Jargon-merch/grouppictures/1766911098361.jpeg', alt: 'Group picture 2' },
  { src: '/img/Jargon-merch/grouppictures/1766911099569.jpeg', alt: 'Group picture 3' },
  { src: '/img/Jargon-merch/grouppictures/1766911099704.jpeg', alt: 'Group picture 4' },
  { src: '/img/Jargon-merch/grouppictures/1766911099735.jpeg', alt: 'Group picture 5' },
  { src: '/img/Jargon-merch/grouppictures/1766911099942.jpeg', alt: 'Group picture 6' },
];

interface JargonMerchPageProps {
  onBack: () => void;
}

const JargonMerchPage: React.FC<JargonMerchPageProps> = ({ onBack }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [groupSlideIndex, setGroupSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0); // 1 = next (in from right), -1 = prev (in from left)

  const goToPrevSlide = () => {
    setSlideDirection(-1);
    setGroupSlideIndex((i) => (i === 0 ? GROUP_PICTURES.length - 1 : i - 1));
  };
  const goToNextSlide = () => {
    setSlideDirection(1);
    setGroupSlideIndex((i) => (i === GROUP_PICTURES.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="jargon-merch-page">
      {/* Nav */}
      <div className="jargon-merch-nav">
        <div className="jargon-merch-nav-inner">
          <button type="button" onClick={onBack} className="jargon-merch-back">
            <ArrowLeft size={16} className="jargon-merch-back-icon" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="jargon-merch-main">
        <div className="jargon-merch-container">
          {/* Header: title, subtitle, software, concept */}
          <motion.header
            className="jargon-merch-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="jargon-merch-badge">Graphic Design</span>
            <h1 className="jargon-merch-title">Jargon Merch</h1>
            <p className="jargon-merch-subtitle">Merchandise Design — Brand Extension</p>

            <div className="jargon-merch-meta">
              <span className="jargon-merch-meta-label">Tools</span>
              <span className="jargon-merch-meta-value">Adobe Illustrator, Adobe Photoshop</span>
            </div>

            <div className="jargon-merch-concept">
              <span className="jargon-merch-concept-label">Design Concept</span>
              <p className="jargon-merch-concept-text">
                Based on the Jargon app’s visual identity, brand colour and typography are extended to merch: T-shirts, brochure, and business card. The work stays clean and readable while fitting both print and physical formats, keeping the brand consistent on- and offline.
              </p>
            </div>
          </motion.header>

          {/* Product sections: Brochure, T-shirt, Jargon Photobooth (after T-shirt), Business card */}
          {SECTIONS.map((section, sectionIndex) => (
            <React.Fragment key={section.id}>
              <motion.section
                className="jargon-merch-section"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + sectionIndex * 0.08 }}
              >
                <h2 className="jargon-merch-section-title">{section.title}</h2>
                <p className="jargon-merch-section-paragraph">{section.paragraph}</p>
                <div className="jargon-merch-gallery-grid">
                  {section.images.map((img, index) => (
                    <motion.div
                      key={img.src}
                      className="jargon-merch-gallery-item"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.15 + sectionIndex * 0.08 + index * 0.04 }}
                    >
                      <button
                        type="button"
                        className="jargon-merch-gallery-thumb"
                        onClick={() => setLightboxSrc(img.src)}
                      >
                        <img src={img.src} alt={img.alt} loading="lazy" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Jargon Photobooth — only after T-shirt */}
              {section.id === 'tshirt' && (
                <motion.section
                  className="jargon-merch-section jargon-merch-photobooth"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="jargon-merch-section-title">Jargon Photobooth</h2>
                  <div className="jargon-merch-photobooth-hero-wrap">
                    <img
                      src={PHOTOBOOTH_TOP_IMAGE}
                      alt="Jargon Photobooth"
                      className="jargon-merch-photobooth-hero"
                    />
                  </div>
                  <a
                    href={PHOTOBOOTH_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jargon-merch-photobooth-link"
                  >
                    <ExternalLink size={16} />
                    <span>{PHOTOBOOTH_SITE_URL}</span>
                  </a>
                  <div className="jargon-merch-photobooth-row">
                    {PHOTOBOOTH_IMAGES.map((img, index) => {
                      const rotate = PHOTOBOOTH_ROTATIONS[index];
                      const y = PHOTOBOOTH_OFFSETS_Y[index];
                      return (
                        <motion.button
                          key={img.src}
                          type="button"
                          className="jargon-merch-photobooth-thumb"
                          onClick={() => setLightboxSrc(img.src)}
                          initial={{ rotate, y }}
                          animate={{ rotate, y }}
                          whileHover={{ scale: 1.06, zIndex: 10, rotate, y }}
                          transition={{ duration: 0.25 }}
                        >
                          <img src={img.src} alt={img.alt} loading="lazy" />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.section>
              )}
            </React.Fragment>
          ))}

          {/* Group Pictures — Slideshow */}
          <motion.section
            className="jargon-merch-section jargon-merch-group-pictures"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h2 className="jargon-merch-section-title">Group Pictures</h2>
            <div className="jargon-merch-slideshow">
              <button
                type="button"
                className="jargon-merch-slideshow-arrow jargon-merch-slideshow-prev"
                onClick={goToPrevSlide}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>
              <div className="jargon-merch-slideshow-track">
                <AnimatePresence initial={false} mode="wait">
                  <motion.button
                    key={groupSlideIndex}
                    type="button"
                    className="jargon-merch-slideshow-image-wrap"
                    onClick={() => setLightboxSrc(GROUP_PICTURES[groupSlideIndex].src)}
                    initial={{ x: slideDirection * 120 }}
                    animate={{ x: 0 }}
                    exit={{ x: -slideDirection * 120 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <img
                      src={GROUP_PICTURES[groupSlideIndex].src}
                      alt={GROUP_PICTURES[groupSlideIndex].alt}
                      className="jargon-merch-slideshow-image"
                    />
                  </motion.button>
                </AnimatePresence>
              </div>
              <button
                type="button"
                className="jargon-merch-slideshow-arrow jargon-merch-slideshow-next"
                onClick={goToNextSlide}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="jargon-merch-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            className="jargon-merch-lightbox-close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>
          <div className="jargon-merch-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxSrc} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default JargonMerchPage;
