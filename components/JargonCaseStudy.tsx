import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react';
import './JargonCaseStudy.css';

interface JargonCaseStudyProps {
   onBack: () => void;
}

const JARGON_HERO_VIDEO = 'https://pub-b1a10ff6b2664d4c86d2cb6c5ad45fc8.r2.dev/Jargon-video-banner.mp4';

const SECTIONS = [
   { id: 'overview', title: '01. Overview' },
   { id: 'research', title: '02. Research' },
   { id: 'process', title: '03. Process' },
   { id: 'iteration', title: '04. Iteration' },
   { id: 'visuals', title: '05. High-Fidelity' },
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

         {/* Hero Section - Jargon Video */}
         <header className="jargon-case-study-hero">
            <video
               className="jargon-case-study-hero-image"
               src={JARGON_HERO_VIDEO}
               poster="/img/jargon/Jargon-cover.png"
               autoPlay
               muted
               loop
               playsInline
               preload="auto"
               aria-label="Jargon case study hero video"
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
                                    className={`jargon-case-study-timeline-link ${activeSection === section.id ? 'active' : ''
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
                           Jargon: Bridging Language Gaps in Skilled Trades
                        </h1>
                     </div>

                     <div className="jargon-case-study-title-info">

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
                           <h3 className="jargon-case-study-text-title">The Problem of Language Barriers</h3>
                           <p className="jargon-case-study-text-paragraph">
                              Language barriers in the trades lead to critical safety risks, accidents, and reduced productivity. Beyond physical danger, communication gaps cause team isolation and hinder the comprehension of technical or regulatory documents.
                           </p>
                           <p className="jargon-case-study-text-paragraph jargon-case-study-text-paragraph-spaced jargon-case-study-reference">
                              <em>Reference: Institute for Work &amp; Health. (2024). OHS vulnerability among new immigrants. <a href="https://www.iwh.on.ca/" target="_blank" rel="noopener noreferrer">https://www.iwh.on.ca/</a></em>
                           </p>
                        </div>
                        <div className="jargon-case-study-text-block">
                           <h3 className="jargon-case-study-text-title">Solving the "Jargon" Gap</h3>
                           <p className="jargon-case-study-text-paragraph">
                           Jargon is a gamified and AI-powered learning app designed to help skilled trades immigrants in Canada understand industry-specific English terminology, with a strong focus on safety and real workplace use. <br />
                              <br />
                              While skilled trades often prioritize hands-on abilities, unclear language, especially in manuals, safety instructions, and technical documents, can directly affect both confidence and workplace safety.
                           </p>
                        </div>
                     </div>
                  </section>

                  {/* 02. Research */}
                  <section id="research" className="jargon-case-study-section">
                     <span className="jargon-case-study-section-label">02 / Research</span>
                     <h2 className="jargon-case-study-section-title">User Research & Analysis</h2>

                     <div className="jargon-case-study-research-wrapper">
                        <div>
                           <h3 className="jargon-case-study-research-title">Research</h3>
                           <div className="jargon-case-study-text-block">
                              <h4 className="jargon-case-study-text-title">Who?</h4>
                              <p className="jargon-case-study-text-paragraph">
                              A Vulnerable Workforce<br/>
                                 Immigrants represent 22.9% of Canada's construction workforce and face a 1.51 times higher risk of workplace injury than native-born workers. Approximately 25% of on-site accidents are directly linked to these language-driven misunderstandings.
                              </p>
                              <p className="jargon-case-study-text-paragraph jargon-case-study-text-paragraph-spaced jargon-case-study-reference">
                                 <em>Reference: BuildForce Canada. (2024). Reviewing Canada's construction sector in 2024 – Part 5: Building a strong workforce. <a href="https://www.buildforce.ca/en/" target="_blank" rel="noopener noreferrer">https://www.buildforce.ca/en/</a></em>
                              </p>
                           </div>
                           <div className="jargon-case-study-text-block">
                              <h4 className="jargon-case-study-text-title">User Survey</h4>
                              <p className="jargon-case-study-text-paragraph">
                                 <a
                                    href="https://docs.google.com/forms/d/1b3GmWDbYcK6sPDfj9f6c2Fb68hIMvYmKRp6RT8iFIUg/edit"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="jargon-case-study-link"
                                 >
                                    JARGON User Experience and Feature Survey (Google Forms)
                                 </a>
                              </p>
                           </div>
                           <div className="jargon-case-study-text-block">
                              <h4 className="jargon-case-study-text-title">Findings</h4>
                              <div className="jargon-case-study-image-full-width jargon-case-study-image-near-link">
                                 <img
                                    src="/img/jargon/Jagron-suvery.png"
                                    alt="Jargon User Survey"
                                    className="jargon-case-study-image jargon-case-study-image-no-shadow jargon-case-study-image-clickable"
                                    onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/jargon/Jagron-suvery.png')}
                                 />
                              </div>
                              <p className="jargon-case-study-text-paragraph">
                                 <a
                                    href="/img/jargon/Jargon%20-User%20Survey%20Findings.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="jargon-case-study-link"
                                 >
                                    Jargon – User Survey Findings (PDF)
                                 </a>
                              </p>
                              <h4 className="jargon-case-study-text-title jargon-case-study-text-paragraph-spaced">Identifying Patterns</h4>
                              <p className="jargon-case-study-text-paragraph">
                                 After synthesizing findings from 8 research participants, I identified the following core data points:
                              </p>
                              <ul className="jargon-case-study-list">
                                 <li><strong>Safety Concerns:</strong> Language barriers directly impacted safety for <strong>62.5%</strong> of workers, often leading to misunderstood site warnings.</li>
                                 <li><strong>Communication Gaps:</strong> <strong>75%</strong> of users faced persistent trouble when trying to clarify tasks or ask questions to supervisors.</li>
                                 <li><strong>Micro-learning Habits:</strong> <strong>50%</strong> favored gamified assessments over traditional methods, prioritizing quick <strong>5–8 minute</strong> lessons that fit into their busy shifts.</li>
                              </ul>
                           </div>
                        </div>

                        <div className="jargon-case-study-persona-group">
                           <h3 className="jargon-case-study-research-title">User Persona</h3>
                           <p className="jargon-case-study-text-paragraph jargon-case-study-text-paragraph-spaced">
                              Based on these data points, I developed two representative personas to transform complex research findings into tangible human stories.
                           </p>
                           <div className="jargon-case-study-image-full-width">
                              <img
                                 src="/img/jargon/jargon-persona1.png"
                                 alt="Jargon User Persona 1"
                                 className="jargon-case-study-image jargon-case-study-image-clickable jargon-case-study-image-no-shadow"
                                 onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                                 role="button"
                                 tabIndex={0}
                                 onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/jargon/jargon-persona1.png')}
                              />
                           </div>
                           <div className="jargon-case-study-image-full-width">
                              <img
                                 src="/img/jargon/Jargon-persona2.png"
                                 alt="Jargon User Persona 2"
                                 className="jargon-case-study-image jargon-case-study-image-clickable jargon-case-study-image-no-shadow"
                                 onClick={(e) => setLightboxSrc((e.target as HTMLImageElement).currentSrc || (e.target as HTMLImageElement).src)}
                                 role="button"
                                 tabIndex={0}
                                 onKeyDown={(e) => e.key === 'Enter' && setLightboxSrc('/img/jargon/Jargon-persona2.png')}
                              />
                           </div>
                           <h4 className="jargon-case-study-text-title jargon-case-study-text-paragraph-spaced">Action Points</h4>
                           <ul className="jargon-case-study-list">
                              <li><strong>Document to Lesson:</strong> Let users upload manuals, safety notices, and forms; auto-generate flashcards, quizzes, and summaries from their own documents for immediate job relevance.</li>
                              <li><strong>Clear Progress &amp; Standards:</strong> Display skill gains (speaking, safety, technical terms) with plain-language criteria and job-task checkmarks.</li>
                              <li><strong>Scheduling That Fits Shifts:</strong> Surface dates/times prominently and suggest 5–8 minute micro-sessions for “Before work,” “After work,” and “During breaks,” based on user preferences.</li>
                           </ul>
                        </div>

                     </div>
                  </section>

                  {/* 03. Process */}
                  <section id="process" className="jargon-case-study-section">
                     <span className="jargon-case-study-section-label">03 / Process</span>
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
                           <div className="jargon-case-study-figma-embed">
                              <iframe
                                 title="Jargon User Flow (Figma)"
                                 src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FLinZorgF0Yq032wKIhtMyF%2FJargon-portfolio%3Fnode-id%3D142-2%26p%3Df"
                                 allowFullScreen
                                 className="jargon-case-study-figma-iframe"
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
                              Early sketches focused on clarifying where users should start, reducing decision fatigue, and prioritizing learning over features.
                           </p>
                        </div>

                        <div>
                           <h3 className="jargon-case-study-research-title">Style Guide</h3>
                           <div className="jargon-case-study-style-guide-text">
                              <div className="jargon-case-study-logo-block">
                                 <img
                                    src="/img/jargon/Jargon-logo.png"
                                    alt="Jargon logo"
                                    className="jargon-case-study-logo-image"
                                 />
                              </div>
                              <div className="jargon-case-study-text-block">
                                 <h4 className="jargon-case-study-text-title">Colour &amp; Type</h4>
                                 <p className="jargon-case-study-text-paragraph">
                                    High contrast for accessibility and clarity, set in clean, readable, industrial-inspired type, with card-based layouts to reduce overwhelm.
                                 </p>
                              </div>
                           </div>

                           <div className="jargon-case-study-image-full-width jargon-case-study-image-sm">
                              <img
                                 src="/img/jargon/Jargon-typeandcolour.png"
                                 alt="Jargon Colour and Type"
                                 className="jargon-case-study-image jargon-case-study-image-no-shadow jargon-case-study-image-clickable"
                                 onClick={(e) =>
                                    setLightboxSrc(
                                       (e.target as HTMLImageElement).currentSrc ||
                                       (e.target as HTMLImageElement).src
                                    )
                                 }
                                 role="button"
                                 tabIndex={0}
                                 onKeyDown={(e) =>
                                    e.key === 'Enter' && setLightboxSrc('/img/jargon/Jargon-typeandcolour.png')
                                 }
                              />
                           </div>

                           <h3 className="jargon-case-study-research-title">Component</h3>
                           <div className="jargon-case-study-image-full-width jargon-case-study-image-sm">
                              <img
                                 src="/img/jargon/Jargon-component.png"
                                 alt="Jargon Component"
                                 className="jargon-case-study-image jargon-case-study-image-no-shadow jargon-case-study-image-clickable"
                                 onClick={(e) =>
                                    setLightboxSrc(
                                       (e.target as HTMLImageElement).currentSrc ||
                                       (e.target as HTMLImageElement).src
                                    )
                                 }
                                 role="button"
                                 tabIndex={0}
                                 onKeyDown={(e) =>
                                    e.key === 'Enter' && setLightboxSrc('/img/jargon/Jargon-component.png')
                                 }
                              />
                           </div>

                        </div>

                     </div>
                  </section>

                  {/* 04. Iteration */}
                  <section id="iteration" className="jargon-case-study-section">
                     <span className="jargon-case-study-section-label">04 / Iteration</span>
                     <h2 className="jargon-case-study-section-title">Testing &amp; Iteration</h2>

                     <div className="jargon-case-study-process-wrapper">
                        <div>
                           <h3 className="jargon-case-study-research-title">Usability Testing Insights</h3>
                           <ul className="jargon-case-study-list">
                              <li>Users preferred starting from real documents</li>
                              <li>Flashcards generated from personal materials felt more valuable</li>
                              <li>Faster access to learning increased engagement</li>
                           </ul>
                        </div>
                        <div>
                           <h3 className="jargon-case-study-research-title">Iterations Made</h3>
                           <ul className="jargon-case-study-list">
                              <li>Reduced steps in document upload</li>
                              <li>Improved feedback after quizzes</li>
                              <li>Clarified next actions after completing levels</li>
                           </ul>
                        </div>
                     </div>
                  </section>

                  {/* 05. High-Fidelity */}
                  <section id="visuals" className="jargon-case-study-section">
                     <span className="jargon-case-study-section-label">05 / High-Fidelity</span>
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
                  className={`jargon-case-study-lightbox-backdrop${/Jargon-typeandcolour|Jargon-component/.test(lightboxSrc) ? ' jargon-case-study-lightbox-backdrop--light' : ''}`}
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
