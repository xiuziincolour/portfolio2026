import React from 'react';
import { motion } from 'framer-motion';
import { UNIFIED_WORKS } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import './WorkGrid.css';

interface WorkGridProps {
  onOpenProject?: (id: string) => void;
}

const WorkGrid: React.FC<WorkGridProps> = ({ onOpenProject }) => {
  const scrollDirection = useScrollDirection();
  const shouldAnimate = scrollDirection === 'down' || scrollDirection === null;

  return (
    <section id="work" className="py-12 md:py-24 px-6 md:px-12 bg-brand-bg">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-brand-text mb-4">
            Selected Work
          </h2>
          <p className="text-gray-400 font-medium text-sm uppercase tracking-widest">
            Explore my latest projects
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {UNIFIED_WORKS.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                delay: shouldAnimate ? index * 0.1 : 0, 
                duration: shouldAnimate ? 0.6 : 0,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={() => onOpenProject && onOpenProject(work.id)}
              className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-gray-50"
            >
              {/* Content Rendering Logic based on Type */}
              <div 
                className="work-grid-item w-full h-full transition-transform duration-700 group-hover:scale-105"
                data-bg-color={work.bgColor || 'transparent'}
              >
                {work.type === 'image' && (
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Microsoft / Airbnb Style Logo Centering */}
                {work.type === 'solid-color' && !work.customContent && (
                  <div className="w-full h-full flex items-center justify-center p-12">
                     <img 
                        src={work.image} 
                        alt="Logo" 
                        className={`work-grid-logo w-32 h-32 object-contain`}
                        data-text-color={work.textColor || ''}
                     />
                  </div>
                )}

                {/* "Seattle Design Festival" Angled Text Style */}
                {work.type === 'solid-color' && work.customContent === 'text-graphic' && (
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="-rotate-45 transform translate-y-4 translate-x-4">
                        <h3 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight text-center">
                          Motion<br/>Graphic<br/>Festival
                        </h3>
                    </div>
                    {/* Decorative line */}
                    <div className="absolute bottom-12 left-12 w-24 h-2 bg-white -rotate-45 origin-bottom-left"></div>
                  </div>
                )}
              </div>

              {/* Hover Overlay - displaying Title & Subtitle */}
              <div className="work-grid-overlay absolute inset-0 bg-brand-blue/90 flex flex-col items-center justify-center text-center p-8 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    className="work-grid-overlay-content"
                  >
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-3 block">
                      {work.subtitle}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      {work.title}
                    </h3>
                    <div className="inline-flex items-center gap-2 text-white border border-white/30 rounded-full px-6 py-2 text-sm font-medium hover:bg-white hover:text-brand-blue transition-colors">
                      View Case Study <ArrowUpRight size={16} />
                    </div>
                  </motion.div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;