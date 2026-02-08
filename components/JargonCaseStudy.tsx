import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import './JargonCaseStudy.css';

interface JargonCaseStudyProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: 'overview', title: '01. Overview' },
  { id: 'problem', title: '02. Problem' },
  { id: 'research', title: '03. Research' },
  { id: 'process', title: '04. Process' },
  { id: 'visuals', title: '05. Visuals' },
  { id: 'outcome', title: '06. Outcome' },
];

const JargonCaseStudy: React.FC<JargonCaseStudyProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    const updateActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      const scrollPosition = window.scrollY;

      // Find the section closest to the viewport center
      let closestSection = SECTIONS[0].id;
      let closestDistance = Infinity;

      SECTIONS.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // rect.top is relative to viewport, so we need to add scrollPosition
          const elementTop = scrollPosition + rect.top;
          const elementCenter = elementTop + rect.height / 2;
          const viewportCenterY = scrollPosition + viewportCenter;
          const distance = Math.abs(viewportCenterY - elementCenter);

          // Prefer sections that are in view (at least partially visible)
          // Use a more lenient check to catch sections even when scrolling fast
          if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section.id;
            }
          }
        }
      });

      setActiveSection(closestSection);
    };

    // Initial update
    updateActiveSection();

    // Update on scroll with throttling for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id); // Immediate UI update
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="jargon-case-study-page">
      
      {/* Navigation - Minimal & Fixed */}
      <div className="jargon-case-study-nav">
        <div className="jargon-case-study-nav-wrapper">
          <button 
            onClick={onBack}
            className="jargon-case-study-back-button"
          >
            <ArrowLeft size={16} className="jargon-case-study-back-icon" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero Image Section - Image Only */}
      <header className="jargon-case-study-hero">
        <img 
          src="/img/jargon/Jargon-cover.png" 
          alt="Jargon Hero" 
          className="jargon-case-study-hero-image jargon-case-study-image-clickable"
          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/jargon/Jargon-cover.png')}
        />
      </header>

      {/* Main Content Layout */}
      <div className="jargon-case-study-main">
        <div className="jargon-case-study-layout">
          
          {/* Left Column: Sticky Timeline & Index */}
          <aside className="jargon-case-study-sidebar">
            <div className="jargon-case-study-sidebar-sticky">
              <div className="jargon-case-study-outcome-buttons">
                <a
                  href="https://www.jargon-app.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jargon-case-study-outcome-btn"
                >
                  View Coded App
                </a>
                <a
                  href="https://jargon-app.framer.website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jargon-case-study-outcome-btn"
                >
                  View website
                </a>
              </div>

              <span className="jargon-case-study-index-label">Index</span>
              
              <div className="jargon-case-study-timeline">
                {/* Continuous Gray Track Line */}
                <div className="jargon-case-study-timeline-track" />

                <ul className="jargon-case-study-timeline-list">
                  {SECTIONS.map((section) => (
                    <li key={section.id} className="jargon-case-study-timeline-item">
                      {/* Active Indicator (Blue Segment) */}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="active-indicator-jargon"
                          className="jargon-case-study-timeline-indicator"
                          transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 35,
                            mass: 0.5
                          }}
                        />
                      )}

                      <a 
                        href={`#${section.id}`} 
                        onClick={(e) => handleScrollToSection(e, section.id)}
                        className={`jargon-case-study-timeline-link ${
                          activeSection === section.id ? 'active' : ''
                        }`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Right Column: Content */}
          <main className="jargon-case-study-content">
            
            {/* Title Block */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="jargon-case-study-title-block"
            >
                <div className="jargon-case-study-title-header">
                   <span className="jargon-case-study-title-badge">Product Design</span>
                   <h1 className="jargon-case-study-title">
                     Jargon:<br/>Bridging Language<br/>Gaps in Skilled<br/>Trades
                   </h1>
                </div>
                
                <div className="jargon-case-study-title-info">
                   <p className="jargon-case-study-title-description">
                     A learning app designed to help skilled trades immigrants in Canada understand industry-specific English terminology, with a strong focus on safety and real workplace usage.
                   </p>
                   
                   <div className="jargon-case-study-title-meta">
                      <div>
                        <span className="jargon-case-study-meta-label">Role</span>
                        <span className="jargon-case-study-meta-value">Co-Lead UX/UI Designer, Frontend Developer</span>
                      </div>
                      <div>
                        <span className="jargon-case-study-meta-label">Timeline</span>
                        <span className="jargon-case-study-meta-value">8 weeks</span>
                      </div>
                      <div>
                        <span className="jargon-case-study-meta-label">Category</span>
                        <span className="jargon-case-study-meta-value">Learning App</span>
                      </div>
                      <div>
                        <span className="jargon-case-study-meta-label">Platform</span>
                        <span className="jargon-case-study-meta-value">Mobile App</span>
                      </div>
                   </div>
                </div>
            </motion.div>

            {/* 01. Overview */}
            <section id="overview" className="jargon-case-study-section">
              <span className="jargon-case-study-section-label">01 / Overview</span>
              <h2 className="jargon-case-study-section-title">Project Overview</h2>
              
              <div className="jargon-case-study-section-content">
                 <div className="jargon-case-study-text-block">
                    <h3 className="jargon-case-study-text-title">Background</h3>
                    <p className="jargon-case-study-text-paragraph">
                      Jargon is a learning app designed to help skilled trades immigrants in Canada understand industry-specific English terminology, with a strong focus on safety and real workplace usage. While trades often prioritize hands-on skills, unclear language—especially in manuals and safety instructions—can directly impact confidence and safety on the job. Jargon addresses this overlooked gap.
                    </p>
                 </div>
                 <div className="jargon-case-study-text-block">
                    <h3 className="jargon-case-study-text-title">My Role</h3>
                    <p className="jargon-case-study-text-paragraph">
                      <strong>UX/UI Designer</strong><br/>
                      I was responsible for user research, problem definition, information architecture, user flows, wireframing, visual design, and design iteration.
                    </p>
                 </div>
                 <div className="jargon-case-study-text-block">
                    <h3 className="jargon-case-study-text-title">Timeline</h3>
                    <p className="jargon-case-study-text-paragraph">
                      6 weeks (Research → Concept → Design → Testing → Iteration)
                    </p>
                 </div>
                 <div className="jargon-case-study-text-block">
                    <h3 className="jargon-case-study-text-title">Core Challenge</h3>
                    <p className="jargon-case-study-text-paragraph">
                      Designing an accessible learning experience for users with varying English proficiency and limited study time—without increasing cognitive load or feeling like traditional "school-style" learning.
                    </p>
                 </div>
              </div>
            </section>

            {/* 02. Problem */}
            <section id="problem" className="jargon-case-study-section">
              <span className="jargon-case-study-section-label">02 / Problem</span>
              <div className="jargon-case-study-problem-wrapper">
                 <div>
                    <h2 className="jargon-case-study-section-title">Problem Statement</h2>
                    <div className="jargon-case-study-problem-content">
                       <div className="jargon-case-study-text-block">
                          <h3 className="jargon-case-study-text-title">The Problem</h3>
                          <p className="jargon-case-study-text-paragraph">
                            Research showed that many skilled trades immigrants:
                          </p>
                          <ul className="jargon-case-study-list">
                             <li>Can communicate in everyday English but struggle with technical and safety terminology</li>
                             <li>Rely on memorization or guessing rather than full understanding</li>
                             <li>Find existing language apps too generic and unrelated to real job contexts</li>
                             <li>Have limited time and motivation for long, structured courses</li>
                          </ul>
                          <p className="jargon-case-study-text-paragraph jargon-case-study-text-paragraph-spaced">
                            This creates risks in high-stakes environments where misunderstanding instructions can lead to safety issues.
                          </p>
                       </div>
                       <div className="jargon-case-study-text-block">
                          <h3 className="jargon-case-study-text-title">Goals</h3>
                          <ul className="jargon-case-study-list">
                             <li>Help users clearly understand job-specific terminology</li>
                             <li>Reduce friction when reading manuals and technical documents</li>
                             <li>Increase confidence and safety in real work situations</li>
                          </ul>
                       </div>
                       <div className="jargon-case-study-text-block">
                          <h3 className="jargon-case-study-text-title">Initial Assumption</h3>
                          <p className="jargon-case-study-text-paragraph">
                            If learning content is directly tied to users' real work materials and broken into small, practical steps, users will be more likely to engage, retain information, and apply it on the job.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </section>

            {/* 03. Research */}
            <section id="research" className="jargon-case-study-section">
              <span className="jargon-case-study-section-label">03 / Research</span>
              <h2 className="jargon-case-study-section-title">User Research & Analysis</h2>
              
              <div className="jargon-case-study-research-wrapper">
                 <div>
                    <h3 className="jargon-case-study-research-title">User Persona</h3>
                    <div className="jargon-case-study-image-full-width">
                       <img 
                          src="/img/jargon/Jargon-persona1.jpg" 
                          alt="Jargon User Persona 1" 
                          className="jargon-case-study-image jargon-case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/jargon/Jargon-persona1.jpg')}
                       />
                    </div>
                    <div className="jargon-case-study-image-full-width">
                       <img 
                          src="/img/jargon/Jargon-persona2.jpg" 
                          alt="Jargon User Persona 2" 
                          className="jargon-case-study-image jargon-case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/jargon/Jargon-persona2.jpg')}
                       />
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="jargon-case-study-research-title">Competitive Analysis</h3>
                    <div className="jargon-case-study-text-block">
                       <p className="jargon-case-study-text-paragraph">
                          <strong>Objective:</strong> To identify market gaps by analyzing direct competitors in language learning (Duolingo, ELSA Speak) and indirect competitors in accessibility and real-time support (Be My Eyes).
                       </p>
                    </div>
                    <div className="jargon-case-study-text-block">
                       <p className="jargon-case-study-text-paragraph" style={{ marginBottom: '0.75rem', fontWeight: 600 }}>
                          <strong>Key Takeaways</strong>
                       </p>
                       <ul className="jargon-case-study-list">
                          <li><strong>Gamification vs. Precision:</strong> While Duolingo excels in user retention through streaks, ELSA Speak leads in technical accuracy. There is an opportunity to bridge the gap between "fun" and "functional depth."</li>
                          <li><strong>Community & Support:</strong> Be My Eyes highlights the value of human-centric design. Integrating real-time AI assistance with community-driven motivation can significantly enhance the user experience.</li>
                       </ul>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="jargon-case-study-research-title">Key Pain Points Identified</h3>
                    <ul className="jargon-case-study-list">
                       <li>Difficulty understanding safety terminology</li>
                       <li>Stress when reading technical documents</li>
                       <li>Learning tools feel disconnected from real work</li>
                       <li>Low motivation due to lack of visible progress</li>
                    </ul>
                 </div>
              </div>
            </section>

            {/* 04. Process */}
            <section id="process" className="jargon-case-study-section">
              <span className="jargon-case-study-section-label">04 / Process</span>
              <h2 className="jargon-case-study-section-title">The Design Process</h2>
              
              <div className="jargon-case-study-process-wrapper">
                 <div>
                    <h3 className="jargon-case-study-research-title">Information Architecture & User Flow</h3>
                    <div className="jargon-case-study-text-block">
                       <h4 className="jargon-case-study-text-title">Core User Tasks</h4>
                       <ul className="jargon-case-study-list">
                          <li>Learn essential trade terminology</li>
                          <li>Convert real documents into learning materials</li>
                          <li>Test understanding and track progress</li>
                       </ul>
                    </div>
                    <div className="jargon-case-study-text-block">
                       <h4 className="jargon-case-study-text-title">Core Flow</h4>
                       <ol className="jargon-case-study-list-ordered">
                          <li>Onboard and select trade</li>
                          <li>Enter My Courses</li>
                          <li>Learn structured Apprentice-level content</li>
                          <li>Upload work documents</li>
                          <li>Auto-generate translations, flashcards, and quizzes</li>
                          <li>Reinforce learning through practice</li>
                       </ol>
                    </div>
                    <div className="jargon-case-study-image-full-width">
                       <img 
                          src="/img/jargon/Jargon-flow.jpg" 
                          alt="Jargon User Flow" 
                          className="jargon-case-study-image jargon-case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/jargon/Jargon-flow.jpg')}
                       />
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="jargon-case-study-research-title">Low-Fidelity Wireframes</h3>
                    <div className="jargon-case-study-figma-embed">
                       <iframe
                          title="Jargon portfolio – Low-Fi (Figma)"
                          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FLinZorgF0Yq032wKIhtMyF%2FJargon-portfolio%3Fnode-id%3D6-5068"
                          allowFullScreen
                          className="jargon-case-study-figma-iframe"
                       />
                    </div>
                    <p className="jargon-case-study-text-paragraph">
                      Early sketches focused on:
                    </p>
                    <ul className="jargon-case-study-list">
                       <li>Clarifying where users should start</li>
                       <li>Reducing decision fatigue</li>
                       <li>Prioritizing learning over features</li>
                    </ul>
                    <p className="jargon-case-study-text-paragraph jargon-case-study-text-paragraph-bold">
                      Key Issue Identified: Users felt unsure whether to begin with courses or document uploads.
                    </p>
                 </div>
                 
                 <div>
                    <h3 className="jargon-case-study-research-title">Style Guide</h3>
                    <div className="jargon-case-study-style-guide-text">
                       <div className="jargon-case-study-text-block">
                          <h4 className="jargon-case-study-text-title">Color</h4>
                          <p className="jargon-case-study-text-paragraph">
                            High contrast for accessibility and clarity
                          </p>
                       </div>
                       <div className="jargon-case-study-text-block">
                          <h4 className="jargon-case-study-text-title">Typography</h4>
                          <p className="jargon-case-study-text-paragraph">
                            Clean, readable, industrial-inspired
                          </p>
                       </div>
                       <div className="jargon-case-study-text-block">
                          <h4 className="jargon-case-study-text-title">Components</h4>
                          <p className="jargon-case-study-text-paragraph">
                            Card-based layouts to reduce overwhelm
                          </p>
                       </div>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="jargon-case-study-research-title">Design Iterations</h3>
                    <ul className="jargon-case-study-list">
                       <li>Elevated "Upload Document" as a core feature</li>
                       <li>Introduced level-based progression instead of long course lists</li>
                       <li>Simplified navigation to reduce mental load</li>
                    </ul>
                 </div>
                 
                 <div>
                    <h3 className="jargon-case-study-research-title">Testing & Iteration</h3>
                    <div className="jargon-case-study-text-block">
                       <h4 className="jargon-case-study-text-title">Usability Testing Insights</h4>
                       <ul className="jargon-case-study-list">
                          <li>Users preferred starting from real documents</li>
                          <li>Flashcards generated from personal materials felt more valuable</li>
                          <li>Faster access to learning increased engagement</li>
                       </ul>
                    </div>
                    <div className="jargon-case-study-text-block">
                       <h4 className="jargon-case-study-text-title">Iterations Made</h4>
                       <ul className="jargon-case-study-list">
                          <li>Reduced steps in document upload</li>
                          <li>Improved feedback after quizzes</li>
                          <li>Clarified next actions after completing levels</li>
                       </ul>
                    </div>
                 </div>
              </div>
            </section>

            {/* 05. Visuals */}
            <section id="visuals" className="jargon-case-study-section">
               <span className="jargon-case-study-section-label">05 / Visuals</span>
               <h2 className="jargon-case-study-section-title jargon-case-study-section-title-spaced">High-Fidelity Design & Features</h2>
               
               <div className="jargon-case-study-figma-embed jargon-case-study-image-spaced">
                  <iframe
                     title="Jargon portfolio – High-Fi (Figma)"
                     src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FLinZorgF0Yq032wKIhtMyF%2FJargon-portfolio%3Fnode-id%3D4-99"
                     allowFullScreen
                     className="jargon-case-study-figma-iframe"
                  />
               </div>
               
               <div className="jargon-case-study-visuals-content">
                  <div className="jargon-case-study-feature-block">
                     <h3 className="jargon-case-study-research-title">Key Screens</h3>
                     <ul className="jargon-case-study-list">
                        <li><strong>My Courses:</strong> Apprentice-to-Red Seal structure</li>
                        <li><strong>Flashcards:</strong> Focused on terminology and usage</li>
                        <li><strong>AI Document Upload:</strong> Turn manuals into lessons instantly</li>
                     </ul>
                  </div>
                  
                  <div className="jargon-case-study-feature-block">
                     <h3 className="jargon-case-study-research-title">Design Decisions</h3>
                     <ul className="jargon-case-study-list">
                        <li>"Boss Quiz" as a milestone challenge to boost motivation</li>
                        <li>Badges used as positive reinforcement rather than competition</li>
                        <li>Learning framed as progression, not testing</li>
                     </ul>
                  </div>
               </div>
            </section>

            {/* 06. Outcome */}
            <section id="outcome" className="jargon-case-study-section jargon-case-study-outcome-section">
               <span className="jargon-case-study-section-label">06 / Outcome</span>
               <h2 className="jargon-case-study-section-title">Conclusion & Reflections</h2>
               
               <div className="jargon-case-study-conclusion">
                  <div className="jargon-case-study-conclusion-content">
                     <div className="jargon-case-study-text-block">
                        <h3 className="jargon-case-study-research-title jargon-case-study-conclusion-subtitle">Outcome</h3>
                        <p className="jargon-case-study-text-paragraph">
                           Jargon successfully demonstrates how contextual, work-based learning can improve comprehension, confidence, and safety for skilled trades workers.
                        </p>
                     </div>
                     <div className="jargon-case-study-text-block">
                        <h3 className="jargon-case-study-research-title jargon-case-study-conclusion-subtitle">What I Learned</h3>
                        <ul className="jargon-case-study-list">
                           <li>Designing for accessibility means reducing cognitive and emotional barriers</li>
                           <li>Real-world context is critical for effective learning</li>
                           <li>UX decisions must be grounded in users' lived experiences</li>
                        </ul>
                     </div>
                     <div className="jargon-case-study-text-block">
                        <h3 className="jargon-case-study-research-title jargon-case-study-conclusion-subtitle">Future Improvements</h3>
                        <ul className="jargon-case-study-list">
                           <li>Support for more trades</li>
                           <li>Pronunciation and audio learning</li>
                           <li>Smarter personalization based on user progress</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </section>

          </main>
        </div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            className="jargon-case-study-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxSrc(null)}
            role="button"
            tabIndex={-1}
            aria-label="Close"
          >
            <motion.div
              className="jargon-case-study-lightbox-content"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="jargon-case-study-lightbox-close"
                onClick={() => setLightboxSrc(null)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <img src={lightboxSrc} alt="" className="jargon-case-study-lightbox-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JargonCaseStudy;
