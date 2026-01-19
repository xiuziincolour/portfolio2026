import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './CaseStudy.css';

interface CaseStudyProps {
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

const CaseStudy: React.FC<CaseStudyProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

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
    <div className="bg-brand-bg min-h-screen w-full relative z-40 text-brand-text">
      
      {/* Navigation - Minimal & Fixed */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 pointer-events-none">
        <div className="max-w-[1400px] mx-auto">
          <button 
            onClick={onBack}
            className="pointer-events-auto group flex items-center gap-3 bg-brand-bg/80 backdrop-blur-md px-5 py-2.5 rounded-full text-brand-text font-medium hover:bg-black hover:text-white transition-colors border border-black/5"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back</span>
          </button>
        </div>
      </div>

      {/* Hero Image Section - Image Only */}
      <header className="w-full h-[85vh] relative">
        <img 
          src="/img/linko/linko_header.jpg" 
          alt="Linko Hero" 
          className="w-full h-full object-cover"
        />
      </header>

      {/* Main Content Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-20 relative">
          
          {/* Left Column: Sticky Timeline & Index */}
          <aside className="hidden lg:block w-1/5 relative">
            <div className="sticky top-32">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue mb-8 block">Index</span>
              
              <div className="relative pl-6">
                {/* Continuous Gray Track Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200" />

                <ul className="space-y-6">
                  {SECTIONS.map((section) => (
                    <li key={section.id} className="relative">
                      {/* Active Indicator (Blue Segment) */}
                      {/* This creates the "Progress Bar" effect sliding next to the items */}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="active-indicator"
                          className="absolute -left-[25px] top-0 bottom-0 w-[3px] bg-brand-blue" // Aligned over the 1px track
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
                        className={`block text-sm font-medium transition-all duration-200 ${
                          activeSection === section.id 
                            ? 'text-brand-blue translate-x-2' // Active: Blue & Shifted Right (No Bold to avoid jank)
                            : 'text-gray-400 hover:text-brand-text'
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
          <main className="w-full lg:w-4/5 space-y-40">
            
            {/* Title Block */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="border-b border-gray-300 pb-20"
            >
                <div className="flex flex-col gap-2 mb-8">
                   <span className="text-brand-blue font-bold tracking-widest uppercase text-sm">Product Design</span>
                   <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] -ml-1">
                     Linko:<br/>Redefining the<br/>Live Music Social<br/>Experience
                   </h1>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mt-16">
                   <p className="text-2xl md:text-3xl font-light leading-tight text-gray-800 max-w-2xl">
                     A social platform designed to connect music lovers, turning solo concert-going into a shared community experience.
                   </p>
                   
                   <div className="grid grid-cols-2 gap-x-12 gap-y-8 min-w-[300px]">
                      <div>
                        <span className="block text-xs font-bold uppercase text-gray-400 tracking-widest mb-1">Role</span>
                        <span className="block text-base font-medium">UI/UX Designer</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase text-gray-400 tracking-widest mb-1">Category</span>
                        <span className="block text-base font-medium">Social Platform</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase text-gray-400 tracking-widest mb-1">Focus</span>
                        <span className="block text-base font-medium">Community & Safety</span>
                      </div>
                      <div>
                        <span className="block text-xs font-bold uppercase text-gray-400 tracking-widest mb-1">Platform</span>
                        <span className="block text-base font-medium">Mobile App</span>
                      </div>
                   </div>
                </div>
            </motion.div>

            {/* 01. Overview */}
            <section id="overview" className="scroll-mt-32">
              <span className="text-brand-blue font-mono text-sm mb-6 block">01 / Overview</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-12">Project Overview</h2>
              
              <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-light">
                 <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-3">Background</h3>
                    <p>
                      Linko is a social platform designed to connect music lovers, turning solo concert-going into a shared community experience. It addresses the common struggle of finding others who share a passion for live music.
                    </p>
                 </div>
                 <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-3">Role</h3>
                    <p>
                      <strong className="text-brand-text font-medium">UI/UX Designer</strong> — Responsible for the complete design process from research to high-fidelity prototypes.
                    </p>
                 </div>
                 <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-3">Key Challenge</h3>
                    <p>
                      Creating a safe, low-pressure environment for users to build lasting memories through music while ensuring user safety and privacy in a social networking context.
                    </p>
                 </div>
              </div>
            </section>

            {/* 02. Problem */}
            <section id="problem" className="scroll-mt-32">
              <span className="text-brand-blue font-mono text-sm mb-6 block">02 / Problem</span>
              <div className="space-y-12">
                 <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Problem Statement</h2>
                    <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                       <div>
                          <h3 className="text-xl font-semibold text-brand-text mb-3">The Gap</h3>
                          <p>
                            Many fans love live music but lack a dedicated friend group to attend shows with, leading to feelings of isolation.
                          </p>
                       </div>
                       <div>
                          <h3 className="text-xl font-semibold text-brand-text mb-3">Goal</h3>
                          <p>
                            To bring people together through shared passion, creating connections and building communities around every concert.
                          </p>
                       </div>
                       <div>
                          <h3 className="text-xl font-semibold text-brand-text mb-3">Core Pain Points</h3>
                          <ul className="list-disc list-inside space-y-2">
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
            <section id="research" className="scroll-mt-32">
              <span className="text-brand-blue font-mono text-sm mb-6 block">03 / Research</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-12">User Research & Analysis</h2>
              
              <div className="space-y-16">
                 <div>
                    <h3 className="text-2xl font-bold mb-6">User Persona</h3>
                    <div className="mb-8">
                       <img 
                          src="/img/linko/linko_UserPersonas.jpg" 
                          alt="Linko User Personas" 
                          className="w-full shadow-2xl rounded-lg"
                       />
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="text-2xl font-bold mb-6">Target Audience</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                       <div>
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Demographics</h4>
                          <p className="text-gray-600">Young adults (18-40), including students and young professionals</p>
                       </div>
                       <div>
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Geography</h4>
                          <p className="text-gray-600">North America, specifically Canada and the US</p>
                       </div>
                       <div>
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Behavior</h4>
                          <p className="text-gray-600">Lovers of live music who hate going to events alone and prioritize safety</p>
                       </div>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="text-2xl font-bold mb-6">Visual Research</h3>
                    <div className="mb-6">
                       <img 
                          src="/img/linko/linko_moodboard.jpg" 
                          alt="Linko Moodboard" 
                          className="w-full shadow-2xl rounded-lg"
                       />
                    </div>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      A mood board was curated to capture the high-energy, immersive atmosphere of concerts using light, crowds, and vibrant colors.
                    </p>
                 </div>
              </div>
            </section>

            {/* 04. Process */}
            <section id="process" className="scroll-mt-32">
              <span className="text-brand-blue font-mono text-sm mb-6 block">04 / Process</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-12">The Design Process</h2>
              
              <div className="space-y-16">
                 <div>
                    <h3 className="text-2xl font-bold mb-6">Information Architecture & User Flow</h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      The app is organized into four primary flows to ensure a seamless experience:
                    </p>
                    <div className="mb-8">
                       <img 
                          src="/img/linko/linko_Userflow.jpg" 
                          alt="Linko User Flow" 
                          className="w-full shadow-2xl rounded-lg"
                       />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Flow 1: Onboarding</h4>
                          <p className="text-gray-600">Guided sign-up involving questionnaires to establish the user's "vibe"</p>
                       </div>
                       <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Flow 2: Matching</h4>
                          <p className="text-gray-600">An algorithmic process to suggest potential concert buddies</p>
                       </div>
                       <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Flow 3: Explore/Chat</h4>
                          <p className="text-gray-600">A space to browse upcoming concerts and join dedicated group chats</p>
                       </div>
                       <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Flow 4: Profile</h4>
                          <p className="text-gray-600">A personalized "concert calling card" showcasing favorite genres and artists</p>
                       </div>
                    </div>
                 </div>
                 
                 <div>
                    <h3 className="text-2xl font-bold mb-6">Style Guide</h3>
                    <div className="space-y-8 text-lg text-gray-600 leading-relaxed mb-8">
                       <div>
                          <h4 className="text-xl font-semibold text-brand-text mb-3">Color Palette</h4>
                          <p>
                            In LINKO's interface design, this color palette reflects a strong and consistent brand identity. The Dream Violet tone creates a trustworthy yet imaginative social space. The Neon Lime accents encourage user interaction, while the Coral Pulse buttons clearly guide user actions. The dark background ensures content remains in focus, delivering an immersive and visually clear user experience.
                          </p>
                       </div>
                       <div>
                          <h4 className="text-xl font-semibold text-brand-text mb-3">Logo</h4>
                          <p>
                            The Linko logo is a visual fusion of a vinyl record and a chat bubble, symbolizing the connection between music lovers and meaningful conversations. It represents our mission — helping people find companions to enjoy live music experiences together.
                          </p>
                       </div>
                       <div>
                          <h4 className="text-xl font-semibold text-brand-text mb-3">Typography</h4>
                          <p>
                            Our app features two distinct fonts: Lexend and Ruffly Bold. Lexend, a modern sans-serif typeface, is used for general text to ensure readability and accessibility across all content. Its clean and well-spaced design makes it easy for users to read comfortably. For emphasis, we incorporate Ruffly Bold, a bold and expressive typeface, in key elements such as the logo and usernames. This adds personality and visual contrast, helping important details stand out. By combining Lexend's clarity with Ruffly Bold's impact, our typography creates a balanced, engaging, and user-friendly experience while maintaining a strong brand identity.
                          </p>
                       </div>
                    </div>
                    <img 
                       src="/img/linko/linko_styleguide.jpg" 
                       alt="Linko Style Guide" 
                       className="w-full shadow-2xl rounded-lg"
                    />
                 </div>
                 
                 <div>
                    <h3 className="text-2xl font-bold mb-6">Wireframing & Prototyping</h3>
                    <div className="mb-8">
                       <img 
                          src="/img/linko/linko_low-fi.jpg" 
                          alt="Linko Low-Fi Wireframes" 
                          className="w-full shadow-2xl rounded-lg"
                       />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                       <div>
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Wireframing (Lo-Fi)</h4>
                          <p className="text-gray-600 leading-relaxed">
                            Initial sketches focused on the "Matching Page" and "Explore" layouts to finalize the user journey before visual styling.
                          </p>
                       </div>
                       <div>
                          <h4 className="text-lg font-semibold text-brand-text mb-3">Prototyping (Hi-Fi)</h4>
                          <p className="text-gray-600 leading-relaxed">
                            Finalized with polished UI elements, interactive components, and consistent branding.
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </section>

            {/* 05. Visuals */}
            <section id="visuals" className="scroll-mt-32">
               <span className="text-brand-blue font-mono text-sm mb-6 block">05 / Visuals</span>
               <h2 className="text-4xl md:text-5xl font-bold mb-16">High-Fidelity Design & Features</h2>
               
               <div className="mb-16">
                  <img 
                     src="/img/linko/linko_high-fi.jpg" 
                     alt="Linko High-Fi Prototypes" 
                     className="w-full shadow-2xl rounded-lg"
                  />
               </div>
               
               <div className="space-y-24">
                  {/* Feature 1 */}
                  <div>
                     <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <h3 className="text-2xl font-bold md:w-1/3">Musical Matching</h3>
                        <p className="text-gray-600 md:w-2/3 leading-relaxed">
                           Users can see potential matches with overlapping tastes, like "Swifties" or fans heading to a specific Drake or The Weeknd show.
                        </p>
                     </div>
                  </div>

                  {/* Feature 2 */}
                  <div>
                     <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <h3 className="text-2xl font-bold md:w-1/3">Concert Channels</h3>
                        <p className="text-gray-600 md:w-2/3 leading-relaxed">
                           Instead of going alone, users join a "Channel" for a specific concert to chat and meet their future "concert crew".
                        </p>
                     </div>
                  </div>

                  {/* Feature 3 */}
                  <div>
                     <div className="flex flex-col md:flex-row gap-8 mb-8">
                        <h3 className="text-2xl font-bold md:w-1/3">Community Safety</h3>
                        <p className="text-gray-600 md:w-2/3 leading-relaxed">
                           Clear community rules prohibit ticket sales and harassment, ensuring a respectful and enjoyable environment for everyone.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

            {/* 06. Outcome */}
            <section id="outcome" className="scroll-mt-32 pb-24 border-t border-gray-300 pt-24">
               <span className="text-brand-blue font-mono text-sm mb-6 block">06 / Outcome</span>
               <h2 className="text-4xl md:text-5xl font-bold mb-12">Testing & Accessibility</h2>
               
               <div className="space-y-12 mb-16">
                  <div>
                     <h3 className="text-2xl font-bold mb-6">User Control</h3>
                     <p className="text-lg text-gray-600 leading-relaxed">
                        Integrated "Show/Hide Toggles" during onboarding so users can decide exactly what info is public.
                     </p>
                  </div>
                  
                  <div>
                     <h3 className="text-2xl font-bold mb-6">Accessibility Features</h3>
                     <p className="text-lg text-gray-600 leading-relaxed mb-4">
                        The app includes a "Color Blind Mode" and easy switching between Dark and Light modes to accommodate different visual needs.
                     </p>
                  </div>
                  
                  <div>
                     <h3 className="text-2xl font-bold mb-6">Navigation</h3>
                     <p className="text-lg text-gray-600 leading-relaxed">
                        Intuitive "Progress Bars" and simple navigation buttons help users understand where they are in the onboarding process.
                     </p>
                  </div>
               </div>

               <div className="border-t border-gray-300 pt-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-12">Conclusion & Reflections</h2>
                  <div className="space-y-12">
                     <div>
                        <h3 className="text-2xl font-bold mb-4">Project Outcome</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                           Linko successfully bridges the gap between digital matching and physical event attendance, creating a safer way for fans to connect.
                        </p>
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold mb-4">Key Learning</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                           This project highlighted the importance of "human-centric" design—balancing a fun, high-energy aesthetic with the serious functional requirements of user safety and privacy.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;