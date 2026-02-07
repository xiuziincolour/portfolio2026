import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import './JargonMerchPage.css';

const EMAG_IMAGES = [
  { src: '/img/graphics-emag/xiuzi-emag-1.png', alt: 'Graphics E-mag 1' },
  { src: '/img/graphics-emag/xiuzi-emag-2.png', alt: 'Graphics E-mag 2' },
];

interface GraphicsEmagPageProps {
  onBack: () => void;
}

const GraphicsEmagPage: React.FC<GraphicsEmagPageProps> = ({ onBack }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="jargon-merch-page">
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
          <motion.header
            className="jargon-merch-header"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="jargon-merch-badge">Graphic Design</span>
            <h1 className="jargon-merch-title">Graphics E-mag</h1>
            <p className="jargon-merch-subtitle">Editorial Design</p>

            <div className="jargon-merch-meta">
              <span className="jargon-merch-meta-label">Tools</span>
              <span className="jargon-merch-meta-value">Adobe Illustrator, Adobe InDesign</span>
            </div>

            <div className="jargon-merch-concept">
              <span className="jargon-merch-concept-label">Design Concept</span>
              <p className="jargon-merch-concept-text">
                Editorial layout and visual design for a digital magazine. Typography and imagery are structured for clear reading and visual hierarchy across spreads.
              </p>
            </div>
          </motion.header>

          <motion.section
            className="jargon-merch-section"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="jargon-merch-section-title">E-mag</h2>
            <p className="jargon-merch-section-paragraph">
              Spreads from the e-magazine, combining editorial layout with strong typography and imagery.
            </p>
            <div className="jargon-merch-gallery-grid">
              {EMAG_IMAGES.map((img, index) => (
                <motion.div
                  key={img.src}
                  className="jargon-merch-gallery-item"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + index * 0.05 }}
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

          <motion.section
            className="jargon-merch-section graphics-emag-embed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <iframe
              title="Graphics E-mag flipbook"
              allowFullScreen
              allow="clipboard-write"
              scrolling="no"
              className="fp-iframe graphics-emag-iframe"
              src="https://heyzine.com/flip-book/44e65ebb4b.html"
              style={{ border: '1px solid lightgray', width: '100%', height: '600px' }}
            />
          </motion.section>
        </div>
      </div>

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

export default GraphicsEmagPage;
