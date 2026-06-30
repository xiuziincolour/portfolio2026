import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Play, ArrowDown, X } from 'lucide-react';
import { MOTION_GRAPHICS, VIDEOS, DOCUMENTARY, PORTFOLIO_VIDEOS } from '../constants';
import './VideoPage.css';

const SCROLL_EASE = [0.22, 1, 0.36, 1] as const;
const SCROLL_VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -60px 0px' } as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  as?: keyof typeof motion;
  repeat?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  y = 36,
  x = 0,
  as = 'div',
  repeat = false,
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: !repeat,
    amount: 0.15,
    margin: '0px 0px -60px 0px',
  });
  const Component = motion[as] as typeof motion.div;
  const hidden = { opacity: 0, y, x };
  const visible = { opacity: 1, y: 0, x: 0 };

  if (repeat) {
    return (
      <Component
        ref={ref}
        className={className}
        initial={hidden}
        animate={isInView ? visible : hidden}
        transition={{ duration: 0.75, delay: isInView ? delay : 0, ease: SCROLL_EASE }}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={className}
      initial={hidden}
      whileInView={visible}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: 0.75, delay, ease: SCROLL_EASE }}
    >
      {children}
    </Component>
  );
};

interface VideoModalProps {
  videoUrl: string;
  title: string;
  subtitle: string;
  duration?: string;
  bodytext?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface VideoItemProps {
  item: any;
  index: number;
  onVideoClick: (videoUrl: string, title: string, subtitle: string, duration?: string, bodytext?: string) => void;
}

const VideoItem: React.FC<VideoItemProps> = ({ item, index, onVideoClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !item.videoUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.1 }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [item.videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.videoUrl || !isInView) return;

    const previewStart = item.previewStart ?? 0;
    const previewEnd = item.previewEnd;
    const hasSegment = previewEnd != null && previewEnd > previewStart;

    const startPlayback = () => {
      video.currentTime = previewStart;
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      if (hasSegment && video.currentTime >= previewEnd - 0.05) {
        video.currentTime = previewStart;
      }
    };

    const handleLoadedMetadata = () => {
      startPlayback();
    };

    video.src = item.videoUrl;
    if (video.readyState >= 1) {
      startPlayback();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (!hasSegment) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }, 20000);

