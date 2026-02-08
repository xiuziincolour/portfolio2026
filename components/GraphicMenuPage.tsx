import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import './JargonMerchPage.css';
import './GraphicMenuPage.css';

const MENU_IMAGES = [
  { src: '/img/graphics-menu/Xiuzi_Guo_assignment08_page-0001.jpg', alt: 'Menu 1', pageLabel: 'Page 1' },
  { src: '/img/graphics-menu/Xiuzi_Guo_assignment08_page-0002.jpg', alt: 'Menu 2', pageLabel: 'Page 2' },
  { src: '/img/graphics-menu/Xiuzi_Guo_assignment08_page-0003.jpg', alt: 'Menu 3', pageLabel: 'Page 3' },
  { src: '/img/graphics-menu/Xiuzi_Guo_assignment08_page-0004.jpg', alt: 'Menu 4', pageLabel: 'Page 4' },
  { src: '/img/graphics-menu/Xiuzi_Guo_assignment08_page-0005.jpg', alt: 'Menu 5', pageLabel: 'Page 5' },
];

const N = MENU_IMAGES.length;

function getOffset(j: number, center: number): number {
  let d = (j - center + N) % N;
  if (d > N / 2) d -= N;
  return d;
}

interface GraphicMenuPageProps {
  onBack: () => void;
}

const GraphicMenuPage: React.FC<GraphicMenuPageProps> = ({ onBack }) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const goTo = (index: number) => {
    setCenterIndex(index);
  };

  const handleCarouselItemClick = (index: number) => {
    if (index === centerIndex) {
      setLightboxSrc(MENU_IMAGES[index].src);
    } else {
      goTo(index);
    }
  };

  return (
    <div className="jargon-merch-page graphic-menu-page">
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
            <h1 className="jargon-merch-title">Xiuzi Menu</h1>
            <p className="jargon-merch-subtitle">Editorial / Menu Design</p>

            <div className="jargon-merch-meta">
              <span className="jargon-merch-meta-label">Tools</span>
              <span className="jargon-merch-meta-value">Adobe Illustrator, Adobe InDesign</span>
            </div>

            <div className="jargon-merch-concept">
              <span className="jargon-merch-concept-label">Design Concept</span>
              <p className="jargon-merch-concept-text">
                Menu design combining editorial layout with clear typography and visual hierarchy for readability and brand consistency.
              </p>
            </div>
          </motion.header>

          <motion.section
            className="jargon-merch-section graphic-menu-carousel-section"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="jargon-merch-section-title">Menu</h2>
            <p className="jargon-merch-section-paragraph">
              Browse the menu spreads. Click a side image to bring it to the center; click the center image to view full size.
            </p>

            <div className="graphic-menu-carousel">
              <div className="graphic-menu-carousel-track">
                {MENU_IMAGES.map((img, index) => {
                  const offset = getOffset(index, centerIndex);
                  const isCenter = offset === 0;
                  return (
                    <motion.button
                      key={img.src}
                      type="button"
                      className="graphic-menu-carousel-item"
                      onClick={() => handleCarouselItemClick(index)}
                      initial={{
                        x: offset * 200,
                        scale: isCenter ? 1 : 0.58,
                        opacity: isCenter ? 1 : 0.4,
                        filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                        zIndex: isCenter ? 10 : 5 - Math.abs(offset),
                      }}
                      style={{ originX: '50%', originY: '50%' }}
                      animate={{
                        x: offset * 200,
                        scale: isCenter ? 1 : 0.58,
                        opacity: isCenter ? 1 : 0.4,
                        filter: isCenter ? 'blur(0px)' : 'blur(4px)',
                        zIndex: isCenter ? 10 : 5 - Math.abs(offset),
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 28,
                      }}
                    >
                      <img src={img.src} alt={img.alt} draggable={false} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <p className="graphic-menu-page-label">
              {MENU_IMAGES[centerIndex].pageLabel}
            </p>
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

export default GraphicMenuPage;
