import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, X, PanelLeftClose } from 'lucide-react';
import './CaseStudy.css';

interface CaseStudyProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: 'overview', title: '01. Overview' },
  { id: 'problem', title: '02. Problem' },
  { id: 'research', title: '03. Research' },
  { id: 'process', title: '04. Process' },
  { id: 'iteration', title: '05. Iteration' },
  { id: 'visuals', title: '06. High-Fidelity' },
  { id: 'outcome', title: '07. Outcome' },
];

const CaseStudy: React.FC<CaseStudyProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [caseStudyMenuOpen, setCaseStudyMenuOpen] = useState(false);
  const pendingScrollToIdRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (caseStudyMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        const id = pendingScrollToIdRef.current;
        if (id) {
          pendingScrollToIdRef.current = null;
          requestAnimationFrame(() => {
            const el = document.getElementById(id);
            el?.scrollIntoView({ behavior: 'smooth' });
          });
        } else {
          window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
        }
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    }
  }, [caseStudyMenuOpen]);

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
    <div className="case-study-container">
      
      {/* Navigation - Minimal & Fixed */}
      <div className="case-study-nav">
        <div className="case-study-nav-wrapper">
          <button 
            onClick={onBack}
            className="case-study-back-button"
          >
            <ArrowLeft size={16} className="case-study-back-icon" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Hero Image Section - Image Only */}
      <header className="case-study-hero">
        <img 
          src="/img/linko/linko_header.jpg" 
          alt="Linko Hero" 
          className="case-study-hero-image case-study-image-clickable"
          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/linko/linko_header.jpg')}
        />
      </header>

      {/* Mobile: Floating trigger for case study index (same as Jargon) */}
      <button
        type="button"
        className="case-study-float-trigger"
        onClick={() => setCaseStudyMenuOpen(true)}
        aria-label="Open case study index"
      >
        <PanelLeftClose size={22} aria-hidden />
        <span className="case-study-float-trigger-label">Index</span>
      </button>

      {/* Mobile: Floating collapsible panel */}
      <AnimatePresence>
        {caseStudyMenuOpen && (
          <motion.div
            className="case-study-float-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCaseStudyMenuOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {caseStudyMenuOpen && (
          <motion.aside
            className="case-study-float-panel"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            aria-label="Case study index and links"
          >
            <div className="case-study-float-panel-inner">
              <button
                type="button"
                className="case-study-float-close"
                onClick={() => setCaseStudyMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
              <div className="case-study-outcome-buttons">
                <a
                  href="https://mdia-2109-linko-7ulc.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-outcome-btn"
                  onClick={() => setCaseStudyMenuOpen(false)}
                >
                  View Coded App
                </a>
                <a
                  href="https://htmlpreview.github.io/?https://github.com/primcharlin/LINKO-A5Styleguide/blob/main/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-outcome-btn"
                  onClick={() => setCaseStudyMenuOpen(false)}
                >
                  View website
                </a>
              </div>
              <span className="case-study-index-label">Index</span>
              <div className="case-study-timeline">
                <div className="case-study-timeline-track" />
                <ul className="case-study-timeline-list">
                  {SECTIONS.map((section) => (
                    <li key={section.id} className="case-study-timeline-item">
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="active-indicator-float"
                          className="case-study-timeline-indicator"
                          transition={{ type: 'spring', stiffness: 400, damping: 35, mass: 0.5 }}
                        />
                      )}
                      <a
                        href={`#${section.id}`}
                        onClick={(e) => {
                          handleScrollToSection(e, section.id);
                          pendingScrollToIdRef.current = section.id;
                          setCaseStudyMenuOpen(false);
                        }}
                        className={`case-study-timeline-link ${activeSection === section.id ? 'active' : ''}`}
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Layout */}
      <div className="case-study-main">
        <div className="case-study-layout">
          
          {/* Left Column: Sticky Timeline & Index */}
          <aside className="case-study-sidebar">
            <div className="case-study-sidebar-sticky">
              <div className="case-study-outcome-buttons">
                <a
                  href="https://mdia-2109-linko-7ulc.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-outcome-btn"
                >
                  View Coded App
                </a>
                <a
                  href="https://htmlpreview.github.io/?https://github.com/primcharlin/LINKO-A5Styleguide/blob/main/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-study-outcome-btn"
                >
                  View website
                </a>
              </div>

              <span className="case-study-index-label">Index</span>
              
              <div className="case-study-timeline">
                {/* Continuous Gray Track Line */}
                <div className="case-study-timeline-track" />

                <ul className="case-study-timeline-list">
                  {SECTIONS.map((section) => (
                    <li key={section.id} className="case-study-timeline-item">
                      {/* Active Indicator (Blue Segment) */}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="active-indicator"
                          className="case-study-timeline-indicator"
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
                        className={`case-study-timeline-link ${
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
          <main className="case-study-content">
            
            {/* Title Block */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="case-study-title-block"
            >
                <div className="case-study-title-header">
                   <span className="case-study-title-badge">Product Design</span>
                   <h1 className="case-study-title">
                     Linko: Redefining the Live Music Social Experience
                   </h1>
                </div>
                
                <div className="case-study-title-info">
                   <p className="case-study-title-description">
                     A social platform designed to connect music lovers, turning solo concert-going into a shared community experience.
                   </p>
                   
                   <div className="case-study-title-meta">
                      <div>
                        <span className="case-study-meta-label">Role</span>
                        <span className="case-study-meta-value">UI/UX Designer, Frontend Developer</span>
                      </div>
                      <div>
                        <span className="case-study-meta-label">Category</span>
                        <span className="case-study-meta-value">Social Platform</span>
                      </div>
                      <div>
                        <span className="case-study-meta-label">Focus</span>
                        <span className="case-study-meta-value">Community & Safety</span>
                      </div>
                      <div>
                        <span className="case-study-meta-label">Platform</span>
                        <span className="case-study-meta-value">Mobile App</span>
                      </div>
                   </div>
                </div>
            </motion.div>

            {/* 01. Overview */}
            <section id="overview" className="case-study-section">
              <span className="case-study-section-label">01 / Overview</span>
              <h2 className="case-study-section-title">Project Overview</h2>
              
              <div className="case-study-section-content">
                 <div className="case-study-text-block">
                    <h3 className="case-study-text-title">Background</h3>
                    <p className="case-study-text-paragraph">
                      Linko is a social platform designed to connect music lovers, turning solo concert-going into a shared community experience. It addresses the common struggle of finding others who share a passion for live music.
                    </p>
                 </div>
                 <div className="case-study-text-block">
                    <h3 className="case-study-text-title">Key Challenge</h3>
                    <p className="case-study-text-paragraph">
                      Creating a safe, low-pressure environment for users to build lasting memories through music while ensuring user safety and privacy in a social networking context.
                    </p>
                 </div>
              </div>
            </section>

            {/* 02. Problem */}
            <section id="problem" className="case-study-section">
              <span className="case-study-section-label">02 / Problem</span>
              <div className="case-study-problem-wrapper">
                 <div>
                    <h2 className="case-study-section-title">Problem Statement</h2>
                    <div className="case-study-problem-content">
                       <div className="case-study-text-block">
                          <h3 className="case-study-text-title">The Gap</h3>
                          <p className="case-study-text-paragraph">
                            Many fans love live music but lack a dedicated friend group to attend shows with, leading to feelings of isolation.
                          </p>
                       </div>
                       <div className="case-study-text-block">
                          <h3 className="case-study-text-title">Goal</h3>
                          <p className="case-study-text-paragraph">
                            To bring people together through shared passion, creating connections and building communities around every concert.
                          </p>
                       </div>
                       <div className="case-study-text-block">
                          <h3 className="case-study-text-title">Core Pain Points</h3>
                          <ul className="case-study-list">
                             <li>Difficulty finding people with matching music tastes</li>
                             <li>Safety concerns when meeting strangers at events</li>
                             <li>Lack of a dedicated platform for concert-goers to connect</li>
                          </ul>
                       </div>
                    </div>
                 </div>
              </div>
            </section>

            {/* 03. Research */}
            <section id="research" className="case-study-section">
              <span className="case-study-section-label">03 / Research</span>
              <h2 className="case-study-section-title">User Research & Analysis</h2>
              
              <div className="case-study-research-wrapper">
                 <div>
                    <h3 className="case-study-research-title">User Persona</h3>
                    <div className="case-study-image-full-width">
                       <img 
                          src="/img/linko/linko_UserPersonas.jpg" 
                          alt="Linko User Personas" 
                          className="case-study-image case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/linko/linko_UserPersonas.jpg')}
                       />
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="case-study-research-title">Target Audience</h3>
                    <div className="case-study-grid-3">
                       <div>
                          <h4 className="case-study-grid-title">Demographics</h4>
                          <p className="case-study-grid-text">Young adults (18-40), including students and young professionals</p>
                       </div>
                       <div>
                          <h4 className="case-study-grid-title">Geography</h4>
                          <p className="case-study-grid-text">North America, specifically Canada and the US</p>
                       </div>
                       <div>
                          <h4 className="case-study-grid-title">Behavior</h4>
                          <p className="case-study-grid-text">Lovers of live music who hate going to events alone and prioritize safety</p>
                       </div>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="case-study-research-title">Visual Research</h3>
                    <div className="case-study-image-full-width">
                       <img 
                          src="/img/linko/linko_moodboard.jpg" 
                          alt="Linko Moodboard" 
                          className="case-study-image case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/linko/linko_moodboard.jpg')}
                       />
                    </div>
                    <p className="case-study-text-paragraph">
                      A mood board was curated to capture the high-energy, immersive atmosphere of concerts using light, crowds, and vibrant colors.
                    </p>
                 </div>
              </div>
            </section>

            {/* 04. Process */}
            <section id="process" className="case-study-section">
              <span className="case-study-section-label">04 / Process</span>
              <h2 className="case-study-section-title">The Design Process</h2>
              
              <div className="case-study-process-wrapper">
                 <div>
                    <h3 className="case-study-research-title">Information Architecture & User Flow</h3>
                    <p className="case-study-text-paragraph">
                      The app is organized into four primary flows to ensure a seamless experience:
                    </p>
                    <div className="case-study-image-full-width">
                       <img 
                          src="/img/linko/linko_Userflow.jpg" 
                          alt="Linko User Flow" 
                          className="case-study-image case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/linko/linko_Userflow.jpg')}
                       />
                    </div>
                    <div className="case-study-grid-2">
                       <div className="case-study-flow-card">
                          <h4 className="case-study-flow-title">Flow 1: Onboarding</h4>
                          <p className="case-study-flow-description">Guided sign-up involving questionnaires to establish the user's "vibe"</p>
                       </div>
                       <div className="case-study-flow-card">
                          <h4 className="case-study-flow-title">Flow 2: Matching</h4>
                          <p className="case-study-flow-description">An algorithmic process to suggest potential concert buddies</p>
                       </div>
                       <div className="case-study-flow-card">
                          <h4 className="case-study-flow-title">Flow 3: Explore/Chat</h4>
                          <p className="case-study-flow-description">A space to browse upcoming concerts and join dedicated group chats</p>
                       </div>
                       <div className="case-study-flow-card">
                          <h4 className="case-study-flow-title">Flow 4: Profile</h4>
                          <p className="case-study-flow-description">A personalized "concert calling card" showcasing favorite genres and artists</p>
                       </div>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="case-study-research-title">Style Guide</h3>
                    <div className="case-study-style-guide-text">
                       <div className="case-study-text-block">
                          <h4 className="case-study-text-title">Color Palette</h4>
                          <p className="case-study-text-paragraph">
                            In LINKO's interface design, this color palette reflects a strong and consistent brand identity. The Dream Violet tone creates a trustworthy yet imaginative social space. The Neon Lime accents encourage user interaction, while the Coral Pulse buttons clearly guide user actions. The dark background ensures content remains in focus, delivering an immersive and visually clear user experience.
                          </p>
                       </div>
                       <div className="case-study-text-block">
                          <h4 className="case-study-text-title">Logo</h4>
                          <p className="case-study-text-paragraph">
                            The Linko logo is a visual fusion of a vinyl record and a chat bubble, symbolizing the connection between music lovers and meaningful conversations. It represents our mission — helping people find companions to enjoy live music experiences together.
                          </p>
                       </div>
                       <div className="case-study-text-block">
                          <h4 className="case-study-text-title">Typography</h4>
                          <p className="case-study-text-paragraph">
                            Our app features two distinct fonts: Lexend and Ruffly Bold. Lexend, a modern sans-serif typeface, is used for general text to ensure readability and accessibility across all content. Its clean and well-spaced design makes it easy for users to read comfortably. For emphasis, we incorporate Ruffly Bold, a bold and expressive typeface, in key elements such as the logo and usernames. This adds personality and visual contrast, helping important details stand out. By combining Lexend's clarity with Ruffly Bold's impact, our typography creates a balanced, engaging, and user-friendly experience while maintaining a strong brand identity.
                          </p>
                       </div>
                    </div>
                    <div className="case-study-image-full-width">
                       <img 
                          src="/img/linko/linko_styleguide.jpg" 
                          alt="Linko Style Guide" 
                          className="case-study-image case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/linko/linko_styleguide.jpg')}
                       />
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="case-study-research-title">Wireframing & Prototyping</h3>
                    <div className="case-study-image-full-width case-study-image-spaced">
                       <img
                          src="/img/linko/Link-lowfi-example.png"
                          alt="Linko Low-Fi example"
                          className="case-study-image case-study-image-clickable"
                          onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/linko/Link-lowfi-example.png')}
                       />
                    </div>
                    <div className="case-study-figma-embed">
                       <iframe
                          title="Linko portfolio – Low-Fi (Figma)"
                          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FNv8pgwGMQpnijX5vNenQQD%2FLinko-portfolio%3Fnode-id%3D400-3447%26p%3Df%26t%3De01fWMpAcmovvlRn-0"
                          allowFullScreen
                          className="case-study-figma-iframe"
                       />
                    </div>
                 </div>
              </div>
            </section>

            {/* 05. Iteration */}
            <section id="iteration" className="case-study-section">
               <span className="case-study-section-label">05 / Iteration</span>
               <h2 className="case-study-section-title">Testing & Iteration</h2>
               <div className="case-study-text-block">
                  <p className="case-study-text-paragraph">
                     Based on user feedback and testing, we refined the matching flow and concert channel experience to better support discovery and safety.
                  </p>
               </div>
            </section>

            {/* 06. High-Fidelity */}
            <section id="visuals" className="case-study-section">
               <span className="case-study-section-label">06 / High-Fidelity</span>
               <h2 className="case-study-section-title case-study-section-title-spaced">High-Fidelity Design & Features</h2>
               
               <div className="case-study-image-full-width case-study-image-spaced">
                  <img
                     src="/img/linko/Link-hifi-example.png"
                     alt="Linko High-Fi example"
                     className="case-study-image case-study-image-clickable"
                     onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                     role="button"
                     tabIndex={0}
                     onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/linko/Link-hifi-example.png')}
                  />
               </div>
               <div className="case-study-figma-embed case-study-image-spaced">
                  <iframe
                     title="Linko portfolio – High-Fi (Figma)"
                     src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FNv8pgwGMQpnijX5vNenQQD%2FLinko-portfolio%3Fnode-id%3D1243-9710%26p%3Df%26t%3De01fWMpAcmovvlRn-0"
                     allowFullScreen
                     className="case-study-figma-iframe"
                  />
               </div>
               
               <div className="case-study-visuals-content">
                  {/* Feature 1 */}
                  <div className="case-study-feature-block">
                     <h3 className="case-study-feature-title">Musical Matching</h3>
                     <p className="case-study-feature-description">
                        Users can see potential matches with overlapping tastes, like "Swifties" or fans heading to a specific Drake or The Weeknd show.
                     </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="case-study-feature-block">
                     <h3 className="case-study-feature-title">Concert Channels</h3>
                     <p className="case-study-feature-description">
                        Instead of going alone, users join a "Channel" for a specific concert to chat and meet their future "concert crew".
                     </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="case-study-feature-block">
                     <h3 className="case-study-feature-title">Community Safety</h3>
                     <p className="case-study-feature-description">
                        Clear community rules prohibit ticket sales and harassment, ensuring a respectful and enjoyable environment for everyone.
                     </p>
                  </div>
               </div>
            </section>

            {/* 07. Outcome */}
            <section id="outcome" className="case-study-section case-study-outcome-section">
               <span className="case-study-section-label">07 / Outcome</span>
               <div className="case-study-conclusion">
                  <h2 className="case-study-section-title">Conclusion & Reflections</h2>
                  <div className="case-study-conclusion-content">
                     <div className="case-study-text-block">
                        <h3 className="case-study-conclusion-subtitle">Project Outcome</h3>
                        <p className="case-study-text-paragraph">
                           Linko successfully bridges the gap between digital matching and physical event attendance, creating a safer way for fans to connect.
                        </p>
                     </div>
                     <div className="case-study-text-block">
                        <h3 className="case-study-conclusion-subtitle">Key Learning</h3>
                        <p className="case-study-text-paragraph">
                           This project highlighted the importance of "human-centric" design—balancing a fun, high-energy aesthetic with the serious functional requirements of user safety and privacy.
                        </p>
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
            className="case-study-lightbox-backdrop"
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
              className="case-study-lightbox-content"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="case-study-lightbox-close"
                onClick={() => setLightboxSrc(null)}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              <img src={lightboxSrc} alt="" className="case-study-lightbox-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudy;