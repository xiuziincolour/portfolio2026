import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-gray-100 pb-8">
           <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-brand-text">Selected Work</h2>
           <span className="text-gray-400 font-medium text-sm uppercase tracking-widest mt-4 md:mt-0">01 — Case Studies</span>
        </div>

        <div className="flex flex-col gap-24">
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                {/* Image */}
                <div className="w-full md:w-2/3 overflow-hidden rounded-xl bg-gray-100 aspect-[16/10]">
                   <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                   />
                </div>

                {/* Content */}
                <div className="w-full md:w-1/3 flex flex-col gap-6 pt-4">
                   <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <span className="text-brand-blue font-medium text-sm">{project.category}</span>
                      <span className="text-gray-400 text-sm">{project.timeline}</span>
                   </div>
                   
                   <div>
                     <h3 className="text-3xl font-bold text-brand-text mb-3 group-hover:text-brand-blue transition-colors">{project.title}</h3>
                     <p className="text-gray-500 leading-relaxed">{project.description}</p>
                   </div>

                   <div className="flex flex-wrap gap-2 mt-auto">
                      {project.role.map(r => (
                        <span key={r} className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">#{r}</span>
                      ))}
                   </div>
                   
                   <div className="flex items-center gap-2 text-brand-text text-sm font-medium mt-4 group-hover:translate-x-2 transition-transform duration-300">
                      View Project <ArrowUpRight size={16} />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-y-auto no-scrollbar flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-colors z-50 mix-blend-difference"
              >
                <X size={24} />
              </button>

              <div className="h-[40vh] md:h-[50vh] w-full shrink-0 relative">
                <img src={selectedProject.image} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 md:left-12 text-white">
                    <span className="text-brand-orange font-bold uppercase tracking-widest text-xs mb-2 block">{selectedProject.category}</span>
                    <h2 className="text-4xl md:text-6xl font-bold">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-8 md:p-16 flex flex-col gap-12 bg-white">
                <div className="grid md:grid-cols-4 gap-12">
                   <div className="md:col-span-3">
                      <h3 className="text-lg font-bold text-brand-text mb-4 uppercase tracking-widest">Overview</h3>
                      <p className="text-xl text-gray-600 leading-relaxed font-light">{selectedProject.description}</p>
                   </div>
                   <div className="flex flex-col gap-6 text-sm">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Role</h4>
                        <div className="flex flex-col text-gray-500">
                          {selectedProject.role.map(r => <span key={r}>{r}</span>)}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Timeline</h4>
                        <span className="text-gray-500">{selectedProject.timeline}</span>
                      </div>
                   </div>
                </div>

                <div className="border-t border-gray-100 pt-12">
                  <h3 className="text-2xl font-bold text-brand-text mb-8">Process & Outcome</h3>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div>
                         <h4 className="text-brand-blue font-medium mb-2">Research</h4>
                         <p className="text-gray-600 leading-relaxed">{selectedProject.process.research}</p>
                       </div>
                       <div>
                         <h4 className="text-brand-blue font-medium mb-2">Design</h4>
                         <p className="text-gray-600 leading-relaxed">{selectedProject.process.wireframe}</p>
                       </div>
                    </div>
                    <div className="space-y-8">
                       <div>
                         <h4 className="text-brand-blue font-medium mb-2">System</h4>
                         <p className="text-gray-600 leading-relaxed">{selectedProject.process.ui}</p>
                       </div>
                       <div className="p-6 bg-brand-bg rounded-lg border border-brand-blue/10">
                         <h4 className="text-brand-text font-bold mb-2">The Outcome</h4>
                         <p className="text-gray-600">{selectedProject.process.outcome}</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;