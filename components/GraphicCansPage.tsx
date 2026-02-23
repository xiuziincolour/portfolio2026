import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import './JargonMerchPage.css';

const CANS_IMAGES = [
  { src: '/img/graphic-cans/cans_Proof_page-0001.jpg', alt: 'Cans proof 1' },
  { src: '/img/graphic-cans/cans_Proof_page-0002.jpg', alt: 'Cans proof 2' },
  { src: '/img/graphic-cans/cans_Proof_page-0003.jpg', alt: 'Cans proof 3' },
];

interface GraphicCansPageProps {
  onBack: () => void;
}

const GraphicCansPage: React.FC<GraphicCansPageProps> = ({ onBack }) => {
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
            <h1 className="jargon-merch-title">Cans</h1>
            <p className="jargon-merch-subtitle">Packaging Design</p>

            <div className="jargon-merch-meta">
              <span className="jargon-merch-meta-label">Tools</span>
              <span className="jargon-merch-meta-value">Adobe Illustrator, Adobe Photoshop</span>
            </div>

            <div className="jargon-merch-concept">
              <span className="jargon-merch-concept-label">Design Concept</span>
              <p className="jargon-merch-concept-text">
                Can packaging explorations focusing on color, typography, and layout for shelf impact and brand
                consistency.
              </p>
            </div>
          </motion.header>

          <motion.section
            className="jargon-merch-section"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="jargon-merch-section-title">Proofs</h2>
            <p className="jargon-merch-section-paragraph">
              Selected proof pages showing the full can layouts and details.
            </p>
            <div className="jargon-merch-gallery-grid">
              {CANS_IMAGES.map((img, index) => (
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

export default GraphicCansPage;

