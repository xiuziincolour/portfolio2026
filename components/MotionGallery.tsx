import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { MOTION_ITEMS } from '../constants';
import './MotionGallery.css';

const MotionGallery: React.FC = () => {
  return (
    <section id="motion" className="py-24 px-6 md:px-12 bg-[#111] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-800 pb-8">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Motion & Interaction</h2>
           <span className="text-gray-500 font-medium text-sm uppercase tracking-widest mt-4 md:mt-0">03 — Animation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOTION_ITEMS.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group rounded-xl overflow-hidden bg-gray-900 aspect-video"
            >
              <img src={item.placeholder} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="fill-white text-white ml-1" />
                  </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-lg font-medium">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MotionGallery;