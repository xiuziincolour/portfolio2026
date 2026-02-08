import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import './AboutMe.css';

const ABOUTME_PHOTOS = [
  { src: '/img/aboutme/1.jpg', alt: 'About me 1' },
  { src: '/img/aboutme/2.jpg', alt: 'About me 2' },
  { src: '/img/aboutme/3.jpg', alt: 'About me 3' },
  { src: '/img/aboutme/4.jpg', alt: 'About me 4' },
  { src: '/img/aboutme/5.jpg', alt: 'About me 5' },
  { src: '/img/aboutme/6.jpg', alt: 'About me 6' },
];

const INITIAL_POSITIONS = [
  { left: 82, top: 48 }, { left: 18, top: 56 }, { left: 36, top: 12 },
  { left: 52, top: 88 }, { left: 68, top: 0 }, { left: -4, top: 0 },
];

const PHOTO_ROTATIONS = [4, -5, 5, 3, -4, 6];

interface AboutMeProps {
  onBack: () => void;
}

const DRAG_THRESHOLD_PX = 5;

const AboutMe: React.FC<AboutMeProps> = ({ onBack }) => {
  const [positions, setPositions] = useState<{ left: number; top: number }[]>(() => INITIAL_POSITIONS);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; alt: string } | null>(null);
  const collageRef = useRef<HTMLElement>(null);
  const pendingDragRef = useRef<{ index: number; startX: number; startY: number } | null>(null);

  const getRect = useCallback(() => collageRef.current?.getBoundingClientRect(), []);

  const handlePointerDown = useCallback((e: React.PointerEvent, index: number) => {
    e.preventDefault();
    pendingDragRef.current = { index, startX: e.clientX, startY: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = getRect();
    if (!rect) return;

    if (draggingId !== null) {
      const px = e.clientX - rect.left - dragOffset.x;
      const py = e.clientY - rect.top - dragOffset.y;
      const newLeft = Math.max(0, Math.min(100, (px / rect.width) * 100));
      const newTop = Math.max(0, py);
      setPositions(prev => prev.map((p, i) => i === draggingId ? { left: newLeft, top: newTop } : p));
      return;
    }

    const pending = pendingDragRef.current;
    if (pending && pending.index !== null) {
      const dx = e.clientX - pending.startX;
      const dy = e.clientY - pending.startY;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD_PX) {
        const idx = pending.index;
        const leftPx = (positions[idx].left / 100) * rect.width;
        const topPx = positions[idx].top;
        setDragOffset({
          x: e.clientX - rect.left - leftPx,
          y: e.clientY - rect.top - topPx,
        });
        setDraggingId(idx);
        pendingDragRef.current = null;
      }
    }
  }, [draggingId, dragOffset, getRect, positions]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    pendingDragRef.current = null;
    setDraggingId(null);
  }, []);

  const handleDoubleClick = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxPhoto(ABOUTME_PHOTOS[index]);
  }, []);

  const closeLightbox = useCallback(() => setLightboxPhoto(null), []);

  const handleLightboxKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
  }, [closeLightbox]);

  useEffect(() => {
    if (!lightboxPhoto) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxPhoto, closeLightbox]);

  return (
    <div className="about-me-page">
      <div className="about-me-container">
        <button
          onClick={onBack}
          className="about-me-back-button"
          aria-label="Back to home"
        >
          <ArrowLeft size={16} className="about-me-back-icon" />
          <span>Back</span>
        </button>

        {/* Photo collage - draggable */}
        <section
          ref={collageRef}
          className="about-me-collage"
          onPointerMove={handlePointerMove}
          onPointerLeave={() => { pendingDragRef.current = null; setDraggingId(null); }}
          onPointerUp={handlePointerUp}
        >
          {ABOUTME_PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.src}
              className={`about-me-polaroid ${draggingId === index ? 'is-dragging' : ''}`}
              style={{
                left: `${positions[index].left}%`,
                top: `${positions[index].top}px`,
              }}
              initial={{ opacity: 0, y: 28, rotate: PHOTO_ROTATIONS[index] }}
              animate={{ opacity: 1, y: 0, rotate: PHOTO_ROTATIONS[index] }}
              transition={{ duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onPointerDown={(e) => handlePointerDown(e, index)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onDoubleClick={(e) => handleDoubleClick(e, index)}
            >
              <div className="about-me-polaroid-image">
                <img src={photo.src} alt={photo.alt} draggable={false} />
              </div>
            </motion.div>
          ))}
        </section>

        {/* Introduction */}
        <section className="about-me-intro">
          <motion.p
            className="about-me-intro-text"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong className="about-me-name">Xiuzi Guo</strong>
            {' '}
            is a product & brand designer with a love for craft, interfaces, and moving image.
          </motion.p>
        </section>

        {/* Professional experience */}
        <section className="about-me-bio">
          <motion.p
            className="about-me-bio-p"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            I design and code digital products—from UI/UX and branding to motion and film. I focus on clear storytelling and thoughtful craft across interfaces and visuals.
          </motion.p>
          <motion.p
            className="about-me-bio-p"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            My work spans product design, graphic design, and video—bringing ideas from concept to launch with a focus on user experience and visual identity.
          </motion.p>
        </section>
      </div>

      {/* Lightbox: double-click to open, click backdrop or Escape to close */}
      {lightboxPhoto && (
        <div
          className="about-me-lightbox-backdrop"
          onClick={closeLightbox}
          onKeyDown={handleLightboxKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Close"
        >
          <div className="about-me-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxPhoto.src} alt={lightboxPhoto.alt} className="about-me-lightbox-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
