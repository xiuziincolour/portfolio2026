import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { VIDEOS } from '../constants';
import './VideoShowcase.css';

const VideoShowcase: React.FC = () => {
  return (
    <section id="video" className="video-showcase-section">
       <div className="video-showcase-container">
        <div className="video-showcase-header">
           <h2 className="video-showcase-title">Cinematography</h2>
           <span className="video-showcase-badge">04 — Video</span>
        </div>

        <div className="video-showcase-list">
          {VIDEOS.map((video) => (
             <div key={video.id} className="video-showcase-item">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="video-showcase-video-wrapper"
                >
                  <img src={video.thumbnail} alt={video.title} className="video-showcase-thumbnail" />
                  
                  <div className="video-showcase-content">
                     <span className="video-showcase-subtitle">{video.subtitle}</span>
                     <h3 className="video-showcase-item-title">{video.title}</h3>
                     <PlayCircle size={64} className="video-showcase-play-icon" strokeWidth={1} />
                  </div>
                </motion.div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;