import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, ArrowDown, X } from 'lucide-react';
import { MOTION_GRAPHICS, VIDEOS, PORTFOLIO_VIDEOS } from '../constants';
import './VideoPage.css';

interface VideoPageProps {
  onBack: () => void;
}

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

  useEffect(() => {
    if (videoRef.current && item.videoUrl) {
      videoRef.current.play().catch(() => {});
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, 20000); // 20 seconds
      return () => clearTimeout(timer);
    }
  }, [item.videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="video-page-item"
      onClick={() => item.videoUrl && onVideoClick(item.videoUrl, item.title, item.subtitle, item.duration, item.bodytext)}
    >
      <div className="video-page-item-wrapper">
        {item.videoUrl ? (
          <video
            ref={videoRef}
            className="video-page-item-video"
            src={item.videoUrl}
            playsInline
            loop
            muted
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

const VideoPage: React.FC<VideoPageProps> = ({ onBack }) => {
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
      {/* Header with Back Button */}
      <div className="video-page-header">
        <div className="video-page-header-container">
          <button 
            onClick={onBack}
            className="video-page-back-button"
          >
            <ArrowLeft size={16} className="video-page-back-icon" />
            <span>Back</span>
          </button>
        </div>
      </div>

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
          />
          <div className="video-page-hero-gradient-bottom"></div>
        </div>
        <motion.a 
          href="#motion-graphic-section" 
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

      {/* Videography Section */}
      <section id="motion-graphic-section" className="video-page-section videography-section">
        <div className="video-page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="video-page-section-header"
          >
            <h2 className="video-page-section-title">Director/Editor</h2>
            <span className="video-page-section-badge">01 — Video</span>
          </motion.div>

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

      {/* Motion Graphic Section */}
      <section className="video-page-section motion-graphic-section">
        <div className="video-page-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="video-page-section-header"
          >
            <h2 className="video-page-section-title">Motion Graphic</h2>
            <span className="video-page-section-badge">02 — Motion</span>
          </motion.div>

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
