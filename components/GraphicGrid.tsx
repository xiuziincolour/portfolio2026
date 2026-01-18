import React from 'react';
import { motion } from 'framer-motion';
import { GRAPHICS } from '../constants';
import './GraphicGrid.css';

const GraphicGrid: React.FC = () => {
  return (
    <section id="graphic" className="py-32 px-6 md:px-12 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-text">Visual Playground</h2>
           <span className="text-gray-400 font-medium text-sm uppercase tracking-widest mt-4 md:mt-0">02 — Graphic</span>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-16 px-2">
          {GRAPHICS.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="break-inside-avoid relative group pt-4"
            >
              {/* Tape Element */}
              <div 
                className={`absolute -top-1 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#E53E3E]/90 shadow-sm z-20 
                  ${index % 3 === 0 ? '-rotate-2' : index % 3 === 1 ? 'rotate-1' : '-rotate-1'}
                  backdrop-blur-[1px] mix-blend-multiply`}
              >
                {/* Subtle texture/shine for the tape */}
                <div className="w-full h-full bg-white/10"></div>
              </div>

              {/* Paper Container */}
              <div 
                className={`relative bg-white p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 
                  group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] group-hover:rotate-0
                  ${index % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'}
                `}
              >
                {/* Image */}
                <div className="relative overflow-hidden mb-6 bg-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-auto object-cover block grayscale-[0.1] group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                
                {/* Minimalist Caption mimicking gallery/poster labels */}
                <div className="text-center">
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">{item.type}</span>
                   <h3 className="text-lg font-medium text-brand-text">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GraphicGrid;