import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import './JargonMerchPage.css';

const SECTIONS = [
  {
    id: 'brochure',
    title: 'Brochure',
    paragraph: 'The brochure brings Jargon brand messaging and product overview into a portable trifold print piece. Clear hierarchy across spreads supports in-person events and partner conversations.',
    images: [
      { src: '/img/Jargon-merch/Jargon Brochure-01.png', alt: 'Jargon Brochure 1' },
      { src: '/img/Jargon-merch/Jargon Brochure-02.png', alt: 'Jargon Brochure 2' },
      { src: '/img/Jargon-merch/Jargon Brochure-03.png', alt: 'Jargon Brochure 3' },
    ],
  },
  {
    id: 'tshirt',
    title: 'T-shirt',
    paragraph: "T-shirts leverage the brand's palette and typography for both everyday wear and event merchandise. Unique Jargon avatars have been designed for the back of each team member's T-shirt, based on their individual appearance. These details serve to reinforce logo and type recognition.",
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
    id: 'businesscard',
    title: 'Business card',
    paragraph: 'Business card design aligned with Jargon brand identity for print and handoff.',
    images: [{ src: '/img/Jargon-merch/Jargon-business card.png', alt: 'Jargon Business card' }],
  },
];

const PHOTOBOOTH_IMAGES = [
  { src: '/img/Jargon-merch/jargon-photobooth/jargon-photobooth-1.png', alt: 'Photobooth 1' },
  { src: '/img/Jargon-merch/jargon-photobooth/jargon-photobooth-2.png', alt: 'Photobooth 2' },
  { src: '/img/Jargon-merch/jargon-photobooth/jargon-photobooth-5.png', alt: 'Photobooth 5' },
  { src: '/img/Jargon-merch/jargon-photobooth/jargon-photobooth-3.png', alt: 'Photobooth 3' },
  { src: '/img/Jargon-merch/jargon-photobooth/jargon-photobooth-4.png', alt: 'Photobooth 4' },
];

const GROUP_PICTURES = [
  { src: '/img/Jargon-merch/grouppictures/1766911098361.jpeg', alt: 'Group 1' },
  { src: '/img/Jargon-merch/grouppictures/1766911098834.jpeg', alt: 'Group 2' },
  { src: '/img/Jargon-merch/grouppictures/1766911099569.jpeg', alt: 'Group 3' },
  { src: '/img/Jargon-merch/grouppictures/1766911099704.jpeg', alt: 'Group 4' },
  { src: '/img/Jargon-merch/grouppictures/1766911099735.jpeg', alt: 'Group 5' },
  { src: '/img/Jargon-merch/grouppictures/1766911099942.jpeg', alt: 'Group 6' },
];

const GROUP_N = GROUP_PICTURES.length;
function getGroupOffset(j: number, center: number): number {
  let d = (j - center + GROUP_N) % GROUP_N;
  if (d > GROUP_N / 2) d -= GROUP_N;
  return d;
}

interface JargonMerchPageProps {
  onBack: () => void;
}

const JargonMerchPage: React.FC<JargonMerchPageProps> = ({ onBack }) => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [groupCenterIndex, setGroupCenterIndex] = useState(1);

  const handleGroupCarouselClick = (index: number) => {
    if (index === groupCenterIndex) {
      setLightboxSrc(GROUP_PICTURES[index].src);
    } else {
      setGroupCenterIndex(index);
    }
  };

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
            <h1 className="jargon-merch-title">Jargon Merch</h1>
            <p className="jargon-merch-subtitle">Merchandise Design</p>

            <div className="jargon-merch-meta">
              <span className="jargon-merch-meta-label">Tools</span>
              <span className="jargon-merch-meta-value">Adobe Illustrator, Adobe InDesign, Adobe Photoshop, Vibe Coding, Vercel</span>
            </div>

            <div className="jargon-merch-concept">
              <span className="jargon-merch-concept-label">Design Concept</span>
              <p className="jargon-merch-concept-text">
                Based on the Jargon app's visual identity, brand colour and typography are extended to merch: T-shirts, brochure, and business card. The work stays clean and readable while fitting both print and physical formats, keeping the brand consistent on- and offline.
              </p>
            </div>
          </motion.header>

          {SECTIONS.map((section, sectionIndex) => (
            <motion.section
              key={section.id}
              className="jargon-merch-section"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * (sectionIndex + 1) }}
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
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
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

              {/* Photobooth — only after T-shirt */}
              {section.id === 'tshirt' && (
                <div className="jargon-merch-group-pictures jargon-merch-photobooth">
                  <h3 className="jargon-merch-section-title">Photobooth</h3>
                  <p className="jargon-merch-section-paragraph">
                    The Photobooth website, developed via vibe coding, is designed to be integrated into the booth to boost audience engagement.
                  </p>
                  <div className="jargon-merch-photobooth-hero-wrap">
                    <img
                      src="/img/Jargon-merch/jargon-photobooth/Jargon-photobooth.png"
                      alt="Photobooth"
                      className="jargon-merch-photobooth-hero"
                    />
                  </div>
                  <a
                    href="https://jargon-photobooth.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="jargon-merch-photobooth-link"
                  >
                    jargon-photobooth.vercel.app
                  </a>
                  <div className="jargon-merch-photobooth-row">
                    {PHOTOBOOTH_IMAGES.map((img) => (
                      <button
                        key={img.src}
                        type="button"
                        className="jargon-merch-photobooth-thumb"
                        onClick={() => setLightboxSrc(img.src)}
                      >
                        <img src={img.src} alt={img.alt} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          ))}

          {/* Group Pictures — below Business card */}
          <motion.section
            className="jargon-merch-section jargon-merch-section--group"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="jargon-merch-section-title">The Team</h2>
            <p className="jargon-merch-section-paragraph">
              Browse team pictures. Click a side image to bring it to the center; click the center image to view full size.
            </p>
            <div className="jargon-merch-group-carousel">
              <div className="jargon-merch-group-carousel-track">
                {GROUP_PICTURES.map((img, index) => {
                  const offset = getGroupOffset(index, groupCenterIndex);
                  const isCenter = offset === 0;
                  const absOffset = Math.abs(offset);
                  const scale = 1 - 0.26 * absOffset;
                  return (
                    <motion.button
                      key={img.src}
                      type="button"
                      className="jargon-merch-group-carousel-item"
                      onClick={() => handleGroupCarouselClick(index)}
                      initial={{
                        x: offset * 220,
                        scale,
                        zIndex: isCenter ? 10 : 6 - absOffset,
                      }}
                      animate={{
                        x: offset * 220,
                        scale,
                        zIndex: isCenter ? 10 : 6 - absOffset,
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      style={{ originX: '50%', originY: '50%' }}
                    >
                      <img src={img.src} alt={img.alt} draggable={false} />
                    </motion.button>
                  );
                })}
              </div>
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

export default JargonMerchPage;
