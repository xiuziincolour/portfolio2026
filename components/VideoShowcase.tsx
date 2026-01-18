import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { VIDEOS } from '../constants';
import './VideoShowcase.css';

const VideoShowcase: React.FC = () => {
  return (
    <section id="video" className="py-24 px-6 md:px-12 bg-black text-white">
       <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Cinematography</h2>
           <span className="text-gray-500 font-medium text-sm uppercase tracking-widest mt-4 md:mt-0">04 — Video</span>
        </div>

        <div className="flex flex-col gap-24">
          {VIDEOS.map((video) => (
             <div key={video.id} className="relative group w-full cursor-pointer">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative aspect-[21/9] w-full overflow-hidden rounded-lg bg-gray-900"
                >
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                     <span className="text-xs font-bold uppercase tracking-widest mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">{video.subtitle}</span>
                     <h3 className="text-3xl md:text-5xl font-bold text-center mb-8">{video.title}</h3>
                     <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" strokeWidth={1} />
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