      return () => {
        clearInterval(interval);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.pause();
      };
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.pause();
    };
  }, [item.videoUrl, item.previewStart, item.previewEnd, isInView]);

  return (
    <motion.div
      ref={wrapperRef}
      className="video-page-item"
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: 0.7, delay: index * 0.12, ease: SCROLL_EASE }}
      onClick={() => item.videoUrl && onVideoClick(item.videoUrl, item.title, item.subtitle, item.duration, item.bodytext)}
    >
      <div className="video-page-item-wrapper">
        {item.videoUrl ? (
          <video
            ref={videoRef}
            className="video-page-item-video"
            playsInline
            loop={item.previewEnd == null}
            muted
            preload="metadata"
          />
        ) : (
          <img 
            src={item.thumbnail} 
            alt={item.title} 
            className="video-page-item-thumbnail" 
          />
        )}
        
        <div className="video-page-item-overlay">
          <div className="video-page-item-play-button">
            <Play size={32} />
          </div>
        </div>

        <div className="video-page-item-info">
          <span className="video-page-item-subtitle">{item.subtitle}</span>
          <h3 className="video-page-item-title">{item.title}</h3>
          {item.duration && (
            <span className="video-page-item-duration">{item.duration}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, title, subtitle, duration, bodytext, isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="video-modal-backdrop"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="video-modal-close" onClick={onClose} aria-label="Close">
              <X size={24} />
            </button>
            <div className="video-modal-content">
              <div className="video-modal-video-wrapper">
                <video
                  ref={videoRef}
                  className="video-modal-video"
                  src={videoUrl}
                  controls
                  playsInline
                />
              </div>
              <div className="video-modal-info">
                <h3 className="video-modal-title">{title}</h3>
                <div className="video-modal-meta">
                  <span className="video-modal-subtitle">{subtitle}</span>
                  {duration && (
                    <>
                      <span className="video-modal-separator">•</span>
                      <span className="video-modal-duration">{duration}</span>
                    </>
                  )}
                </div>
                {bodytext && (
                  <p className="video-modal-bodytext">{bodytext}</p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const VideoPage: React.FC = () => {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ 
    url: string; 
    title: string; 
    subtitle: string; 
    duration?: string; 
    bodytext?: string;
  } | null>(null);

  useEffect(() => {
    // Auto play hero video when component mounts
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch((error) => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  const handleVideoClick = (
    videoUrl: string, 
    title: string, 
    subtitle: string, 
    duration?: string, 
    bodytext?: string
  ) => {
    setSelectedVideo({ url: videoUrl, title, subtitle, duration, bodytext });
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="video-page">
      {/* Full Screen Hero Video */}
      <section className="video-page-hero">
        <div className="video-page-hero-video-wrapper">
          <div className="video-page-hero-gradient-top"></div>
          <video
            ref={heroVideoRef}
            className="video-page-hero-video"
            src={PORTFOLIO_VIDEOS.workreel}
            autoPlay
            playsInline
            loop
            muted
            preload="auto"
          />
          <div className="video-page-hero-gradient-bottom"></div>
        </div>
        <motion.a 
          href="#video-page-statement" 
          className="video-page-scroll-link group"
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ left: '50%' }}
        >
          SCROLL FOR WORK
          <span className="video-page-scroll-icon-wrapper">
            <ArrowDown size={14} className="video-page-scroll-icon" />
          </span>
        </motion.a>
      </section>

      <section id="video-page-statement" className="video-page-statement">
        <div className="video-page-container">
          <div className="video-page-statement-text">
            <ScrollReveal as="span" className="video-page-statement-line" delay={0} repeat>
              Every frame tells a story.
            </ScrollReveal>
            <ScrollReveal as="span" className="video-page-statement-line" delay={0.14} repeat>
              Every story leaves an impact.
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Videography Section */}
      <section id="motion-graphic-section" className="video-page-section videography-section">
        <div className="video-page-container">
          <div className="video-page-section-header">
            <ScrollReveal as="h2" className="video-page-section-title" y={28}>
              Director/Editor
            </ScrollReveal>
            <ScrollReveal as="span" className="video-page-section-badge" x={-16} y={0} delay={0.1}>
              01 — Video
            </ScrollReveal>
            <motion.div
              className="video-page-section-divider"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: SCROLL_EASE }}
              aria-hidden="true"
            />
          </div>

          <div className="video-page-grid">
            {VIDEOS.map((item, index) => (
              <VideoItem
                key={item.id}
                item={item}
                index={index}
                onVideoClick={handleVideoClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Documentary Section */}
      <section className="video-page-section documentary-section">
        <div className="video-page-container">
          <div className="video-page-section-header">
            <ScrollReveal as="h2" className="video-page-section-title" y={28}>
              Documentary
            </ScrollReveal>
            <ScrollReveal as="span" className="video-page-section-badge" x={-16} y={0} delay={0.1}>
              02 — Documentary
            </ScrollReveal>
            <motion.div
              className="video-page-section-divider"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: SCROLL_EASE }}
              aria-hidden="true"
            />
          </div>

          <div className="video-page-grid">
            {DOCUMENTARY.map((item, index) => (
              <VideoItem
                key={item.id}
                item={item}
                index={index}
                onVideoClick={handleVideoClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Motion Graphic Section */}
      <section className="video-page-section motion-graphic-section">
        <div className="video-page-container">
          <div className="video-page-section-header">
            <ScrollReveal as="h2" className="video-page-section-title" y={28}>
              Motion Graphic
            </ScrollReveal>
            <ScrollReveal as="span" className="video-page-section-badge" x={-16} y={0} delay={0.1}>
              03 — Motion
            </ScrollReveal>
            <motion.div
              className="video-page-section-divider"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.8, delay: 0.2, ease: SCROLL_EASE }}
              aria-hidden="true"
            />
          </div>

          <div className="video-page-grid">
            {MOTION_GRAPHICS.map((item, index) => (
              <VideoItem
                key={item.id}
                item={item}
                index={index}
                onVideoClick={handleVideoClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          videoUrl={selectedVideo.url}
          title={selectedVideo.title}
          subtitle={selectedVideo.subtitle}
          duration={selectedVideo.duration}
          bodytext={selectedVideo.bodytext}
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default VideoPage;
